import React, { useState, useEffect, useRef } from "react";
import { RefreshCw, Plus, Trash2 } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Setiap mesin pengujian dibungkus dalam namespace (IIFE) tersendiri supaya
// nama-nama variabel/komponen yang sama di antar file (mis. PROVINSI,
// ProvinsiSearch, rp, Rp) tidak saling bentrok satu sama lain.
// ════════════════════════════════════════════════════════════════════════════

const NS_SPDPenguji = (() => {
// ── DATA ─────────────────────────────────────────────────────────────────────

const PROVINSI = [
  { n: "Aceh", h: [5109000,3526000,1578000,770000], u: 360000 },
  { n: "Sumatera Utara", h: [4960000,2195000,1188000,699000], u: 370000 },
  { n: "Bengkulu", h: [2140000,1628000,1546000,692000], u: 380000 },
  { n: "Jambi", h: [5004000,4102000,1252000,580000], u: 370000 },
  { n: "Riau", h: [3820000,3119000,1650000,852000], u: 370000 },
  { n: "Sumatera Barat", h: [5603000,3373000,1353000,701000], u: 380000 },
  { n: "Sumatera Selatan", h: [6298000,3134000,1966000,861000], u: 380000 },
  { n: "Lampung", h: [4806000,2663000,1539000,621000], u: 380000 },
  { n: "Kepulauan Bangka Belitung", h: [4424000,2838000,1957000,724000], u: 410000 },
  { n: "Kepulauan Riau", h: [6177000,2481000,1388000,792000], u: 370000 },
  { n: "Banten", h: [5725000,2373000,1301000,775000], u: 370000 },
  { n: "Jawa Barat", h: [5812000,2755000,1366000,735000], u: 430000 },
  { n: "DKI Jakarta", h: [9331000,2084000,1062000,730000], u: 530000 },
  { n: "Jawa Tengah", h: [6129000,2138000,1286000,810000], u: 370000 },
  { n: "Jawa Timur", h: [4449000,2007000,1234000,814000], u: 410000 },
  { n: "DI Yogyakarta", h: [5100000,2695000,1600000,845000], u: 420000 },
  { n: "Bali", h: [7328000,2433000,1754000,1138000], u: 480000 },
  { n: "Nusa Tenggara Barat", h: [4682000,2648000,1418000,907000], u: 440000 },
  { n: "Nusa Tenggara Timur", h: [4013000,2283000,1450000,737000], u: 430000 },
  { n: "Kalimantan Barat", h: [2654000,1923000,1125000,576000], u: 380000 },
  { n: "Kalimantan Selatan", h: [4797000,3316000,1500000,746000], u: 380000 },
  { n: "Kalimantan Tengah", h: [4901000,3391000,1189000,706000], u: 360000 },
  { n: "Kalimantan Timur", h: [4000000,2342000,1507000,804000], u: 430000 },
  { n: "Kalimantan Utara", h: [4000000,2854000,1507000,904000], u: 430000 },
  { n: "Gorontalo", h: [4168000,3107000,1606000,955000], u: 370000 },
  { n: "Sulawesi Selatan", h: [4820000,1938000,1423000,745000], u: 430000 },
  { n: "Sulawesi Tenggara", h: [3089000,2755000,1297000,786000], u: 380000 },
  { n: "Sulawesi Tengah", h: [2309000,2166000,1679000,951000], u: 370000 },
  { n: "Sulawesi Utara", h: [5264000,2290000,1270000,978000], u: 370000 },
  { n: "Sulawesi Barat", h: [4076000,3098000,1344000,704000], u: 410000 },
  { n: "Maluku", h: [3467000,3240000,1059000,667000], u: 380000 },
  { n: "Maluku Utara", h: [4612000,3843000,1160000,654000], u: 430000 },
  { n: "Papua", h: [3859000,3318000,2521000,1038000], u: 580000 },
  { n: "Papua Barat", h: [3872000,3575000,2056000,967000], u: 480000 },
  { n: "Papua Selatan", h: [5673000,4877000,3706000,1526000], u: 580000 },
  { n: "Papua Tengah", h: [3859000,3318000,2521000,1038000], u: 580000 },
  { n: "Papua Pegunungan", h: [5711000,4911000,3731000,1536000], u: 580000 },
  { n: "Papua Barat Daya", h: [3872000,3575000,2056000,967000], u: 480000 },
];

const TRANSPOR_TABLE = {
  "Aceh":123000,"Sumatera Utara":278000,"Bengkulu":106000,"Jambi":133000,
  "Riau":99000,"Sumatera Barat":171000,"Sumatera Selatan":162000,"Lampung":162000,
  "Kepulauan Bangka Belitung":94000,"Kepulauan Riau":159000,"Banten":300000,
  "Jawa Barat":180000,"DKI Jakarta":250000,"Jawa Tengah":105000,"Jawa Timur":225000,
  "DI Yogyakarta":258000,"Bali":219000,"Nusa Tenggara Barat":224000,
  "Nusa Tenggara Timur":105000,"Kalimantan Barat":165000,"Kalimantan Selatan":174000,
  "Kalimantan Tengah":130000,"Kalimantan Timur":300000,"Kalimantan Utara":211000,
  "Gorontalo":256000,"Sulawesi Selatan":181000,"Sulawesi Tenggara":154000,
  "Sulawesi Tengah":149000,"Sulawesi Utara":134000,"Sulawesi Barat":283000,
  "Maluku":279000,"Maluku Utara":208000,"Papua":462000,"Papua Barat":228000,
  "Papua Selatan":null,"Papua Tengah":null,"Papua Pegunungan":null,"Papua Barat Daya":null,
};

const TAKSI_SEKITAR = {
  "Kota Bekasi":256000,"Kab. Bekasi":256000,"Kab. Bogor":270000,"Kota Bogor":270000,
  "Kota Depok":248000,"Kota Tangerang":258000,"Kota Tangerang Selatan":258000,
  "Kab. Tangerang":279000,"Kepulauan Seribu":386000,
};

const REPRESENTASI = { pn:250000, es1:200000, es2:150000 };
const TARIF_BENSIN  = 1300; // Rp 13.000 per 10 km = Rp 1.300/km

const KELOMPOK_LABEL = [
  "","Kelompok 1 – Pejabat Negara / Wamen / Eselon I",
  "Kelompok 2 – Eselon II","Kelompok 3 – Eselon III / Gol. IV",
  "Kelompok 4 – Eselon IV / Gol. I, II, III",
];
const KELOMPOK_COLOR = [
  "",{bg:"#EEEDFE",color:"#3C3489"},{bg:"#E1F5EE",color:"#085041"},
  {bg:"#E6F1FB",color:"#0C447C"},{bg:"#F1EFE8",color:"#444441"},
];

const DKI_JAKARTA = PROVINSI.find(p=>p.n==="DKI Jakarta");

// ── HELPERS ───────────────────────────────────────────────────────────────────

const rp       = (n) => n.toLocaleString("id-ID");
const Rp       = (n) => "Rp " + rp(n);
const parseCur = (v) => parseInt((v||"").replace(/\D/g,""))||0;
const fmtCur   = (v) => { const r=v.replace(/\D/g,""); return r?parseInt(r).toLocaleString("id-ID"):""; };

function getKelompok(eselon, golongan) {
  if (!eselon) return null;
  if (eselon==="pn"||eselon==="es1") return 1;
  if (eselon==="es2") return 2;
  if (eselon==="es3") return 3;
  if (!golongan) return null;
  if (golongan==="4") return 3;
  return 4;
}
const isAtasEs1 = (e) => e==="pn"||e==="es1";

// ── STYLES ────────────────────────────────────────────────────────────────────

const s = {
  card:     { background:"#fff", border:"0.5px solid rgba(0,0,0,0.1)", borderRadius:12, padding:"1.25rem", marginBottom:".875rem" },
  secTitle: { fontSize:11, fontWeight:500, color:"#666", letterSpacing:".07em", textTransform:"uppercase", margin:"0 0 1rem", display:"flex", alignItems:"center", gap:6 },
  subTitle: { fontSize:10, fontWeight:500, color:"#888", letterSpacing:".07em", textTransform:"uppercase", margin:"0 0 10px" },
  label:    { fontSize:12, color:"#555", fontWeight:500, marginBottom:4, display:"block" },
  fi:       { fontSize:11, color:"#555", borderLeft:"2px solid #1D9E75", padding:"4px 8px", borderRadius:"0 4px 4px 0", lineHeight:1.5, marginTop:2, background:"#f5f5f3" },
  fiWarn:   { fontSize:11, color:"#854F0B", borderLeft:"2px solid #EF9F27", padding:"4px 8px", borderRadius:"0 4px 4px 0", lineHeight:1.5, marginTop:2, background:"#FFFBF2" },
  fiInfo:   { fontSize:11, color:"#0C447C", borderLeft:"2px solid #85B7EB", padding:"4px 8px", borderRadius:"0 4px 4px 0", lineHeight:1.5, marginTop:2, background:"#E6F1FB" },
  input:    { width:"100%", padding:"7px 10px", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, fontSize:13, background:"white", color:"inherit", outline:"none" },
  inputRp:  { width:"100%", padding:"7px 10px 7px 32px", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, fontSize:13, background:"white", color:"inherit", outline:"none" },
  select:   { width:"100%", padding:"7px 10px", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, fontSize:13, background:"white", color:"inherit", outline:"none" },
  readOnly: { width:"100%", padding:"7px 10px", border:"0.5px solid rgba(0,0,0,0.12)", borderRadius:8, fontSize:13, background:"#f5f5f3", color:"#888", outline:"none" },
  divider:  { border:"none", borderTop:"0.5px solid rgba(0,0,0,0.1)", margin:"12px 0" },
  rutePill: { fontSize:11, fontWeight:600, color:"#0F6E56", background:"#E1F5EE", border:"1px solid #9FE1CB", borderRadius:20, padding:"2px 10px", whiteSpace:"nowrap" },
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

// Menebalkan seluruh angka "Rp ..." di dalam teks info/warn agar lebih mudah dipindai mata
function highlightRp(text) {
  if (typeof text !== "string") return text;
  const parts = text.split(/(Rp\s?[\d.]+(?:\/[a-zA-Z]+)?)/g);
  return parts.map((part, i) =>
    /^Rp\s?[\d.]+/.test(part)
      ? <strong key={i} style={{ fontWeight:700 }}>{part}</strong>
      : part
  );
}

function Field({ label, info, warn, infoBlue, right, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      {(label || right) && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6 }}>
          {label && <label style={s.label}>{label}</label>}
          {right}
        </div>
      )}
      {children}
      {info     && <div style={s.fi}>{highlightRp(info)}</div>}
      {warn     && <div style={s.fiWarn}>{highlightRp(warn)}</div>}
      {infoBlue && <div style={s.fiInfo}>{highlightRp(infoBlue)}</div>}
    </div>
  );
}

// Simple currency input — untuk hotel (tanpa aritmatika)
function CurrencyInput({ value, onChange, placeholder="0" }) {
  return (
    <div style={{ position:"relative" }}>
      <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"#888", pointerEvents:"none", zIndex:1 }}>Rp</span>
      <input type="text" value={value} onChange={(e)=>onChange(fmtCur(e.target.value))} placeholder={placeholder} style={s.inputRp}/>
    </div>
  );
}

// Kalkulator inline — aritmatika, tanpa eval/Function
function CalcInput({ value, onChange, placeholder="0", prefix="Rp", onKeyDown, inputRef: externalRef }) {
  const [editing, setEditing] = useState(false);
  const [raw,     setRaw]     = useState("");
  const inputRef = useRef(null);
  const hasPrefix = prefix.length > 0;

  const setRefs = (el) => {
    inputRef.current = el;
    if (externalRef) {
      if (typeof externalRef === "function") externalRef(el);
      else externalRef.current = el;
    }
  };

  const safeEval = (expr) => {
    const s = expr.replace(/\s/g,"").replace(/\./g,"").replace(/,/g,"");
    if (!s || !/^[0-9+\-*/().]+$/.test(s)) return parseCur(value) || 0;
    let i = 0;
    const num = () => { let n=""; while(i<s.length&&/[0-9]/.test(s[i])) n+=s[i++]; return n.length?parseInt(n,10):NaN; };
    const prim = () => {
      if(s[i]==="("){ i++; const v=addSub(); if(s[i]===")") i++; return v; }
      if(s[i]==="-"){ i++; return -prim(); }
      if(s[i]==="+"){ i++; return +prim(); }
      return num();
    };
    const mulDiv = () => { let v=prim(); while(i<s.length&&(s[i]==="*"||s[i]==="/")){const op=s[i++];const r=prim();v=op==="*"?v*r:v/r;} return v; };
    const addSub = () => { let v=mulDiv(); while(i<s.length&&(s[i]==="+"||s[i]==="-")){const op=s[i++];const r=mulDiv();v=op==="+"?v+r:v-r;} return v; };
    try { const res=addSub(); return isFinite(res)&&res>=0?Math.round(res):0; }
    catch { return parseCur(value)||0; }
  };

  const evalInPlace = (e) => {
    if(e) e.preventDefault();
    const n=safeEval(raw);
    const result=n>0?String(n):"";
    setRaw(result);
    onChange(n>0?n.toLocaleString("id-ID"):"");
    requestAnimationFrame(()=>{ if(inputRef.current) inputRef.current.setSelectionRange(result.length,result.length); });
  };

  const commitAndExit = () => {
    const n=safeEval(raw);
    onChange(n>0?n.toLocaleString("id-ID"):"");
    setEditing(false);
  };

  const handleFocus = () => {
    const n=parseCur(value);
    const rawStr=n>0?String(n):"";
    setRaw(rawStr); setEditing(true);
    requestAnimationFrame(()=>{ if(inputRef.current) inputRef.current.setSelectionRange(rawStr.length,rawStr.length); });
  };

  const hasOp = /[+\-*/]/.test(raw);

  return (
    <div style={{ position:"relative" }}>
      {hasPrefix && <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"#888", pointerEvents:"none", zIndex:1 }}>{prefix}</span>}
      <input ref={setRefs} type="text"
        value={editing?raw:value}
        onChange={e=>setRaw(e.target.value)}
        onFocus={handleFocus}
        onBlur={commitAndExit}
        onKeyDown={e=>{ if(e.key==="Enter") evalInPlace(e); if(onKeyDown) onKeyDown(e); }}
        placeholder={placeholder}
        style={{ ...s.inputRp, paddingLeft:hasPrefix?32:10, paddingRight:hasOp?38:10, fontFamily:editing&&hasOp?"monospace":"inherit", fontSize:editing&&hasOp?12:13 }}
        autoComplete="off"
      />
      {editing&&hasOp&&(
        <button onMouseDown={evalInPlace} style={{ position:"absolute", right:6, top:"50%", transform:"translateY(-50%)", background:"#0F6E56", color:"white", border:"none", borderRadius:4, padding:"0 8px", fontSize:12, fontWeight:500, cursor:"pointer", height:22, lineHeight:"22px" }}>
          =
        </button>
      )}
    </div>
  );
}

// ── DAFTAR NOMINAL (multi-baris, tanpa pengali) ──────────────────────────────
// Dipakai untuk Biaya lain-lain, Klaim bensin, dan Tol — semuanya bisa diisi
// berkali-kali dengan alur keyboard-only: Tab di baris terakhir otomatis
// membuat baris baru & pindah fokus ke situ. Tombol hapus dilewati dari Tab.

let amountIdCounter = 1;
const newAmountRow = () => ({ id: amountIdCounter++, value: "" });

function useAmountList() {
  const [items, setItems] = useState(() => [newAmountRow()]);
  const refs = useRef({});
  const [focusId, setFocusId] = useState(null);

  useEffect(() => {
    if (focusId != null) {
      const el = refs.current[focusId];
      if (el) el.focus();
      setFocusId(null);
    }
  }, [items, focusId]);

  const addRow = () => { const r=newAmountRow(); setItems(p=>[...p,r]); setFocusId(r.id); return r; };
  const removeRow = (id) => setItems(p => p.length>1 ? p.filter(r=>r.id!==id) : p);
  const updateRow = (id, val) => setItems(p => p.map(r => r.id===id ? {...r, value:val} : r));
  const reset = () => setItems([newAmountRow()]);

  const handleKeyDown = (e, rowId) => {
    if (e.key==="Tab" && !e.shiftKey) {
      const isLast = items[items.length-1].id === rowId;
      if (isLast) { e.preventDefault(); addRow(); }
    }
  };

  const total = items.reduce((sum,r) => sum + parseCur(r.value), 0);

  return { items, total, refs, addRow, removeRow, updateRow, handleKeyDown, reset };
}

function AmountList({ list, placeholder="0" }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      {list.items.map(row => (
        <div key={row.id} style={{ display:"flex", gap:6, alignItems:"center" }}>
          <div style={{ flex:1 }}>
            <CalcInput
              value={row.value}
              onChange={v=>list.updateRow(row.id, v)}
              onKeyDown={e=>list.handleKeyDown(e, row.id)}
              inputRef={el=>{ list.refs.current[row.id]=el; }}
              placeholder={placeholder}
            />
          </div>
          <button onClick={()=>list.removeRow(row.id)} disabled={list.items.length<=1} tabIndex={-1}
            style={{ border:"none", background:"transparent", cursor:list.items.length<=1?"not-allowed":"pointer", color:list.items.length<=1?"#ddd":"#B91C1C", padding:4, display:"flex", flexShrink:0 }}>
            <Trash2 size={15} strokeWidth={1.75}/>
          </button>
        </div>
      ))}
      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
        <button onClick={()=>list.addRow()} tabIndex={-1} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, fontWeight:500, color:"#0F6E56", background:"#E1F5EE", border:"1px solid #9FE1CB", borderRadius:6, padding:"3px 10px", cursor:"pointer", width:"fit-content" }}>
          <Plus size={12} strokeWidth={2}/> Tambah
        </button>
        <span style={{ fontSize:10, color:"#aaa" }}>atau tekan Tab di kotak terakhir</span>
      </div>
      {list.items.length>1 && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"#E1F5EE", border:"1px solid #9FE1CB", borderRadius:6, padding:"6px 10px", marginTop:2 }}>
          <span style={{ fontSize:11.5, fontWeight:600, color:"#0F6E56" }}>Total</span>
          <span style={{ fontSize:14, fontWeight:700, color:"#085041" }}>{Rp(list.total)}</span>
        </div>
      )}
    </div>
  );
}

function Counter({ value, onChange, min=0, max }) {
  const atMax = max!=null && value>=max;
  return (
    <div style={{ display:"flex", alignItems:"center", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, overflow:"hidden", userSelect:"none", height:34, width:"fit-content" }}>
      <button onClick={()=>onChange(Math.max(min,value-1))}
        style={{ width:32, border:"none", background:"transparent", cursor:value<=min?"not-allowed":"pointer", fontSize:18, color:value<=min?"#ccc":"#555", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        −
      </button>
      <span style={{ minWidth:36, textAlign:"center", fontSize:14, fontWeight:500, borderLeft:"0.5px solid rgba(0,0,0,0.1)", borderRight:"0.5px solid rgba(0,0,0,0.1)", lineHeight:"34px" }}>
        {value}
      </span>
      <button onClick={()=>{ if(!atMax) onChange(value+1); }} disabled={atMax}
        style={{ width:32, border:"none", background:"transparent", cursor:atMax?"not-allowed":"pointer", fontSize:18, color:atMax?"#ccc":"#555", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        +
      </button>
    </div>
  );
}

function Row2({ children, mb=12 }) { return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:mb }}>{children}</div>; }
function Row1({ children, hidden, mb=12 }) { if(hidden) return null; return <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:12, marginBottom:mb }}>{children}</div>; }

function KelompokBadge({ k }) {
  if(!k) return null;
  const c=KELOMPOK_COLOR[k];
  return <span style={{ display:"inline-block", padding:"3px 12px", borderRadius:20, fontSize:12, fontWeight:500, background:c.bg, color:c.color }}>{KELOMPOK_LABEL[k]}</span>;
}

function LumpsumToggle({ checked, onChange }) {
  return (
    <label style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:checked?"#0F6E56":"#888", fontWeight:checked?500:400, cursor:"pointer", userSelect:"none" }}>
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} style={{ width:13, height:13, cursor:"pointer", accentColor:"#0F6E56" }}/>
      Lumpsum
    </label>
  );
}

// Radio (OR, bukan AND) — hotel satu harga ATAU beda harga per malam, tidak bisa keduanya
function HotelModeRadio({ value, onChange }) {
  const options = [
    { v:"sama", label:"Hotel satu harga", desc:"Harga sama tiap malam" },
    { v:"beda", label:"Hotel beda harga", desc:"Harga beda-beda per malam" },
  ];
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      {options.map(opt => {
        const active = value===opt.v;
        return (
          <label key={opt.v} style={{
            display:"flex", alignItems:"center", gap:8, padding:"7px 12px", minWidth:150,
            border: active ? "1.5px solid #0F6E56" : "0.5px solid rgba(0,0,0,0.18)",
            background: active ? "#E1F5EE" : "#fff",
            borderRadius:8, cursor:"pointer",
          }}>
            <input type="radio" name="hotelMode" value={opt.v} checked={active} onChange={()=>onChange(opt.v)}
              style={{ width:14, height:14, cursor:"pointer", accentColor:"#0F6E56", flexShrink:0 }}/>
            <div>
              <div style={{ fontSize:12.5, fontWeight:500, color:active?"#085041":"#333" }}>{opt.label}</div>
              <div style={{ fontSize:10.5, color:"#888" }}>{opt.desc}</div>
            </div>
          </label>
        );
      })}
    </div>
  );
}

function TransportToggle({ label, sub, active, onClick }) {
  return (
    <button onClick={onClick} style={{ border:active?"1px solid #0F6E56":"0.5px solid rgba(0,0,0,0.15)", background:active?"#E1F5EE":"white", borderRadius:8, padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, textAlign:"left", width:"100%", color:active?"#085041":"#555" }}>
      <span style={{ fontSize:16, lineHeight:1, flexShrink:0 }}>{active?"☑":"☐"}</span>
      <div>
        <div style={{ fontWeight:500, fontSize:13 }}>{label}</div>
        {sub && <div style={{ fontSize:11, opacity:0.75, marginTop:1 }}>{sub}</div>}
      </div>
    </button>
  );
}

// Baris subtotal kecil, rata kanan — dipakai untuk Total Tiket PP, Total Taksi Asal/Tujuan, dst.
function MiniTotal({ label, value, bg="#f5f5f3", color="#1a1a1a", border="rgba(0,0,0,0.07)" }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8, padding:"7px 12px", background:bg, border:`0.5px solid ${border}`, borderRadius:8 }}>
      <span style={{ fontSize:11.5, fontWeight:500, color:"#666" }}>{label}</span>
      <span style={{ fontSize:14, fontWeight:700, color }}>{Rp(value)}</span>
    </div>
  );
}

function ProvinsiSearch({ value, onSelect, placeholder="Ketik nama provinsi…" }) {
  const [query,setQuery]=useState(value?.n||"");
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  const matches=query.trim()?PROVINSI.filter(p=>p.n.toLowerCase().includes(query.toLowerCase())):[];
  useEffect(()=>{ if(value) setQuery(value.n); else setQuery(""); },[value]);
  useEffect(()=>{
    const h=(e)=>{ if(ref.current&&!ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown",h); return()=>document.removeEventListener("mousedown",h);
  },[]);
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <input type="text" value={query}
        onChange={e=>{ setQuery(e.target.value); setOpen(true); if(!e.target.value) onSelect(null); }}
        onFocus={()=>query&&setOpen(true)}
        placeholder={placeholder} style={s.input} autoComplete="off"/>
      {open&&matches.length>0&&(
        <div style={{ position:"absolute", top:"calc(100% + 2px)", left:0, right:0, background:"white", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, zIndex:99, maxHeight:180, overflowY:"auto", boxShadow:"0 2px 8px rgba(0,0,0,0.07)" }}>
          {matches.map(p=>(
            <div key={p.n} onMouseDown={()=>{ setQuery(p.n); setOpen(false); onSelect(p); }}
              style={{ padding:"7px 12px", cursor:"pointer", fontSize:13 }}
              onMouseEnter={e=>e.currentTarget.style.background="#f5f5f3"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
            >{p.n}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── RESULTS TABLE ─────────────────────────────────────────────────────────────

function StatusCell({ klaim, disetujui }) {
  const ok=klaim<=disetujui;
  return (
    <span style={{ fontSize:11.5, fontWeight:ok?400:500, color:ok?"#0F6E56":"#993C1D", lineHeight:1.4 }}>
      {ok?"✓ Sesuai":(<>⚠ Melebihi<br/><span style={{ fontSize:10.5 }}>−{Rp(klaim-disetujui)}</span></>)}
    </span>
  );
}

function ResultsTable({ rows }) {
  const totK=rows.reduce((s,r)=>s+r.k,0),totD=rows.reduce((s,r)=>s+r.d,0);
  const th={ background:"#f5f5f3", padding:"8px 10px", textAlign:"left", fontWeight:500, fontSize:11, color:"#666", borderBottom:"0.5px solid rgba(0,0,0,0.1)" };
  const td=(over)=>({ padding:"8px 10px", borderBottom:"0.5px solid rgba(0,0,0,0.08)", verticalAlign:"middle", background:over?"#FEF2F0":"transparent", fontSize:12.5 });
  const tf={ padding:"9px 10px", fontWeight:500, fontSize:12.5, background:"#f5f5f3", borderTop:"1px solid rgba(0,0,0,0.12)" };
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead><tr>
          <th style={{...th,width:"19%"}}>Komponen</th>
          <th style={{...th,width:"31%"}}>Ketentuan / SBM</th>
          <th style={{...th,width:"17%",textAlign:"right"}}>Diklaim</th>
          <th style={{...th,width:"17%",textAlign:"right"}}>Disetujui</th>
          <th style={{...th,width:"16%",textAlign:"center"}}>Status</th>
        </tr></thead>
        <tbody>
          {rows.map((r,i)=>{
            const over=r.k>r.d;
            return (
              <tr key={i}>
                <td style={td(over)}>
                  <span style={{ fontWeight:500 }}>{r.l}</span>
                  {r.auto&&<span style={{ fontSize:10, color:"#aaa", marginLeft:4 }}>(otomatis)</span>}
                  {r.lumpsum&&<span style={{ fontSize:10, color:"#085041", marginLeft:4, background:"#E1F5EE", padding:"1px 6px", borderRadius:10 }}>lumpsum</span>}
                  {r.pribadi&&<span style={{ fontSize:10, color:"#0C447C", marginLeft:4, background:"#E6F1FB", padding:"1px 6px", borderRadius:10 }}>kend. pribadi</span>}
                </td>
                <td style={{...td(over),color:"#666",fontSize:11.5}}>{r.ket}</td>
                <td style={{...td(over),textAlign:"right"}}>{Rp(r.k)}</td>
                <td style={{...td(over),textAlign:"right"}}>{Rp(r.d)}</td>
                <td style={{...td(over),textAlign:"center"}}><StatusCell klaim={r.k} disetujui={r.d}/></td>
              </tr>
            );
          })}
        </tbody>
        <tfoot><tr>
          <td colSpan={2} style={tf}>Total keseluruhan</td>
          <td style={{...tf,textAlign:"right"}}>{Rp(totK)}</td>
          <td style={{...tf,textAlign:"right"}}>{Rp(totD)}</td>
          <td style={{...tf,textAlign:"center"}}><StatusCell klaim={totK} disetujui={totD}/></td>
        </tr></tfoot>
      </table>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

function SPDPenguji() {
  // ── Identitas
  const [eselon,   setEselon]   = useState("");
  const [golongan, setGolongan] = useState("");
  const [provAsal,   setProvAsal]   = useState(DKI_JAKARTA);
  const [provinsi, setProvinsi] = useState(null);
  const [hari,     setHari]     = useState("");
  const [pct,      setPct]      = useState("80");
  const [customPctValue, setCustomPctValue] = useState("");
  const [customUangHarian, setCustomUangHarian] = useState("");

  // ── Hotel: "sama" = satu harga tiap malam (default), "beda" = harga per malam beda-beda
  const [hotelMode, setHotelMode] = useState("sama");
  const [hotelHargaSama, setHotelHargaSama] = useState("");
  const [hotelNights, setHotelNights] = useState([""]);
  const [malamCount,  setMalamCount]  = useState(1);
  const malamManual = useRef(false);

  // ── Transport mode
  const [useUmum,    setUseUmum]    = useState(true);
  const [usePribadi, setUsePribadi] = useState(false);

  // ── Transportasi Umum
  const [tiketBrkt,     setTiketBrkt]     = useState("");
  const [tiketPlng,     setTiketPlng]     = useState("");

  // Kondisi taksi — hanya relevan & tampil jika provinsi terkait = DKI Jakarta
  const [kondisiTaksiAsal,   setKondisiTaksiAsal]   = useState("dlm");
  const [kotaSekitarAsal,    setKotaSekitarAsal]    = useState("");
  const [kondisiTaksiTujuan, setKondisiTaksiTujuan] = useState("dlm");
  const [kotaSekitarTujuan,  setKotaSekitarTujuan]  = useState("");

  // Lumpsum per-leg — independen antar berangkat/pulang, asal/tujuan
  const [lumpAsalBrkt,   setLumpAsalBrkt]   = useState(false);
  const [lumpAsalPlng,   setLumpAsalPlng]   = useState(false);
  const [lumpTujuanBrkt, setLumpTujuanBrkt] = useState(false);
  const [lumpTujuanPlng, setLumpTujuanPlng] = useState(false);

  const [taksiAsalBrkt, setTaksiAsalBrkt] = useState("");
  const [taksiAsalPlng, setTaksiAsalPlng] = useState("");
  const [taksiTujuanBrkt,setTaksiTujuanBrkt]=useState("");
  const [taksiTujuanPlng,setTaksiTujuanPlng]=useState("");
  const biayaLainList = useAmountList();

  // ── Kendaraan Pribadi
  const [jarakBrkt,  setJarakBrkt]  = useState("");
  const [jarakPlng,  setJarakPlng]  = useState("");
  const bensinBrktList = useAmountList();
  const bensinPlngList = useAmountList();
  const tolBrktList    = useAmountList();
  const tolPlngList    = useAmountList();

  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState("");
  const hasilRef = useRef(null);

  // ── Computed
  const kelompok = getKelompok(eselon, golongan);
  const hariInt  = parseInt(hari)||0;
  const sbmHotel = provinsi&&kelompok ? provinsi.h[kelompok-1] : null;
  const asalIsJakarta   = provAsal?.n === "DKI Jakarta";
  const tujuanIsJakarta = provinsi?.n === "DKI Jakarta";

  // Sync malamCount dengan hari ST (kecuali user sudah override manual) — dan selalu di-cap maks hariInt
  useEffect(()=>{
    if(hariInt>0) {
      if(!malamManual.current) setMalamCount(hariInt);
      else setMalamCount(mc => Math.min(mc, hariInt));
    }
  },[hariInt]);

  const handleMalamChange = (n) => { malamManual.current=true; setMalamCount(n); };

  // Sync jumlah baris biaya hotel per malam mengikuti malamCount
  useEffect(()=>{
    setHotelNights(prev => {
      if (prev.length === malamCount) return prev;
      if (prev.length < malamCount) return [...prev, ...Array(malamCount-prev.length).fill("")];
      return prev.slice(0, malamCount);
    });
  },[malamCount]);

  const updateHotelNight = (i, val) => setHotelNights(prev => prev.map((v,idx)=>idx===i?val:v));

  // Lumpsum ceilings (taksi)
  const rateAsal   = provAsal  ? TRANSPOR_TABLE[provAsal.n]  : null;
  const rateTujuan = provinsi  ? TRANSPOR_TABLE[provinsi.n]  : null;
  const ceilAsal   = rateAsal   ? Math.round(rateAsal*0.8)   : null;
  const ceilTujuan = rateTujuan ? Math.round(rateTujuan*0.8) : null;

  // Bensin ceilings
  const jarakBrktInt = parseInt((jarakBrkt||"").replace(/\D/g,""))||0;
  const jarakPlngInt = parseInt((jarakPlng||"").replace(/\D/g,""))||0;
  const ceilBensinBrkt = jarakBrktInt * TARIF_BENSIN;
  const ceilBensinPlng = jarakPlngInt * TARIF_BENSIN;

  const transportInfo = isAtasEs1(eselon)
    ? "Pesawat boleh kelas bisnis / kereta boleh kelas spesial."
    : eselon ? "Pesawat kelas ekonomi / kereta maks kelas eksekutif." : "Pilih jabatan untuk melihat ketentuan kelas.";

  // Uang harian — dasar perhitungan (dipakai di preview total & di hasil validasi)
  const uphBase = (() => {
    if(!provinsi) return 0;
    if(pct==="customRp") return parseCur(customUangHarian);
    if(pct==="customPct") return Math.round(provinsi.u*((parseFloat(customPctValue)||0)/100));
    return Math.round(provinsi.u*(parseInt(pct)/100));
  })();
  const uangHarianAmt = hariInt>0 ? uphBase*hariInt : 0;

  // Representasi — tarif tetap per hari, hanya untuk eselon tertentu
  const representasiPH  = REPRESENTASI[eselon]||0;
  const representasiAmt = hariInt>0 ? representasiPH*hariInt : 0;

  // Total per-bagian (nilai mentah yang diklaim, sebelum divalidasi ke SBM)
  const totalTiketPP     = parseCur(tiketBrkt)+parseCur(tiketPlng);
  const totalTaksiAsal   = parseCur(taksiAsalBrkt)+parseCur(taksiAsalPlng);
  const totalTaksiTujuan = parseCur(taksiTujuanBrkt)+parseCur(taksiTujuanPlng);
  const totalTransportUmum = totalTiketPP+totalTaksiAsal+totalTaksiTujuan+biayaLainList.total;

  const totalKendaraanBrkt = bensinBrktList.total+tolBrktList.total;
  const totalKendaraanPlng = bensinPlngList.total+tolPlngList.total;
  const totalKendaraanPribadi = totalKendaraanBrkt+totalKendaraanPlng;

  // Total hotel — tergantung mode: "sama" (satu harga × jumlah malam) atau "beda" (per malam, dicek sendiri-sendiri)
  const hargaSamaAmt = parseCur(hotelHargaSama);
  const hotelNightAmounts = hotelNights.map(v=>parseCur(v));

  const totalHotelDiklaim = hotelMode==="sama"
    ? hargaSamaAmt*malamCount
    : hotelNightAmounts.reduce((a,b)=>a+b,0);

  const totalHotelDisetujui = hotelMode==="sama"
    ? (sbmHotel!=null ? Math.min(hargaSamaAmt,sbmHotel)*malamCount : totalHotelDiklaim)
    : (sbmHotel!=null ? hotelNightAmounts.reduce((a,v)=>a+Math.min(v,sbmHotel),0) : totalHotelDiklaim);

  // Total seluruh klaim (preview mentah, sebelum divalidasi ke SBM lewat tombol Validasi SBM)
  const totalSeluruhKlaim =
    uangHarianAmt + totalHotelDiklaim +
    (useUmum ? totalTransportUmum : 0) +
    (usePribadi ? totalKendaraanPribadi : 0) +
    representasiAmt;

  // Info & batas at-cost taksi ASAL (kondisi hanya berlaku jika provinsi asal = DKI Jakarta)
  const atCostAsalInfo = (() => {
    if(!asalIsJakarta) return "At cost tanpa batas (ketentuan kondisi Jakarta hanya berlaku untuk provinsi DKI Jakarta).";
    if(kondisiTaksiAsal==="dlm") return "At cost tanpa batas. Dari/ke tempat sah di dalam Jakarta.";
    if(kondisiTaksiAsal==="skt") { const m=kotaSekitarAsal?`Rp ${rp(TAKSI_SEKITAR[kotaSekitarAsal])}`:"(pilih kota)"; return `At cost, batas maks ${m}/perjalanan (one way sesuai SBM).`; }
    if(kondisiTaksiAsal==="luar") return "At cost tanpa batas tabel. Dari/ke tempat sah di luar Jakarta.";
    return "Pilih kondisi taksi asal.";
  })();
  const atCostAsalCeil = (amt) => {
    if(!asalIsJakarta) return amt;
    if(kondisiTaksiAsal==="skt" && kotaSekitarAsal) return Math.min(amt, TAKSI_SEKITAR[kotaSekitarAsal]||0);
    return amt;
  };

  // Info & batas at-cost taksi TUJUAN (kondisi hanya berlaku jika provinsi tujuan = DKI Jakarta)
  const atCostTujuanInfo = (() => {
    if(!tujuanIsJakarta) return "At cost tanpa batas (ketentuan kondisi Jakarta hanya berlaku untuk provinsi DKI Jakarta).";
    if(kondisiTaksiTujuan==="dlm") return "At cost tanpa batas. Dari/ke tempat sah di dalam Jakarta.";
    if(kondisiTaksiTujuan==="skt") { const m=kotaSekitarTujuan?`Rp ${rp(TAKSI_SEKITAR[kotaSekitarTujuan])}`:"(pilih kota)"; return `At cost, batas maks ${m}/perjalanan (one way sesuai SBM).`; }
    if(kondisiTaksiTujuan==="luar") return "At cost tanpa batas tabel. Dari/ke tempat sah di luar Jakarta.";
    return "Pilih kondisi taksi tujuan.";
  })();
  const atCostTujuanCeil = (amt) => {
    if(!tujuanIsJakarta) return amt;
    if(kondisiTaksiTujuan==="skt" && kotaSekitarTujuan) return Math.min(amt, TAKSI_SEKITAR[kotaSekitarTujuan]||0);
    return amt;
  };

  const lumpsumAsalInfo = ceilAsal
    ? `Batas lumpsum: Rp ${rp(ceilAsal)}/perjalanan (80% × Rp ${rp(rateAsal)}, tarif ${provAsal?.n}).`
    : provAsal ? `Tarif lumpsum ${provAsal.n} belum tersedia. Gunakan At Cost.` : "Pilih provinsi asal untuk melihat batas lumpsum.";

  const lumpsumTujuanInfo = ceilTujuan
    ? `Batas lumpsum: Rp ${rp(ceilTujuan)}/perjalanan (80% × Rp ${rp(rateTujuan)}, tarif ${provinsi?.n}).`
    : provinsi ? `Tarif lumpsum ${provinsi.n} belum tersedia. Gunakan At Cost.` : "Pilih provinsi tujuan di atas.";

  const resetTransport = () => {
    setTiketBrkt(""); setTiketPlng("");
    setKondisiTaksiAsal("dlm"); setKotaSekitarAsal("");
    setKondisiTaksiTujuan("dlm"); setKotaSekitarTujuan("");
    setLumpAsalBrkt(false); setLumpAsalPlng(false);
    setLumpTujuanBrkt(false); setLumpTujuanPlng(false);
    setTaksiAsalBrkt(""); setTaksiAsalPlng("");
    setTaksiTujuanBrkt(""); setTaksiTujuanPlng("");
    biayaLainList.reset();
    setJarakBrkt(""); setJarakPlng("");
    bensinBrktList.reset(); bensinPlngList.reset();
    tolBrktList.reset(); tolPlngList.reset();
    setUseUmum(true); setUsePribadi(false);
  };

  const resetPenginapan = () => {
    setHotelMode("sama"); setHotelHargaSama("");
    setHotelNights([""]); malamManual.current=false;
    setMalamCount(hariInt>0?hariInt:1);
  };

  const resetAll = () => {
    setEselon(""); setGolongan(""); setProvAsal(DKI_JAKARTA); setProvinsi(null); setHari("");
    setPct("80"); setCustomUangHarian(""); setCustomPctValue("");
    setHotelMode("sama"); setHotelHargaSama("");
    setHotelNights([""]); setMalamCount(1); malamManual.current=false;
    resetTransport(); setHasil(null); setError("");
  };

  const hitung = () => {
    const errs=[];
    if(!eselon)   errs.push("Eselon / jabatan");
    if(!golongan) errs.push("Golongan");
    if(!provAsal) errs.push("Provinsi asal");
    if(!provinsi) errs.push("Provinsi tujuan");
    if(!hariInt)  errs.push("Jumlah hari ST");
    if(pct==="customRp" && parseCur(customUangHarian)<=0) errs.push("Nominal uang harian custom");
    if(pct==="customPct" && (!customPctValue || parseFloat(customPctValue)<=0)) errs.push("Persentase uang harian custom");

    if(useUmum) {
      if(asalIsJakarta && kondisiTaksiAsal==="skt" && !kotaSekitarAsal)
        errs.push("Kota / kabupaten asal (taksi sekitar Jakarta)");
      if(tujuanIsJakarta && kondisiTaksiTujuan==="skt" && !kotaSekitarTujuan)
        errs.push("Kota / kabupaten tujuan (taksi sekitar Jakarta)");
      if((lumpAsalBrkt||lumpAsalPlng) && rateAsal===null)
        errs.push(`Tarif lumpsum taksi asal ${provAsal?.n||""} belum tersedia`);
      if((lumpTujuanBrkt||lumpTujuanPlng) && rateTujuan===null)
        errs.push(`Tarif lumpsum taksi tujuan ${provinsi?.n||""} belum tersedia`);
    }
    if(usePribadi && bensinBrktList.total>0 && jarakBrktInt===0)
      errs.push("Isi jarak berangkat untuk menghitung batas bensin berangkat");
    if(usePribadi && bensinPlngList.total>0 && jarakPlngInt===0)
      errs.push("Isi jarak pulang untuk menghitung batas bensin pulang");

    if(errs.length){ setError("Lengkapi data berikut:\n• "+errs.join("\n• ")); return; }
    setError("");

    const k=kelompok;
    const uph = uphBase;
    const uH  = uangHarianAmt;
    const uphKet = pct==="customRp"
      ? `Custom: Rp ${rp(uph)}/hari × ${hariInt} hari`
      : pct==="customPct"
        ? `Rp ${rp(provinsi.u)} × ${customPctValue}% (custom) × ${hariInt} hari`
        : `Rp ${rp(provinsi.u)} × ${pct}% × ${hariInt} hari`;

    // Hotel — dihitung per malam (tiap malam dicek sendiri ke SBM, bukan akumulatif)
    const sbm=provinsi.h[k-1];

    const rows=[
      {l:"Uang harian",ket:uphKet,k:uH,d:uH,auto:true},
    ];
    if(totalHotelDiklaim>0&&malamCount>0) rows.push({l:`Hotel (${malamCount} malam)`,ket:hotelMode==="sama"?`At cost, maks SBM Rp ${rp(sbm)}/malam × ${malamCount} malam`:`At cost per malam, maks SBM Rp ${rp(sbm)}/malam (dicek per malam, bukan akumulatif)`,k:totalHotelDiklaim,d:totalHotelDisetujui});

    // ── Transportasi Umum ──
    if(useUmum) {
      const tB=parseCur(tiketBrkt), tP=parseCur(tiketPlng);
      rows.push(
        {l:"Tiket berangkat",ket:"At cost",k:tB,d:tB},
        {l:"Tiket pulang",ket:"At cost",k:tP,d:tP},
      );

      // Taksi asal – berangkat
      {
        const amt=parseCur(taksiAsalBrkt);
        const d = lumpAsalBrkt ? (ceilAsal!=null?Math.min(amt,ceilAsal):amt) : atCostAsalCeil(amt);
        const ket = lumpAsalBrkt ? lumpsumAsalInfo : atCostAsalInfo;
        rows.push({l:"Taksi asal – berangkat",ket,k:amt,d,lumpsum:lumpAsalBrkt});
      }
      // Taksi asal – pulang
      {
        const amt=parseCur(taksiAsalPlng);
        const d = lumpAsalPlng ? (ceilAsal!=null?Math.min(amt,ceilAsal):amt) : atCostAsalCeil(amt);
        const ket = lumpAsalPlng ? lumpsumAsalInfo : atCostAsalInfo;
        rows.push({l:"Taksi asal – pulang",ket,k:amt,d,lumpsum:lumpAsalPlng});
      }
      // Taksi tujuan – berangkat
      {
        const amt=parseCur(taksiTujuanBrkt);
        const d = lumpTujuanBrkt ? (ceilTujuan!=null?Math.min(amt,ceilTujuan):amt) : atCostTujuanCeil(amt);
        const ket = lumpTujuanBrkt ? lumpsumTujuanInfo : atCostTujuanInfo;
        rows.push({l:"Taksi tujuan – berangkat",ket,k:amt,d,lumpsum:lumpTujuanBrkt});
      }
      // Taksi tujuan – pulang
      {
        const amt=parseCur(taksiTujuanPlng);
        const d = lumpTujuanPlng ? (ceilTujuan!=null?Math.min(amt,ceilTujuan):amt) : atCostTujuanCeil(amt);
        const ket = lumpTujuanPlng ? lumpsumTujuanInfo : atCostTujuanInfo;
        rows.push({l:"Taksi tujuan – pulang",ket,k:amt,d,lumpsum:lumpTujuanPlng});
      }

      if(biayaLainList.total>0) rows.push({l:"Biaya lain-lain",ket:"At cost, bukti dilampirkan",k:biayaLainList.total,d:biayaLainList.total});
    }

    // ── Kendaraan Pribadi ──
    if(usePribadi) {
      if(jarakBrktInt>0) {
        const kb=bensinBrktList.total;
        rows.push({l:"Bensin berangkat",ket:`At cost, maks Rp 1.300/km × ${jarakBrktInt} km = Rp ${rp(ceilBensinBrkt)}`,k:kb,d:Math.min(kb,ceilBensinBrkt),pribadi:true});
      }
      if(jarakPlngInt>0) {
        const kp=bensinPlngList.total;
        rows.push({l:"Bensin pulang",ket:`At cost, maks Rp 1.300/km × ${jarakPlngInt} km = Rp ${rp(ceilBensinPlng)}`,k:kp,d:Math.min(kp,ceilBensinPlng),pribadi:true});
      }
      const tBrkt=tolBrktList.total, tPlng=tolPlngList.total;
      if(tBrkt>0) rows.push({l:"Tol berangkat",ket:"At cost",k:tBrkt,d:tBrkt,pribadi:true});
      if(tPlng>0) rows.push({l:"Tol pulang",ket:"At cost",k:tPlng,d:tPlng,pribadi:true});
    }

    const repPH=representasiPH, repT=representasiAmt;
    if(repT>0) rows.push({l:`Representasi (${hariInt} hari)`,ket:`Rp ${rp(repPH)}/hari × ${hariInt} hari`,k:repT,d:repT,auto:true});

    setHasil(rows);
    setTimeout(()=>hasilRef.current?.scrollIntoView({behavior:"smooth",block:"nearest"}),100);
  };

  return (
    <div style={{ padding:"0.75rem 0", fontSize:14, color:"#1a1a1a", fontFamily:"system-ui, sans-serif" }}>

      {/* ── Petunjuk kalkulator (1x saja, berlaku untuk semua kotak nominal di bawah) ── */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:8, background:"#EEEDFE", border:"0.5px solid #D9C7F2", borderRadius:8, padding:"9px 12px", marginBottom:".875rem", fontSize:12, color:"#3C3489", lineHeight:1.4 }}>
        <span style={{ fontSize:14, flexShrink:0 }}>🧮</span>
        <span>Semua kotak nominal di halaman ini bisa diisi rumus, misalnya <b>150000+45000</b> atau <b>1200000/2</b> — tekan <b>Enter</b> atau klik tombol <b>=</b> yang muncul untuk menghitung otomatis.</span>
      </div>

      {/* ── Identitas ── */}
      <div style={s.card}>
        <p style={s.secTitle}>Identitas &amp; perjalanan</p>
        <Row2>
          <Field label="Eselon / Jabatan">
            <select value={eselon} onChange={e=>setEselon(e.target.value)} style={s.select}>
              <option value="">-- Pilih --</option>
              <option value="pn">Pejabat Negara / Wakil Menteri</option>
              <option value="es1">Pejabat Eselon I</option>
              <option value="es2">Pejabat Eselon II</option>
              <option value="es3">Pejabat Eselon III</option>
              <option value="es4">Pejabat Eselon IV</option>
              <option value="staf">Non-Eselon / Staf</option>
            </select>
          </Field>
          <Field label="Golongan" info="Hanya berpengaruh untuk Eselon IV / Non-Eselon. Untuk jabatan lain, Kelompok SBM otomatis ditentukan dari Eselon.">
            <select value={golongan} onChange={e=>setGolongan(e.target.value)} style={s.select}>
              <option value="">-- Pilih --</option>
              <option value="4">Golongan IV</option><option value="3">Golongan III</option>
              <option value="2">Golongan II</option><option value="1">Golongan I</option>
            </select>
          </Field>
        </Row2>
        <Row1 hidden={!kelompok}>
          <Field label="Kelompok SBM">
            <div style={{ padding:"4px 0" }}><KelompokBadge k={kelompok}/></div>
            {kelompok&&<div style={s.fi}>Batas kelas transport: {isAtasEs1(eselon)?"Pesawat boleh kelas bisnis, kereta boleh kelas spesial.":"Pesawat kelas ekonomi, kereta maks kelas eksekutif."}</div>}
          </Field>
        </Row1>
        <Row2>
          <Field label="Provinsi asal" info="Default DKI Jakarta — ganti jika keberangkatan bukan dari Jakarta.">
            <ProvinsiSearch value={provAsal} onSelect={setProvAsal}/>
          </Field>
          <Field label="Provinsi tujuan" info={provinsi&&kelompok?`SBM hotel Kelompok ${kelompok}: Rp ${rp(provinsi.h[kelompok-1])}/malam · Uang harian: Rp ${rp(provinsi.u)}/hari`:null}>
            <ProvinsiSearch value={provinsi} onSelect={setProvinsi}/>
          </Field>
        </Row2>
        <Row2>
          <Field label="Jumlah hari (ST)" info={hariInt>0?`ST ${hariInt} hari → uang harian ${hariInt} hari.`:null}>
            <input type="number" value={hari} onChange={e=>setHari(e.target.value)} min={1} placeholder="Contoh: 4" style={s.input}/>
          </Field>
          <Field label="Persentase uang harian yang berlaku" info={pct==="customRp"||pct==="customPct"?null:"Persentase mengikuti kebijakan anggaran yang berlaku per periode."}>
            <select value={pct} onChange={e=>setPct(e.target.value)} style={s.select}>
              <option value="100">100%</option>
              <option value="80">80% (berlaku saat ini)</option>
              <option value="customPct">Custom persentase</option>
              <option value="customRp">Custom nominal (Rp)</option>
            </select>
            {pct==="customPct" && (
              <div style={{ marginTop:8 }}>
                <input type="number" value={customPctValue} onChange={e=>setCustomPctValue(e.target.value)} min={1} max={200} placeholder="Contoh: 65" style={s.input}/>
                <div style={s.fi}>Berlaku untuk kondisi khusus (mis. diklat / fullboard) yang memakai persentase di luar 100%/80%.</div>
              </div>
            )}
            {pct==="customRp" && (
              <div style={{ marginTop:8 }}>
                <CalcInput value={customUangHarian} onChange={setCustomUangHarian} placeholder="Nominal per hari"/>
                <div style={s.fi}>Berlaku untuk kondisi khusus (mis. diklat / fullboard) yang memakai nominal tetap per hari.</div>
              </div>
            )}
          </Field>
        </Row2>
      </div>

      {/* ── Penginapan ── */}
      <div style={s.card}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
          <p style={{...s.secTitle,margin:0}}>Penginapan</p>
          <button onClick={resetPenginapan} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, color:"#B91C1C", background:"#FEF2F0", border:"1px solid #F0A8A0", borderRadius:6, padding:"5px 12px", cursor:"pointer" }}>
            <RefreshCw size={13} strokeWidth={2}/> Reset penginapan
          </button>
        </div>

        <Row1>
          <Field label="Metode klaim hotel">
            <HotelModeRadio value={hotelMode} onChange={setHotelMode}/>
          </Field>
        </Row1>

        {hotelMode==="sama" ? (
          <Row2>
            <Field label="Jumlah malam diklaim" info={hariInt>0?`Maks ${hariInt} malam (sesuai ST).`:null}>
              <Counter value={malamCount} onChange={handleMalamChange} max={hariInt>0?hariInt:undefined}/>
            </Field>
            <Field label="Harga hotel per malam" info={sbmHotel!=null?`Batas SBM: Rp ${rp(sbmHotel)}/malam.`:null}>
              <CalcInput value={hotelHargaSama} onChange={setHotelHargaSama}/>
            </Field>
          </Row2>
        ) : (
          <Row1>
            <Field label="Jumlah malam diklaim" info="Biaya hotel per malam boleh berbeda-beda — tiap malam dicek sendiri ke batas SBM, bukan digabung/dirata-rata.">
              <Counter value={malamCount} onChange={handleMalamChange} max={hariInt>0?hariInt:undefined}/>
              {hariInt>0 && <div style={s.fi}>Maks {hariInt} malam (sesuai ST)</div>}
            </Field>
          </Row1>
        )}

        {hotelMode==="beda" && malamCount>0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:8 }}>
            {hotelNights.map((v,i) => {
              const amt = parseCur(v);
              const over = sbmHotel!=null && amt>sbmHotel;
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:70, fontSize:12, color:"#555", fontWeight:500, flexShrink:0 }}>Malam {i+1}</div>
                  <div style={{ flex:1 }}>
                    <CalcInput value={v} onChange={val=>updateHotelNight(i,val)}/>
                  </div>
                  {sbmHotel!=null && (
                    over
                      ? <span style={{ fontSize:11, fontWeight:600, color:"#993C1D", whiteSpace:"nowrap", flexShrink:0 }}>⚠ &gt; Rp {rp(sbmHotel)}</span>
                      : <span style={{ fontSize:11, color:"#0F6E56", whiteSpace:"nowrap", flexShrink:0 }}>✓ maks Rp {rp(sbmHotel)}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {sbmHotel==null && malamCount>0 && (
          <div style={{...s.fi, marginTop:8}}>Pilih provinsi, eselon, dan golongan untuk melihat batas SBM per malam.</div>
        )}

        {totalHotelDiklaim>0 && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:12 }}>
            <div style={{ background:"#f5f5f3", borderRadius:8, padding:"8px 12px", border:"0.5px solid rgba(0,0,0,0.07)", fontSize:12.5 }}>
              <div style={{ fontSize:10.5, color:"#888", marginBottom:2 }}>Total diklaim</div>
              <div style={{ fontWeight:700, fontSize:14, color:"#1a1a1a" }}>{Rp(totalHotelDiklaim)}</div>
            </div>
            <div style={{ background:totalHotelDiklaim>totalHotelDisetujui?"#FEF2F0":"#E1F5EE", borderRadius:8, padding:"8px 12px", border:`0.5px solid ${totalHotelDiklaim>totalHotelDisetujui?"#F5C1C1":"#9FE1CB"}`, fontSize:12.5 }}>
              <div style={{ fontSize:10.5, color:totalHotelDiklaim>totalHotelDisetujui?"#993C1D":"#0F6E56", marginBottom:2 }}>Total disetujui</div>
              <div style={{ fontWeight:700, fontSize:14, color:totalHotelDiklaim>totalHotelDisetujui?"#993C1D":"#085041" }}>{Rp(totalHotelDisetujui)}</div>
              <div style={{ fontSize:11, color:"#666", marginTop:2 }}>Dihitung per malam, bukan akumulatif</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Transport ── */}
      <div style={s.card}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
          <p style={{...s.secTitle,margin:0}}>Transport</p>
          <button onClick={resetTransport} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, color:"#B91C1C", background:"#FEF2F0", border:"1px solid #F0A8A0", borderRadius:6, padding:"5px 12px", cursor:"pointer" }}>
            <RefreshCw size={13} strokeWidth={2}/> Reset transport
          </button>
        </div>

        {/* Toggle pilihan moda */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
          <TransportToggle label="Transportasi Umum" sub="Tiket, taksi asal & tujuan, biaya lain" active={useUmum} onClick={()=>setUseUmum(!useUmum)}/>
          <TransportToggle label="Kendaraan Pribadi" sub="Bensin (batas SBM) & tol (at cost)" active={usePribadi} onClick={()=>setUsePribadi(!usePribadi)}/>
        </div>

        {/* ── TRANSPORTASI UMUM ── */}
        {useUmum && (
          <>
            <p style={s.subTitle}>Transportasi umum</p>
            <Row2>
              <Field label="Tiket berangkat"
                right={<span style={s.rutePill}>📍 {provAsal?.n||"Asal"} → {provinsi?.n||"Tujuan"}</span>}
                info={`At cost. ${transportInfo}`}>
                <CalcInput value={tiketBrkt} onChange={setTiketBrkt}/>
              </Field>
              <Field label="Tiket pulang"
                right={<span style={s.rutePill}>📍 {provinsi?.n||"Tujuan"} → {provAsal?.n||"Asal"}</span>}
                info={`At cost. ${transportInfo}`}>
                <CalcInput value={tiketPlng} onChange={setTiketPlng}/>
              </Field>
            </Row2>
            <MiniTotal label="Total tiket (PP)" value={totalTiketPP}/>

            <hr style={s.divider}/>

            {/* ── Taksi kota asal (kotak biru) ── */}
            <div style={{ background:"#E6F1FB", border:"1px solid #B8D4EE", borderRadius:10, padding:"12px 14px 14px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:6 }}>
                <p style={{...s.subTitle, margin:0}}>Taksi kota asal</p>
                <span style={{ fontSize:11, fontWeight:600, color:"#0C447C", background:"#fff", border:"1px solid #B8D4EE", borderRadius:20, padding:"2px 10px" }}>
                  📍 {provAsal?.n || "Pilih provinsi asal"}
                </span>
              </div>

              {asalIsJakarta && (
                <>
                  <Row1>
                    <Field label="Kondisi taksi asal">
                      <select value={kondisiTaksiAsal} onChange={e=>{setKondisiTaksiAsal(e.target.value);setKotaSekitarAsal("");}} style={s.select}>
                        <option value="dlm">Tempat sah di dalam Jakarta (default)</option>
                        <option value="skt">Tempat sah di luar Jakarta (sekitar Jakarta)</option>
                        <option value="luar">Tempat sah di luar Jakarta (bukan sekitar Jakarta)</option>
                      </select>
                    </Field>
                  </Row1>
                  <Row1 hidden={kondisiTaksiAsal!=="skt"}>
                    <Field label="Kota / kabupaten asal">
                      <select value={kotaSekitarAsal} onChange={e=>setKotaSekitarAsal(e.target.value)} style={s.select}>
                        <option value="">-- Pilih --</option>
                        {Object.entries(TAKSI_SEKITAR).map(([kk,v])=><option key={kk} value={kk}>{kk} – maks Rp {rp(v)}</option>)}
                      </select>
                    </Field>
                  </Row1>
                </>
              )}

              <Row2 mb={0}>
                <Field label="Taksi asal – berangkat"
                  right={<LumpsumToggle checked={lumpAsalBrkt} onChange={setLumpAsalBrkt}/>}
                  info={`Dari ${provAsal?.n||"kota asal"} menuju bandara/stasiun keberangkatan. ${lumpAsalBrkt?lumpsumAsalInfo:atCostAsalInfo}`}>
                  <CalcInput value={taksiAsalBrkt} onChange={setTaksiAsalBrkt}/>
                </Field>
                <Field label="Taksi asal – pulang"
                  right={<LumpsumToggle checked={lumpAsalPlng} onChange={setLumpAsalPlng}/>}
                  info={`Dari bandara/stasiun kedatangan, kembali ke ${provAsal?.n||"kota asal"}. ${lumpAsalPlng?lumpsumAsalInfo:atCostAsalInfo}`}>
                  <CalcInput value={taksiAsalPlng} onChange={setTaksiAsalPlng}/>
                </Field>
              </Row2>
              <MiniTotal label="Total taksi kota asal (PP)" value={totalTaksiAsal} bg="#fff" border="#B8D4EE" color="#0C447C"/>
            </div>

            <div style={{ height:14 }}/>

            {/* ── Taksi kota tujuan (kotak ungu) ── */}
            <div style={{ background:"#F3EEFC", border:"1px solid #D9C7F2", borderRadius:10, padding:"12px 14px 14px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:6 }}>
                <p style={{...s.subTitle, margin:0}}>Taksi kota tujuan</p>
                <span style={{ fontSize:11, fontWeight:600, color:"#3C3489", background:"#fff", border:"1px solid #D9C7F2", borderRadius:20, padding:"2px 10px" }}>
                  📍 {provinsi?.n || "Pilih provinsi tujuan"}
                </span>
              </div>

              {tujuanIsJakarta && (
                <>
                  <Row1>
                    <Field label="Kondisi taksi tujuan">
                      <select value={kondisiTaksiTujuan} onChange={e=>{setKondisiTaksiTujuan(e.target.value);setKotaSekitarTujuan("");}} style={s.select}>
                        <option value="dlm">Tempat sah di dalam Jakarta (default)</option>
                        <option value="skt">Tempat sah di luar Jakarta (sekitar Jakarta)</option>
                        <option value="luar">Tempat sah di luar Jakarta (bukan sekitar Jakarta)</option>
                      </select>
                    </Field>
                  </Row1>
                  <Row1 hidden={kondisiTaksiTujuan!=="skt"}>
                    <Field label="Kota / kabupaten tujuan">
                      <select value={kotaSekitarTujuan} onChange={e=>setKotaSekitarTujuan(e.target.value)} style={s.select}>
                        <option value="">-- Pilih --</option>
                        {Object.entries(TAKSI_SEKITAR).map(([kk,v])=><option key={kk} value={kk}>{kk} – maks Rp {rp(v)}</option>)}
                      </select>
                    </Field>
                  </Row1>
                </>
              )}

              <Row2 mb={0}>
                <Field label="Taksi tujuan – berangkat"
                  right={<LumpsumToggle checked={lumpTujuanBrkt} onChange={setLumpTujuanBrkt}/>}
                  info={`Dari bandara/stasiun kedatangan di ${provinsi?.n||"kota tujuan"}, menuju lokasi kegiatan. ${lumpTujuanBrkt?lumpsumTujuanInfo:atCostTujuanInfo}`}>
                  <CalcInput value={taksiTujuanBrkt} onChange={setTaksiTujuanBrkt}/>
                </Field>
                <Field label="Taksi tujuan – pulang"
                  right={<LumpsumToggle checked={lumpTujuanPlng} onChange={setLumpTujuanPlng}/>}
                  info={`Dari lokasi kegiatan, kembali ke bandara/stasiun keberangkatan di ${provinsi?.n||"kota tujuan"}. ${lumpTujuanPlng?lumpsumTujuanInfo:atCostTujuanInfo}`}>
                  <CalcInput value={taksiTujuanPlng} onChange={setTaksiTujuanPlng}/>
                </Field>
              </Row2>
              <MiniTotal label="Total taksi kota tujuan (PP)" value={totalTaksiTujuan} bg="#fff" border="#D9C7F2" color="#3C3489"/>
            </div>

            <hr style={s.divider}/>
            <Row1 mb={0}>
              <Field label="Biaya lain-lain (tol, bensin transport umum, dll.)" info="At cost. Wajib dilampirkan bukti pembayaran.">
                <AmountList list={biayaLainList}/>
              </Field>
            </Row1>
          </>
        )}

        {/* ── KENDARAAN PRIBADI ── */}
        {usePribadi && (
          <>
            {useUmum && <hr style={{ ...s.divider, marginTop:16 }}/>}
            <p style={s.subTitle}>Kendaraan pribadi</p>

            {/* Bensin */}
            <Row2>
              <div style={{ display:"flex", flexDirection:"column", gap:8, padding:"10px 12px", background:"#fafafa", border:"0.5px solid rgba(0,0,0,0.08)", borderRadius:8 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6 }}>
                  <div style={{ fontSize:12, fontWeight:500, color:"#444" }}>Bensin berangkat</div>
                  <span style={s.rutePill}>📍 {provAsal?.n||"Asal"} → {provinsi?.n||"Tujuan"}</span>
                </div>
                <Field label="Jarak tempuh (km)"
                  infoBlue={jarakBrktInt>0?`Batas maks bensin: Rp ${rp(ceilBensinBrkt)} (${jarakBrktInt} km × Rp 1.300/km)`:null}>
                  <CalcInput value={jarakBrkt} onChange={setJarakBrkt} placeholder="0" prefix=""/>
                </Field>
                <Field label="Klaim bensin berangkat"
                  info={jarakBrktInt>0?`Maks Rp ${rp(ceilBensinBrkt)} (Rp 13.000 per 10 km).`:null}
                  warn={!jarakBrktInt&&bensinBrktList.total>0?"Isi jarak terlebih dahulu untuk menentukan batas.":null}>
                  <AmountList list={bensinBrktList}/>
                </Field>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8, padding:"10px 12px", background:"#fafafa", border:"0.5px solid rgba(0,0,0,0.08)", borderRadius:8 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6 }}>
                  <div style={{ fontSize:12, fontWeight:500, color:"#444" }}>Bensin pulang</div>
                  <span style={s.rutePill}>📍 {provinsi?.n||"Tujuan"} → {provAsal?.n||"Asal"}</span>
                </div>
                <Field label="Jarak tempuh (km)"
                  infoBlue={jarakPlngInt>0?`Batas maks bensin: Rp ${rp(ceilBensinPlng)} (${jarakPlngInt} km × Rp 1.300/km)`:null}>
                  <CalcInput value={jarakPlng} onChange={setJarakPlng} placeholder="0" prefix=""/>
                </Field>
                <Field label="Klaim bensin pulang"
                  info={jarakPlngInt>0?`Maks Rp ${rp(ceilBensinPlng)} (Rp 13.000 per 10 km).`:null}
                  warn={!jarakPlngInt&&bensinPlngList.total>0?"Isi jarak terlebih dahulu untuk menentukan batas.":null}>
                  <AmountList list={bensinPlngList}/>
                </Field>
              </div>
            </Row2>

            {/* Tol */}
            <Row2 mb={0}>
              <Field label="Tol berangkat"
                right={<span style={s.rutePill}>📍 {provAsal?.n||"Asal"} → {provinsi?.n||"Tujuan"}</span>}
                info="At cost — sesuai tagihan riil (simpan bukti struk tol).">
                <AmountList list={tolBrktList}/>
              </Field>
              <Field label="Tol pulang"
                right={<span style={s.rutePill}>📍 {provinsi?.n||"Tujuan"} → {provAsal?.n||"Asal"}</span>}
                info="At cost — sesuai tagihan riil (simpan bukti struk tol).">
                <AmountList list={tolPlngList}/>
              </Field>
            </Row2>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:4 }}>
              <MiniTotal label="Total berangkat (bensin + tol)" value={totalKendaraanBrkt}/>
              <MiniTotal label="Total pulang (bensin + tol)" value={totalKendaraanPlng}/>
            </div>
            <MiniTotal label="Total kendaraan pribadi (berangkat + pulang)" value={totalKendaraanPribadi} bg="#E1F5EE" border="#9FE1CB" color="#085041"/>
          </>
        )}

        {!useUmum && !usePribadi && (
          <div style={{ textAlign:"center", padding:"24px 0", fontSize:13, color:"#aaa" }}>
            Pilih minimal satu metode transportasi di atas.
          </div>
        )}
      </div>

      <div style={{ background:"#37175E", borderRadius:12, padding:"16px 20px", marginBottom:12, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ fontSize:11.5, fontWeight:600, color:"#C9B8E0", letterSpacing:".04em", textTransform:"uppercase" }}>Total Seluruh Klaim</div>
          <div style={{ fontSize:11, color:"#D9CCEA", marginTop:2 }}>Jumlah mentah seluruh komponen yang sudah diisi — belum divalidasi ke batas SBM</div>
        </div>
        <div style={{ fontSize:26, fontWeight:700, color:"#fff" }}>{Rp(totalSeluruhKlaim)}</div>
      </div>

      {error && (
        <div style={{ background:"#FEF2F0", border:"0.5px solid #F5C1C1", borderRadius:8, padding:"10px 14px", fontSize:12.5, color:"#993C1D", marginBottom:12, whiteSpace:"pre-line" }}>
          {error}
        </div>
      )}

      <div style={{ display:"flex", gap:10 }}>
        <button onClick={hitung} style={{ flex:1, background:"#0F6E56", color:"#fff", border:"none", padding:"11px 0", borderRadius:8, fontSize:14, fontWeight:500, cursor:"pointer" }}>
          Validasi SBM
        </button>
        {hasil && (
          <button onClick={resetAll} style={{ padding:"11px 20px", background:"transparent", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, fontSize:14, cursor:"pointer", color:"#555" }}>
            Reset semua
          </button>
        )}
      </div>

      {hasil && (
        <div ref={hasilRef} style={{...s.card, marginTop:".875rem"}}>
          <p style={s.secTitle}>Hasil pengujian</p>
          <ResultsTable rows={hasil}/>
        </div>
      )}
    </div>
  );
}

  return SPDPenguji;
})();


const NS_SPDReferensi = (() => {

const PROVINSI = [
  { n: "Aceh", h: [5109000,3526000,1578000,770000], u: 360000 },
  { n: "Sumatera Utara", h: [4960000,2195000,1188000,699000], u: 370000 },
  { n: "Bengkulu", h: [2140000,1628000,1546000,692000], u: 380000 },
  { n: "Jambi", h: [5004000,4102000,1252000,580000], u: 370000 },
  { n: "Riau", h: [3820000,3119000,1650000,852000], u: 370000 },
  { n: "Sumatera Barat", h: [5603000,3373000,1353000,701000], u: 380000 },
  { n: "Sumatera Selatan", h: [6298000,3134000,1966000,861000], u: 380000 },
  { n: "Lampung", h: [4806000,2663000,1539000,621000], u: 380000 },
  { n: "Kepulauan Bangka Belitung", h: [4424000,2838000,1957000,724000], u: 410000 },
  { n: "Kepulauan Riau", h: [6177000,2481000,1388000,792000], u: 370000 },
  { n: "Banten", h: [5725000,2373000,1301000,775000], u: 370000 },
  { n: "Jawa Barat", h: [5812000,2755000,1366000,735000], u: 430000 },
  { n: "DKI Jakarta", h: [9331000,2084000,1062000,730000], u: 530000 },
  { n: "Jawa Tengah", h: [6129000,2138000,1286000,810000], u: 370000 },
  { n: "Jawa Timur", h: [4449000,2007000,1234000,814000], u: 410000 },
  { n: "DI Yogyakarta", h: [5100000,2695000,1600000,845000], u: 420000 },
  { n: "Bali", h: [7328000,2433000,1754000,1138000], u: 480000 },
  { n: "Nusa Tenggara Barat", h: [4682000,2648000,1418000,907000], u: 440000 },
  { n: "Nusa Tenggara Timur", h: [4013000,2283000,1450000,737000], u: 430000 },
  { n: "Kalimantan Barat", h: [2654000,1923000,1125000,576000], u: 380000 },
  { n: "Kalimantan Selatan", h: [4797000,3316000,1500000,746000], u: 380000 },
  { n: "Kalimantan Tengah", h: [4901000,3391000,1189000,706000], u: 360000 },
  { n: "Kalimantan Timur", h: [4000000,2342000,1507000,804000], u: 430000 },
  { n: "Kalimantan Utara", h: [4000000,2854000,1507000,904000], u: 430000 },
  { n: "Gorontalo", h: [4168000,3107000,1606000,955000], u: 370000 },
  { n: "Sulawesi Selatan", h: [4820000,1938000,1423000,745000], u: 430000 },
  { n: "Sulawesi Tenggara", h: [3089000,2755000,1297000,786000], u: 380000 },
  { n: "Sulawesi Tengah", h: [2309000,2166000,1679000,951000], u: 370000 },
  { n: "Sulawesi Utara", h: [5264000,2290000,1270000,978000], u: 370000 },
  { n: "Sulawesi Barat", h: [4076000,3098000,1344000,704000], u: 410000 },
  { n: "Maluku", h: [3467000,3240000,1059000,667000], u: 380000 },
  { n: "Maluku Utara", h: [4612000,3843000,1160000,654000], u: 430000 },
  { n: "Papua", h: [3859000,3318000,2521000,1038000], u: 580000 },
  { n: "Papua Barat", h: [3872000,3575000,2056000,967000], u: 480000 },
  { n: "Papua Selatan", h: [5673000,4877000,3706000,1526000], u: 580000 },
  { n: "Papua Tengah", h: [3859000,3318000,2521000,1038000], u: 580000 },
  { n: "Papua Pegunungan", h: [5711000,4911000,3731000,1536000], u: 580000 },
  { n: "Papua Barat Daya", h: [3872000,3575000,2056000,967000], u: 480000 },
];

const TRANSPOR_TABLE = {
  "Aceh":123000,"Sumatera Utara":278000,"Bengkulu":106000,"Jambi":133000,
  "Riau":99000,"Sumatera Barat":171000,"Sumatera Selatan":162000,"Lampung":162000,
  "Kepulauan Bangka Belitung":94000,"Kepulauan Riau":159000,"Banten":300000,
  "Jawa Barat":180000,"DKI Jakarta":250000,"Jawa Tengah":105000,"Jawa Timur":225000,
  "DI Yogyakarta":258000,"Bali":219000,"Nusa Tenggara Barat":224000,
  "Nusa Tenggara Timur":105000,"Kalimantan Barat":165000,"Kalimantan Selatan":174000,
  "Kalimantan Tengah":130000,"Kalimantan Timur":300000,"Kalimantan Utara":211000,
  "Gorontalo":256000,"Sulawesi Selatan":181000,"Sulawesi Tenggara":154000,
  "Sulawesi Tengah":149000,"Sulawesi Utara":134000,"Sulawesi Barat":283000,
  "Maluku":279000,"Maluku Utara":208000,"Papua":462000,"Papua Barat":228000,
  "Papua Selatan":null,"Papua Tengah":null,"Papua Pegunungan":null,"Papua Barat Daya":null,
};

const REPRESENTASI_RATES = [
  { jabatan:"Pejabat Negara / Wakil Menteri", rate:250000 },
  { jabatan:"Pejabat Eselon I", rate:200000 },
  { jabatan:"Pejabat Eselon II", rate:150000 },
  { jabatan:"Eselon III ke bawah / Non-eselon", rate:null },
];

const KELOMPOK_DETAIL = [
  { label:"Kelompok 1", desc:"Pejabat Negara / Wamen / Eselon I", bg:"#EEEDFE", color:"#3C3489", border:"#AFA9EC" },
  { label:"Kelompok 2", desc:"Eselon II", bg:"#E1F5EE", color:"#085041", border:"#5DCAA5" },
  { label:"Kelompok 3", desc:"Eselon III atau Golongan IV", bg:"#E6F1FB", color:"#0C447C", border:"#85B7EB" },
  { label:"Kelompok 4", desc:"Eselon IV atau Golongan I, II, III", bg:"#F1EFE8", color:"#444441", border:"#B4B2A9" },
];

const rp = (n) => n.toLocaleString("id-ID");
const Rp = (n) => "Rp " + rp(n);
const parseCur = (v) => parseInt((v||"").toString().replace(/\D/g,""))||0;
const fmtCur   = (v) => { const r=(v||"").toString().replace(/\D/g,""); return r?parseInt(r).toLocaleString("id-ID"):""; };

function getKelompok(eselon, golongan) {
  if (!eselon) return null;
  if (eselon==="pn"||eselon==="es1") return 1;
  if (eselon==="es2") return 2;
  if (eselon==="es3") return 3;
  if (!golongan) return null;
  if (golongan==="4") return 3;
  return 4;
}

// ── STYLES ────────────────────────────────────────────────────────────────────

const CARD = { background:"white", border:"0.5px solid rgba(0,0,0,0.1)", borderRadius:12, overflow:"hidden" };
const CEIL_CARD = { background:"white", border:"0.5px solid rgba(185,117,23,0.25)", borderTop:"2.5px solid #EF9F27", borderRadius:12, overflow:"hidden" };
const selectSt = { width:"100%", padding:"7px 10px", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, fontSize:12.5, outline:"none", background:"white", color:"inherit" };

const BADGE_MAP = {
  atcost: { label:"At Cost",                  bg:"#E1F5EE", color:"#085041" },
  batas:  { label:"At Cost + Ada Batas",       bg:"#FAEEDA", color:"#854F0B" },
  tarif:  { label:"Tarif Tetap (Otomatis)",    bg:"#EEEDFE", color:"#3C3489" },
  kelas:  { label:"At Cost + Ketentuan Kelas", bg:"#FAEEDA", color:"#854F0B" },
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function Badge({ type }) {
  const c=BADGE_MAP[type]||BADGE_MAP.atcost;
  return <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:500, background:c.bg, color:c.color, whiteSpace:"nowrap" }}>{c.label}</span>;
}

function CurrencyInput({ value, onChange, placeholder="0" }) {
  return (
    <div style={{ position:"relative" }}>
      <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:12.5, color:"#888", pointerEvents:"none" }}>Rp</span>
      <input type="text" value={value} onChange={e=>onChange(fmtCur(e.target.value))} placeholder={placeholder}
        style={{...selectSt, paddingLeft:32}} autoComplete="off"/>
    </div>
  );
}

function Counter({ value, onChange }) {
  return (
    <div style={{ display:"flex", alignItems:"center", border:"0.5px solid rgba(0,0,0,0.15)", borderRadius:6, overflow:"hidden", userSelect:"none" }}>
      <button
        onClick={()=>onChange(Math.max(0, value-1))}
        style={{ width:26, height:24, border:"none", background:"transparent", cursor:value===0?"not-allowed":"pointer", fontSize:15, color:value===0?"#ccc":"#555", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}
      >−</button>
      <span style={{ minWidth:26, textAlign:"center", fontSize:13, fontWeight:500, color:"#1a1a1a", borderLeft:"0.5px solid rgba(0,0,0,0.1)", borderRight:"0.5px solid rgba(0,0,0,0.1)", padding:"0 4px", lineHeight:"24px" }}>{value}</span>
      <button
        onClick={()=>onChange(value+1)}
        style={{ width:26, height:24, border:"none", background:"transparent", cursor:"pointer", fontSize:15, color:"#555", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}
      >+</button>
    </div>
  );
}

function CardHeader({ title, abbr, badge, ceiling, counter }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderBottom:"0.5px solid rgba(0,0,0,0.08)", background:ceiling?"#FFFBF2":"#fafafa" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ width:26, height:26, borderRadius:6, background:ceiling?"#BA7517":"#0F6E56", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0 }}>{abbr}</span>
        <span style={{ fontWeight:500, fontSize:13 }}>{title}</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        {counter}
        <Badge type={badge}/>
      </div>
    </div>
  );
}

function Rule({ children }) {
  return (
    <div style={{ display:"flex", gap:7, marginBottom:6, fontSize:12.5, color:"#444", lineHeight:1.55 }}>
      <span style={{ color:"#1D9E75", flexShrink:0, marginTop:1 }}>→</span>
      <span>{children}</span>
    </div>
  );
}

function ValueBox({ label, value, highlight, sub, slim }) {
  return (
    <div style={{ background:highlight?"#E1F5EE":"#f5f5f3", borderRadius:8, padding:slim?"6px 10px":"9px 12px", border:highlight?"0.5px solid #9FE1CB":"0.5px solid rgba(0,0,0,0.07)" }}>
      {label && <div style={{ fontSize:10.5, color:highlight?"#0F6E56":"#888", marginBottom:2 }}>{label}</div>}
      <div style={{ fontSize:slim?13:15, fontWeight:500, color:highlight?"#085041":"#1a1a1a" }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#666", marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function ValueBoxWarn({ label, value, sub }) {
  return (
    <div style={{ background:"#FFFBF2", borderRadius:8, padding:"9px 12px", border:"0.5px solid rgba(185,117,23,0.3)" }}>
      {label && <div style={{ fontSize:10.5, color:"#854F0B", marginBottom:2 }}>{label}</div>}
      <div style={{ fontSize:15, fontWeight:500, color:"#BA7517" }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#666", marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function SectionHeader({ label, type }) {
  const isBatas=type==="batas";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, margin:"1.25rem 0 0.75rem" }}>
      <div style={{ width:3, height:16, borderRadius:2, background:isBatas?"#BA7517":"#B4B2A9", flexShrink:0 }}/>
      <span style={{ fontSize:11, fontWeight:500, letterSpacing:".07em", textTransform:"uppercase", color:isBatas?"#854F0B":"#777" }}>{label}</span>
    </div>
  );
}

function ProvinsiSearch({ value, onSelect, placeholder="Ketik nama provinsi…" }) {
  const [query, setQuery] = useState(value?.n||"");
  const [open,  setOpen]  = useState(false);
  const ref = useRef(null);
  const matches = query.trim() ? PROVINSI.filter(p=>p.n.toLowerCase().includes(query.toLowerCase())) : [];
  useEffect(()=>{ if(value) setQuery(value.n); else setQuery(""); },[value]);
  useEffect(()=>{
    const h=(e)=>{ if(ref.current&&!ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown",h); return ()=>document.removeEventListener("mousedown",h);
  },[]);
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <input type="text" value={query}
        onChange={e=>{ setQuery(e.target.value); setOpen(true); if(!e.target.value) onSelect(null); }}
        onFocus={()=>query&&setOpen(true)}
        placeholder={placeholder} style={selectSt} autoComplete="off"/>
      {open&&matches.length>0&&(
        <div style={{ position:"absolute", top:"calc(100% + 2px)", left:0, right:0, background:"white", border:"0.5px solid rgba(0,0,0,0.15)", borderRadius:8, zIndex:99, maxHeight:180, overflowY:"auto", boxShadow:"0 2px 8px rgba(0,0,0,0.07)" }}>
          {matches.map(p=>(
            <div key={p.n} onMouseDown={()=>{ setQuery(p.n); setOpen(false); onSelect(p); }}
              style={{ padding:"7px 12px", cursor:"pointer", fontSize:12.5 }}
              onMouseEnter={e=>e.currentTarget.style.background="#f5f5f3"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
            >{p.n}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

const defaultAsal = PROVINSI.find(p=>p.n==="DKI Jakarta");

function SPDReferensi() {
  const [eselon,    setEselon]    = useState("");
  const [golongan,  setGolongan]  = useState("");
  const [provAsal,  setProvAsal]  = useState(defaultAsal);
  const [provTujuan,setProvTujuan]= useState(null);
  const [pct,       setPct]       = useState("80");
  const [customPctValue, setCustomPctValue] = useState("");
  const [customUangHarian, setCustomUangHarian] = useState("");
  const [hariCount, setHariCount] = useState(1);
  const [malamCount,setMalamCount]= useState(1);

  const k        = getKelompok(eselon, golongan);
  const kDetail  = k ? KELOMPOK_DETAIL[k-1] : null;
  const hotelSBM = provTujuan&&k ? provTujuan.h[k-1] : null;
  const harianBase     = provTujuan ? provTujuan.u : null;
  const harianWithPct  = harianBase==null ? null : (
    pct==="customRp" ? parseCur(customUangHarian) :
    pct==="customPct" ? Math.round(harianBase*((parseFloat(customPctValue)||0)/100)) :
    Math.round(harianBase*parseInt(pct)/100)
  );
  const pctLabel = pct==="customRp" ? "nominal custom" : pct==="customPct" ? `${customPctValue||0}% (custom)` : `${pct}%`;
  const isAtasEs1      = eselon==="pn"||eselon==="es1";

  const rateAsal   = provAsal   ? TRANSPOR_TABLE[provAsal.n]   : null;
  const rateTujuan = provTujuan ? TRANSPOR_TABLE[provTujuan.n] : null;
  const ceilAsal   = rateAsal   ? Math.round(rateAsal*0.8)     : null;
  const ceilTujuan = rateTujuan ? Math.round(rateTujuan*0.8)   : null;

  const FL = { fontSize:12, color:"#555", fontWeight:500, display:"block", marginBottom:4 };

  return (
    <div style={{ padding:"0.75rem 0", fontFamily:"system-ui, sans-serif", color:"#1a1a1a", fontSize:14 }}>

      {/* ── Personalisasi ── */}
      <div style={{...CARD, marginBottom:".875rem", overflow:"visible"}}>
        <div style={{ padding:"10px 14px", borderBottom:"0.5px solid rgba(0,0,0,0.08)", background:"#fafafa", borderRadius:"12px 12px 0 0" }}>
          <span style={{ fontSize:11, fontWeight:500, color:"#666", letterSpacing:".07em", textTransform:"uppercase" }}>Personalisasi</span>
        </div>
        <div style={{ padding:"1rem 1.25rem" }}>
          <p style={{ fontSize:12, color:"#888", margin:"0 0 12px" }}>Opsional. Isi untuk menampilkan nilai SBM spesifik di setiap komponen.</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
            <div><label style={FL}>Eselon / Jabatan</label>
              <select value={eselon} onChange={e=>setEselon(e.target.value)} style={selectSt}>
                <option value="">-- Pilih --</option>
                <option value="pn">Pejabat Negara / Wakil Menteri</option>
                <option value="es1">Pejabat Eselon I</option>
                <option value="es2">Pejabat Eselon II</option>
                <option value="es3">Pejabat Eselon III</option>
                <option value="es4">Pejabat Eselon IV</option>
                <option value="staf">Non-Eselon / Staf</option>
              </select>
            </div>
            <div><label style={FL}>Golongan</label>
              <select value={golongan} onChange={e=>setGolongan(e.target.value)} style={selectSt}>
                <option value="">-- Pilih --</option>
                <option value="4">Golongan IV</option><option value="3">Golongan III</option>
                <option value="2">Golongan II</option><option value="1">Golongan I</option>
              </select>
            </div>
            <div><label style={FL}>Persentase uang harian</label>
              <select value={pct} onChange={e=>setPct(e.target.value)} style={selectSt}>
                <option value="100">100%</option>
                <option value="80">80% (berlaku saat ini)</option>
                <option value="customPct">Custom persentase</option>
                <option value="customRp">Custom nominal (Rp)</option>
              </select>
              {pct==="customPct" && (
                <input type="number" value={customPctValue} onChange={e=>setCustomPctValue(e.target.value)} min={1} max={200} placeholder="Contoh: 65" style={{...selectSt, marginTop:6}}/>
              )}
              {pct==="customRp" && (
                <div style={{ marginTop:6 }}>
                  <CurrencyInput value={customUangHarian} onChange={setCustomUangHarian} placeholder="Nominal per hari"/>
                </div>
              )}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div><label style={FL}>Provinsi asal (default: DKI Jakarta)</label>
              <ProvinsiSearch value={provAsal} onSelect={setProvAsal} placeholder="Ketik provinsi asal…"/>
            </div>
            <div><label style={FL}>Provinsi tujuan</label>
              <ProvinsiSearch value={provTujuan} onSelect={setProvTujuan} placeholder="Ketik provinsi tujuan…"/>
            </div>
          </div>
          {(eselon||provTujuan||provAsal!==defaultAsal||pct!=="80")&&(
            <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:12 }}>
              {kDetail&&<span style={{ display:"inline-block", padding:"3px 12px", borderRadius:20, fontSize:12, fontWeight:500, background:kDetail.bg, color:kDetail.color }}>{kDetail.label} – {kDetail.desc}</span>}
              {eselon&&!k&&<span style={{ fontSize:12, color:"#BA7517" }}>← lengkapi golongan untuk menentukan kelompok</span>}
              <button onClick={()=>{ setEselon(""); setGolongan(""); setProvAsal(defaultAsal); setProvTujuan(null); setPct("80"); setCustomPctValue(""); setCustomUangHarian(""); }}
                style={{ marginLeft:"auto", fontSize:12, color:"#aaa", background:"none", border:"none", cursor:"pointer", textDecoration:"underline", padding:0 }}>
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Kelompok strip ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:".875rem" }}>
        {KELOMPOK_DETAIL.map((kd,i)=>{
          const active=k===i+1;
          return (
            <div key={i} style={{ background:active?kd.bg:"white", border:active?`1px solid ${kd.border}`:"0.5px solid rgba(0,0,0,0.1)", borderRadius:10, padding:"8px 12px" }}>
              <div style={{ fontSize:11, fontWeight:600, color:kd.color, marginBottom:1 }}>{kd.label}</div>
              <div style={{ fontSize:11, color:"#666", lineHeight:1.4 }}>{kd.desc}</div>
            </div>
          );
        })}
      </div>

      {/* ════════════════════════════════════ */}
      {/* SECTION 1 — ADA BATAS / TARIF TETAP */}
      {/* ════════════════════════════════════ */}
      <SectionHeader label="Ada batas / tarif tetap — periksa sebelum mengklaim" type="batas"/>

      {/* Uang Harian | Hotel */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div style={CEIL_CARD}>
          <CardHeader title="Uang Harian" abbr="UH" badge="tarif" ceiling
            counter={<Counter value={hariCount} onChange={setHariCount}/>}/>
          <div style={{ padding:"12px 14px" }}>
            <Rule>Tarif ditetapkan otomatis per SBM — tidak perlu bukti pengeluaran.</Rule>
            <Rule>Formula: <span style={{ fontWeight:500 }}>SBM provinsi × persentase × jumlah hari ST.</span></Rule>
            <Rule>Berlaku penuh setiap hari, termasuk hari berangkat dan pulang.</Rule>
            {harianBase?(
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10 }}>
                <ValueBox
                  label={`Tarif dasar – ${provTujuan.n}`}
                  value={hariCount>1 ? Rp(harianBase*hariCount) : `${Rp(harianBase)}/hari`}
                  sub={hariCount>1 ? `${Rp(harianBase)}/hari × ${hariCount} hari` : null}
                />
                <ValueBox
                  label={`Setelah ${pctLabel}`}
                  value={hariCount>1 ? Rp(harianWithPct*hariCount) : `${Rp(harianWithPct)}/hari`}
                  sub={hariCount>1 ? `${Rp(harianWithPct)}/hari × ${hariCount} hari` : null}
                  highlight
                />
              </div>
            ):<div style={{ marginTop:8, fontSize:11.5, color:"#ccc", fontStyle:"italic" }}>Pilih provinsi tujuan untuk melihat tarif.</div>}
          </div>
        </div>

        <div style={CEIL_CARD}>
          <CardHeader title="Uang Hotel / Penginapan" abbr="Ho" badge="batas" ceiling
            counter={<Counter value={malamCount} onChange={setMalamCount}/>}/>
          <div style={{ padding:"12px 14px" }}>
            <Rule>At cost — dibayar sesuai tagihan riil, <span style={{ fontWeight:500 }}>tidak boleh melebihi SBM/malam.</span></Rule>
            <Rule>SBM berbeda per <span style={{ fontWeight:500 }}>provinsi tujuan</span> dan <span style={{ fontWeight:500 }}>kelompok jabatan.</span></Rule>
            <Rule>Jumlah malam maks = <span style={{ fontWeight:500 }}>hari ST dikurangi 1.</span></Rule>
            {hotelSBM?(
              <ValueBox
                label={`Batas SBM – ${provTujuan.n}, ${KELOMPOK_DETAIL[k-1].label}`}
                value={malamCount>1 ? Rp(hotelSBM*malamCount) : `${Rp(hotelSBM)}/malam`}
                sub={malamCount>1 ? `${Rp(hotelSBM)}/malam × ${malamCount} malam` : null}
                highlight
              />
            ):provTujuan&&!k?(
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10 }}>
                {provTujuan.h.map((v,i)=>(
                  <ValueBox key={i}
                    label={`Kelompok ${i+1}`}
                    value={malamCount>1 ? Rp(v*malamCount) : `${Rp(v)}/malam`}
                    sub={malamCount>1 ? `${Rp(v)}/malam × ${malamCount} malam` : null}
                    slim
                  />
                ))}
              </div>
            ):<div style={{ marginTop:8, fontSize:11.5, color:"#ccc", fontStyle:"italic" }}>Pilih provinsi &amp; eselon/golongan untuk melihat batas SBM.</div>}
          </div>
        </div>
      </div>

      {/* Taksi Asal — full width */}
      <div style={{...CEIL_CARD, marginBottom:12}}>
        <CardHeader title="Taksi Kota Asal (PP)" abbr="TA" badge="batas" ceiling/>
        <div style={{ padding:"12px 14px" }}>
          {provAsal?.n==="DKI Jakarta" ? (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
              {[
                { title:"Tempat sah di dalam Jakarta", badge:"atcost",
                  rules:["At cost — tanpa batas nominal.","Dari tempat sah ke bandara/stasiun (berangkat) dan sebaliknya (pulang)."] },
                { title:"Tempat sah sekitar Jakarta", badge:"batas",
                  rules:["At cost — ada batas maks per kota (tabel SBM).","Batas berlaku one-way — diklaim dua kali (berangkat + pulang)."] },
                { title:"Tempat sah luar Jakarta (non-sekitar)", badge:"atcost",
                  rules:["At cost — tanpa batas nominal.","Atau dapat memilih lumpsum (lihat di bawah)."] },
              ].map((col,i)=>(
                <div key={i} style={{ background:i===1?"#FFFBF2":"#fafafa", borderRadius:8, padding:"10px 12px", border:i===1?"0.5px solid rgba(185,117,23,0.2)":"0.5px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ marginBottom:7 }}><Badge type={col.badge}/></div>
                  <div style={{ fontSize:12.5, fontWeight:500, marginBottom:8, lineHeight:1.4 }}>{col.title}</div>
                  {col.rules.map((r,j)=>(
                    <div key={j} style={{ display:"flex", gap:6, marginBottom:5, fontSize:12, color:"#555", lineHeight:1.5 }}>
                      <span style={{ color:"#1D9E75", flexShrink:0 }}>→</span><span>{r}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background:"#fafafa", borderRadius:8, padding:"10px 12px", border:"0.5px solid rgba(0,0,0,0.07)", marginBottom:14 }}>
              <div style={{ marginBottom:7 }}><Badge type="atcost"/></div>
              <div style={{ fontSize:12.5, fontWeight:500, marginBottom:8, lineHeight:1.4 }}>
                {provAsal ? `Tempat sah di ${provAsal.n}` : "Tempat sah di provinsi asal"}
              </div>
              <div style={{ display:"flex", gap:6, fontSize:12, color:"#555", lineHeight:1.5 }}>
                <span style={{ color:"#1D9E75", flexShrink:0 }}>→</span>
                <span>At cost — tanpa batas nominal. Ketentuan &ldquo;dalam / sekitar / luar Jakarta&rdquo; hanya berlaku bila provinsi asal DKI Jakarta. Atau dapat memilih lumpsum (lihat di bawah).</span>
              </div>
            </div>
          )}
          {/* Lumpsum info */}
          <div style={{ borderTop:"0.5px solid rgba(185,117,23,0.15)", paddingTop:12, marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:500, color:"#854F0B", letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>
              Opsi lumpsum taksi asal
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div>
                <Rule>Pegawai dapat memilih <span style={{ fontWeight:500 }}>lumpsum</span> sebagai alternatif at cost.</Rule>
                <Rule>Nilai lumpsum = <span style={{ fontWeight:500 }}>80% × tarif SBM transpor</span> provinsi asal, per perjalanan (one way).</Rule>
                <Rule>Diklaim 2× (berangkat + pulang). Bukti cukup daftar pengeluaran riil.</Rule>
                <Rule>Jika klaim melebihi lumpsum, yang disetujui hanya sebesar nilai lumpsum.</Rule>
              </div>
              <div>
                {provAsal&&rateAsal?(
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <ValueBox label={`Tarif SBM – ${provAsal.n}`} value={`${Rp(rateAsal)}/perjalanan`}/>
                    <ValueBoxWarn label="Batas lumpsum (80%)" value={`${Rp(ceilAsal)}/perjalanan`} sub={`Total PP: ${Rp(ceilAsal*2)}`}/>
                  </div>
                ):provAsal&&rateAsal===null?(
                  <div style={{ background:"#FEF2F0", borderRadius:8, padding:"8px 12px", fontSize:12, color:"#993C1D", border:"0.5px solid #F5C1C1" }}>
                    Tarif transpor {provAsal.n} belum tersedia dalam tabel SBM. Gunakan At Cost.
                  </div>
                ):(
                  <div style={{ fontSize:11.5, color:"#ccc", fontStyle:"italic", paddingTop:4 }}>Pilih provinsi asal di personalisasi untuk melihat nilai lumpsum.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Taksi Tujuan — full width */}
      <div style={{...CEIL_CARD, marginBottom:12}}>
        <CardHeader title="Taksi Kota Tujuan (PP)" abbr="TT" badge="batas" ceiling/>
        <div style={{ padding:"12px 14px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <Rule>At cost — tidak ada batas nominal untuk klaim at cost.</Rule>
              <Rule><span style={{ fontWeight:500 }}>Berangkat:</span> dari bandara/stasiun tujuan ke tempat kegiatan.</Rule>
              <Rule><span style={{ fontWeight:500 }}>Pulang:</span> dari tempat kegiatan ke bandara/stasiun tujuan.</Rule>
              <Rule>Atau dapat memilih <span style={{ fontWeight:500 }}>lumpsum</span>: 80% × tarif SBM transpor provinsi tujuan, per perjalanan.</Rule>
              <Rule>Jika klaim lumpsum melebihi batas, yang disetujui hanya sebesar nilai lumpsum.</Rule>
            </div>
            <div>
              {provTujuan&&rateTujuan?(
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <ValueBox label={`Tarif SBM – ${provTujuan.n}`} value={`${Rp(rateTujuan)}/perjalanan`}/>
                  <ValueBoxWarn label="Batas lumpsum (80%)" value={`${Rp(ceilTujuan)}/perjalanan`} sub={`Total PP: ${Rp(ceilTujuan*2)}`}/>
                </div>
              ):provTujuan&&rateTujuan===null?(
                <div style={{ background:"#FEF2F0", borderRadius:8, padding:"8px 12px", fontSize:12, color:"#993C1D", border:"0.5px solid #F5C1C1" }}>
                  Tarif transpor {provTujuan.n} belum tersedia. Gunakan At Cost.
                </div>
              ):(
                <div style={{ fontSize:11.5, color:"#ccc", fontStyle:"italic", paddingTop:4 }}>Pilih provinsi tujuan di personalisasi untuk melihat nilai lumpsum.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Representasi — full width */}
      <div style={{...CEIL_CARD, marginBottom:12}}>
        <CardHeader title="Uang Representasi" abbr="Re" badge="tarif" ceiling/>
        <div style={{ padding:"12px 14px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <Rule>Tarif tetap per hari — dihitung otomatis, hanya untuk pejabat tertentu.</Rule>
              <Rule>Berlaku untuk setiap hari perjalanan dinas.</Rule>
              <Rule>Tidak dapat diinput manual — langsung tercantum di SPD.</Rule>
            </div>
            <div style={{ border:"0.5px solid rgba(0,0,0,0.08)", borderRadius:8, overflow:"hidden" }}>
              {REPRESENTASI_RATES.map((r,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 12px", fontSize:12.5, background:i%2===0?"transparent":"#fafafa", borderBottom:i<REPRESENTASI_RATES.length-1?"0.5px solid rgba(0,0,0,0.06)":"none" }}>
                  <span style={{ color:"#444" }}>{r.jabatan}</span>
                  <span style={{ fontWeight:500, color:r.rate?"#085041":"#bbb" }}>{r.rate?`${Rp(r.rate)}/hari`:"Tidak dapat"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════ */}
      {/* SECTION 2 — AT COST BEBAS  */}
      {/* ════════════════════════════ */}
      <SectionHeader label="At cost — tanpa batas nominal" type="atcost"/>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div style={CARD}>
          <CardHeader title="Tiket Pesawat / Kereta (PP)" abbr="Ti" badge="kelas"/>
          <div style={{ padding:"12px 14px" }}>
            <Rule>At cost — tidak ada batas nominal, namun <span style={{ fontWeight:500 }}>kelas harus sesuai jabatan.</span></Rule>
            <Rule>Berlaku untuk tiket berangkat dan pulang, masing-masing satu kali.</Rule>
            <div style={{ marginTop:10, border:"0.5px solid rgba(0,0,0,0.08)", borderRadius:8, overflow:"hidden" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr 1fr", background:"#fafafa", padding:"6px 12px", borderBottom:"0.5px solid rgba(0,0,0,0.08)", fontSize:11, fontWeight:500, color:"#666" }}>
                <span>Jabatan</span><span>Pesawat</span><span>Kereta</span>
              </div>
              {[
                { kel:"Eselon I ke atas / Pej. Negara", p:"Bisnis",   k:"Spesial",      atas:true  },
                { kel:"Eselon II ke bawah / Non-eselon", p:"Ekonomi", k:"Maks Eksekutif",atas:false },
              ].map((r,i)=>(
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr 1fr", padding:"8px 12px", fontSize:12.5, background:i===1?"#fafafa":"transparent", borderTop:i===1?"0.5px solid rgba(0,0,0,0.06)":"none", alignItems:"center" }}>
                  <span style={{ color:"#444" }}>{r.kel}</span>
                  <span style={{ fontWeight:500, color:r.atas?"#3C3489":"#333" }}>{r.p}</span>
                  <span style={{ fontWeight:500, color:r.atas?"#3C3489":"#333" }}>{r.k}</span>
                </div>
              ))}
            </div>
            {eselon&&(
              <div style={{ marginTop:8, padding:"6px 10px", background:isAtasEs1?"#EEEDFE":"#f5f5f3", borderRadius:6, fontSize:12, color:isAtasEs1?"#3C3489":"#555" }}>
                {isAtasEs1?"Pejabat ini boleh menggunakan kelas bisnis / spesial.":"Pejabat ini menggunakan kelas ekonomi / maks eksekutif."}
              </div>
            )}
          </div>
        </div>

        <div style={CARD}>
          <CardHeader title="Biaya Lain-lain" abbr="BL" badge="atcost"/>
          <div style={{ padding:"12px 14px" }}>
            <Rule>At cost — tidak ada batas nominal.</Rule>
            <Rule>Mencakup: tol, bensin, parkir, dan pengeluaran perjalanan sah lainnya.</Rule>
            <Rule><span style={{ fontWeight:500 }}>Wajib ada bukti pembayaran</span> (kuitansi/struk) untuk setiap pengeluaran.</Rule>
            <Rule>Tanpa bukti fisik tidak dapat dibayarkan, meski nominalnya kecil.</Rule>
          </div>
        </div>
      </div>

      {/* Hotel SBM detail jika provinsi dipilih */}
      {provTujuan&&(
        <div style={CARD}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderBottom:"0.5px solid rgba(0,0,0,0.08)", background:"#fafafa" }}>
            <span style={{ fontWeight:500, fontSize:13 }}>Tabel SBM Hotel – {provTujuan.n}</span>
            <span style={{ fontSize:12, color:"#888" }}>Uang harian dasar: {Rp(provTujuan.u)}/hari</span>
          </div>
          <div style={{ padding:"12px 14px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
              {KELOMPOK_DETAIL.map((kd,i)=>{
                const active=k===i+1;
                return (
                  <div key={i} style={{ background:active?kd.bg:"#f5f5f3", borderRadius:10, padding:"12px 14px", border:active?`1px solid ${kd.border}`:"0.5px solid rgba(0,0,0,0.08)" }}>
                    <div style={{ fontSize:11, fontWeight:600, color:kd.color, marginBottom:1 }}>{kd.label}</div>
                    <div style={{ fontSize:11, color:"#777", marginBottom:8, lineHeight:1.4 }}>{kd.desc}</div>
                    <div style={{ fontSize:16, fontWeight:500, color:active?kd.color:"#1a1a1a" }}>{Rp(provTujuan.h[i])}</div>
                    <div style={{ fontSize:10.5, color:"#888", marginTop:2 }}>per malam</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  return SPDReferensi;
})();



const NS_PerhitunganPajak = (() => {

// ── HELPERS ───────────────────────────────────────────────────────────────────

const rp      = (n) => Math.round(n||0).toLocaleString("id-ID");
const Rp      = (n) => "Rp " + rp(n);
const parseCur = (v) => parseInt((v||"").toString().replace(/\D/g,"")) || 0;
const fmtCur   = (v) => { const r=(v||"").toString().replace(/\D/g,""); return r?parseInt(r).toLocaleString("id-ID"):""; };

let rowIdCounter = 1;
const newRow = () => ({ id: rowIdCounter++, vol:"", sat:"" });

// ── STYLES ────────────────────────────────────────────────────────────────────

const s = {
  card:     { background:"#fff", border:"0.5px solid rgba(0,0,0,0.1)", borderRadius:12, padding:"1.25rem", marginBottom:".875rem" },
  secTitle: { fontSize:11, fontWeight:500, color:"#666", letterSpacing:".07em", textTransform:"uppercase", margin:"0 0 1rem", display:"flex", alignItems:"center", gap:6 },
  label:    { fontSize:12, color:"#555", fontWeight:500, marginBottom:4, display:"block" },
  input:    { width:"100%", padding:"7px 10px", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, fontSize:13, background:"white", color:"inherit", outline:"none" },
  inputRp:  { width:"100%", padding:"7px 10px 7px 32px", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, fontSize:13, background:"white", color:"inherit", outline:"none" },
  divider:  { border:"none", borderTop:"0.5px solid rgba(0,0,0,0.1)", margin:"12px 0" },
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function CurrencyInput({ value, onChange, placeholder="0", autoFocus }) {
  return (
    <div style={{ position:"relative" }}>
      <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"#888", pointerEvents:"none", zIndex:1 }}>Rp</span>
      <input type="text" value={value} onChange={(e)=>onChange(fmtCur(e.target.value))} placeholder={placeholder} style={s.inputRp} autoFocus={autoFocus}/>
    </div>
  );
}

function ModeToggle({ value, onChange }) {
  return (
    <div style={{ display:"flex", border:"0.5px solid rgba(0,0,0,0.18)", borderRadius:8, overflow:"hidden", width:"fit-content" }}>
      {[["langsung","Input Langsung"],["tabel","Daftar Barang"]].map(([mode,label])=>(
        <button key={mode} onClick={()=>onChange(mode)} style={{ padding:"7px 18px", border:"none", fontSize:12.5, cursor:"pointer", background:value===mode?"#0F6E56":"transparent", color:value===mode?"white":"#555", fontWeight:value===mode?500:400 }}>{label}</button>
      ))}
    </div>
  );
}

// Baris pajak: label kiri, nilai kanan
function TaxRow({ label, value, sub, highlight }) {
  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding: highlight?"12px 14px":"9px 2px",
      marginTop: highlight?4:0,
      borderRadius: highlight?10:0,
      background: highlight?"#E1F5EE":"transparent",
      border: highlight?"1px solid #9FE1CB":"none",
      borderBottom: highlight?"1px solid #9FE1CB":"0.5px solid rgba(0,0,0,0.06)",
    }}>
      <div>
        <div style={{ fontSize:highlight?13.5:13, fontWeight:highlight?600:400, color:highlight?"#085041":"#333" }}>{label}</div>
        {sub && <div style={{ fontSize:10.5, color:"#999", marginTop:1 }}>{sub}</div>}
      </div>
      <div style={{ fontSize:highlight?15:13.5, fontWeight:highlight?700:500, color:highlight?"#085041":"#1a1a1a" }}>{Rp(value)}</div>
    </div>
  );
}

function TaxGroupCard({ title, rows }) {
  return (
    <div style={s.card}>
      <p style={s.secTitle}>{title}</p>
      <div>
        {rows.map((r,i) => <TaxRow key={i} {...r}/>)}
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

function PerhitunganPajak() {
  const [mode, setMode] = useState("langsung");

  // Mode 1 — Input Langsung
  const [nilaiLangsung, setNilaiLangsung] = useState("");

  // Mode 2 — Daftar Barang
  const [items, setItems] = useState(() => [newRow()]);
  const volRefs = useRef({});
  const [focusRowId, setFocusRowId] = useState(null);

  const addRow = () => {
    const r = newRow();
    setItems(p => [...p, r]);
    setFocusRowId(r.id);
  };
  const removeRow = (id) => setItems(p => p.length>1 ? p.filter(r=>r.id!==id) : p);
  const updateRow = (id, field, val) => setItems(p => p.map(r => r.id===id ? {...r, [field]: val} : r));

  // Setelah baris baru ter-render, pindahkan fokus ke kolom VOL baris tsb (untuk alur keyboard-only)
  useEffect(() => {
    if (focusRowId != null) {
      const el = volRefs.current[focusRowId];
      if (el) el.focus();
      setFocusRowId(null);
    }
  }, [items, focusRowId]);

  // Di baris TERAKHIR, menekan Tab dari kolom SAT langsung membuat baris baru & pindah fokus ke situ.
  // Tombol hapus (trash) sengaja dilewati dari urutan Tab (tabIndex=-1 di tombolnya).
  const handleSatKeyDown = (e, rowId) => {
    if (e.key === "Tab" && !e.shiftKey) {
      const isLast = items[items.length-1].id === rowId;
      if (isLast) {
        e.preventDefault();
        const r = newRow();
        setItems(p => [...p, r]);
        setFocusRowId(r.id);
      }
    }
  };

  const totalVol   = items.reduce((sum,r) => sum + (parseInt((r.vol||"").toString().replace(/\D/g,""))||0), 0);
  const totalHarga = items.reduce((sum,r) => {
    const vol = parseInt((r.vol||"").toString().replace(/\D/g,""))||0;
    const sat = parseCur(r.sat);
    return sum + vol*sat;
  }, 0);

  // Nilai Barang aktif — sesuai mode yang dipilih
  const N = mode === "langsung" ? parseCur(nilaiLangsung) : totalHarga;

  const resetAll = () => {
    setMode("langsung");
    setNilaiLangsung("");
    setItems([newRow()]);
  };

  // ── GRUP 1 — Pajak Umum ──
  const dppPPN   = Math.round(N * 11/12);
  const ppn      = Math.round(dppPPN * 0.12);
  const pph22    = Math.round(N * 0.015);
  const pph23    = Math.round(N * 0.02);
  const pph4ay2  = Math.round(N * 0.005);
  const ppn1     = Math.round(ppn * 0.10);
  const ppn12    = Math.round(N * 0.12);
  const pnbp03   = Math.round(N * 0.003);
  const totalNilai = N + ppn;

  // ── GRUP 2 — PPh Konstruksi & Konsultasi ──
  const konstruksiKecil       = Math.round(N * 0.0175);
  const konstruksiSelainKecil = Math.round(N * 0.0265);
  const konsultasiBersertifikat = Math.round(N * 0.035);

  // ── GRUP 3 — PPh 21 ──
  const pph21_5   = Math.round(N * 0.05);
  const pph21_15  = Math.round(N * 0.15);
  const pph21_25  = Math.round(N * 0.025);

  return (
    <div style={{ padding:"0.75rem 0", fontSize:14, color:"#1a1a1a", fontFamily:"system-ui, sans-serif" }}>

      {/* ── Input Nilai Barang ── */}
      <div style={s.card}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem", flexWrap:"wrap", gap:8 }}>
          <p style={{...s.secTitle, margin:0}}>Nilai Barang</p>
          <button onClick={resetAll} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, color:"#B91C1C", background:"#FEF2F0", border:"1px solid #F0A8A0", borderRadius:6, padding:"5px 12px", cursor:"pointer" }}>
            <RefreshCw size={13} strokeWidth={2}/> Reset
          </button>
        </div>

        <div style={{ marginBottom:16 }}>
          <ModeToggle value={mode} onChange={setMode}/>
        </div>

        {mode === "langsung" && (
          <div>
            <label style={s.label}>Nilai Barang</label>
            <CurrencyInput value={nilaiLangsung} onChange={setNilaiLangsung} placeholder="0" autoFocus/>
          </div>
        )}

        {mode === "tabel" && (
          <div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding:"8px 6px", textAlign:"left", fontSize:11, color:"#666", fontWeight:500, borderBottom:"0.5px solid rgba(0,0,0,0.1)" }}>VOL</th>
                    <th style={{ padding:"8px 6px", textAlign:"left", fontSize:11, color:"#666", fontWeight:500, borderBottom:"0.5px solid rgba(0,0,0,0.1)" }}>SAT (Rp)</th>
                    <th style={{ padding:"8px 6px", textAlign:"right", fontSize:11, color:"#666", fontWeight:500, borderBottom:"0.5px solid rgba(0,0,0,0.1)" }}>HARGA</th>
                    <th style={{ padding:"8px 6px", width:36, borderBottom:"0.5px solid rgba(0,0,0,0.1)" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(row => {
                    const volInt = parseInt((row.vol||"").toString().replace(/\D/g,""))||0;
                    const satInt = parseCur(row.sat);
                    const harga = volInt*satInt;
                    return (
                      <tr key={row.id}>
                        <td style={{ padding:"6px", borderBottom:"0.5px solid rgba(0,0,0,0.06)" }}>
                          <input type="text" inputMode="numeric" value={row.vol}
                            ref={el => { volRefs.current[row.id] = el; }}
                            onChange={e=>updateRow(row.id,"vol", e.target.value.replace(/\D/g,""))}
                            placeholder="0" style={{...s.input, width:80}}/>
                        </td>
                        <td style={{ padding:"6px", borderBottom:"0.5px solid rgba(0,0,0,0.06)" }}>
                          <div style={{ position:"relative" }}>
                            <span style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", fontSize:12, color:"#888", pointerEvents:"none" }}>Rp</span>
                            <input type="text" value={row.sat}
                              onChange={e=>updateRow(row.id,"sat", fmtCur(e.target.value))}
                              onKeyDown={e=>handleSatKeyDown(e, row.id)}
                              placeholder="0" style={{...s.input, paddingLeft:28, minWidth:130}}/>
                          </div>
                        </td>
                        <td style={{ padding:"6px", borderBottom:"0.5px solid rgba(0,0,0,0.06)", textAlign:"right", fontSize:13, color:"#555", whiteSpace:"nowrap" }}>
                          {Rp(harga)}
                        </td>
                        <td style={{ padding:"6px", borderBottom:"0.5px solid rgba(0,0,0,0.06)", textAlign:"center" }}>
                          <button onClick={()=>removeRow(row.id)} disabled={items.length<=1} tabIndex={-1}
                            style={{ border:"none", background:"transparent", cursor:items.length<=1?"not-allowed":"pointer", color:items.length<=1?"#ddd":"#B91C1C", padding:4, display:"flex" }}>
                            <Trash2 size={15} strokeWidth={1.75}/>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td style={{ padding:"9px 6px", fontWeight:600, fontSize:13 }}>{totalVol}</td>
                    <td style={{ padding:"9px 6px", fontSize:11, color:"#888" }}>Total VOL</td>
                    <td style={{ padding:"9px 6px", textAlign:"right", fontWeight:700, fontSize:14, color:"#085041", whiteSpace:"nowrap" }}>{Rp(totalHarga)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <button onClick={addRow} style={{ display:"flex", alignItems:"center", gap:6, marginTop:10, fontSize:12.5, fontWeight:500, color:"#0F6E56", background:"#E1F5EE", border:"1px solid #9FE1CB", borderRadius:8, padding:"7px 14px", cursor:"pointer" }}>
              <Plus size={14} strokeWidth={2}/> Tambah Barang
            </button>

            <div style={{ marginTop:14, background:"#f5f5f3", borderRadius:8, padding:"10px 14px", fontSize:12.5, color:"#555" }}>
              Total HARGA (<strong>{Rp(totalHarga)}</strong>) otomatis dipakai sebagai Nilai Barang.
            </div>
          </div>
        )}

        <div style={{ marginTop:16, background:"#EEEDFE", border:"1px solid #C9C3F0", borderRadius:10, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <span style={{ fontSize:12, fontWeight:500, color:"#3C3489" }}>Nilai Barang Aktif</span>
          <span style={{ fontSize:18, fontWeight:700, color:"#3C3489" }}>{Rp(N)}</span>
        </div>
      </div>

      {/* ── Grup 1 — Pajak Umum ── */}
      <TaxGroupCard title="Pajak Umum" rows={[
        { label:"DPP PPN", sub:"N × 11/12 (dibulatkan)", value:dppPPN },
        { label:"PPN", sub:"DPP PPN × 12% (dibulatkan)", value:ppn },
        { label:"PPh 22", sub:"N × 1,5% (dibulatkan)", value:pph22 },
        { label:"PPh 23", sub:"N × 2% (dibulatkan)", value:pph23 },
        { label:"PPh 4(2) UMKM", sub:"N × 0,5% (dibulatkan)", value:pph4ay2 },
        { label:"PPN 1%", sub:"PPN × 10% (dibulatkan)", value:ppn1 },
        { label:"PPN 12%", sub:"N × 12%", value:ppn12 },
        { label:"PNBP 0,3%", sub:"N × 0,3%", value:pnbp03 },
        { label:"Total Nilai", sub:"N + PPN", value:totalNilai, highlight:true },
      ]}/>

      {/* ── Grup 2 — PPh Konstruksi & Konsultasi ── */}
      <TaxGroupCard title="PPh Konstruksi & Konsultasi" rows={[
        { label:"Konstruksi (Kecil)", sub:"N × 1,75% (dibulatkan)", value:konstruksiKecil },
        { label:"Konstruksi (Selain Kecil)", sub:"N × 2,65% (dibulatkan)", value:konstruksiSelainKecil },
        { label:"Konsultasi (Bersertifikat)", sub:"N × 3,5% (dibulatkan)", value:konsultasiBersertifikat },
      ]}/>

      {/* ── Grup 3 — PPh 21 ── */}
      <TaxGroupCard title="PPh 21" rows={[
        { label:"Tarif 5%", sub:"N × 5%", value:pph21_5 },
        { label:"Tarif 15%", sub:"N × 15%", value:pph21_15 },
        { label:"Tarif 2,5%", sub:"N × 2,5%", value:pph21_25 },
      ]}/>

    </div>
  );
}

  return PerhitunganPajak;
})();


// ════════════════════════════════════════════════════════════════════════════
// HOMEPAGE — daftar mesin pengujian tagihan
// ════════════════════════════════════════════════════════════════════════════

const PALETTE = {
  bg:        "#EAD9F2",
  cardHead:  "#37175E",
  cardHeadDisabled: "#6B6470",
  text:      "#1a1a1a",
  sub:       "#5c5568",
  border:    "rgba(0,0,0,0.08)",
  btnText:   "#37175E",
};

const ENGINES = [
  {
    id: "spd",
    title: "Tagihan SPD Jabatan Luar Kota",
    desc: "Uji kewajaran klaim SPD luar kota: uang harian, hotel, tiket, taksi, hingga representasi sesuai batas SBM.",
    cta: "Mulai",
    active: true,
  },
  {
    id: "referensi",
    title: "Referensi SPD",
    desc: "Lihat seluruh ketentuan dan batas SBM perjalanan dinas sebagai referensi, tanpa perlu menghitung.",
    cta: "Mulai",
    active: true,
  },
  {
    id: "pajak",
    title: "Perhitungan Pajak",
    desc: "Hitung DPP PPN, PPN, PPh 22/23, PPh 4(2), PPh Konstruksi/Konsultasi, dan PPh 21 secara otomatis dari Nilai Barang.",
    cta: "Mulai",
    active: true,
  },
];

function EngineCard({ engine, onSelect }) {
  const disabled = !engine.active;
  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      overflow: "hidden",
      border: `0.5px solid ${PALETTE.border}`,
      display: "flex",
      flexDirection: "column",
      opacity: disabled ? 0.72 : 1,
    }}>
      <div style={{
        background: disabled ? PALETTE.cardHeadDisabled : PALETTE.cardHead,
        padding: "1.5rem 1.35rem",
        minHeight: 96,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 6,
        position: "relative",
      }}>
        {disabled && (
          <span style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(255,255,255,0.16)", color: "#fff",
            fontSize: 10.5, fontWeight: 600, letterSpacing: ".03em",
            padding: "3px 10px", borderRadius: 20,
          }}>Coming Soon</span>
        )}
        <span style={{ color: "#fff", fontSize: 19, fontWeight: 700, lineHeight: 1.25, paddingRight: disabled ? 78 : 0 }}>
          {engine.title}
        </span>
      </div>
      <div style={{ padding: "1.35rem", display: "flex", flexDirection: "column", flex: 1, gap: "1.1rem" }}>
        <p style={{ margin: 0, fontSize: 13.5, color: PALETTE.sub, lineHeight: 1.6, flex: 1 }}>
          {engine.desc}
        </p>
        <button
          onClick={() => engine.active && onSelect(engine.id)}
          disabled={disabled}
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: 24,
            fontSize: 14,
            fontWeight: 600,
            border: disabled ? "0.5px solid rgba(0,0,0,0.12)" : `1px solid ${PALETTE.cardHead}`,
            background: disabled ? "#f2f1f4" : "#fff",
            color: disabled ? "#a9a4b0" : PALETTE.btnText,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {engine.cta}
        </button>
      </div>
    </div>
  );
}

function Home({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header putih */}
      <div style={{ background: "#fff", padding: "1.1rem 1.5rem" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: PALETTE.cardHead }}>
            Mesin Pengujian Tagihan
          </h1>
          <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "#8a8393" }}>
            Pengujian dengan Humanis adalah Kunci dari Keberhasilan
          </p>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "2.5rem 1.5rem 3rem" }}>
        <h2 style={{
          fontSize: "clamp(30px, 5vw, 48px)",
          fontWeight: 800,
          color: PALETTE.cardHead,
          margin: "0 0 2rem",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}>
          Pilih Mesin yang Ingin Kamu Gunakan
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1.1rem",
        }}>
          {ENGINES.map(e => <EngineCard key={e.id} engine={e} onSelect={onSelect} />)}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// BACK BAR — muncul di atas tiap mesin agar mudah kembali ke beranda
// ════════════════════════════════════════════════════════════════════════════

function BackBar({ title, onBack }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#fff", borderBottom: "0.5px solid rgba(0,0,0,0.08)",
      padding: "0.85rem 1.25rem",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: PALETTE.bg, color: PALETTE.cardHead,
          border: "none", borderRadius: 20, padding: "6px 14px",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}
      >
        ← Kembali
      </button>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#444" }}>{title}</span>
    </div>
  );
}

const ENGINE_TITLES = {
  spd: "Tagihan SPD Jabatan Luar Kota",
  referensi: "Referensi SPD",
  pajak: "Perhitungan Pajak",
};

// ════════════════════════════════════════════════════════════════════════════
// APP — router sederhana berbasis state
// ════════════════════════════════════════════════════════════════════════════

export default function MesinPengujianTagihan() {
  const [page, setPage] = useState("home");

  if (page === "home") {
    return <Home onSelect={setPage} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f9" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style>
      <BackBar title={ENGINE_TITLES[page]} onBack={() => setPage("home")} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.25rem" }}>
        {page === "spd" && <NS_SPDPenguji />}
        {page === "referensi" && <NS_SPDReferensi />}
        {page === "pajak" && <NS_PerhitunganPajak />}
      </div>
    </div>
  );
}
