import { useState, useMemo } from "react";
import { employees, years, quarters, categories } from "./data";
import "./App.css";

const BLUE = "#0EA5E9";
const AMBER = "#CA8A04";

// ── Icons (Fluent MDL2 style) ─────────────────────────────────────────────────
// "Presentation" icon — E7B7 in Fluent MDL2
const PresentationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M1 3.5A1.5 1.5 0 012.5 2h15A1.5 1.5 0 0119 3.5v9a1.5 1.5 0 01-1.5 1.5H11v1.5h2a.5.5 0 010 1H7a.5.5 0 010-1h2V14H2.5A1.5 1.5 0 011 12.5v-9zM2 3.5v9a.5.5 0 00.5.5h15a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-15a.5.5 0 00-.5.5zM4 6h12v1H4V6zm0 2.5h9v1H4v-1zM4 11h7v1H4v-1z"/>
  </svg>
);

// "Education" icon — E7BE in Fluent MDL2
const EducationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.372 1.64a.75.75 0 00-.744 0L.878 6.89a.75.75 0 000 1.297l2.372 1.299V13.5A2.5 2.5 0 005.75 16h8.5a2.5 2.5 0 002.5-2.5V9.486l1.5-.821V14a.75.75 0 001.5 0V8.938a.75.75 0 00-.378-.649L10.372 1.64zM15.25 10.3l-4.878 2.67a.75.75 0 01-.744 0L4.75 10.3V13.5c0 .552.448 1 1 1h8.5c.552 0 1-.448 1-1V10.3zM10 3.154L17.228 7.25 10 11.347 2.772 7.25 10 3.154z"/>
  </svg>
);

const StarFill = ({ size = 16, color = BLUE }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const ChevronDown = ({ rotated }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
    stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: rotated ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <polyline points="5 8 10 13 15 8" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
    <circle cx="9" cy="9" r="6" />
    <line x1="15.5" y1="15.5" x2="20" y2="20" />
  </svg>
);

// ── Podium Avatar (with colored ring border) ──────────────────────────────────
function PodiumAvatar({ person, innerSize, borderColor }) {
  const initials = person.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div style={{
      width: innerSize, height: innerSize,
      borderRadius: "50%",
      border: `4px solid ${borderColor}`,
      overflow: "hidden",
      flexShrink: 0,
      background: person.color || "#ccc",
    }}>
      {person.avatar ? (
        <img src={person.avatar} alt={person.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: "700", fontSize: innerSize * 0.28,
        }}>{initials}</div>
      )}
    </div>
  );
}

// ── Row Avatar ────────────────────────────────────────────────────────────────
function Avatar({ person, size = 56 }) {
  const initials = person.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  if (person.avatar) {
    return (
      <img src={person.avatar} alt={person.name}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: person.color || "#ccc",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "white", fontWeight: "700", fontSize: size * 0.33, flexShrink: 0,
    }}>{initials}</div>
  );
}

// ── Podium ────────────────────────────────────────────────────────────────────
function PodiumCard({ person, rank }) {
  const isFirst = rank === 1;

  // innerSize = content area; with 4px border each side = visual size
  // rank1: 112 inner → 120 visual | rank2/3: 80 inner → 88 visual
  const avInner  = isFirst ? 112 : 80;
  const avBorder = isFirst ? "#FBBF24" : "white";

  const badgeCfg = {
    1: { size: 40, bg: "#EAB308", fs: 16 },  // visually ~48 with 4px border
    2: { size: 32, bg: "#94A3B8", fs: 13 },
    3: { size: 32, bg: "#92400E", fs: 13 },
  };

  const blockCfg = {
    1: { h: 160, bg: "linear-gradient(#FEF3C7, #FDE68A)" },
    2: { h: 128, bg: "linear-gradient(#E2E8F0, #CBD5E1)" },
    3: { h: 128, bg: "linear-gradient(#E2E8F0, #CBD5E1)" },
  };

  const scoreCfg = isFirst
    ? { bg: "#FEF9C3", border: "1px solid #FDE047", color: AMBER, starColor: AMBER }
    : { bg: "white",   border: "1px solid #E2E8F0", color: BLUE,  starColor: BLUE  };

  const badge = badgeCfg[rank];
  const block = blockCfg[rank];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
      {/* Avatar + rank badge */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <PodiumAvatar person={person} innerSize={avInner} borderColor={avBorder} />
        <div style={{
          position: "absolute", bottom: -2, right: -2,
          width: badge.size, height: badge.size, borderRadius: "50%",
          background: badge.bg,
          border: "4px solid white",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: "700", fontSize: badge.fs,
        }}>{rank}</div>
      </div>

      {/* Name */}
      <div style={{ fontWeight: "700", fontSize: 20, color: "#0F172A", textAlign: "center", padding: "0 8px", marginBottom: 4 }}>
        {person.name}
      </div>

      {/* Role */}
      <div style={{ fontSize: 13, color: "#64748B", textAlign: "center", padding: "0 4px", marginBottom: 12 }}>
        {person.title} ({person.code})
      </div>

      {/* Score pill */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: scoreCfg.bg, border: scoreCfg.border,
        borderRadius: 20, padding: "6px 16px",
        fontWeight: "700", fontSize: 18, color: scoreCfg.color,
      }}>
        <StarFill size={16} color={scoreCfg.starColor} />
        {person.score}
      </div>

      {/* Platform block */}
      <div style={{
        width: "100%", height: block.h,
        background: block.bg,
        borderRadius: "12px 12px 0 0",
        marginTop: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 80, fontWeight: "900", color: "rgba(0,0,0,0.06)", userSelect: "none" }}>{rank}</span>
      </div>
    </div>
  );
}

// ── Row ───────────────────────────────────────────────────────────────────────
function Row({ person, rank, expanded, onToggle }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #E2E8F0",
      borderLeft: expanded ? `3px solid ${BLUE}` : "1px solid #E2E8F0",
      borderRadius: 12,
      overflow: "hidden",
      transition: "border-left 0.15s",
    }}>
      {/* Main row */}
      <div style={{ display: "flex", alignItems: "center", padding: "20px 24px", gap: 16 }}>

        {/* Rank */}
        <div style={{ width: 32, textAlign: "center", flexShrink: 0, fontSize: 24, fontWeight: "700", color: "#94A3B8" }}>
          {rank}
        </div>

        {/* Avatar */}
        <Avatar person={person} size={56} />

        {/* Name + role */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: "700", color: "#0F172A" }}>{person.name}</div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 2 }}>
            {person.title} ({person.code})
          </div>
        </div>

        {/* Category stat icons */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {person.monitors > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: BLUE, gap: 4 }}>
              <PresentationIcon />
              <span style={{ fontSize: 12, fontWeight: "600", color: "#475569" }}>{person.monitors}</span>
            </div>
          )}
          {person.courses > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: BLUE, gap: 4 }}>
              <EducationIcon />
              <span style={{ fontSize: 12, fontWeight: "600", color: "#475569" }}>{person.courses}</span>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, height: 44, background: "#E2E8F0", flexShrink: 0 }} />

        {/* TOTAL + score */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, minWidth: 90 }}>
          <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: "600", letterSpacing: "0.5px" }}>TOTAL</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: BLUE, fontWeight: "700", fontSize: 24 }}>
            <StarFill size={20} color={BLUE} />
            {person.score}
          </div>
        </div>

        {/* Expand button — circular, slate-200 */}
        <button onClick={onToggle} style={{
          background: "#E2E8F0", border: "none", borderRadius: "50%",
          cursor: "pointer", width: 36, height: 36,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <ChevronDown rotated={expanded} />
        </button>
      </div>

      {/* Expanded: Recent Activity */}
      {expanded && (
        <div style={{ borderTop: "1px solid #F1F5F9", padding: "16px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: "700", color: "#94A3B8", letterSpacing: "0.1em", marginBottom: 14 }}>
            RECENT ACTIVITY
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ACTIVITY", "CATEGORY", "DATE", "POINTS"].map(h => (
                  <th key={h} style={{
                    textAlign: h === "POINTS" ? "right" : "left",
                    padding: "6px 10px", fontSize: 11,
                    color: "#94A3B8", fontWeight: "700", letterSpacing: "0.08em",
                    borderBottom: "1px solid #F1F5F9",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {person.activities.map((act, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #F8FAFC" }}>
                  <td style={{ padding: "12px 10px", fontSize: 14, color: "#1E293B" }}>{act.name}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span style={{
                      background: "#F1F5F9", borderRadius: 6,
                      padding: "4px 10px", fontSize: 12, color: "#475569",
                    }}>{act.category}</span>
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 13, color: "#64748B" }}>{act.date}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right", color: BLUE, fontWeight: "700", fontSize: 14 }}>
                    +{act.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [year, setYear]         = useState("All Years");
  const [quarter, setQuarter]   = useState("All Quarters");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch]     = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() =>
    employees.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.title.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const toggle = id => setExpanded(prev => prev === id ? null : id);

  const dropdownStyle = {
    height: 36,
    padding: "0 32px 0 12px",
    border: "1px solid #E2E8F0",
    borderRadius: 6,
    background: "white",
    fontSize: 14,
    color: "#374151",
    appearance: "none",
    cursor: "pointer",
    outline: "none",
    fontFamily: "inherit",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f2f1",
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Breadcrumb */}
      <div style={{ padding: "14px 32px 0", fontSize: 13, color: "#555" }}>
        <span style={{ color: BLUE, cursor: "pointer" }}>Home</span>
        {" / "}
        <span style={{ color: BLUE, cursor: "pointer" }}>EDU</span>
        {" / "}
        <span style={{ color: "#333" }}>Company Leader Board 2025</span>
      </div>

      {/* Page title */}
      <div style={{ padding: "8px 32px 20px", fontSize: 28, fontWeight: "700", color: "#0F172A" }}>
        Company Leader Board 2025
      </div>

      {/* Main card */}
      <div style={{
        margin: "0 32px 40px",
        background: "white",
        borderRadius: 8,
        padding: "28px 28px 36px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: "700", color: "#0F172A" }}>
          Leaderboard
        </h2>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: "#64748B" }}>
          Top performers based on contributions and activity
        </p>

        {/* Filter bar */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 36,
          padding: "10px 12px",
          border: "1px solid #E2E8F0",
          borderRadius: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <select style={dropdownStyle} value={year} onChange={e => setYear(e.target.value)}>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
          <select style={dropdownStyle} value={quarter} onChange={e => setQuarter(e.target.value)}>
            {quarters.map(q => <option key={q}>{q}</option>)}
          </select>
          <select style={dropdownStyle} value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{
            flex: 1, minWidth: 220,
            display: "flex", alignItems: "center", gap: 8,
            height: 36, border: "1px solid #E2E8F0",
            borderRadius: 6, padding: "0 12px",
            background: "white",
          }}>
            <SearchIcon />
            <input
              placeholder="Search employee..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                border: "none", outline: "none", flex: 1,
                fontSize: 14, color: "#374151", background: "transparent",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Podium — 2nd | 1st | 3rd, flex-end so platforms all share the same base */}
        {filtered.length >= 3 && (
          <div style={{ display: "flex", gap: 0, marginBottom: 32, alignItems: "flex-end" }}>
            <PodiumCard person={filtered[1]} rank={2} />
            <PodiumCard person={filtered[0]} rank={1} />
            <PodiumCard person={filtered[2]} rank={3} />
          </div>
        )}

        {/* Ranked list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map((person, i) => (
            <Row
              key={person.id}
              person={person}
              rank={i + 1}
              expanded={expanded === person.id}
              onToggle={() => toggle(person.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: "#94A3B8", fontSize: 14 }}>
            No employees found
          </div>
        )}
      </div>
    </div>
  );
}
