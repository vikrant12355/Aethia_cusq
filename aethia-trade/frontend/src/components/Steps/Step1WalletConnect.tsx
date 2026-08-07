"use client";

import React, { useState } from "react";
import { ShieldCheck, Wallet, FileSignature, ArrowRight, CheckCircle2 } from "lucide-react";
import { UserProfile } from "@/types";

interface Step1Props {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onNext: () => void;
}

export default function Step1WalletConnect({ userProfile, setUserProfile, onNext }: Step1Props) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true);
    setTimeout(() => {
      setUserProfile((prev) => ({
        ...prev,
        isConnected: true,
        walletAddress: "0x71F8E92a3C89B72149b10C5D8849E93C3C488E92",
        signature: "0x8f3a9c...1d2b4e7a8f9c0b1a2d3e4f5a6b7c8d9e0f1a2b3c",
      }));
      setIsConnecting(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 py-6 font-sans">
      {/* Disclaimer Alert Card */}
      <div className="bg-white border border-[#e4e4e7] p-4 rounded-lg flex items-start gap-3 text-xs font-mono shadow-sm">
        <ShieldCheck className="w-5 h-5 text-[#8b4513] shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-[#09090b] uppercase tracking-wider">
            INSTITUTIONAL AUDIT DISCLOSURE // NO ON-CHAIN EXECUTION
          </div>
          <div className="text-[#52525b] mt-1 leading-relaxed">
            Wallet authentication is used strictly for cryptographic receipt signing (EIP-712 hashes) and audit trail verification on Ethereum/Polygon. Portfolio execution is routed via institutional broker endpoints (Alpaca / Interactive Brokers Prime).
          </div>
        </div>
      </div>

      {/* Main Connect Panel */}
      <div className="bg-white border border-[#e4e4e7] rounded-xl p-8 flex flex-col items-center text-center gap-6 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-[#faf4f0] border border-[#8b4513] flex items-center justify-center text-[#8b4513] shadow-sm">
          <FileSignature className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-[#09090b] tracking-tight">
            Connect Audit Signer Identity
          </h2>
          <p className="text-sm text-[#52525b] max-w-md mt-1.5 font-sans">
            Select your Web3 key provider or institutional HSM vault to generate cryptographic audit signatures for AI Consensus decisions.
          </p>
        </div>

        {/* Options */}
        <div className="w-full max-w-md flex flex-col gap-3 font-mono text-xs">
          <button
            onClick={() => handleConnect("MetaMask")}
            disabled={isConnecting}
            className="w-full p-4 rounded-lg bg-[#f8f9fa] border border-[#e4e4e7] hover:border-[#8b4513] transition-all flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white border border-[#e4e4e7] flex items-center justify-center font-bold text-[#09090b]">
                🦊
              </div>
              <div>
                <div className="font-bold text-[#09090b] group-hover:text-[#8b4513] transition-colors">
                  MetaMask / Web3 Extension
                </div>
                <div className="text-[10px] text-[#71717a]">EIP-712 Signature Vault</div>
              </div>
            </div>
            {userProfile.isConnected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#71717a] group-hover:text-[#09090b] transition-colors" />
            )}
          </button>

          <button
            onClick={() => handleConnect("WalletConnect")}
            disabled={isConnecting}
            className="w-full p-4 rounded-lg bg-[#f8f9fa] border border-[#e4e4e7] hover:border-[#8b4513] transition-all flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white border border-[#e4e4e7] flex items-center justify-center font-bold text-[#8b4513]">
                WC
              </div>
              <div>
                <div className="font-bold text-[#09090b] group-hover:text-[#8b4513] transition-colors">
                  WalletConnect / Fireblocks MPC
                </div>
                <div className="text-[10px] text-[#71717a]">Institutional Custody HSM</div>
              </div>
            </div>
            {userProfile.isConnected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#71717a] group-hover:text-[#09090b] transition-colors" />
            )}
          </button>
        </div>

        {/* Action Button */}
        {userProfile.isConnected && (
          <div className="w-full max-w-md pt-4 border-t border-[#e4e4e7]">
            <button
              onClick={onNext}
              className="w-full py-3.5 px-6 bg-[#8b4513] hover:bg-[#6d330d] text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Private Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
