def generate_portfolio_positions(weights: dict, nav_value: float = 1248500.0) -> list:
    us_eq = weights.get("usEquities", 48.0)
    us_bonds = weights.get("usBonds", 15.0)
    comm = weights.get("commodities", 10.0)

    positions = [
        {
            "ticker": "NVDA",
            "name": "NVIDIA Corp.",
            "assetClass": "US Equities",
            "allocationPercent": round(us_eq * 0.35, 2),
            "marketValueUSD": round(nav_value * (us_eq * 0.0035), 2),
            "unrealizedPnLPercent": 18.4,
            "sharpeContribution": 0.82,
            "auditHash": "0x8f3c...1a"
        },
        {
            "ticker": "MSFT",
            "name": "Microsoft Corp.",
            "assetClass": "US Equities",
            "allocationPercent": round(us_eq * 0.40, 2),
            "marketValueUSD": round(nav_value * (us_eq * 0.0040), 2),
            "unrealizedPnLPercent": 12.1,
            "sharpeContribution": 0.64,
            "auditHash": "0x7a2b...4c"
        },
        {
            "ticker": "AAPL",
            "name": "Apple Inc.",
            "assetClass": "US Equities",
            "allocationPercent": round(us_eq * 0.25, 2),
            "marketValueUSD": round(nav_value * (us_eq * 0.0025), 2),
            "unrealizedPnLPercent": 8.9,
            "sharpeContribution": 0.45,
            "auditHash": "0x9d1e...8f"
        },
        {
            "ticker": "SHY",
            "name": "iShares 1-3 Year Treasury Bond",
            "assetClass": "US Bonds",
            "allocationPercent": round(us_bonds * 0.60, 2),
            "marketValueUSD": round(nav_value * (us_bonds * 0.0060), 2),
            "unrealizedPnLPercent": 2.4,
            "sharpeContribution": 0.38,
            "auditHash": "0x4e8f...9d"
        },
        {
            "ticker": "TLT",
            "name": "iShares 20+ Year Treasury Bond",
            "assetClass": "US Bonds",
            "allocationPercent": round(us_bonds * 0.40, 2),
            "marketValueUSD": round(nav_value * (us_bonds * 0.0040), 2),
            "unrealizedPnLPercent": 1.8,
            "sharpeContribution": 0.22,
            "auditHash": "0x3b2a...1e"
        },
        {
            "ticker": "GLD",
            "name": "SPDR Gold Shares",
            "assetClass": "Commodities",
            "allocationPercent": round(comm, 2),
            "marketValueUSD": round(nav_value * (comm * 0.01), 2),
            "unrealizedPnLPercent": 14.2,
            "sharpeContribution": 0.51,
            "auditHash": "0x1f2e...9a"
        }
    ]
    return positions
