"use client";

import React, { useState } from "react";
import HeaderBar from "@/components/HeaderBar";
import Step1WalletConnect from "@/components/Steps/Step1WalletConnect";
import Step2PrivateOnboarding from "@/components/Steps/Step2PrivateOnboarding";
import Step3BehavioralAnalysis from "@/components/Steps/Step3BehavioralAnalysis";
import Step4ConsensusEngine from "@/components/Steps/Step4ConsensusEngine";
import Step5Explainability from "@/components/Steps/Step5Explainability";
import Step6HumanApproval from "@/components/Steps/Step6HumanApproval";
import Step7ExecutionAudit from "@/components/Steps/Step7ExecutionAudit";
import Step8Dashboard from "@/components/Steps/Step8Dashboard";
import BlockchainModal from "@/components/BlockchainModal";
import { UserProfile, LLMStrategyProposal, AuditReceipt, SpecialistMetric, ShapFeature } from "@/types";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isBlockchainModalOpen, setIsBlockchainModalOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    walletAddress: null,
    isConnected: false,
    signature: null,
    ageGroup: "36 - 50 (Peak Earning)",
    annualIncome: "$1,500,000 - $5,000,000",
    investmentGoal: "Balanced Growth & Yield Harvest",
    riskTolerance: 6,
    timeHorizon: "7 - 15 Years (Long-Term Compounding)",
    profileName: "Aggressive Growth Investor",
    anomalyScore: 0.12,
    lossAversionIndex: 6.8,
    volatilityTolerance: 18.0,
  });

  const [selectedStrategy, setSelectedStrategy] = useState<LLMStrategyProposal | null>(null);
  const [customWeights, setCustomWeights] = useState<Record<string, number> | undefined>(undefined);
  const [auditReceipt, setAuditReceipt] = useState<AuditReceipt | null>(null);
  
  // Dynamic states populated from the backend
  const [strategies, setStrategies] = useState<LLMStrategyProposal[]>([]);
  const [specialistMetrics, setSpecialistMetrics] = useState<SpecialistMetric[]>([]);
  const [shapFeatures, setShapFeatures] = useState<ShapFeature[]>([]);
  const [consensusAgreement, setConsensusAgreement] = useState<number>(94.2);

  const handleRunConsensus = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/consensus/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      
      setStrategies(data.strategies || []);
      setSpecialistMetrics(data.specialistMetrics || []);
      setShapFeatures(data.shapFeatures || []);
      setConsensusAgreement(data.agreementPercent || 94.2);
      
      if (data.strategies && data.strategies.length > 0) {
        setSelectedStrategy(data.strategies[0]);
      }
      
      setCurrentStep(4);
    } catch (error) {
      console.error("Failed to run consensus flow", error);
      
      // Safe mock fallback for robustness
      const fallbackStrategies: LLMStrategyProposal[] = [
        {
          id: "strat-1",
          name: "Tactical Macro Alpha (Recommended)",
          author: "GPT-4o",
          philosophy: "Maximizes risk-adjusted total return via factor momentum, quality equity tilts, and short-duration cash buffers.",
          weights: { usEquities: 48, globalEquities: 22, usBonds: 15, commodities: 10, cashEquivalents: 5 },
          expectedReturn: 14.2,
          maxDrawdown: 6.8,
          sharpeRatio: 2.18,
          consensusVoteWeight: 0.45
        },
        {
          id: "strat-2",
          name: "Defensive Risk-Parity (Ray Dalio Model)",
          author: "Claude 3.5",
          philosophy: "Balances risk contribution equally across economic growth and inflation regimes to protect capital in all cycles.",
          weights: { usEquities: 30, globalEquities: 15, usBonds: 35, commodities: 12, cashEquivalents: 8 },
          expectedReturn: 10.8,
          maxDrawdown: 3.9,
          sharpeRatio: 2.45,
          consensusVoteWeight: 0.35
        },
        {
          id: "strat-3",
          name: "Conservative Growth & Dividend Yield",
          author: "Gemini 1.5",
          philosophy: "Focuses on high free cash flow dividend Aristocrats, investment grade corporate bonds, and physical gold hedges.",
          weights: { usEquities: 38, globalEquities: 12, usBonds: 32, commodities: 8, cashEquivalents: 10 },
          expectedReturn: 11.9,
          maxDrawdown: 4.8,
          sharpeRatio: 2.10,
          consensusVoteWeight: 0.20
        }
      ];
      setStrategies(fallbackStrategies);
      setSelectedStrategy(fallbackStrategies[0]);
      setCurrentStep(4);
    }
  };

  const handleApproveStrategy = (weights?: Record<string, number>) => {
    if (weights) {
      setCustomWeights(weights);
    }
    setCurrentStep(7);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f5] flex flex-col font-sans grid-bg">
      <HeaderBar
        currentStep={currentStep}
        setStep={setCurrentStep}
        userProfile={userProfile}
        onOpenBlockchainModal={() => setIsBlockchainModalOpen(true)}
      />

      <main className="flex-1 px-4 py-6 max-w-7xl w-full mx-auto">
        {currentStep === 1 && (
          <Step1WalletConnect
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2PrivateOnboarding
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <Step3BehavioralAnalysis
            userProfile={userProfile}
            onNext={handleRunConsensus}
          />
        )}

        {currentStep === 4 && (
          <Step4ConsensusEngine
            strategies={strategies}
            specialistMetrics={specialistMetrics}
            consensusAgreement={consensusAgreement}
            selectedStrategy={selectedStrategy!}
            onSelectStrategy={setSelectedStrategy}
            onNext={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 5 && (
          <Step5Explainability
            shapFeatures={shapFeatures}
            onNext={() => setCurrentStep(6)}
          />
        )}

        {currentStep === 6 && selectedStrategy && (
          <Step6HumanApproval
            selectedStrategy={selectedStrategy}
            onApprove={handleApproveStrategy}
            onReject={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 7 && selectedStrategy && (
          <Step7ExecutionAudit
            userProfile={userProfile}
            approvedStrategy={selectedStrategy}
            customWeights={customWeights}
            onNext={(receipt) => {
              setAuditReceipt(receipt);
              setCurrentStep(8);
            }}
          />
        )}

        {currentStep === 8 && selectedStrategy && (
          <Step8Dashboard
            receipt={auditReceipt}
            approvedStrategy={selectedStrategy}
            customWeights={customWeights}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1d1d24] bg-[#050507] py-4 px-6 text-center text-xs font-mono text-[#71717a] flex flex-col sm:flex-row justify-between items-center gap-2">
        <div>AETHIA TRADE // BLACKROCK ALADDIN + APPLE DESIGN SYSTEM</div>
        <div>BLOCKCHAIN AUDIT TRAIL ONLY // NO ON-CHAIN ASSET CUSTODY</div>
      </footer>
    </div>
  );
}
