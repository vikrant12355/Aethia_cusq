"use client";

import React from "react";
import { SHAP_FEATURES } from "@/lib/consensusEngine";
import { ArrowUpRight, ArrowDownRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ShapForcePlot() {
  const baseValue = 10.0;
  const totalShapOffset = SHAP_FEATURES.reduce((acc, curr) => acc + curr.shapValue, 0);
  const finalExpectedReturn = baseValue + totalShapOffset;

  return (
    <div className="bg-white border border-[#e4e4e7] rounded-lg p-5 flex flex-col gap-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8b4513] uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>SHAP Explainability & Risk Attribution</span>
          </div>
          <h3 className="text-lg font-bold text-[#09090b] tracking-tight mt-0.5">
            Model Feature Importance & Force Vector Plot
          </h3>
        </div>

        <div className="text-right font-mono">
          <div className="text-xs text-[#71717a]">BASE RETURN: <span className="text-[#09090b] font-bold">{baseValue.toFixed(1)}%</span></div>
          <div className="text-sm font-extrabold text-[#8b4513]">OUTPUT RETURN: {finalExpectedReturn.toFixed(1)}%</div>
        </div>
      </div>

      {/* SHAP Force Visualization Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-mono text-[#71717a]">
          <span>8.0% (Defensive Floor)</span>
          <span className="text-[#09090b] font-bold">BASE VALUE = {baseValue.toFixed(1)}%</span>
          <span>16.0% (Max Potential)</span>
        </div>

        {/* Dynamic Force Bar */}
        <div className="relative w-full h-8 bg-[#f8f9fa] border border-[#e4e4e7] rounded overflow-hidden flex items-center px-2">
          {/* Base marker line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#09090b] z-10" />

          {/* Force Vectors Stack */}
          <div className="w-full flex items-center justify-center gap-1 font-mono text-[10px]">
            {SHAP_FEATURES.map((item, idx) => {
              const isPositive = item.shapValue > 0;
              return (
                <div
                  key={idx}
                  className={`h-5 px-2 rounded flex items-center justify-between text-white font-semibold transition-all ${
                    isPositive
                      ? "bg-[#8b4513] border border-[#9a4e1b]"
                      : "bg-crimson-600 border border-crimson-700"
                  }`}
                  style={{ flexGrow: Math.abs(item.shapValue) }}
                >
                  <span className="truncate">{item.feature.split(" ")[0]}</span>
                  <span>{isPositive ? `+${item.shapValue}%` : `${item.shapValue}%`}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Attribution List Table */}
      <div className="border border-[#e4e4e7] rounded overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#f8f9fa] text-[#71717a] border-b border-[#e4e4e7]">
            <tr>
              <th className="py-2.5 px-3">FEATURE NAME</th>
              <th className="py-2.5 px-3">CATEGORY</th>
              <th className="py-2.5 px-3">OBSERVED VALUE</th>
              <th className="py-2.5 px-3 text-right">SHAP IMPACT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e4e7] bg-white">
            {SHAP_FEATURES.map((feat, idx) => {
              const isPos = feat.shapValue > 0;
              return (
                <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-[#09090b] flex items-center gap-2">
                    {isPos ? (
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8b4513]" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-crimson-600" />
                    )}
                    {feat.feature}
                  </td>
                  <td className="py-2.5 px-3 text-[#71717a]">
                    <span className="bg-[#f4f4f5] border border-[#e4e4e7] px-2 py-0.5 rounded text-[10px]">
                      {feat.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#09090b] font-medium">{feat.value}</td>
                  <td
                    className={`py-2.5 px-3 text-right font-bold ${
                      isPos ? "text-[#8b4513]" : "text-crimson-600"
                    }`}
                  >
                    {isPos ? `+${feat.shapValue.toFixed(1)}%` : `${feat.shapValue.toFixed(1)}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rationale */}
      <div className="bg-[#f8f9fa] border border-[#e4e4e7] p-3.5 rounded flex items-start gap-3 text-xs">
        <CheckCircle2 className="w-4 h-4 text-[#8b4513] shrink-0 mt-0.5" />
        <div className="text-[#52525b] leading-relaxed">
          <span className="font-semibold text-[#09090b]">LLM Committee Consensus Rationale:</span> The committee voted 94.2% in favor of over-weighting Large-Cap Equities based on strong 180-day momentum signals (+2.8% SHAP) and bullish FinBERT corporate sentiment (+1.6% SHAP). High real yields (-0.9% SHAP) are hedged with a 15% allocation to short-duration Treasury bonds.
        </div>
      </div>
    </div>
  );
}
