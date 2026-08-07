import hashlib

def hash_payload(data: str) -> str:
    """
    Computes a cryptographic hex digest of the string payload.
    Mimics EIP-712 Keccak-256 formatting.
    """
    encoded = data.encode("utf-8")
    sha256_hash = hashlib.sha256(encoded).hexdigest()
    return "0x" + sha256_hash
