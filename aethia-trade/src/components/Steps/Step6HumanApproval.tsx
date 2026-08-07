"use client";

import React, { useState } from "react";
import { LLMStrategyProposal } from "@/types";
import ThreeConsensusMap from "@/components/ThreeConsensusMap";
import { ShieldCheck, CheckCircle2, XCircle, Sliders, ArrowRight, Lock, AlertTriangle } from "lucide-react";

interface Step6Props {
  selectedStrategy: LLMStrategyProposal;
  onApprove: (customWeights?: Record<string, number>) => void;
  onReject: () => void;
}

export default function Step6HumanApproval({ selectedStrategy, onApprove, onReject }: Step6Props) {
  const [isModifying, setIsModifying] = useState(false);
  const [weights, setWeights] = useState({ ...selectedStrategy.weights });

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 py-6 font-sans">
      {/* Top Banner */}
      <div className="bg-[#09090d] border border-[#1d1d24] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-terminal">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9a4e1b] font-semibold">
            <Lock className="w-4 h-4" />
            <span>HUMAN-IN-THE-LOOP (HITL) MANDATE // FINAL VERIFICATION</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Human Approval Gate & Consensus Intelligence Map
          </h2>
          <p className="text-xs text-[#a1a1aa] font-mono mt-0.5">
            Strict policy: Zero automated trade execution without explicit human authorization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModifying(!isModifying)}
            className="px-4 py-2 bg-[#121217] hover:bg-[#18181f] border border-[#23232c] text-white font-bold text-xs font-mono rounded transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-[#9a4e1b]" />
            <span>{isModifying ? "Lock Weights" : "Modify Weights"}</span>
          </button>

          <button
            onClick={onReject}
            className="px-4 py-2 bg-crimson-950/40 hover:bg-crimson-950 border border-crimson-600/50 text-crimson-400 font-bold text-xs font-mono rounded transition-colors flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>

          <button
            onClick={() => onApprove(weights)}
            disabled={totalWeight !== 100}
            className={`px-5 py-2.5 font-bold text-xs font-mono rounded-lg transition-colors flex items-center gap-2 shadow-chestnut-glow ${
              totalWeight === 100
                ? "bg-[#9a4e1b] hover:bg-[#8b4513] text-white cursor-pointer"
                : "bg-[#27272a] text-[#71717a] cursor-not-allowed"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve & Sign Strategy</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Map + Institutional Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 3D Consensus Intelligence Map (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <ThreeConsensusMap />
        </div>

        {/* Right Column: Portfolio Metrics & Allocation Sliders (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Institutional Scores Card */}
          <div className="bg-[#09090d] border border-[#1d1d24] rounded-xl p-5 flex flex-col gap-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#1d1d24] pb-3">
              <span className="font-bold text-white uppercase tracking-wider">Institutional Quality Scores</span>
              <span className="text-[#9a4e1b] font-bold">AETHIA RATING: AAA</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded">
                <div className="text-[10px] text-[#a1a1aa]">EST. RETURN</div>
                <div className="text-lg font-extrabold text-[#9a4e1b] mt-1">{selectedStrategy.expectedReturn}%</div>
              </div>
              <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded">
                <div className="text-[10px] text-[#a1a1aa]">MAX RISK</div>
                <div className="text-lg font-extrabold text-white mt-1">{selectedStrategy.maxDrawdown}%</div>
              </div>
              <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded">
                <div className="text-[10px] text-[#a1a1aa]">DIVERSIFY INDEX</div>
                <div className="text-lg font-extrabold text-emerald-400 mt-1">9.6 / 10</div>
              </div>
            </div>
          </div>

          {/* Allocation Weights Card (With Interactive Sliders when modifying) */}
          <div className="bg-[#09090d] border border-[#1d1d24] rounded-xl p-5 flex flex-col gap-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#1d1d24] pb-3">
              <span className="font-bold text-white uppercase tracking-wider">Asset Allocation Breakdown</span>
              <span className={`font-bold ${totalWeight === 100 ? "text-emerald-400" : "text-crimson-400"}`}>
                TOTAL: {totalWeight}% {totalWeight !== 100 && "(MUST EQUAL 100%)"}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {Object.entries(weights).map(([assetKey, weightVal]) => {
                const formattedName = assetKey
                  .replace(/([AZ])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());

                return (
                  <div key={assetKey} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[#a1a1aa]">
                      <span>{formattedName}</span>
                      <span className="font-bold text-white">{weightVal}%</span>
                    </div>

                    {isModifying ? (
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={weightVal}
                        onChange={(e) => handleWeightChange(assetKey as any, parseInt(e.target.value))}
                        className="w-full accent-[#9a4e1b] cursor-pointer"
                      />
                    ) : (
                      <div className="w-full h-2 bg-[#121217] border border-[#23232c] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#9a4e1b]"
                          style={{ width: `${weightVal}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
