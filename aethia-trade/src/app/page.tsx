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
import { UserProfile, LLMStrategyProposal, AuditReceipt } from "@/types";
import { LLM_STRATEGIES } from "@/lib/consensusEngine";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1);
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

  const [selectedStrategy, setSelectedStrategy] = useState<LLMStrategyProposal>(LLM_STRATEGIES[0]);
  const [customWeights, setCustomWeights] = useState<Record<string, number> | undefined>(undefined);
  const [auditReceipt, setAuditReceipt] = useState<AuditReceipt | null>(null);

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
            onNext={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <Step4ConsensusEngine
            selectedStrategy={selectedStrategy}
            onSelectStrategy={setSelectedStrategy}
            onNext={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 5 && (
          <Step5Explainability
            onNext={() => setCurrentStep(6)}
          />
        )}

        {currentStep === 6 && (
          <Step6HumanApproval
            selectedStrategy={selectedStrategy}
            onApprove={handleApproveStrategy}
            onReject={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 7 && (
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

        {currentStep === 8 && (
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
