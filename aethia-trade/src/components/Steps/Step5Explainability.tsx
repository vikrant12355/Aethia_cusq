"use client";

import React from "react";
import ShapForcePlot from "@/components/ShapForcePlot";
import { ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

interface Step5Props {
  onNext: () => void;
}

export default function Step5Explainability({ onNext }: Step5Props) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 py-6 font-sans">
      {/* Top Banner */}
      <div className="bg-[#09090d] border border-[#1d1d24] rounded-xl p-6 flex items-center justify-between shadow-terminal">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9a4e1b] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>SHAPLEY ADDITIVE EXPLANATIONS // INSTITUTIONAL AUDIT</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Explainable AI (XAI) Attribution Matrix
          </h2>
          <p className="text-xs text-[#a1a1aa] font-mono mt-0.5">
            Transparent feature impact vectors and non-black-box decision rationale.
          </p>
        </div>

        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-[#9a4e1b] hover:bg-[#8b4513] text-white font-bold text-xs font-mono rounded-lg transition-colors flex items-center gap-2 shadow-chestnut-glow"
        >
          <span>Proceed to Human Approval & 3D Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main SHAP Force Plot Component */}
      <ShapForcePlot />
    </div>
  );
}
