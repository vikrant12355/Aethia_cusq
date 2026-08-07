"use client";

import React from "react";
import { LLMStrategyProposal, SpecialistMetric } from "@/types";
import { Cpu, CheckCircle2, ArrowRight, BrainCircuit, BarChart3 } from "lucide-react";

interface Step4Props {
  strategies: LLMStrategyProposal[];
  specialistMetrics: SpecialistMetric[];
  consensusAgreement: number;
  onSelectStrategy: (strat: LLMStrategyProposal) => void;
  selectedStrategy: LLMStrategyProposal;
  onNext: () => void;
}

export default function Step4ConsensusEngine({
  strategies,
  specialistMetrics,
  consensusAgreement,
  onSelectStrategy,
  selectedStrategy,
  onNext
}: Step4Props) {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 py-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white border border-[#e4e4e7] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8b4513] font-semibold">
            <BrainCircuit className="w-4 h-4" />
            <span>MULTI-AGENT COMMITTEE CONSENSUS // WEIGHTED VOTING</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#09090b] tracking-tight mt-1">
            LLM Committee Proposals & Specialist Model Synthesis
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-0.5">
            Orchestrates GPT-4o, Claude 3.5, and Gemini 1.5 with LSTM & FinBERT specialist outputs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-[#f8f9fa] border border-[#8b4513] rounded font-mono text-xs text-[#09090b]">
            CONSENSUS AGREEMENT: <span className="text-[#8b4513] font-bold">{consensusAgreement}%</span>
          </div>
          <button
            onClick={onNext}
            className="px-5 py-2.5 bg-[#8b4513] hover:bg-[#6d330d] text-white font-bold text-xs font-mono rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>View SHAP Explainability</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Specialist Models Matrix Section */}
      <div className="bg-white border border-[#e4e4e7] rounded-xl p-5 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3 text-xs font-mono">
          <span className="font-bold text-[#09090b] uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#8b4513]" />
            SPECIALIST MODEL INPUT FEED (DEEP LEARNING & NLP)
          </span>
          <span className="text-[#71717a] text-[10px]">{specialistMetrics.length} ACTIVE AGENTS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialistMetrics.map((spec) => (
            <div
              key={spec.id}
              className="bg-[#f8f9fa] border border-[#e4e4e7] p-4 rounded-lg flex flex-col gap-2 font-mono text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#09090b]">{spec.name}</span>
                <span className="bg-white border border-[#e4e4e7] px-2 py-0.5 rounded text-[10px] text-[#8b4513] font-bold">
                  {spec.modelType}
                </span>
              </div>
              <div className="text-emerald-700 font-semibold">{spec.prediction}</div>
              <div className="text-[#52525b] text-[11px] font-sans leading-relaxed mt-1">
                {spec.detail}
              </div>
              <div className="flex justify-between text-[10px] text-[#71717a] pt-2 border-t border-[#e4e4e7] mt-1">
                <span>CONFIDENCE: {(spec.confidence * 100).toFixed(1)}%</span>
                <span>IMPACT SCORE: {spec.impactScore}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 LLM Strategy Proposals Side-by-Side */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
          <span className="font-bold text-[#09090b] uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#8b4513]" />
            LLM COMMITTEE STRATEGY PROPOSALS (SELECT FOR REVIEW)
          </span>
          <span>WEIGHTED COMMITTEE VOTES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategies.map((strat) => {
            const isSelected = selectedStrategy && selectedStrategy.id === strat.id;

            return (
              <div
                key={strat.id}
                onClick={() => onSelectStrategy(strat)}
                className={`bg-white border rounded-xl p-5 flex flex-col justify-between gap-5 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#8b4513] shadow-md bg-[#faf4f0]/30"
                    : "border-[#e4e4e7] hover:border-[#a1a1aa]"
                }`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#f8f9fa] border border-[#e4e4e7] px-2.5 py-1 rounded text-[11px] font-mono text-[#09090b] font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8b4513]" />
                      {strat.author}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-mono text-[#8b4513] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> SELECTED
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#09090b] tracking-tight">{strat.name}</h3>
                    <p className="text-xs text-[#52525b] font-sans mt-1.5 leading-relaxed">
                      {strat.philosophy}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="border-t border-[#e4e4e7] pt-4 flex flex-col gap-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#71717a]">EST. RETURN (12M):</span>
                    <span className="font-bold text-[#8b4513]">{strat.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#71717a]">MAX DRAWDOWN:</span>
                    <span className="font-bold text-[#09090b]">{strat.maxDrawdown}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#71717a]">SHARPE RATIO:</span>
                    <span className="font-bold text-emerald-600">{strat.sharpeRatio}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-2 border-t border-[#e4e4e7]">
                    <span className="text-[#71717a]">VOTE WEIGHT:</span>
                    <span className="font-bold text-[#09090b]">{(strat.consensusVoteWeight * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
