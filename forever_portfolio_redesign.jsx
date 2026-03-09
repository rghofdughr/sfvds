import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";

const portfolio = [
  { ticker:"RSP", name:"Invesco S&P 500 Equal Weight ETF", type:"ETF", category:"Core Foundation", alloc:15, color:"#38bdf8", pFV:"Market", risk:"Low", horizon:"Forever", expense:"0.20%", moat:"500 US companies, equally weighted — systematic diversification engine", why:"The bedrock. Equal-weighting means you're not overexposed to the top 10 megacaps like a standard S&P 500 ETF. Historically outperforms cap-weighted over full market cycles by systematically buying relatively cheaper stocks and trimming expensive ones every quarter. Zero manager risk. The perfect 'set it and forget it' foundation that handles diversification so the other 85% can be concentrated in conviction.", chatgpt:null, claude:null, grok:null, avgRating:null, gap:null, keyStats:["500 equal-weighted US stocks","Rebalances quarterly","0.20% expense ratio","~0.20% avg stock weight"], morningStar:"★★★★" },
  { ticker:"MSFT", name:"Microsoft Corporation", type:"Stock", category:"Technology", alloc:15, color:"#10a37f", pFV:"0.83×", risk:"Low", horizon:"Forever", expense:"—", moat:"Azure + Office 365 + Copilot AI — deepening enterprise lock-in every quarter", why:"The highest-conviction single stock in the entire analysis. Avg AI rating 91.7, Δ7 — the tightest consensus of any stock we rated. Azure is the #2 cloud platform. Copilot is embedding Microsoft deeper into enterprise workflows permanently. This is infrastructure disguised as software. Paying 0.83× fair value for the best capital-allocation business in tech is not a compromise — it's a buy.", chatgpt:92, claude:88, grok:95, avgRating:91.7, gap:7, keyStats:["$3T+ market cap","Azure ~21% cloud share","95%+ gross margins","28 consecutive dividend raises"], morningStar:"★★★★★" },
  { ticker:"TMO", name:"Thermo Fisher Scientific", type:"Stock", category:"Life Sciences", alloc:12, color:"#34d399", pFV:"0.65×", risk:"Low–Med", horizon:"10–15 yrs", expense:"—", moat:"Life sciences one-stop-shop — pharma & biotech cannot operate without TMO", why:"Best value + quality combination in the entire analysis. 35% discount on cyclical fears — China/US funding cuts — that are temporary, not structural. All three AIs rated 85–95. One-stop-shop for the entire pharma and biotech industry. FDA-validated workflows cannot be casually changed. The secular tailwind from biologics and GLP-1 drug production makes the next 20 years structurally stronger than the last.", chatgpt:90, claude:85, grok:95, avgRating:90.0, gap:10, keyStats:["0.65× price-to-fair-value","FDA workflow lock-in","Biologics tailwind","Best acquirer in life sciences"], morningStar:"★★★★★" },
  { ticker:"MSCI", name:"MSCI Inc.", type:"Stock", category:"Financial Infrastructure", alloc:10, color:"#e879f9", pFV:"0.92×", risk:"Low", horizon:"Forever", expense:"—", moat:"$15T+ in global assets permanently benchmarked to MSCI indices", why:"Tightest 3-AI consensus in the entire dataset (Δ3). A permanent royalty on global capital flows — $15T+ in assets track MSCI indices internationally. Replacing MSCI would mean breaking the entire international and EM asset management industry simultaneously. Recurring subscriptions, aggressive buybacks, silent pricing power. Set it and forget it.", chatgpt:88, claude:87, grok:90, avgRating:88.3, gap:3, keyStats:["$15T+ benchmarked assets","Δ3 — tightest AI consensus","~74% recurring revenue","$3.3B buyback program"], morningStar:"★★★★★" },
  { ticker:"SPGI", name:"S&P Global Inc.", type:"Stock", category:"Financial Infrastructure", alloc:10, color:"#22c55e", pFV:"0.92×", risk:"Low", horizon:"Forever", expense:"—", moat:"S&P 500 index licensing + mandated credit ratings + Platts commodity data", why:"Three moats in one. The S&P 500 index generates billions in passive licensing fees that grow automatically as ETF assets grow — zero marginal cost. Add the credit ratings franchise and Platts commodity data. Tight 3-AI consensus (Δ4). With WST now replacing Moody's, SPGI is the sole credit ratings name — it earns that position because the index licensing business makes it far more resilient than a pure-play ratings firm.", chatgpt:86, claude:86, grok:90, avgRating:87.3, gap:4, keyStats:["S&P 500 index owner","Platts energy data","~60% recurring revenue","IHS Markit synergies"], morningStar:"★★★★★" },
  { ticker:"VRSN", name:"VeriSign Inc.", type:"Stock", category:"Internet Infrastructure", alloc:10, color:"#fb923c", pFV:"0.84×", risk:"Low", horizon:"10–20 yrs", expense:"—", moat:"Government-backed legal monopoly on .com/.net — 170M+ domains, zero competition", why:"The strangest and most misunderstood moat in the portfolio. Every .com domain globally pays VeriSign a fee. 95%+ operating margins, near-zero capex, contractually protected price increases built into the ICANN agreement. Prints cash indefinitely with zero competition possible. The existential risk — .com becoming irrelevant — is a 20+ year question. Until then this is essentially a government-licensed money machine.", chatgpt:91, claude:84, grok:95, avgRating:90.0, gap:11, keyStats:["170M+ .com/.net domains","~95% operating margins","Contractual price increases","Near-zero capex forever"], morningStar:"★★★★★" },
  { ticker:"WST", name:"West Pharmaceutical Services", type:"Stock", category:"Life Sciences", alloc:8, color:"#818cf8", pFV:"0.72×", risk:"Low–Med", horizon:"Forever", expense:"—", moat:"FDA-enforced switching costs on drug delivery components — legally irreplaceable", why:"Replaces Moody's deliberately. WST's moat is categorically different from anything else in this portfolio: switching costs enforced by federal regulation. Every pharma manufacturer using West's stoppers, seals and delivery components has submitted them to the FDA as part of their drug approval. Switching to a competitor means FDA resubmission — years of waiting, production risk, regulatory exposure. No CFO does that to save 10% on rubber stoppers. The 0.72× discount is purely post-pandemic volume normalization — temporary. The biologics and GLP-1 tailwind makes the next 20 years structurally better. Uncorrelated to financial markets.", chatgpt:88, claude:84, grok:95, avgRating:89.0, gap:11, keyStats:["0.72× price-to-fair-value","FDA switching cost moat","GLP-1 / biologics tailwind","$1B buyback authorized"], morningStar:"★★★★★" },
  { ticker:"V", name:"Visa Inc.", type:"Stock", category:"Payments Infrastructure", alloc:10, color:"#f59e0b", pFV:"~1.05×", risk:"Low", horizon:"Forever", expense:"—", moat:"Two-sided global payment network — 4B+ cards, 130M+ merchants, 200+ countries", why:"A toll booth on the entire global economy. Visa earns a small fee on every transaction globally and takes zero credit risk — that stays with the banks. ~80% operating margins, asset-light, grows automatically as the world moves from cash to digital. That conversion is ~40% complete globally — Southeast Asia, Africa, Latin America still predominantly cash. Every person switching to digital over the next 20 years generates Visa revenue regardless of which bank, app or platform they use.", chatgpt:null, claude:null, grok:null, avgRating:null, gap:null, keyStats:["~80% operating margins","200+ countries","4B+ credentials","Zero credit risk model"], morningStar:"★★★★" },
  { ticker:"BRK.B", name:"Berkshire Hathaway B", type:"Stock", category:"Core Foundation", alloc:10, color:"#f97316", pFV:"~1.0×", risk:"Low", horizon:"Forever", expense:"—", moat:"$300B+ cash reserve + 60yr capital allocation track record + real economy diversification", why:"Does something no other position in this portfolio does: gets stronger when everything else gets weaker. The $300B+ cash pile is a weapon — Berkshire deployed billions into Goldman, GE and Bank of America in 2008 at crisis prices. Every major dislocation for 60 years has been an opportunity for BRK.B while it was a disaster for everyone else. Also provides real economy diversification: BNSF railroad, GEICO insurance, Berkshire Energy — none of which care about biotech funding cycles or cloud adoption rates.", chatgpt:null, claude:null, grok:null, avgRating:null, gap:null, keyStats:["$300B+ cash reserve","BNSF + GEICO + BHE","60yr compounding record","Crisis deployment machine"], morningStar:"★★★★★" },
];

const CATS = { "Core Foundation":"#38bdf8", "Technology":"#10a37f", "Financial Infrastructure":"#22c55e", "Life Sciences":"#34d399", "Internet Infrastructure":"#fb923c", "Payments Infrastructure":"#f59e0b" };
const AI_C = { ChatGPT:"#10a37f", Claude:"#f5a623", Grok:"#a78bfa" };
const riskC = r => r==="Low" ? "#22c55e" : r==="Low–Med" ? "#86efac" : "#fbbf24";
const pfvC = p => { if(p==="Market"||p==="~1.0×"||p==="~1.05×") return "#fbbf24"; const v=parseFloat(p); return v<=0.72?"#22c55e":v<=0.88?"#86efac":"#fbbf24"; };
const gapC = g => g===null?"#2d3f55":g<=5?"#22c55e":g<=11?"#fbbf24":"#f87171";

const growthData = Array.from({length:21},(_,i)=>({ year:2025+i, "This Portfolio":Math.round(100000*Math.pow(1.135,i)), "S&P 500 (cap-wt)":Math.round(100000*Math.pow(1.105,i)), "Cash":Math.round(100000*Math.pow(1.045,i)) }));

const PieTip = ({active,payload}) => {
  if(!active||!payload?.length) return null;
  const d=payload[0].payload;
  return <div style={{background:"#07091a",border:`1px solid ${d.color}55`,borderRadius:8,padding:"10px 16px",fontFamily:"'EB Garamond',Georgia,serif"}}><div style={{color:d.color,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",fontSize:13}}>{d.ticker}</div><div style={{color:"#64748b",fontSize:11,margin:"2px 0"}}>{d.name}</div><div style={{color:"#f1f5f9",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:14}}>{d.alloc}%</div></div>;
};

const GrowthTip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  const fmt=v=>v>=1000000?`$${(v/1000000).toFixed(2)}M`:`$${(v/1000).toFixed(0)}k`;
  return <div style={{background:"#07091a",border:"1px solid #1e2d42",borderRadius:8,padding:"10px 16px",fontFamily:"'EB Garamond',Georgia,serif"}}><div style={{color:"#94a3b8",fontWeight:600,marginBottom:6,borderBottom:"1px solid #1e2d42",paddingBottom:5,fontSize:12}}>{label}</div>{payload.map(p=><div key={p.name} style={{color:p.color,marginBottom:2,fontSize:12}}>{p.name}: <strong style={{fontFamily:"'JetBrains Mono',monospace"}}>{fmt(p.value)}</strong></div>)}</div>;
};

export default function App() {
  const [view, setView] = useState("overview");
  const [selected, setSelected] = useState(0);
  const sel = portfolio[selected];
  const ratedStocks = portfolio.filter(s=>s.avgRating);
  const avgConsensus = (ratedStocks.reduce((a,s)=>a+s.avgRating,0)/ratedStocks.length).toFixed(1);
  const lifeSciPct = portfolio.filter(s=>s.category==="Life Sciences").reduce((a,s)=>a+s.alloc,0);
  const finPct = portfolio.filter(s=>s.category==="Financial Infrastructure").reduce((a,s)=>a+s.alloc,0);
  const catData = Object.entries(CATS).map(([cat,color])=>({ cat,color, total:portfolio.filter(s=>s.category===cat).reduce((a,s)=>a+s.alloc,0), tickers:portfolio.filter(s=>s.category===cat).map(s=>s.ticker).join(" · ") })).filter(d=>d.total>0);

  const TABS = [["overview","Holdings"],["allocation","Allocation"],["ratings","AI Ratings"],["growth","Growth"],["detail","Deep Dive"]];

  return (
    <div style={{background:"#04050d",minHeight:"100vh",fontFamily:"'EB Garamond',Georgia,serif",color:"#c8d6e5",position:"relative",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        *{box-sizing:border-box;}
        body{margin:0;}
        
        .bg-grid{
          position:fixed;inset:0;
          background-image: radial-gradient(circle, rgba(56,189,248,0.06) 1px, transparent 1px);
          background-size:32px 32px;
          pointer-events:none;z-index:0;
        }
        .bg-glow{
          position:fixed;top:-200px;left:50%;transform:translateX(-50%);
          width:800px;height:400px;
          background:radial-gradient(ellipse, rgba(56,189,248,0.04) 0%, transparent 70%);
          pointer-events:none;z-index:0;
        }
        
        .wrap{position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:36px 24px;}
        
        /* Header */
        .hdr-label{
          font-family:'JetBrains Mono',monospace;
          font-size:9px;letter-spacing:0.45em;color:#1e3a5f;
          text-transform:uppercase;margin-bottom:12px;
        }
        .hdr-title{
          font-family:'EB Garamond',Georgia,serif;
          font-size:clamp(28px,4vw,44px);font-weight:400;
          color:#e8f0fa;letter-spacing:-1px;line-height:1.05;margin:0;
        }
        .hdr-title em{color:#38bdf8;font-style:italic;}
        .hdr-sub{
          margin:14px 0 0;font-size:12px;color:#2d3f55;
          line-height:1.9;max-width:420px;
        }
        
        /* Stat cards */
        .stat-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:28px;}
        .stat-card{
          background:linear-gradient(160deg,#080c1a,#060910);
          border:1px solid #0d1525;border-radius:10px;
          padding:16px 14px;position:relative;overflow:hidden;
          transition:border-color 0.2s,transform 0.2s;
        }
        .stat-card::before{
          content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:var(--c);opacity:0.7;
        }
        .stat-card:hover{transform:translateY(-2px);}
        .stat-lbl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.18em;color:#1e2d42;text-transform:uppercase;margin-bottom:10px;}
        .stat-val{font-family:'JetBrains Mono',monospace;font-size:21px;font-weight:700;color:var(--c);}
        .stat-sub{font-size:10px;color:#1a2535;margin-top:4px;}
        
        /* Tabs */
        .tab-bar{display:flex;gap:0;margin-bottom:24px;border-bottom:1px solid #0d1525;position:relative;}
        .tab-btn{
          background:transparent;border:none;
          border-bottom:2px solid transparent;
          color:#2d3f55;padding:11px 22px;
          font-size:12px;font-family:'EB Garamond',Georgia,serif;
          letter-spacing:0.04em;cursor:pointer;
          transition:color 0.15s,border-color 0.15s;
          margin-bottom:-1px;font-weight:500;
        }
        .tab-btn:hover{color:#64748b;}
        .tab-btn.active{color:#38bdf8;border-bottom-color:#38bdf8;font-weight:600;}
        
        /* Overview table */
        .tbl-wrap{border:1px solid #0d1525;border-radius:10px;overflow:hidden;}
        .tbl-head{
          display:grid;grid-template-columns:6px 72px 1fr 140px 90px 64px 58px 60px;
          background:#05071a;border-bottom:1px solid #0d1525;
          padding:10px 18px;gap:8px;
        }
        .tbl-hcell{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.16em;color:#1a2535;font-weight:700;text-transform:uppercase;}
        .tbl-row{
          display:grid;grid-template-columns:6px 72px 1fr 140px 90px 64px 58px 60px;
          padding:13px 18px;gap:8px;align-items:center;
          cursor:pointer;transition:background 0.15s;
          border-bottom:1px solid #080b18;
        }
        .tbl-row:last-child{border-bottom:none;}
        .tbl-row:hover{background:rgba(56,189,248,0.03);}
        .tbl-row.wst-row{box-shadow:inset 0 0 0 1px rgba(129,140,248,0.15);}
        
        /* Cards */
        .card{
          background:linear-gradient(160deg,#080c1a,#060910);
          border:1px solid #0d1525;border-radius:10px;padding:22px;
        }
        .card-title{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.2em;color:#1e2d42;text-transform:uppercase;margin-bottom:14px;}
        
        /* Badges */
        .badge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:8px;font-weight:700;padding:3px 8px;border-radius:4px;letter-spacing:0.05em;}
        
        /* Detail */
        .detail-card{
          background:linear-gradient(160deg,#080c1a,#060910);
          border-radius:12px;padding:28px 30px;
          position:relative;overflow:hidden;
        }
        .detail-card::before{
          content:'';position:absolute;left:0;top:0;bottom:0;width:3px;
          background:var(--dc);
        }
        
        /* Ticker buttons in deep dive */
        .tk-btn{
          background:transparent;border:1px solid #0d1525;
          border-radius:6px;padding:6px 13px;
          font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;
          cursor:pointer;transition:all 0.15s;color:#2d3f55;
        }
        .tk-btn:hover{border-color:#1e2d42;color:#64748b;}
        .tk-btn.active{background:rgba(var(--tc-rgb),0.08);border-color:var(--tc);color:var(--tc);}
        
        /* Mini metric box */
        .metric{
          background:#04060e;border:1px solid #0a0f1e;
          border-radius:8px;padding:14px 16px;
        }
        .metric-lbl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.14em;color:#141e30;text-transform:uppercase;margin-bottom:8px;}
        .metric-val{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:800;}
        
        /* AI box */
        .ai-box{
          background:#04060e;border-radius:8px;padding:14px 20px;
          text-align:center;transition:border-color 0.15s;
          border:1px solid transparent;
        }
        .ai-box:hover{border-color:var(--ac);}
        .ai-lbl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.1em;margin-bottom:8px;text-transform:uppercase;}
        .ai-num{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:800;}
        
        /* Donut legend dot */
        .legend-dot{width:10px;height:10px;border-radius:2px;flex-shrink:0;}
        
        /* Key fact pill */
        .fact-pill{
          font-family:'JetBrains Mono',monospace;font-size:10px;color:#38bdf8;
          background:#071525;border:1px solid #0f2540;
          padding:5px 13px;border-radius:5px;
        }
        
        /* Swap card */
        .swap-card{
          background:linear-gradient(160deg,#080c1a,#060910);
          border:1px solid #111827;border-radius:10px;
          padding:16px 20px;min-width:240px;
        }
        
        /* WST rationale */
        .wst-rationale{
          background:rgba(129,140,248,0.04);
          border:1px solid rgba(129,140,248,0.16);
          border-radius:10px;padding:16px 20px;
          margin-bottom:16px;display:flex;gap:16px;align-items:flex-start;
        }
        
        /* Sector balance cards */
        .sector-card{
          background:linear-gradient(160deg,#080c1a,#060910);
          border-radius:10px;padding:16px 18px;
          border:1px solid transparent;transition:border-color 0.2s;
        }
        .sector-card:hover{border-color:rgba(255,255,255,0.06);}
        
        /* Thin divider */
        .divider{height:1px;background:#0d1525;margin:20px 0;}
        
        /* Footer */
        .footer{
          margin-top:24px;display:flex;justify-content:space-between;
          padding:14px 18px;
          background:linear-gradient(160deg,#080c1a,#060910);
          border:1px solid #0d1525;border-radius:8px;
          font-size:10px;flex-wrap:wrap;gap:8px;align-items:center;
        }
        
        /* Animation */
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
        .fade-up{animation:fadeUp 0.4s ease both;}
        
        @keyframes pulse-glow{0%,100%{opacity:0.5;}50%{opacity:1;}}
        
        /* Alloc bar */
        .alloc-bar-bg{height:3px;background:#0a0f1e;border-radius:2px;margin-top:5px;overflow:hidden;}
        .alloc-bar-fill{height:100%;border-radius:2px;}
        
        /* Candidate comparison */
        .cand-card{
          background:#04060e;border-radius:8px;padding:14px 16px;
          border:1px solid #0a0f1e;transition:border-color 0.15s;
        }
        .cand-card.winner{background:rgba(129,140,248,0.06);border-color:#818cf8;}
        
        /* Ratings grid */
        .ratings-header{display:grid;grid-template-columns:80px 1fr 80px 80px 80px 70px 60px 70px;gap:8px;padding:10px 16px;background:#05071a;border-bottom:1px solid #0d1525;}
        .ratings-row{display:grid;grid-template-columns:80px 1fr 80px 80px 80px 70px 60px 70px;gap:8px;padding:12px 16px;border-bottom:1px solid #080b18;align-items:center;}
        .ratings-row:last-child{border-bottom:none;}
        
        /* Warning box */
        .warn-box{
          padding:12px 16px;background:#07030e;
          border:1px solid rgba(248,113,113,0.18);border-radius:8px;
          font-size:10.5px;color:#f87171;line-height:1.8;margin-top:14px;
        }
        
        /* Progress bar for growth */
        .growth-stat-card{
          background:#04060e;border-radius:8px;padding:16px 18px;
          border:1px solid transparent;
        }
        
        /* Scroll style */
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:#04050d;}
        ::-webkit-scrollbar-thumb{background:#0d1525;border-radius:3px;}
      `}</style>

      <div className="bg-grid" />
      <div className="bg-glow" />

      <div className="wrap">
        {/* ═══ HEADER ═══ */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32,paddingBottom:26,borderBottom:"1px solid #0d1525"}}>
          <div>
            <div className="hdr-label">Buy &amp; Hold Forever · Wall Street Quality · Final</div>
            <h1 className="hdr-title">The Compounder<br/><em>Forever Portfolio</em></h1>
            <p className="hdr-sub">9 positions · 1 ETF + 8 wide-moat stocks · Built from 3-AI consensus + Morningstar 5-star confirmation · WST replaces MCO.</p>
          </div>
          <div className="swap-card">
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,letterSpacing:"0.18em",color:"#1e2d42",textTransform:"uppercase",marginBottom:12}}>Final Swap</div>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,color:"#f87171",fontSize:16,textDecoration:"line-through",opacity:0.45}}>MCO</div>
                <div style={{fontSize:8,color:"#1e2d42",marginTop:2}}>Moody's</div>
              </div>
              <div style={{color:"#1e2d42",fontSize:20}}>→</div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,color:"#818cf8",fontSize:16}}>WST</div>
                <div style={{fontSize:8,color:"#818cf8",marginTop:2}}>West Pharma</div>
              </div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:"#1e2d42"}}>8%</div>
            </div>
            <div style={{fontSize:9.5,color:"#1e2d42",lineHeight:1.9,borderTop:"1px solid #0d1525",paddingTop:10}}>
              <div>✓ Removes financial cycle correlation</div>
              <div>✓ Adds FDA-enforced switching costs</div>
              <div>✓ Highest avg of 5 candidates (89.0)</div>
              <div>✓ Morningstar <span style={{color:"#f59e0b"}}>★★★★★</span> confirmed</div>
              <div>✓ Life sciences: <span style={{color:"#34d399"}}>{lifeSciPct}%</span> · Financial: <span style={{color:"#22c55e"}}>{finPct}%</span></div>
            </div>
          </div>
        </div>

        {/* ═══ STAT STRIP ═══ */}
        <div className="stat-grid">
          {[["Positions","9","1 ETF + 8 stocks","#38bdf8"],["Life Sciences",`${lifeSciPct}%`,"TMO + WST","#34d399"],["Financial Infra",`${finPct}%`,"SPGI + MSCI only","#22c55e"],["AI Consensus",avgConsensus,"rated positions","#a78bfa"],["Time Horizon","Forever","set it · don't touch it","#f59e0b"]].map(([lbl,val,sub,c])=>(
            <div key={lbl} className="stat-card fade-up" style={{"--c":c}}>
              <div className="stat-lbl">{lbl}</div>
              <div className="stat-val">{val}</div>
              <div className="stat-sub">{sub}</div>
            </div>
          ))}
        </div>

        {/* ═══ TABS ═══ */}
        <div className="tab-bar">
          {TABS.map(([k,l])=>(
            <button key={k} className={`tab-btn${view===k?" active":""}`} onClick={()=>setView(k)}>{l}</button>
          ))}
        </div>

        {/* ══════════════════ OVERVIEW ══════════════════ */}
        {view==="overview" && (
          <div className="fade-up">
            <div className="wst-rationale">
              <div style={{fontSize:22,flexShrink:0}}>🔄</div>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:"#818cf8",marginBottom:6}}>WST replaces MCO — why this is the right call</div>
                <div style={{fontSize:11,color:"#2d3f55",lineHeight:1.95}}>
                  You already own <strong style={{color:"#22c55e"}}>SPGI</strong> and <strong style={{color:"#e879f9"}}>MSCI</strong> — both financial cycle-sensitive. Adding Moody's would create a third correlated position: if 2008 repeats, all three get hit simultaneously. <strong style={{color:"#818cf8"}}>West Pharmaceutical Services</strong> solves this completely. FDA-enforced switching costs mean pharma customers literally cannot leave without regulatory risk. Highest AI average of the five candidates (89.0). Morningstar independently rates it ★★★★★ at 0.72× fair value.
                </div>
              </div>
            </div>

            <div className="tbl-wrap">
              <div className="tbl-head">
                {[["","left"],["TICKER","left"],["COMPANY / MOAT","left"],["CATEGORY","left"],["ALLOC","center"],["P/FV","center"],["RISK","center"],["MSTAR","center"]].map(([h,a])=>(
                  <div key={h+a} className="tbl-hcell" style={{textAlign:a}}>{h}</div>
                ))}
              </div>
              {portfolio.map((s,i)=>(
                <div key={s.ticker} className={`tbl-row${s.ticker==="WST"?" wst-row":""}`} style={{background:i%2===0?"#04060e":"#050710"}} onClick={()=>{setSelected(i);setView("detail");}}>
                  <div style={{width:3,height:36,background:s.color,borderRadius:2,flexShrink:0}}/>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:13,color:s.color}}>{s.ticker}</span>
                    {s.ticker==="WST" && <span style={{fontSize:7,color:"#818cf8",background:"rgba(129,140,248,0.14)",padding:"1px 5px",borderRadius:3,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.05em"}}>NEW</span>}
                  </div>
                  <div>
                    <div style={{fontSize:12,color:"#8fa5be",marginBottom:2}}>{s.name}</div>
                    <div style={{fontSize:9.5,color:"#1e2d42",lineHeight:1.5}}>{s.moat}</div>
                  </div>
                  <div>
                    <span className="badge" style={{color:CATS[s.category],background:`${CATS[s.category]}12`}}>{s.category}</span>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:19,fontWeight:800,color:"#e8f0fa"}}>{s.alloc}%</div>
                    <div className="alloc-bar-bg"><div className="alloc-bar-fill" style={{width:`${(s.alloc/20)*100}%`,background:s.color}}/></div>
                  </div>
                  <div style={{textAlign:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,color:pfvC(s.pFV)}}>{s.pFV}</div>
                  <div style={{textAlign:"center"}}>
                    <span className="badge" style={{color:riskC(s.risk),background:`${riskC(s.risk)}14`}}>{s.risk}</span>
                  </div>
                  <div style={{textAlign:"center",fontSize:11.5,color:"#f59e0b"}}>{s.morningStar}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:8,fontSize:10,color:"#1a2535",textAlign:"right",fontFamily:"'JetBrains Mono',monospace"}}>Click any row for full thesis →</div>

            <div style={{marginTop:18,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
              {[
                ["🔬 Life Sciences",`${lifeSciPct}%`,"TMO · WST","#34d399","Two different moat mechanisms. TMO = instruments & consumables upstream. WST = FDA-enforced delivery components downstream. Complementary, not redundant. Both at significant discounts."],
                ["🏦 Financial Infra",`${finPct}%`,"SPGI · MSCI","#22c55e","Two is the right number. SPGI anchors with index licensing + ratings. MSCI anchors global capital flows. Adding MCO/Moody's would have created dangerous financial cycle concentration."],
                ["🌐 Everything Else","50%","RSP · MSFT · VRSN · V · BRK.B","#38bdf8","Five positions across tech infrastructure, internet monopoly, payments, capital allocation, and 500-stock diversification. No single theme dominates."],
              ].map(([lbl,pct,tickers,c,note])=>(
                <div key={lbl} className="sector-card" style={{border:`1px solid ${c}12`}}>
                  <div style={{fontSize:13,marginBottom:8}}>{lbl}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:24,fontWeight:800,color:c,marginBottom:3}}>{pct}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:c,opacity:0.55,marginBottom:10}}>{tickers}</div>
                  <div style={{fontSize:10,color:"#1e2d42",lineHeight:1.9}}>{note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════ ALLOCATION ══════════════════ */}
        {view==="allocation" && (
          <div className="fade-up" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
            <div className="card">
              <div className="card-title">Position Weights</div>
              <ResponsiveContainer width="100%" height={270}>
                <PieChart>
                  <Pie data={portfolio} cx="50%" cy="50%" outerRadius={112} innerRadius={52} dataKey="alloc" paddingAngle={2}>
                    {portfolio.map((s,i)=><Cell key={i} fill={s.color} stroke="#04060e" strokeWidth={2}/>)}
                  </Pie>
                  <Tooltip content={<PieTip/>}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:14,justifyContent:"center"}}>
                {portfolio.map(s=>(
                  <div key={s.ticker} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>{setSelected(portfolio.indexOf(s));setView("detail");}}>
                    <div className="legend-dot" style={{background:s.color}}/>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:s.color,fontWeight:700}}>{s.ticker}</span>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#1e2d42"}}>{s.alloc}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">Category Breakdown</div>
              {catData.map(d=>(
                <div key={d.cat} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,alignItems:"baseline"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:8,height:8,borderRadius:2,background:d.color,flexShrink:0}}/>
                      <span style={{fontSize:11.5,color:"#8fa5be"}}>{d.cat}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:d.color,opacity:0.6}}>{d.tickers}</span>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:800,color:d.color}}>{d.total}%</span>
                    </div>
                  </div>
                  <div style={{height:4,background:"#0a0f1e",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${d.total}%`,background:d.color,borderRadius:3,transition:"width 0.6s ease"}}/>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{gridColumn:"1/-1"}}>
              <div className="card-title">Why WST Won — 5-Candidate Final Comparison</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
                {[
                  {ticker:"WST",avg:89.0,gap:11,pfv:"0.72×",fit:"✅ Perfect",winner:true},
                  {ticker:"CLPBY",avg:87.0,gap:15,pfv:"0.49×",fit:"⚠️ ADR risk"},
                  {ticker:"A",avg:86.7,gap:17,pfv:"0.74×",fit:"❌ Redundant"},
                  {ticker:"ICE",avg:85.7,gap:15,pfv:"0.83×",fit:"⚠️ Fin. corr."},
                  {ticker:"SCHW",avg:84.3,gap:10,pfv:"0.86×",fit:"⚠️ Rate risk"},
                ].map(c=>(
                  <div key={c.ticker} className={`cand-card${c.winner?" winner":""}`}>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:15,color:c.winner?"#818cf8":"#2d3f55",marginBottom:10}}>{c.ticker}{c.winner?" ✓":""}</div>
                    <div style={{fontSize:10.5,color:"#2d3f55",lineHeight:2.1}}>
                      <div>Avg: <span style={{color:c.winner?"#22c55e":"#3d5070",fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>{c.avg}</span></div>
                      <div>Δ Gap: <span style={{color:gapC(c.gap),fontFamily:"'JetBrains Mono',monospace"}}>Δ{c.gap}</span></div>
                      <div>P/FV: <span style={{color:pfvC(c.pfv),fontFamily:"'JetBrains Mono',monospace"}}>{c.pfv}</span></div>
                      <div style={{color:c.fit.startsWith("✅")?"#22c55e":c.fit.startsWith("❌")?"#f87171":"#fbbf24",fontSize:9.5}}>{c.fit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════ AI RATINGS ══════════════════ */}
        {view==="ratings" && (
          <div className="fade-up">
            <div style={{display:"flex",gap:10,justifyContent:"flex-start",marginBottom:16,flexWrap:"wrap"}}>
              {Object.entries(AI_C).map(([name,color])=>(
                <div key={name} style={{display:"flex",alignItems:"center",gap:8,background:"#080c1a",border:`1px solid ${color}22`,borderRadius:7,padding:"6px 14px"}}>
                  <div style={{width:8,height:8,borderRadius:2,background:color}}/>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color,fontWeight:700}}>{name}</span>
                </div>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:8,background:"#080c1a",border:"1px solid rgba(245,158,11,0.22)",borderRadius:7,padding:"6px 14px"}}>
                <span style={{fontSize:10,color:"#f59e0b",fontWeight:600}}>Morningstar ★★★★★ = undervalued</span>
              </div>
            </div>

            <div className="tbl-wrap">
              <div className="ratings-header">
                {[["TICKER","left"],["COMPANY","left"],["ChatGPT","center"],["Claude","center"],["Grok","center"],["AVG","center"],["Δ GAP","center"],["MSTAR","center"]].map(([h,a])=>(
                  <div key={h} className="tbl-hcell" style={{textAlign:a}}>{h}</div>
                ))}
              </div>
              {portfolio.map((s,i)=>(
                <div key={s.ticker} className="ratings-row" style={{background:i%2===0?"#04060e":"#050710",cursor:"pointer"}} onClick={()=>{setSelected(i);setView("detail");}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:13,color:s.color}}>{s.ticker}</div>
                  <div style={{fontSize:11.5,color:"#6b83a0"}}>{s.name}</div>
                  {[s.chatgpt,s.claude,s.grok].map((v,j)=>(
                    <div key={j} style={{textAlign:"center"}}>
                      {v ? <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:15,color:Object.values(AI_C)[j]}}>{v}</span>
                         : <span style={{color:"#1e2d42",fontSize:10}}>N/A</span>}
                    </div>
                  ))}
                  <div style={{textAlign:"center"}}>
                    {s.avgRating
                      ? <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:16,color:s.avgRating>=90?"#22c55e":s.avgRating>=85?"#86efac":"#fbbf24"}}>{s.avgRating}</span>
                      : <span style={{color:"#1e2d42",fontSize:10}}>—</span>}
                  </div>
                  <div style={{textAlign:"center"}}>
                    {s.gap!==null
                      ? <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700,color:gapC(s.gap),background:`${gapC(s.gap)}15`,padding:"2px 7px",borderRadius:4}}>Δ{s.gap}</span>
                      : <span style={{color:"#1e2d42",fontSize:10}}>—</span>}
                  </div>
                  <div style={{textAlign:"center",fontSize:12,color:"#f59e0b"}}>{s.morningStar}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════ GROWTH ══════════════════ */}
        {view==="growth" && (
          <div className="fade-up">
            <div className="card">
              <div className="card-title">Hypothetical $100,000 · 20-Year Projection</div>
              <div style={{fontSize:10.5,color:"#1a2535",marginBottom:20}}>Illustrative only — not a guarantee. Portfolio 13.5%/yr · S&P 500 10.5%/yr · Cash 4.5%/yr assumed.</div>

              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
                {[
                  ["This Portfolio",`$${(100000*Math.pow(1.135,20)/1000000).toFixed(2)}M`,"13.5%/yr illustrative","#22c55e"],
                  ["S&P 500 cap-wt",`$${(100000*Math.pow(1.105,20)/1000).toFixed(0)}k`,"10.5%/yr historical avg","#38bdf8"],
                  ["Cash / Bonds",`$${(100000*Math.pow(1.045,20)/1000).toFixed(0)}k`,"4.5%/yr","#334155"],
                ].map(([lbl,val,sub,c])=>(
                  <div key={lbl} className="growth-stat-card" style={{border:`1px solid ${c}22`}}>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8.5,color:"#1a2535",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8}}>{lbl}</div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:26,fontWeight:800,color:c}}>{val}</div>
                    <div style={{fontSize:10,color:"#1a2535",marginTop:4}}>{sub}</div>
                  </div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={growthData} margin={{top:0,right:10,left:10,bottom:0}}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.14}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.08}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{fontSize:9,fill:"#2d3f55",fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false}/>
                  <YAxis tickFormatter={v=>v>=1000000?`$${(v/1000000).toFixed(1)}M`:`$${(v/1000).toFixed(0)}k`} tick={{fontSize:9,fill:"#2d3f55",fontFamily:"'JetBrains Mono',monospace"}} axisLine={false} tickLine={false} width={66}/>
                  <Tooltip content={<GrowthTip/>} cursor={{stroke:"#1e2d42",strokeDasharray:"4 4"}}/>
                  <Area type="monotone" dataKey="This Portfolio" stroke="#22c55e" strokeWidth={2} fill="url(#g1)"/>
                  <Area type="monotone" dataKey="S&P 500 (cap-wt)" stroke="#38bdf8" strokeWidth={1.5} fill="url(#g2)" strokeDasharray="5 3"/>
                  <Area type="monotone" dataKey="Cash" stroke="#2d3f55" strokeWidth={1} fill="none" strokeDasharray="3 3"/>
                </AreaChart>
              </ResponsiveContainer>

              <div style={{display:"flex",gap:22,marginTop:14,justifyContent:"center"}}>
                {[["#22c55e","This Portfolio (13.5%/yr)"],["#38bdf8","S&P 500 cap-wt (10.5%/yr)"],["#2d3f55","Cash (4.5%/yr)"]].map(([c,lbl])=>(
                  <div key={lbl} style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:20,height:2,background:c}}/>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#2d3f55"}}>{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="warn-box">
              ⚠ <strong>Important:</strong> Growth projections are purely illustrative. Past returns do not guarantee future results. Real returns will be higher or lower. This is not financial advice.
            </div>
          </div>
        )}

        {/* ══════════════════ DEEP DIVE ══════════════════ */}
        {view==="detail" && (
          <div className="fade-up">
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:22}}>
              {portfolio.map((s,i)=>(
                <button key={s.ticker} onClick={()=>setSelected(i)}
                  style={{
                    background:selected===i?`${s.color}10`:"transparent",
                    border:`1px solid ${selected===i?s.color:"#0d1525"}`,
                    color:selected===i?s.color:"#2d3f55",
                    borderRadius:6,padding:"6px 14px",
                    fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                    cursor:"pointer",fontWeight:700,transition:"all 0.15s",
                  }}>
                  {s.ticker}
                  {s.ticker==="WST" && <span style={{fontSize:7,marginLeft:4,color:"#818cf8"}}>★</span>}
                </button>
              ))}
            </div>

            <div className="detail-card fade-up" style={{"--dc":sel.color,border:`1px solid ${sel.color}18`}}>
              {/* Top */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,paddingBottom:20,borderBottom:"1px solid #0d1525"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10,flexWrap:"wrap"}}>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:800,color:sel.color,lineHeight:1}}>{sel.ticker}</span>
                    <span className="badge" style={{color:CATS[sel.category],background:`${CATS[sel.category]}12`}}>{sel.category}</span>
                    <span className="badge" style={{color:"#2d3f55",background:"#0a0f1e"}}>{sel.type}</span>
                    <span style={{fontSize:14,color:"#f59e0b"}}>{sel.morningStar}</span>
                  </div>
                  <div style={{fontSize:16,color:"#6b83a0",marginBottom:6}}>{sel.name}</div>
                  <div style={{fontSize:11.5,color:sel.color,fontStyle:"italic",lineHeight:1.6}}>{sel.moat}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,paddingLeft:20}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:48,fontWeight:800,color:sel.color,lineHeight:1}}>{sel.alloc}%</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#141e30",letterSpacing:"0.2em",marginTop:6,textTransform:"uppercase"}}>Portfolio Weight</div>
                </div>
              </div>

              {/* Metrics row */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
                {[
                  ["Price / Fair Value",sel.pFV,pfvC(sel.pFV)],
                  ["Risk Level",sel.risk,riskC(sel.risk)],
                  ["Hold Horizon",sel.horizon,"#38bdf8"],
                  [sel.type==="ETF"?"Expense Ratio":"AI Avg Rating",sel.type==="ETF"?sel.expense:(sel.avgRating??"N/A"),sel.type==="ETF"?"#38bdf8":"#e8f0fa"],
                ].map(([lbl,val,c])=>(
                  <div key={lbl} className="metric">
                    <div className="metric-lbl">{lbl}</div>
                    <div className="metric-val" style={{color:c}}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Why */}
              <div style={{marginBottom:24}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8.5,letterSpacing:"0.2em",color:"#141e30",marginBottom:12,textTransform:"uppercase"}}>Why It's In The Portfolio</div>
                <div style={{fontSize:13,color:"#4a6080",lineHeight:2,maxWidth:720}}>{sel.why}</div>
              </div>

              {/* Key Facts */}
              <div style={{marginBottom:sel.chatgpt||sel.claude||sel.grok?24:0}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8.5,letterSpacing:"0.2em",color:"#141e30",marginBottom:12,textTransform:"uppercase"}}>Key Facts</div>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  {sel.keyStats.map(stat=>(
                    <div key={stat} className="fact-pill">{stat}</div>
                  ))}
                </div>
              </div>

              {/* AI Ratings */}
              {(sel.chatgpt||sel.claude||sel.grok) && (
                <div style={{borderTop:"1px solid #0d1525",paddingTop:20}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8.5,letterSpacing:"0.2em",color:"#141e30",marginBottom:14,textTransform:"uppercase"}}>AI Ratings — ChatGPT · Claude · Grok</div>
                  <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                    {[["ChatGPT",sel.chatgpt,AI_C.ChatGPT],["Claude",sel.claude,AI_C.Claude],["Grok",sel.grok,AI_C.Grok]].map(([name,val,color])=>(
                      <div key={name} className="ai-box" style={{"--ac":color,minWidth:96}}>
                        <div className="ai-lbl" style={{color:`${color}88`}}>{name}</div>
                        <div className="ai-num" style={{color}}>{val??"—"}</div>
                      </div>
                    ))}
                    {sel.gap!==null && (
                      <div className="ai-box" style={{"--ac":gapC(sel.gap),minWidth:84}}>
                        <div className="ai-lbl" style={{color:"#141e30"}}>Δ Gap</div>
                        <div className="ai-num" style={{color:gapC(sel.gap)}}>Δ{sel.gap}</div>
                      </div>
                    )}
                    {sel.avgRating && (
                      <div className="ai-box" style={{"--ac":"#e8f0fa",minWidth:84}}>
                        <div className="ai-lbl" style={{color:"#141e30"}}>Avg</div>
                        <div className="ai-num" style={{color:"#e8f0fa"}}>{sel.avgRating}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ FOOTER ═══ */}
        <div className="footer">
          <span style={{color:"#1e2d42"}}>Built from 3-AI consensus (ChatGPT · Claude · Grok) + Morningstar 5-star confirmation across 25+ wide-moat equities.</span>
          <span style={{color:"#f87171",fontFamily:"'JetBrains Mono',monospace",fontSize:9.5}}>⚠ Not financial advice. Consult a licensed advisor before investing.</span>
        </div>
      </div>
    </div>
  );
}
