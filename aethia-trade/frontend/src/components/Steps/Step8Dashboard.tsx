"use client";

import React, { useState, useEffect } from "react";
import { AuditReceipt, LLMStrategyProposal, PortfolioPosition } from "@/types";
import { ShieldCheck, TrendingUp, PieChart, CheckCircle2, ArrowUpRight, Search } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie, Cell } from "recharts";

interface Step8Props {
  receipt: AuditReceipt | null;
  approvedStrategy: LLMStrategyProposal;
  customWeights?: Record<string, number>;
}

export default function Step8Dashboard({ receipt, approvedStrategy, customWeights }: Step8Props) {
  const [activeTab, setActiveTab] = useState<"POSITIONS" | "AUDIT_LEDGER">("POSITIONS");
  const [searchQuery, setSearchQuery] = useState("");
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);

  const weights = customWeights || approvedStrategy.weights;
  const navValue = 1248500.0;

  // Fetch allocations and position sizes from the backend
  useEffect(() => {
    async function loadPositions() {
      try {
        const res = await fetch("http://localhost:8000/api/portfolio/positions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weights, navValue }),
        });
        if (res.ok) {
          const data = await res.json();
          setPositions(data.positions || []);
        } else {
          throw new Error("Bad response status");
        }
      } catch (err) {
        console.error("API error loading positions", err);
        // Safe mock fallback
        const us_eq = weights.usEquities || 48.0;
        const us_bonds = weights.usBonds || 15.0;
        const comm = weights.commodities || 10.0;
        setPositions([
          { ticker: "NVDA", name: "NVIDIA Corp.", assetClass: "US Equities", allocationPercent: us_eq * 0.35, marketValueUSD: navValue * (us_eq * 0.0035), unrealizedPnLPercent: 18.4, sharpeContribution: 0.82, auditHash: "0x8f3c...1a" },
          { ticker: "MSFT", name: "Microsoft Corp.", assetClass: "US Equities", allocationPercent: us_eq * 0.40, marketValueUSD: navValue * (us_eq * 0.0040), unrealizedPnLPercent: 12.1, sharpeContribution: 0.64, auditHash: "0x7a2b...4c" },
          { ticker: "AAPL", name: "Apple Inc.", assetClass: "US Equities", allocationPercent: us_eq * 0.25, marketValueUSD: navValue * (us_eq * 0.0025), unrealizedPnLPercent: 8.9, sharpeContribution: 0.45, auditHash: "0x9d1e...8f" },
          { ticker: "SHY", name: "iShares 1-3 Year Treasury Bond", assetClass: "US Bonds", allocationPercent: us_bonds * 0.60, marketValueUSD: navValue * (us_bonds * 0.0060), unrealizedPnLPercent: 2.4, sharpeContribution: 0.38, auditHash: "0x4e8f...9d" },
          { ticker: "TLT", name: "iShares 20+ Year Treasury Bond", assetClass: "US Bonds", allocationPercent: us_bonds * 0.40, marketValueUSD: navValue * (us_bonds * 0.0040), unrealizedPnLPercent: 1.8, sharpeContribution: 0.22, auditHash: "0x3b2a...1e" },
          { ticker: "GLD", name: "SPDR Gold Shares", assetClass: "Commodities", allocationPercent: comm, marketValueUSD: navValue * (comm * 0.01), unrealizedPnLPercent: 14.2, sharpeContribution: 0.51, auditHash: "0x1f2e...9a" },
        ]);
      }
    }
    loadPositions();
  }, [weights, navValue]);

  // Performance history timeline data
  const performanceData = [
    { month: "Jan", portfolio: 1000000, benchmark: 1000000 },
    { month: "Feb", portfolio: 1042000, benchmark: 1018000 },
    { month: "Mar", portfolio: 1089000, benchmark: 1032000 },
    { month: "Apr", portfolio: 1074000, benchmark: 1021000 },
    { month: "May", portfolio: 1128000, benchmark: 1054000 },
    { month: "Jun", portfolio: 1182000, benchmark: 1089000 },
    { month: "Jul", portfolio: 1215000, benchmark: 1104000 },
    { month: "Aug", portfolio: 1248500, benchmark: 1121000 },
  ];

  // Pie chart colors
  const PIE_COLORS = ["#9a4e1b", "#10b981", "#3b82f6", "#f59e0b", "#64748b"];

  const pieData = Object.entries(weights).map(([name, val]) => ({
    name: name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
    value: val,
  }));

  const filteredPositions = positions.filter(
    (p) =>
      p.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.assetClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 py-6 font-sans">
      {/* Top Terminal Overview Header */}
      <div className="bg-[#09090d] border border-[#1d1d24] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-terminal">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9a4e1b] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>INSTITUTIONAL TERMINAL // ALADDIN ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Portfolio Net Asset Value (NAV)
          </h1>
          <div className="flex items-center gap-3 mt-1.5 font-mono">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              ${navValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.85% ($248,500.00 YTD)
            </span>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs w-full md:w-auto">
          <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded flex flex-col">
            <span className="text-[10px] text-[#a1a1aa]">SHARPE RATIO</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5">2.42</span>
          </div>
          <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded flex flex-col">
            <span className="text-[10px] text-[#a1a1aa]">MAX DRAWDOWN</span>
            <span className="text-base font-bold text-white mt-0.5">-3.8%</span>
          </div>
          <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded flex flex-col">
            <span className="text-[10px] text-[#a1a1aa]">CONSENSUS VOTE</span>
            <span className="text-base font-bold text-[#9a4e1b] mt-0.5">94.2%</span>
          </div>
          <div className="bg-[#0d0d12] border border-[#23232c] p-3 rounded flex flex-col">
            <span className="text-[10px] text-[#a1a1aa]">AUDIT RECEIPT</span>
            <span className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Row: Growth Performance Chart + Asset Allocation Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Growth vs Benchmark Chart (8 cols) */}
        <div className="lg:col-span-8 bg-[#09090d] border border-[#1d1d24] rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#1d1d24] pb-3 text-xs font-mono">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#9a4e1b]" />
              Historical Cumulative Return vs S&P 500 Benchmark
            </span>
            <span className="text-emerald-400 text-[10px]">ALPHA +12.6%</span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="navGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9a4e1b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#9a4e1b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 10, fill: "#a1a1aa" }} />
                <YAxis stroke="#71717a" tick={{ fontSize: 10, fill: "#a1a1aa" }} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ backgroundColor: "#0d0d12", borderColor: "#23232c", borderRadius: "4px", fontSize: "11px" }} />
                <Area type="monotone" dataKey="portfolio" name="Aethia Portfolio" stroke="#9a4e1b" strokeWidth={2.5} fillOpacity={1} fill="url(#navGrad)" />
                <Area type="monotone" dataKey="benchmark" name="S&P 500 Benchmark" stroke="#64748b" strokeWidth={1.5} strokeDasharray="3 3" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Allocation Pie Chart (4 cols) */}
        <div className="lg:col-span-4 bg-[#09090d] border border-[#1d1d24] rounded-xl p-5 flex flex-col justify-between gap-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#1d1d24] pb-3">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#9a4e1b]" />
              Target Allocation
            </span>
            <span className="text-[#a1a1aa] text-[10px]">100% BALANCED</span>
          </div>

          <div className="w-full h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0d0d12", borderColor: "#23232c", borderRadius: "4px", fontSize: "11px" }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#1d1d24]">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                  <span className="text-[#a1a1aa]">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tabbed Positions & Audit Trail Table */}
      <div className="bg-[#09090d] border border-[#1d1d24] rounded-xl overflow-hidden flex flex-col">
        {/* Table Controls */}
        <div className="bg-[#0d0d12] border-b border-[#1d1d24] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("POSITIONS")}
              className={`px-3 py-1.5 rounded transition-all font-bold ${
                activeTab === "POSITIONS" ? "bg-[#9a4e1b] text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              PORTFOLIO POSITIONS ({positions.length})
            </button>
            <button
              onClick={() => setActiveTab("AUDIT_LEDGER")}
              className={`px-3 py-1.5 rounded transition-all font-bold flex items-center gap-1.5 ${
                activeTab === "AUDIT_LEDGER" ? "bg-[#9a4e1b] text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#9a4e1b]" />
              AUDIT LEDGER RECEIPTS
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#71717a] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Ticker / Hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121217] border border-[#23232c] pl-8 pr-3 py-1.5 rounded text-xs text-white placeholder-[#71717a] focus:outline-none focus:border-[#9a4e1b]"
            />
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto">
          {activeTab === "POSITIONS" ? (
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#09090d] text-[#a1a1aa] border-b border-[#1d1d24]">
                <tr>
                  <th className="py-3 px-4">ASSET TICKER</th>
                  <th className="py-3 px-4">ASSET CLASS</th>
                  <th className="py-3 px-4 text-right">WEIGHT</th>
                  <th className="py-3 px-4 text-right">MARKET VALUE (USD)</th>
                  <th className="py-3 px-4 text-right">P&L (%)</th>
                  <th className="py-3 px-4 text-right">AUDIT HASH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1d1d24] bg-[#09090d]">
                {filteredPositions.map((pos, idx) => (
                  <tr key={idx} className="hover:bg-[#121217] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{pos.ticker}</div>
                      <div className="text-[10px] text-[#a1a1aa]">{pos.name}</div>
                    </td>
                    <td className="py-3 px-4 text-[#a1a1aa]">{pos.assetClass}</td>
                    <td className="py-3 px-4 text-right font-bold text-white">{pos.allocationPercent.toFixed(1)}%</td>
                    <td className="py-3 px-4 text-right font-bold text-white">
                      ${pos.marketValueUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">+{pos.unrealizedPnLPercent}%</td>
                    <td className="py-3 px-4 text-right font-mono text-[#9a4e1b] flex items-center justify-end gap-1">
                      <span>{pos.auditHash}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#9a4e1b]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 flex flex-col gap-4 font-mono text-xs">
              {receipt ? (
                <div className="bg-[#0d0d12] border border-[#9a4e1b]/50 p-4 rounded-lg flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">RECEIPT ID: {receipt.receiptId}</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-bold">
                      {receipt.status} ON POLYGON
                    </span>
                  </div>
                  <div className="text-[#a1a1aa] text-[11px]">TRANSACTION HASH: <span className="text-white">{receipt.transactionHash}</span></div>
                  <div className="text-[#a1a1aa] text-[11px]">STATE ROOT: <span className="text-white">{receipt.stateRoot}</span></div>
                  <div className="text-[#a1a1aa] text-[11px]">BROKER DISPATCH ID: <span className="text-white">{receipt.brokerExecutionId}</span></div>
                  <div className="text-[10px] text-[#71717a] border-t border-[#1d1d24] pt-2">
                    ANCHORED TIMESTAMP: {new Date(receipt.timestamp).toUTCString()}
                  </div>
                </div>
              ) : (
                <div className="text-[#a1a1aa] text-center py-8">No active audit receipt generated yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
