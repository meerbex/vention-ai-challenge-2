import { useState, useMemo } from "react";
import { employees, years, quarters, categories } from "./data";
import "./App.css";

// ── Icons (Fluent UI style) ───────────────────────────────────────────────
const MonitorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="#0078d4">
    <path d="M2 4.5C2 3.67157 2.67157 3 3.5 3H16.5C17.3284 3 18 3.67157 18 4.5V12.5C18 13.3284 17.3284 14 16.5 14H10.5V15.5H13.5C13.7761 15.5 14 15.7239 14 16C14 16.2761 13.7761 16.5 13.5 16.5H6.5C6.22386 16.5 6 16.2761 6 16C6 15.7239 6.22386 15.5 6.5 15.5H9.5V14H3.5C2.67157 14 2 13.3284 2 12.5V4.5ZM3.5 4C3.22386 4 3 4.22386 3 4.5V12.5C3 12.7761 3.22386 13 3.5 13H16.5C16.7761 13 17 12.7761 17 12.5V4.5C17 4.22386 16.7761 4 16.5 4H3.5Z" />
  </svg>
);

const GraduationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="#0078d4">
    <path d="M10 2.10526L18 6.31579V12.6316C18 12.9077 17.7761 13.1316 17.5 13.1316C17.2239 13.1316 17 12.9077 17 12.6316V6.84211L10 10.5263L2 6.31579L10 2.10526ZM10 11.5789L3 7.89474V13.1579C3 15.1011 6.13401 16.8421 10 16.8421C13.866 16.8421 17 15.1011 17 13.1579V7.89474L10 11.5789Z" />
  </svg>
);

const BlueStar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0078d4">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const GoldStar = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffc107">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const ChevronDown = ({ rotated }) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"
    style={{ transform: rotated ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <path d="M15.8536 7.64645C16.0488 7.84171 16.0488 8.15829 15.8536 8.35355L10.3536 13.8536C10.1583 14.0488 9.84171 14.0488 9.64645 13.8536L4.14645 8.35355C3.95118 8.15829 3.95118 7.84171 4.14645 7.64645C4.34171 7.45118 4.65829 7.45118 4.85355 7.64645L10 12.7929L15.1464 7.64645C15.3417 7.45118 15.6583 7.45118 15.8536 7.64645Z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="#605e5c">
    <path d="M8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.8335 14 11.0503 13.5247 11.9968 12.7333L15.6316 16.3684C15.8269 16.5637 16.1435 16.5637 16.3387 16.3684C16.534 16.1732 16.534 15.8566 16.3387 15.6613L12.7333 11.9968C13.5247 11.0503 14 9.8335 14 8.5C14 5.46243 11.5376 3 8.5 3ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z" />
  </svg>
);

// ── Components ─────────────────────────────────────────────────────────────

function SharePointGlobalHeader() {
  return (
    <div style={{
      height: 48, background: "#323130", display: "flex", alignItems: "center",
      padding: "0 16px", color: "white", gap: 20
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
          <path d="M4 4H6V6H4V4ZM7 4H9V6H7V4ZM10 4H12V6H10V4ZM4 7H6V9H4V7ZM7 7H9V9H7V7ZM10 7H12V9H10V7ZM4 10H6V12H4V10ZM7 10H9V12H7V10ZM10 10H12V12H10V10Z" />
        </svg>
        <div style={{ fontWeight: "600", fontSize: 16 }}>vention</div>
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.3)" }} />
        <div style={{ fontWeight: "600", fontSize: 16 }}>SharePoint</div>
      </div>
      <div style={{
        flex: 1, maxWidth: 480, height: 32, background: "white", borderRadius: 2,
        display: "flex", alignItems: "center", padding: "0 12px", gap: 8
      }}>
        <SearchIcon />
        <input placeholder="Search this site" style={{ border: "none", outline: "none", flex: 1, fontSize: 14 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: "auto" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M10 2C10.5523 2 11 2.44772 11 3V3.10137C13.8117 3.51151 16 5.94595 16 8.9V14.1716L17.1505 15.3221C17.4338 15.6054 17.2333 16.0882 16.8339 16.0882H3.16612C2.76669 16.0882 2.5662 15.6054 2.84951 15.3221L4 14.1716V8.9C4 5.94595 6.18833 3.51151 9 3.10137V3C9 2.44772 9.44772 2 10 2Z" /></svg>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 14.5C10.2761 14.5 10.5 14.7239 10.5 15C10.5 15.2761 10.2761 15.5 10 15.5C9.72386 15.5 9.5 15.2761 9.5 15C9.5 14.7239 9.72386 14.5 10 14.5ZM10 4.5C11.3807 4.5 12.5 5.61929 12.5 7C12.5 8.2435 11.5937 9.27483 10.421 9.47547L10.25 9.5V11.5C10.25 11.7761 10.0261 12 9.75 12C9.47386 12 9.25 11.7761 9.25 11.5V9C9.25 8.72386 9.47386 8.5 9.75 8.5C10.7165 8.5 11.5 7.82843 11.5 7C11.5 6.17157 10.8284 5.5 10 5.5C9.17157 5.5 8.5 6.17157 8.5 7C8.5 7.27614 8.27614 7.5 8 7.5C7.72386 7.5 7.5 7.27614 7.5 7C7.5 5.61929 8.61929 4.5 10 4.5Z" /></svg>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0078d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: "600", color: "white" }}>IM</div>
      </div>
    </div>
  );
}

function SharePointSiteHeader() {
  const navItems = ["Knowledge Base", "Company Info", "News & Events", "Personal Growth", "Benefits", "Policies", "Instructions and Guides", "Locations", "Spaces"];
  return (
    <div style={{ background: "white", borderBottom: "1px solid #edebe9", padding: "0 24px" }}>
      <div style={{ height: 44, display: "flex", alignItems: "center", gap: 24, fontSize: 14, color: "#323130" }}>
        {navItems.map((item, i) => (
          <div key={i} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            {item}
            {(i === 1 || i === 2 || i === 3 || i === 7 || i === 8) && <ChevronDown />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Avatar({ person, size = 48 }) {
  if (person.avatar) {
    return (
      <img
        src={person.avatar}
        alt={person.name}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
      />
    );
  }
  const initials = person.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: person.color || "#ccc",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "white", fontWeight: "600", fontSize: size * 0.35,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function PodiumCard({ person, rank }) {
  const isFirst = rank === 1;
  const badgeColors   = { 1: "#ffc107", 2: "#a19f9d", 3: "#8a8886" };
  const podiumBg      = { 1: "#f2d16d", 2: "#d2d5d8", 3: "#d2d5d8" };
  const ringColors    = { 1: "#ffc107", 2: "#d2d5d8", 3: "#d2d5d8" };
  const avSize        = isFirst ? 110 : 80;
  const podiumHeight  = isFirst ? 200 : 150;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      flex: 1, paddingTop: isFirst ? 0 : 60, position: "relative"
    }}>
      {/* Avatar with ring */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <div style={{
          padding: 4, borderRadius: "50%",
          border: `4px solid ${ringColors[rank]}`,
          display: "inline-block", lineHeight: 0,
        }}>
          <Avatar person={person} size={avSize} />
        </div>
        {/* Rank badge */}
        <div style={{
          position: "absolute", bottom: 6, right: 6,
          width: 32, height: 32, borderRadius: "50%",
          background: badgeColors[rank],
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: "700", fontSize: 16,
          border: "3px solid white",
        }}>{rank}</div>
      </div>

      {/* Name */}
      <div style={{
        fontWeight: "700", fontSize: isFirst ? 22 : 18,
        marginBottom: 4, textAlign: "center", color: "#323130",
      }}>
        {person.name}
      </div>

      {/* Title */}
      <div style={{
        fontSize: 13, color: "#605e5c", marginBottom: 12,
        textAlign: "center", padding: "0 10%", lineHeight: 1.4
      }}>
        {person.title} ({person.code})
      </div>

      {/* Score pill */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: isFirst ? "#fff8e1" : "white",
        border: `1px solid ${isFirst ? "#f2d16d" : "#edebe9"}`,
        borderRadius: 24, padding: "6px 16px",
        fontWeight: "700", fontSize: isFirst ? 18 : 16,
        color: "#323130", boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
      }}>
        {isFirst ? <GoldStar size={20} /> : <BlueStar size={18} />}
        {person.score}
      </div>

      {/* Podium platform — full width, outer-only corner radius to avoid gaps */}
      <div style={{
        width: "100%", height: podiumHeight,
        background: podiumBg[rank],
        borderRadius: rank === 2 ? "8px 0 0 0" : rank === 3 ? "0 8px 0 0" : "0 0 0 0",
        marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden"
      }}>
        <span style={{
          fontSize: 120, fontWeight: "800",
          color: "rgba(0,0,0,0.06)", userSelect: "none",
        }}>{rank}</span>
      </div>
    </div>
  );
}

function Row({ person, rank, expanded, onToggle }) {
  return (
    // Card container matching original: border radius 12px, shadow, border
    <div style={{
      background: "white",
      border: "1px solid #E2E8F0",
      borderLeft: expanded ? "3px solid #0078d4" : "1px solid #E2E8F0",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "rgba(0,0,0,0.1) 0px 1px 3px 0px",
      transition: "border-left 0.15s",
    }}>
      {/* Row content — padding 20px 24px matches original row_2943a085 */}
      <div style={{ display: "flex", alignItems: "center", padding: "20px 24px", gap: 16, cursor: "pointer" }} onClick={onToggle}>
        <div style={{ width: 28, color: "#94A3B8", fontSize: 16, fontWeight: "700", textAlign: "center", flexShrink: 0 }}>{rank}</div>
        <Avatar person={person} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: "600", fontSize: 15, color: "#0F172A" }}>{person.name}</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{person.title} ({person.code})</div>
        </div>
        {/* Icons — courses first, then monitors (matches original) */}
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {person.courses > 0 && (
            <div title="Course" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: "#0078d4" }}>
              <GraduationIcon />
              <span style={{ fontSize: 11, fontWeight: "600", color: "#475569" }}>{person.courses}</span>
            </div>
          )}
          {person.monitors > 0 && (
            <div title="Public Speaking" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: "#0078d4" }}>
              <MonitorIcon />
              <span style={{ fontSize: 11, fontWeight: "600", color: "#475569" }}>{person.monitors}</span>
            </div>
          )}
        </div>
        {/* Vertical divider */}
        <div style={{ width: 1, height: 40, background: "#E2E8F0", flexShrink: 0 }} />
        {/* TOTAL + score */}
        <div style={{ textAlign: "right", minWidth: 80 }}>
          <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: "700", letterSpacing: "0.5px" }}>TOTAL</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 5, color: "#0078d4", fontWeight: "700", fontSize: 18 }}>
            <BlueStar size={16} />
            {person.score}
          </div>
        </div>
        {/* Expand button — circular */}
        <button onClick={e => { e.stopPropagation(); onToggle(); }} style={{
          background: "#F1F5F9", border: "none", borderRadius: "50%",
          cursor: "pointer", width: 36, height: 36, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#0078d4",
        }}>
          <ChevronDown rotated={expanded} />
        </button>
      </div>
      {/* Expanded activity panel */}
      {expanded && (
        <div style={{ borderTop: "1px solid #F1F5F9", padding: "16px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: "700", color: "#94A3B8", letterSpacing: "0.1em", marginBottom: 14 }}>RECENT ACTIVITY</div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ACTIVITY", "CATEGORY", "DATE", "POINTS"].map(h => (
                  <th key={h} style={{
                    textAlign: h === "POINTS" ? "right" : "left",
                    padding: "6px 10px", fontSize: 11, color: "#94A3B8",
                    fontWeight: "700", letterSpacing: "0.08em", borderBottom: "1px solid #F1F5F9",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {person.activities.map((act, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #F8FAFC" }}>
                  <td style={{ padding: "12px 10px", fontSize: 14, color: "#1E293B" }}>{act.name}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span style={{ background: "#F1F5F9", borderRadius: 4, padding: "3px 10px", fontSize: 12, color: "#475569" }}>{act.category}</span>
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 13, color: "#64748B" }}>{act.date}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right", color: "#0078d4", fontWeight: "700", fontSize: 14 }}>+{act.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [year, setYear] = useState("All Years");
  const [quarter, setQuarter] = useState("All Quarters");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() =>
    employees.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.title.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const toggle = id => setExpanded(prev => prev === id ? null : id);

  // Exact from original: dark border rgb(55,55,55), gray bg rgb(235,235,237), 2px radius, 32px height
  const selectStyle = {
    height: 32, padding: "0 28px 0 10px",
    border: "1px solid rgb(55,55,55)", borderRadius: 2,
    background: "rgb(235,235,237)", fontSize: 14, color: "#000",
    appearance: "none", cursor: "pointer", outline: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f2f1", color: "#323130" }}>
      <SharePointGlobalHeader />
      <SharePointSiteHeader />

      <div style={{ padding: "20px 48px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, marginBottom: 12, color: "#605e5c" }}>
          <span style={{ borderBottom: "1px solid transparent", cursor: "pointer", color: "#0078d4" }}>Home</span>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ borderBottom: "1px solid transparent", cursor: "pointer", color: "#0078d4" }}>EDU</span>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "#323130" }}>Company Leader Board 2025</span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: "600", margin: "0 0 32px", color: "#323130" }}>
          Company Leader Board 2025
        </h1>

        <div style={{
          background: "white", borderRadius: 2, padding: "32px",
          boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,0.13), 0 0.3px 0.9px 0 rgba(0,0,0,0.11)"
        }}>
          <h2 style={{ fontSize: 24, fontWeight: "600", margin: "0 0 4px" }}>Leaderboard</h2>
          <p style={{ fontSize: 14, color: "#605e5c", marginBottom: 24 }}>Top performers based on contributions and activity</p>

          {/* Filter bar — no surrounding border/bg, individual items have their own styling */}
          <div style={{ display: "flex", gap: 12, marginBottom: 40, alignItems: "center", flexWrap: "wrap" }}>
            <select style={selectStyle} value={year} onChange={e => setYear(e.target.value)}>{years.map(y => <option key={y}>{y}</option>)}</select>
            <select style={selectStyle} value={quarter} onChange={e => setQuarter(e.target.value)}>{quarters.map(q => <option key={q}>{q}</option>)}</select>
            <select style={selectStyle} value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select>
            <div style={{
              flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 8,
              height: 32, border: "1px solid rgb(55,55,55)", borderRadius: 2,
              padding: "0 10px", background: "rgb(235,235,237)"
            }}>
              <SearchIcon />
              <input
                placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ border: "none", outline: "none", flex: 1, fontSize: 14, color: "#323130" }}
              />
            </div>
          </div>

          {filtered.length >= 3 && (
            <div style={{ display: "flex", gap: 0, marginBottom: 48, alignItems: "flex-end" }}>
              <PodiumCard person={filtered[1]} rank={2} />
              <PodiumCard person={filtered[0]} rank={1} />
              <PodiumCard person={filtered[2]} rank={3} />
            </div>
          )}

          {/* List — flex column gap:16 matches original list_2943a085 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((person, i) => (
              <Row
                key={person.id} person={person} rank={i + 1}
                expanded={expanded === person.id} onToggle={() => toggle(person.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#a19f9d" }}>No results found</div>}
        </div>
      </div>
    </div>
  );
}
