"use client";

import React from "react";
import { ShieldCheck, Wallet, ChevronRight } from "lucide-react";
import { UserProfile } from "@/types";

interface HeaderBarProps {
  currentStep: number;
  setStep: (step: number) => void;
  userProfile: UserProfile;
  onOpenBlockchainModal?: () => void;
}

const STEP_TITLES = [
  "1. Connect Wallet",
  "2. Private Onboarding",
  "3. Behavioral Analysis",
  "4. AI Consensus",
  "5. Explainability",
  "6. Human Approval",
  "7. Execution & Audit",
  "8. Dashboard",
];

export default function HeaderBar({ currentStep, setStep, userProfile, onOpenBlockchainModal }: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e4e4e7] flex flex-col">
      {/* Top Institutional Ticker Bar */}
      <div className="bg-[#f8f9fa] border-b border-[#e4e4e7] px-4 py-1 flex items-center justify-between text-[11px] font-mono text-[#52525b]">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 font-bold text-[#09090b] tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AETHIA // CONSENSUS MATRIX</span>
          </div>
          <span className="text-[#d4d4d8]">|</span>
          <div>SPX <span className="text-emerald-600 font-semibold">5,842.10 (+0.4%)</span></div>
          <div>NDX <span className="text-emerald-600 font-semibold">20,412.50 (+0.7%)</span></div>
          <div>US10Y <span className="text-[#09090b]">4.18% (-2bps)</span></div>
          <div>VIX <span className="text-emerald-600 font-semibold">13.82 (-4.1%)</span></div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBlockchainModal}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-[#9a4e1b]/10 border border-[#9a4e1b]/40 text-[#9a4e1b] font-mono font-bold hover:bg-[#9a4e1b]/20 transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-[#9a4e1b]" />
            <span>C++20 ENGINE: ONLINE</span>
          </button>
        </div>
      </div>

      {/* Main Navigation & Linear Step Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStep(1)}>
          <div className="w-8 h-8 rounded bg-[#8b4513] border border-[#9a4e1b] flex items-center justify-center font-extrabold text-white text-base shadow-sm">
            Æ
          </div>
          <div>
            <div className="font-extrabold text-[#09090b] text-sm tracking-tight">AETHIA TRADE</div>
            <div className="text-[10px] font-mono text-[#71717a]">Institutional AI Consensus</div>
          </div>
        </div>

        {/* 8-Step Linear Progress Bar */}
        <div className="hidden lg:flex items-center gap-1 bg-[#f8f9fa] border border-[#e4e4e7] p-1 rounded-md text-xs font-mono">
          {STEP_TITLES.map((title, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <button
                key={stepNum}
                onClick={() => setStep(stepNum)}
                className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                  isActive
                    ? "bg-[#8b4513] text-white font-bold shadow-sm"
                    : isCompleted
                    ? "bg-white border border-[#e4e4e7] text-emerald-600 font-semibold"
                    : "text-[#71717a] hover:text-[#09090b]"
                }`}
              >
                <span>{title}</span>
                {idx < STEP_TITLES.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-[#a1a1aa]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Wallet & Status */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {userProfile.isConnected ? (
            <div className="flex items-center gap-2 bg-white border border-[#8b4513]/40 px-3 py-1.5 rounded shadow-sm">
              <Wallet className="w-3.5 h-3.5 text-[#8b4513]" />
              <span className="text-[#09090b] font-semibold">
                {userProfile.walletAddress ? `${userProfile.walletAddress.substring(0, 6)}...${userProfile.walletAddress.substring(38)}` : "0x71F...8E92"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          ) : (
            <button
              onClick={() => setStep(1)}
              className="bg-[#8b4513] hover:bg-[#6d330d] text-white px-3 py-1.5 rounded font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
