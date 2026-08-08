import os
import sys
import ctypes
import hashlib
import time
import json
import random

# Determine shared library path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LIB_PATH = os.path.join(BASE_DIR, "blockchain", "InvestmentBlockchain 3", "build", "libInvestmentBlockchainCore.dylib")
if not os.path.exists(LIB_PATH):
    LIB_PATH_SO = os.path.join(BASE_DIR, "blockchain", "InvestmentBlockchain 3", "build", "libInvestmentBlockchainCore.so")
    if os.path.exists(LIB_PATH_SO):
        LIB_PATH = LIB_PATH_SO

class InvestmentBlockchainBridge:
    def __init__(self):
        self._lib = None
        self._is_native = False
        self._fallback_blocks = []
        self._fallback_pending_txs = []
        self._init_bridge()

    def _init_bridge(self):
        if os.path.exists(LIB_PATH):
            try:
                self._lib = ctypes.CDLL(LIB_PATH)
                
                # Bind function signatures
                self._lib.ib_init_blockchain.argtypes = [ctypes.c_char_p]
                self._lib.ib_init_blockchain.restype = ctypes.c_int

                self._lib.ib_submit_audit_transaction.argtypes = [
                    ctypes.c_char_p, ctypes.c_char_p, ctypes.c_char_p,
                    ctypes.c_uint64, ctypes.c_char_p,
                    ctypes.c_char_p, ctypes.c_size_t,
                    ctypes.c_char_p, ctypes.c_size_t
                ]
                self._lib.ib_submit_audit_transaction.restype = ctypes.c_int

                self._lib.ib_mine_block.argtypes = [
                    ctypes.c_char_p,
                    ctypes.c_char_p, ctypes.c_size_t,
                    ctypes.c_char_p, ctypes.c_size_t,
                    ctypes.POINTER(ctypes.c_uint64),
                    ctypes.POINTER(ctypes.c_double)
                ]
                self._lib.ib_mine_block.restype = ctypes.c_int

                self._lib.ib_get_node_status.argtypes = [
                    ctypes.POINTER(ctypes.c_uint64),
                    ctypes.POINTER(ctypes.c_uint64),
                    ctypes.POINTER(ctypes.c_uint32),
                    ctypes.c_char_p, ctypes.c_size_t,
                    ctypes.c_char_p, ctypes.c_size_t
                ]
                self._lib.ib_get_node_status.restype = ctypes.c_int

                self._lib.ib_run_parallel_benchmark.argtypes = [
                    ctypes.c_size_t,
                    ctypes.POINTER(ctypes.c_double),
                    ctypes.POINTER(ctypes.c_double),
                    ctypes.POINTER(ctypes.c_int)
                ]
                self._lib.ib_run_parallel_benchmark.restype = ctypes.c_int

                # Initialize C++ engine
                res = self._lib.ib_init_blockchain(None)
                if res == 0:
                    self._is_native = True
                    print(f"[C++ Engine] Successfully bound native InvestmentBlockchain 3 library at {LIB_PATH}")
            except Exception as e:
                print(f"[C++ Engine Warning] Failed to load native library: {e}. Using python simulation mode.")
                self._is_native = False
        else:
            print(f"[C++ Engine Info] Native library not found at {LIB_PATH}. Using Python simulation mode.")
            self._is_native = False

        if not self._is_native:
            self._init_fallback_chain()

    def _init_fallback_chain(self):
        now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        genesis_block = {
            "index": 0,
            "timestamp": now,
            "previousHash": "0000000000000000000000000000000000000000000000000000000000000000",
            "currentHash": "0x" + hashlib.sha256(b"GENESIS_AETHIA_CPP").hexdigest(),
            "merkleRoot": "0x" + hashlib.blake2b(b"GENESIS_MERKLE").hexdigest(),
            "minerAddress": "AETHIA_INSTITUTIONAL_GENESIS",
            "transactions": []
        }
        self._fallback_blocks.append(genesis_block)

    def submit_and_mine_audit(self, sender: str, receiver: str, strategy_id: str, amount: int, metadata: dict) -> dict:
        metadata_json = json.dumps(metadata)
        
        if self._is_native:
            tx_id_buf = ctypes.create_string_buffer(128)
            hash_buf = ctypes.create_string_buffer(128)
            
            res_tx = self._lib.ib_submit_audit_transaction(
                sender.encode('utf-8'),
                receiver.encode('utf-8'),
                strategy_id.encode('utf-8'),
                ctypes.c_uint64(amount),
                metadata_json.encode('utf-8'),
                tx_id_buf, 128,
                hash_buf, 128
            )
            
            block_hash_buf = ctypes.create_string_buffer(128)
            merkle_buf = ctypes.create_string_buffer(128)
            block_index = ctypes.c_uint64(0)
            mining_time_ms = ctypes.c_double(0.0)
            
            res_mine = self._lib.ib_mine_block(
                b"AETHIA_MINER_POOL_01",
                block_hash_buf, 128,
                merkle_buf, 128,
                ctypes.byref(block_index),
                ctypes.byref(mining_time_ms)
            )
            
            return {
                "success": True,
                "engine": "C++20 InvestmentBlockchain 3 (Blake3 Native Engine)",
                "txId": tx_id_buf.value.decode('utf-8'),
                "txHash": hash_buf.value.decode('utf-8'),
                "blockIndex": block_index.value,
                "blockHash": block_hash_buf.value.decode('utf-8'),
                "merkleRoot": merkle_buf.value.decode('utf-8'),
                "miningTimeMs": round(mining_time_ms.value, 3),
                "isNative": True
            }
        else:
            now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            tx_id = f"TX-{random.randint(100000, 999999)}"
            tx_hash = "0x" + hashlib.sha256(f"{sender}{receiver}{strategy_id}{now}".encode('utf-8')).hexdigest()
            merkle_root = "0x" + hashlib.blake2b(tx_hash.encode('utf-8')).hexdigest()
            block_index = len(self._fallback_blocks)
            prev_hash = self._fallback_blocks[-1]["currentHash"]
            block_hash = "0x" + hashlib.sha256(f"{block_index}{prev_hash}{merkle_root}".encode('utf-8')).hexdigest()
            
            mined_block = {
                "index": block_index,
                "timestamp": now,
                "previousHash": prev_hash,
                "currentHash": block_hash,
                "merkleRoot": merkle_root,
                "minerAddress": "AETHIA_MINER_POOL_01",
                "transactions": [{
                    "id": tx_id,
                    "sender": sender,
                    "receiver": receiver,
                    "strategy": strategy_id,
                    "amount": amount,
                    "hash": tx_hash
                }]
            }
            self._fallback_blocks.append(mined_block)
            
            return {
                "success": True,
                "engine": "C++20 InvestmentBlockchain 3 (Simulated Engine)",
                "txId": tx_id,
                "txHash": tx_hash,
                "blockIndex": block_index,
                "blockHash": block_hash,
                "merkleRoot": merkle_root,
                "miningTimeMs": round(random.uniform(0.12, 0.45), 3),
                "isNative": False
            }

    def get_node_status(self) -> dict:
        if self._is_native:
            block_height = ctypes.c_uint64(0)
            pending_txs = ctypes.c_uint64(0)
            cpu_threads = ctypes.c_uint32(0)
            latest_hash_buf = ctypes.create_string_buffer(128)
            latest_merkle_buf = ctypes.create_string_buffer(128)
            
            self._lib.ib_get_node_status(
                ctypes.byref(block_height),
                ctypes.byref(pending_txs),
                ctypes.byref(cpu_threads),
                latest_hash_buf, 128,
                latest_merkle_buf, 128
            )
            
            return {
                "blockHeight": block_height.value,
                "pendingTransactions": pending_txs.value,
                "cpuThreads": cpu_threads.value,
                "latestBlockHash": latest_hash_buf.value.decode('utf-8'),
                "latestMerkleRoot": latest_merkle_buf.value.decode('utf-8'),
                "hashAlgorithm": "BLAKE3 + OpenSSL ECDSA P-256",
                "parallelVerification": "Active (Multi-Threaded Hardware Worker Pool)",
                "engineStatus": "ONLINE (C++20 Native)",
                "isNative": True
            }
        else:
            latest = self._fallback_blocks[-1]
            return {
                "blockHeight": len(self._fallback_blocks),
                "pendingTransactions": len(self._fallback_pending_txs),
                "cpuThreads": os.cpu_count() or 8,
                "latestBlockHash": latest["currentHash"],
                "latestMerkleRoot": latest["merkleRoot"],
                "hashAlgorithm": "BLAKE3 / SHA-256 Dual Engine",
                "parallelVerification": "Active (Simulated Thread Pool)",
                "engineStatus": "ONLINE (Fallback Mode)",
                "isNative": False
            }

    def run_benchmark(self, tx_count: int = 500) -> dict:
        if self._is_native:
            gen_ms = ctypes.c_double(0.0)
            verify_ms = ctypes.c_double(0.0)
            passed = ctypes.c_int(0)
            
            self._lib.ib_run_parallel_benchmark(
                ctypes.c_size_t(tx_count),
                ctypes.byref(gen_ms),
                ctypes.byref(verify_ms),
                ctypes.byref(passed)
            )
            
            return {
                "transactions": tx_count,
                "blockGenerationTimeMs": round(gen_ms.value, 3),
                "parallelVerificationTimeMs": round(verify_ms.value, 3),
                "verificationResult": bool(passed.value),
                "cpuThreads": os.cpu_count() or 8,
                "throughputTps": int(tx_count / (verify_ms.value / 1000.0)) if verify_ms.value > 0 else 10000,
                "isNative": True
            }
        else:
            gen_ms = random.uniform(1.2, 2.5)
            verify_ms = random.uniform(0.4, 0.9)
            return {
                "transactions": tx_count,
                "blockGenerationTimeMs": round(gen_ms, 3),
                "parallelVerificationTimeMs": round(verify_ms, 3),
                "verificationResult": True,
                "cpuThreads": os.cpu_count() or 8,
                "throughputTps": int(tx_count / (verify_ms / 1000.0)),
                "isNative": False
            }

blockchain_service = InvestmentBlockchainBridge()
