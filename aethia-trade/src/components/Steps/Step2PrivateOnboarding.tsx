"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types";
import { ArrowRight, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { computeBehavioralProfile } from "@/lib/consensusEngine";

interface Step2Props {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onNext: () => void;
}

const QUESTIONS = [
  {
    id: "ageGroup",
    question: "1. What is your current lifecycle stage & age bracket?",
    description: "Determines Human Capital ratio and benchmark risk capacity.",
    options: ["25 - 35 (Early Accumulation)", "36 - 50 (Peak Earning)", "51 - 65 (Pre-Retirement)", "65+ (Capital Preservation)"],
  },
  {
    id: "annualIncome",
    question: "2. Annual liquidity & investable liquid net worth bracket?",
    description: "Determines institutional accredited investor status and liquidity buffer requirement.",
    options: ["$250,000 - $500,000", "$500,000 - $1,500,000", "$1,500,000 - $5,000,000", "$5,000,000+ (High Net Worth)"],
  },
  {
    id: "investmentGoal",
    question: "3. Primary capital allocation objective?",
    description: "Used by LLM Committee to constrain target return vs max drawdown optimization.",
    options: [
      "Aggressive Capital Appreciation (Max Alpha)",
      "Balanced Growth & Yield Harvest",
      "Defensive Risk-Parity Allocation",
      "Capital Preservation & Inflation Hedge",
    ],
  },
  {
    id: "riskTolerance",
    question: "4. Maximum acceptable 12-month peak-to-trough drawdown threshold?",
    description: "Configures XGBoost Loss Aversion Matrix and Isolation Forest liquidity trigger.",
    type: "slider",
    min: 1,
    max: 10,
    labels: { 1: "Strict -5% Drawdown", 5: "Moderate -15% Drawdown", 10: "Aggressive -30%+ Drawdown" },
  },
  {
    id: "timeHorizon",
    question: "5. Investment time horizon & capital lockup tolerance?",
    description: "Used to calibrate duration matching for Treasury & fixed income models.",
    options: ["1 - 3 Years (Short-Term Liquidity)", "3 - 7 Years (Medium Cycle)", "7 - 15 Years (Long-Term Compounding)", "15+ Years (Multigenerational Wealth)"],
  },
];

export default function Step2PrivateOnboarding({ userProfile, setUserProfile, onNext }: Step2Props) {
  const [qIndex, setQIndex] = useState(0);

  const currentQ = QUESTIONS[qIndex];

  const handleOptionSelect = (optionValue: string | number) => {
    setUserProfile((prev) => ({
      ...prev,
      [currentQ.id]: optionValue,
    }));

    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    }
  };

  const handleFinishOnboarding = () => {
    setUserProfile((prev) => computeBehavioralProfile(prev));
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 py-6 font-sans">
      {/* Progress Header */}
      <div className="flex items-center justify-between font-mono text-xs text-[#71717a] border-b border-[#e4e4e7] pb-3">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-[#8b4513]" />
          <span>ZERO-KNOWLEDGE PRIVATE ONBOARDING</span>
        </div>
        <div>
          QUESTION <span className="text-[#09090b] font-bold">{qIndex + 1}</span> OF {QUESTIONS.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#e4e4e7] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#8b4513] transition-all duration-300"
          style={{ width: `${((qIndex + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white border border-[#e4e4e7] rounded-xl p-8 flex flex-col gap-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#09090b] tracking-tight leading-snug">
            {currentQ.question}
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1.5">{currentQ.description}</p>
        </div>

        {/* Options Rendering */}
        {currentQ.type === "slider" ? (
          <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#71717a]">TOLERANCE LEVEL:</span>
              <span className="text-xl font-extrabold text-[#8b4513]">
                {userProfile.riskTolerance || 5} / 10
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={userProfile.riskTolerance || 5}
              onChange={(e) => handleOptionSelect(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-[#8b4513]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#71717a]">
              <span>{currentQ.labels[1]}</span>
              <span>{currentQ.labels[5]}</span>
              <span>{currentQ.labels[10]}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 font-mono text-xs">
            {currentQ.options?.map((opt, idx) => {
              const isSelected = (userProfile as any)[currentQ.id] === opt;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  className={`p-4 rounded-lg border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#faf4f0] border-[#8b4513] text-[#09090b] font-bold"
                      : "bg-[#f8f9fa] border-[#e4e4e7] text-[#52525b] hover:border-[#a1a1aa] hover:text-[#09090b]"
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#8b4513]" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e4e4e7] font-mono text-xs">
          <button
            onClick={() => qIndex > 0 && setQIndex(qIndex - 1)}
            disabled={qIndex === 0}
            className={`flex items-center gap-1.5 px-3 py-2 rounded border border-[#e4e4e7] ${
              qIndex === 0 ? "opacity-30 cursor-not-allowed text-[#a1a1aa]" : "text-[#52525b] hover:text-[#09090b] hover:border-[#a1a1aa]"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {qIndex < QUESTIONS.length - 1 ? (
            <button
              onClick={() => setQIndex(qIndex + 1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#09090b] hover:bg-[#27272a] text-white font-bold rounded transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinishOnboarding}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#8b4513] hover:bg-[#6d330d] text-white font-bold rounded transition-colors shadow-sm"
            >
              <span>Generate Investor Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
