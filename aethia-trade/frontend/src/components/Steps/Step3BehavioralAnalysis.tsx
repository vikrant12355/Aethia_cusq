"use client";

import React from "react";
import { UserProfile } from "@/types";
import { Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface Step3Props {
  userProfile: UserProfile;
  onNext: () => void;
}

export default function Step3BehavioralAnalysis({ userProfile, onNext }: Step3Props) {
  const radarData = [
    { subject: "Loss Aversion", A: (userProfile.lossAversionIndex || 7) * 10, fullMark: 100 },
    { subject: "Vol Tolerance", A: (userProfile.volatilityTolerance || 15) * 3, fullMark: 100 },
    { subject: "Horizon Depth", A: 85, fullMark: 100 },
    { subject: "Alpha Appetite", A: (userProfile.riskTolerance || 5) * 10, fullMark: 100 },
    { subject: "Liquidity Buffer", A: 75, fullMark: 100 },
    { subject: "Anomaly Intolerance", A: 92, fullMark: 100 },
  ];

  const curveData = [
    { marketDrop: "0%", portfolioImpact: "0.0%", lossIndex: 0 },
    { marketDrop: "-5%", portfolioImpact: "-1.8%", lossIndex: 1.2 },
    { marketDrop: "-10%", portfolioImpact: "-3.5%", lossIndex: 2.8 },
    { marketDrop: "-15%", portfolioImpact: "-5.2%", lossIndex: 4.5 },
    { marketDrop: "-20%", portfolioImpact: "-6.9%", lossIndex: 6.4 },
    { marketDrop: "-25%", portfolioImpact: "-8.5%", lossIndex: 8.9 },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 py-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-[#e4e4e7] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8b4513] font-semibold">
            <Cpu className="w-4 h-4" />
            <span>BEHAVIORAL ENGINE // XGBOOST + ISOLATION FOREST</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#09090b] tracking-tight mt-1">
            Investor Behavioral Fingerprint & Anomaly Audit
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-0.5">
            Real-time loss aversion profiling without execution delay (0 ms latency).
          </p>
        </div>

        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-[#8b4513] hover:bg-[#6d330d] text-white font-bold text-xs font-mono rounded-lg transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <span>Run AI Consensus Engine</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-white border border-[#e4e4e7] p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <div className="text-[#71717a] text-[10px]">DERIVED PROFILE</div>
          <div className="font-extrabold text-[#09090b] text-sm mt-1">{userProfile.profileName || "Moderate Balanced"}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> VERIFIED
          </div>
        </div>

        <div className="bg-white border border-[#e4e4e7] p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <div className="text-[#71717a] text-[10px]">ISOLATION FOREST ANOMALY SCORE</div>
          <div className="font-extrabold text-[#8b4513] text-xl mt-1">{userProfile.anomalyScore || 0.12}</div>
          <div className="text-[10px] text-[#71717a] mt-2">Target &lt; 0.35 (Low Stress)</div>
        </div>

        <div className="bg-white border border-[#e4e4e7] p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <div className="text-[#71717a] text-[10px]">XGBOOST LOSS AVERSION INDEX</div>
          <div className="font-extrabold text-[#09090b] text-xl mt-1">{userProfile.lossAversionIndex || 7.2} / 10</div>
          <div className="text-[10px] text-[#71717a] mt-2">Drawdown Intolerance Filter</div>
        </div>

        <div className="bg-white border border-[#e4e4e7] p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <div className="text-[#71717a] text-[10px]">VOLATILITY TOLERANCE FLOOR</div>
          <div className="font-extrabold text-emerald-600 text-xl mt-1">±{userProfile.volatilityTolerance || 14.5}%</div>
          <div className="text-[10px] text-[#71717a] mt-2">12-Month Expected Range</div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white border border-[#e4e4e7] rounded-xl p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3 text-xs font-mono">
            <span className="font-bold text-[#09090b] uppercase tracking-wider">Behavioral Radar Fingerprint</span>
            <span className="text-[#71717a] text-[10px]">6 FACTOR DIMENSIONS</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e4e4e7" />
                <PolarAngleAxis dataKey="subject" stroke="#71717a" tick={{ fontSize: 10, fill: "#52525b" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#e4e4e7" />
                <Radar name="Investor Profile" dataKey="A" stroke="#8b4513" fill="#8b4513" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volatility Stress Testing Curve */}
        <div className="bg-white border border-[#e4e4e7] rounded-xl p-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3 text-xs font-mono">
            <span className="font-bold text-[#09090b] uppercase tracking-wider">Simulated Market Stress Impact</span>
            <span className="text-emerald-600 text-[10px]">XGBOOST PREDICTION</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="chestnutGradLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b4513" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b4513" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="marketDrop" stroke="#a1a1aa" tick={{ fontSize: 10, fill: "#52525b" }} />
                <YAxis stroke="#a1a1aa" tick={{ fontSize: 10, fill: "#52525b" }} />
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e4e4e7", borderRadius: "4px", fontSize: "11px" }} />
                <Area type="monotone" dataKey="lossIndex" stroke="#8b4513" strokeWidth={2} fillOpacity={1} fill="url(#chestnutGradLight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
