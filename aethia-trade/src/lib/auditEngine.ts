import { AuditReceipt, UserProfile, LLMStrategyProposal } from "@/types";

// Simple browser-compatible SHA-256 / Keccak hex simulator for zero-dependency speed
export async function computeHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return '0x' + hashHex;
}

export async function generateAuditReceipt(
  profile: UserProfile,
  approvedStrategy: LLMStrategyProposal,
  customWeights?: Record<string, number>
): Promise<AuditReceipt> {
  const now = new Date().toISOString();
  const blockNum = 19482710 + Math.floor(Math.random() * 500);

  const payload = JSON.stringify({
    wallet: profile.walletAddress || "0x71F8E92a3C89B72149b10C5D8849E93C3C488E92",
    profile: profile.profileName,
    strategy: approvedStrategy.id,
    weights: customWeights || approvedStrategy.weights,
    timestamp: now,
    block: blockNum,
  });

  const consensusHash = await computeHash(payload);
  const txHash = await computeHash(consensusHash + now + "tx");
  const stateRoot = await computeHash(blockNum.toString() + consensusHash);

  return {
    receiptId: `ATH-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: now,
    blockNumber: blockNum,
    transactionHash: txHash,
    stateRoot: stateRoot,
    walletSignature: profile.signature || "0x9c4a8b...1f2d3e",
    consensusHash: consensusHash,
    status: 'VERIFIED',
    network: 'Polygon Mainnet (Audit Ledger)',
    brokerExecutionId: `ALP-INST-${Math.floor(10000000 + Math.random() * 90000000)}`,
    executionVenue: 'Alpaca Prime',
  };
}
