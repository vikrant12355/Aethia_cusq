export interface UserProfile {
  walletAddress: string | null;
  isConnected: boolean;
  signature: string | null;
  
  // Questionnaire responses
  ageGroup: string;
  annualIncome: string;
  investmentGoal: string;
  riskTolerance: number; // 1-10
  timeHorizon: string;

  // Derived Investor Profile
  profileName: string;
  anomalyScore: number; // Isolation Forest (0-1)
  lossAversionIndex: number; // XGBoost derived (0-10)
  volatilityTolerance: number; // 0-100%
}

export interface SpecialistMetric {
  id: string;
  name: string;
  modelType: 'LSTM' | 'FinBERT' | 'Macro' | 'XGBoost';
  prediction: string;
  confidence: number;
  impactScore: number;
  detail: string;
}

export interface LLMStrategyProposal {
  id: string;
  name: string;
  author: 'GPT-4o' | 'Claude 3.5' | 'Gemini 1.5';
  philosophy: string;
  weights: {
    usEquities: number;
    globalEquities: number;
    usBonds: number;
    commodities: number;
    cashEquivalents: number;
  };
  expectedReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  consensusVoteWeight: number; // e.g. 0.35
}

export interface ShapFeature {
  feature: string;
  description: string;
  value: string;
  shapValue: number; // positive or negative push to expected return
  category: 'Macro' | 'Sentiment' | 'Behavior' | 'Valuation';
}

export interface AuditReceipt {
  receiptId: string;
  timestamp: string;
  blockNumber: number;
  transactionHash: string;
  cppBlockHash?: string;
  blake3MerkleRoot?: string;
  verificationTimeMs?: number;
  stateRoot: string;
  walletSignature: string;
  consensusHash: string;
  status: 'PENDING' | 'CONFIRMED' | 'VERIFIED';
  network: string;
  brokerExecutionId: string;
  executionVenue: 'Alpaca Prime' | 'Interactive Brokers Institutional';
  cppEngineStatus?: string;
  isNativeCpp?: boolean;
}

export interface BlockchainNodeStatus {
  blockHeight: number;
  pendingTransactions: number;
  cpuThreads: number;
  latestBlockHash: string;
  latestMerkleRoot: string;
  hashAlgorithm: string;
  parallelVerification: string;
  engineStatus: string;
  isNative: boolean;
}

export interface BlockchainBenchmarkResult {
  transactions: number;
  blockGenerationTimeMs: number;
  parallelVerificationTimeMs: number;
  verificationResult: boolean;
  cpuThreads: number;
  throughputTps: number;
  isNative: boolean;
}

export interface PortfolioPosition {
  ticker: string;
  name: string;
  assetClass: string;
  allocationPercent: number;
  marketValueUSD: number;
  unrealizedPnLPercent: number;
  sharpeContribution: number;
  auditHash: string;
}
