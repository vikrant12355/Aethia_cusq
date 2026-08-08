"use client";

import React, { useEffect, useState } from "react";
import { X, Cpu, ShieldCheck, Zap, Activity, RefreshCw, Layers, HardDrive } from "lucide-react";
import { BlockchainNodeStatus, BlockchainBenchmarkResult } from "@/types";

interface BlockchainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BlockchainModal({ isOpen, onClose }: BlockchainModalProps) {
  const [nodeStatus, setNodeStatus] = useState<BlockchainNodeStatus | null>(null);
  const [benchmarkResult, setBenchmarkResult] = useState<BlockchainBenchmarkResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [benchmarking, setBenchmarking] = useState<boolean>(false);

  const fetchNodeStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/blockchain/status");
      if (res.ok) {
        const data = await res.json();
        setNodeStatus(data);
      }
    } catch (e) {
      console.error("Failed to fetch node status", e);
    } finally {
      setLoading(false);
    }
  };

  const runBenchmark = async () => {
    setBenchmarking(true);
    try {
      const res = await fetch("http://localhost:8000/api/blockchain/benchmark?count=500");
      if (res.ok) {
        const data = await res.json();
        setBenchmarkResult(data);
      }
    } catch (e) {
      console.error("Failed to run benchmark", e);
    } finally {
      setBenchmarking(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNodeStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#09090d] border border-[#9a4e1b]/60 rounded-xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-5 text-white font-sans relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#71717a] hover:text-white transition-colors p-1 rounded-lg hover:bg-[#1d1d24]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#1d1d24] pb-4">
          <div className="p-2.5 bg-[#9a4e1b]/10 border border-[#9a4e1b]/40 rounded-lg text-[#9a4e1b]">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold tracking-tight">InvestmentBlockchain 3 C++ Engine</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#9a4e1b]/20 border border-[#9a4e1b]/40 text-[#9a4e1b]">
                {nodeStatus?.isNative ? "NATIVE C++20" : "ACTIVE"}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] font-mono mt-0.5">
              High-performance Blake3 parallel Merkle tree hashing & multi-threaded block validator
            </p>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded-lg">
            <div className="text-[10px] text-[#71717a] flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#9a4e1b]" /> HEIGHT
            </div>
            <div className="text-base font-bold text-white mt-1">
              #{nodeStatus ? nodeStatus.blockHeight : "..."}
            </div>
          </div>

          <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded-lg">
            <div className="text-[10px] text-[#71717a] flex items-center gap-1">
              <Cpu className="w-3 h-3 text-emerald-400" /> THREADS
            </div>
            <div className="text-base font-bold text-emerald-400 mt-1">
              {nodeStatus ? `${nodeStatus.cpuThreads} Threads` : "..."}
            </div>
          </div>

          <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded-lg">
            <div className="text-[10px] text-[#71717a] flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-sky-400" /> POOL
            </div>
            <div className="text-base font-bold text-sky-400 mt-1">
              {nodeStatus ? `${nodeStatus.pendingTransactions} Pending` : "..."}
            </div>
          </div>

          <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded-lg">
            <div className="text-[10px] text-[#71717a] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#9a4e1b]" /> STATUS
            </div>
            <div className="text-xs font-bold text-emerald-400 mt-1 truncate">
              ONLINE
            </div>
          </div>
        </div>

        {/* Detailed State Info */}
        <div className="bg-[#0d0d12] border border-[#1d1d24] rounded-lg p-4 font-mono text-xs flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-[#1d1d24] pb-2">
            <span className="text-[#a1a1aa]">Cryptographic Hashing Suite</span>
            <span className="text-white font-bold">{nodeStatus?.hashAlgorithm || "BLAKE3 + OpenSSL ECDSA"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#71717a] text-[10px]">LATEST C++ BLOCK HASH</span>
            <span className="text-white font-bold truncate bg-[#050507] p-2 rounded border border-[#1d1d24]">
              {nodeStatus?.latestBlockHash || "0x..."}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#71717a] text-[10px]">BLAKE3 PARALLEL MERKLE ROOT</span>
            <span className="text-[#9a4e1b] font-bold truncate bg-[#050507] p-2 rounded border border-[#1d1d24]">
              {nodeStatus?.latestMerkleRoot || "0x..."}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[#a1a1aa]">Parallel Validator Pipeline</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Hardware Thread Worker Pool Active
            </span>
          </div>
        </div>

        {/* Benchmark Section */}
        <div className="border-t border-[#1d1d24] pt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-[#a1a1aa]">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Multi-threaded Hashing & Parallel Validation Benchmark</span>
            </div>
            <button
              onClick={runBenchmark}
              disabled={benchmarking}
              className="px-3.5 py-1.5 bg-[#9a4e1b] hover:bg-[#8b4513] disabled:opacity-50 text-white font-mono font-bold text-xs rounded transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${benchmarking ? "animate-spin" : ""}`} />
              <span>{benchmarking ? "Benchmarking..." : "Run 500 Tx Test"}</span>
            </button>
          </div>

          {benchmarkResult && (
            <div className="bg-[#050507] border border-amber-500/30 rounded-lg p-3 font-mono text-xs grid grid-cols-3 gap-2">
              <div>
                <div className="text-[10px] text-[#71717a]">THROUGHPUT</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">
                  {benchmarkResult.throughputTps.toLocaleString()} TPS
                </div>
              </div>

              <div>
                <div className="text-[10px] text-[#71717a]">PARALLEL VERIFY</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">
                  {benchmarkResult.parallelVerificationTimeMs} ms
                </div>
              </div>

              <div>
                <div className="text-[10px] text-[#71717a]">HARDWARE THREADS</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {benchmarkResult.cpuThreads} Cores
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
