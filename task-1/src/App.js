import { useState, useMemo } from "react";
import { employees, years, quarters, categories } from "./data";
import "./App.css";

// ── Icons ──────────────────────────────────────────────────────────────────
const MonitorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const GraduationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const BlueStar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0078d4" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const GoldStar = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#F5A623" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronDown = ({ rotated }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="2"
    style={{ transform: rotated ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ── Avatar ─────────────────────────────────────────────────────────────────
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
      color: "white", fontWeight: "700", fontSize: size * 0.33,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

// ── Podium ─────────────────────────────────────────────────────────────────
function PodiumCard({ person, rank }) {
  const isFirst = rank === 1;
  const badgeColors   = { 1: "#F5A623", 2: "#8A8A8A", 3: "#7B4F2E" };
  const podiumBg      = { 1: "#F5D370", 2: "#DDE3EA", 3: "#DDE3EA" };
  const ringColors    = { 1: "#F5A623", 2: "#BBBBBB", 3: "#A07850" };
  const avSize        = isFirst ? 88 : 64;
  const podiumHeight  = isFirst ? 165 : 120;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      flex: 1, paddingTop: isFirst ? 0 : 44,
    }}>
      {/* Avatar with ring */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <div style={{
          padding: 4, borderRadius: "50%",
          border: `3px solid ${ringColors[rank]}`,
          display: "inline-block", lineHeight: 0,
        }}>
          <Avatar person={person} size={avSize} />
        </div>
        {/* Rank badge */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 24, height: 24, borderRadius: "50%",
          background: badgeColors[rank],
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: "700", fontSize: 12,
          border: "2px solid white",
        }}>{rank}</div>
      </div>

      {/* Name */}
      <div style={{
        fontWeight: "700", fontSize: isFirst ? 17 : 14,
        marginBottom: 3, textAlign: "center", color: "#1a1a1a",
        padding: "0 8px",
      }}>
        {person.name}
      </div>

      {/* Title */}
      <div style={{
        fontSize: 12, color: "#666", marginBottom: 10,
        textAlign: "center", padding: "0 4px",
      }}>
        {person.title} ({person.code})
      </div>

      {/* Score pill */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: isFirst ? "#FFF3CD" : "white",
        border: `1px solid ${isFirst ? "#F5D370" : "#e0e0e0"}`,
        borderRadius: 24, padding: isFirst ? "6px 18px" : "4px 14px",
        fontWeight: "700", fontSize: isFirst ? 18 : 14,
        color: isFirst ? "#1a1a1a" : "#0078d4",
      }}>
        {isFirst ? <GoldStar size={18} /> : <BlueStar size={15} />}
        {person.score}
      </div>

      {/* Podium platform */}
      <div style={{
        width: "100%", height: podiumHeight,
        background: podiumBg[rank], borderRadius: "8px 8px 0 0",
        marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontSize: 80, fontWeight: "900",
          color: "rgba(0,0,0,0.06)", userSelect: "none",
        }}>{rank}</span>
      </div>
    </div>
  );
}

// ── Row ────────────────────────────────────────────────────────────────────
function Row({ person, rank, expanded, onToggle }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #ebebeb",
      borderLeft: expanded ? "3px solid #0078d4" : "1px solid #ebebeb",
      borderRadius: 8, marginBottom: 8, overflow: "hidden",
      transition: "border 0.15s",
    }}>
      {/* Main row */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 14 }}>
        {/* Rank */}
        <div style={{
          width: 28, color: "#bbb", fontWeight: "600",
          fontSize: 15, textAlign: "center", flexShrink: 0,
        }}>
          {rank}
        </div>

        {/* Avatar */}
        <Avatar person={person} size={44} />

        {/* Name + title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: "600", fontSize: 15, color: "#1a1a1a" }}>{person.name}</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
            {person.title} ({person.code})
          </div>
        </div>

        {/* Icons */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {person.monitors > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#0078d4", gap: 2 }}>
              <MonitorIcon />
              <span style={{ fontSize: 12, fontWeight: "500" }}>{person.monitors}</span>
            </div>
          )}
          {person.courses > 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#0078d4", gap: 2 }}>
              <GraduationIcon />
              <span style={{ fontSize: 12, fontWeight: "500" }}>{person.courses}</span>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, height: 36, background: "#e8e8e8", flexShrink: 0 }} />

        {/* TOTAL + score */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: 70 }}>
          <div style={{
            fontSize: 10, color: "#aaa", fontWeight: "700",
            letterSpacing: "0.08em", marginBottom: 3,
          }}>TOTAL</div>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            color: "#0078d4", fontWeight: "700", fontSize: 17,
          }}>
            <BlueStar size={16} />
            {person.score}
          </div>
        </div>

        {/* Expand button */}
        <button
          onClick={onToggle}
          style={{
            background: "none", border: "1px solid #e0e0e0",
            borderRadius: 4, cursor: "pointer",
            width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: "#0078d4",
          }}
        >
          <ChevronDown rotated={expanded} />
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "16px 20px" }}>
          <div style={{
            fontSize: 11, fontWeight: "700", color: "#aaa",
            letterSpacing: "0.1em", marginBottom: 14,
          }}>
            RECENT ACTIVITY
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ACTIVITY", "CATEGORY", "DATE", "POINTS"].map(h => (
                  <th key={h} style={{
                    textAlign: h === "POINTS" ? "right" : "left",
                    padding: "6px 10px", fontSize: 11,
                    color: "#aaa", fontWeight: "700",
                    letterSpacing: "0.08em",
                    borderBottom: "1px solid #f0f0f0",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {person.activities.map((act, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #fafafa" }}>
                  <td style={{ padding: "10px 10px", fontSize: 13, color: "#333" }}>{act.name}</td>
                  <td style={{ padding: "10px 10px" }}>
                    <span style={{
                      background: "#f0f0f0", borderRadius: 4,
                      padding: "3px 10px", fontSize: 12, color: "#555",
                    }}>{act.category}</span>
                  </td>
                  <td style={{ padding: "10px 10px", fontSize: 13, color: "#777" }}>{act.date}</td>
                  <td style={{
                    padding: "10px 10px", textAlign: "right",
                    color: "#0078d4", fontWeight: "700", fontSize: 13,
                  }}>+{act.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
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

  const selectStyle = {
    height: 38,
    padding: "0 32px 0 12px",
    border: "1px solid #d0d0d0",
    borderRadius: 4,
    background: "white",
    fontSize: 14,
    color: "#333",
    appearance: "none",
    cursor: "pointer",
    outline: "none",
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
      <div style={{ padding: "14px 24px 0", fontSize: 13, color: "#555" }}>
        <span style={{ color: "#0078d4", cursor: "pointer" }}>Home</span>
        {" / "}
        <span style={{ color: "#0078d4", cursor: "pointer" }}>EDU</span>
        {" / "}
        <span style={{ color: "#333" }}>Company Leader Board 2025</span>
      </div>

      {/* Page title */}
      <div style={{ padding: "6px 24px 20px", fontSize: 28, fontWeight: "700", color: "#1a1a1a" }}>
        Company Leader Board 2025
      </div>

      {/* Main card */}
      <div style={{
        margin: "0 24px 40px",
        background: "white",
        borderRadius: 8,
        padding: "28px 28px 32px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
      }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: "700", color: "#1a1a1a" }}>
          Leaderboard
        </h2>
        <p style={{ margin: "0 0 22px", fontSize: 13, color: "#777" }}>
          Top performers based on contributions and activity
        </p>

        {/* Filter bar */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 36,
          padding: "10px 12px",
          border: "1px solid #e0e0e0",
          borderRadius: 6,
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <select style={selectStyle} value={year} onChange={e => setYear(e.target.value)}>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
          <select style={selectStyle} value={quarter} onChange={e => setQuarter(e.target.value)}>
            {quarters.map(q => <option key={q}>{q}</option>)}
          </select>
          <select style={selectStyle} value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{
            flex: 1, minWidth: 220,
            display: "flex", alignItems: "center", gap: 8,
            height: 38, border: "1px solid #d0d0d0",
            borderRadius: 4, padding: "0 12px",
            background: "white",
          }}>
            <SearchIcon />
            <input
              placeholder="Search employee..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                border: "none", outline: "none", flex: 1,
                fontSize: 14, color: "#333", background: "transparent",
              }}
            />
          </div>
        </div>

        {/* Podium — 2nd | 1st | 3rd, platforms touch (gap: 0) */}
        {filtered.length >= 3 && (
          <div style={{
            display: "flex",
            gap: 0,
            marginBottom: 32,
            alignItems: "flex-end",
          }}>
            <PodiumCard person={filtered[1]} rank={2} />
            <PodiumCard person={filtered[0]} rank={1} />
            <PodiumCard person={filtered[2]} rank={3} />
          </div>
        )}

        {/* Ranked list */}
        <div>
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
          <div style={{ textAlign: "center", padding: "48px", color: "#aaa", fontSize: 14 }}>
            No employees found
          </div>
        )}
      </div>
    </div>
  );
}
