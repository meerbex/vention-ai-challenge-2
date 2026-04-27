import { useState, useMemo, useRef, useEffect } from "react";
import { employees, years, quarters, categories } from "./data";
import "./App.css";

const BLUE = "#0EA5E9";
const AMBER = "#CA8A04";

// ── Icons — exact Fluent UI System Icons paths (20px regular) ────────────────
// Fluent MDL2 "Presentation" icon — projector screen on stand
const PresentationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 2048 2048" fill="currentColor">
    <path d="M1920 128v1024H1088v347l384 384-90 90-358-357-358 357-90-90 384-384v-347H128V128h256V0h128v128h1024V0h128v128h256zM256 256v768h1536V256H256z" />
  </svg>
);

// ic_fluent_hat_graduation_20_regular — used for "Course"
const EducationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M8.5063 3.40025C9.4313 2.86919 10.5687 2.86919 11.4937 3.40025L18.749 7.56566C18.9042 7.65482 19 7.82022 19 7.99928C19 8.17835 18.9042 8.34374 18.7489 8.4329L16 10.0111V14.4993C16 14.6319 15.9473 14.759 15.8536 14.8528L15.852 14.8544L15.8496 14.8567L15.8428 14.8634L15.8201 14.8851C15.801 14.9031 15.7741 14.9281 15.7394 14.9589C15.6701 15.0205 15.5696 15.106 15.4389 15.2071C15.1777 15.4093 14.7948 15.6754 14.2978 15.9404C13.3033 16.4708 11.8479 16.9993 10 16.9993C8.15211 16.9993 6.69675 16.4708 5.70221 15.9404C5.20518 15.6754 4.82226 15.4093 4.5611 15.2071C4.43043 15.106 4.32994 15.0205 4.26059 14.9589C4.22591 14.9281 4.19898 14.9031 4.17992 14.8851C4.07226 14.7812 4 14.653 4 14.4993V10.0111L2 8.86288V13.4993C2 13.7754 1.77614 13.9993 1.5 13.9993C1.22386 13.9993 1 13.7754 1 13.4993V7.99928C1 7.8099 1.10529 7.64508 1.26052 7.56023L8.5063 3.40025ZM11.4937 12.5982C10.5687 13.1293 9.43131 13.1293 8.50632 12.5982L5 10.5852V14.2765C5.04686 14.3161 5.10469 14.3633 5.17327 14.4164C5.39649 14.5892 5.73232 14.8232 6.17279 15.0581C7.05325 15.5277 8.34789 15.9993 10 15.9993C11.6521 15.9993 12.9467 15.5277 13.8272 15.0581C14.2677 14.8232 14.6035 14.5892 14.8267 14.4164C14.8953 14.3633 14.9531 14.3161 15 14.2765V10.5852L11.4937 12.5982ZM10.9958 4.26748C10.3791 3.91344 9.62086 3.91344 9.0042 4.26748L2.50423 7.99928L9.00421 11.731C9.62087 12.085 10.3791 12.085 10.9958 11.731L17.4958 7.99928L10.9958 4.26748Z" />
  </svg>
);

// ic_fluent_star_20_filled
const StarFill = ({ size = 16, color = BLUE }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
    <path d="M9.10433 2.89923C9.47114 2.15598 10.531 2.15599 10.8978 2.89923L12.8282 6.81073L17.1448 7.43797C17.9651 7.55715 18.2926 8.56513 17.699 9.14366L14.5755 12.1883L15.3129 16.4875C15.453 17.3044 14.5956 17.9274 13.8619 17.5417L10.0011 15.5119L6.14018 17.5417C5.40655 17.9274 4.54913 17.3044 4.68924 16.4875L5.4266 12.1883L2.30308 9.14366C1.70956 8.56512 2.03708 7.55715 2.8573 7.43797L7.17389 6.81073L9.10433 2.89923Z" />
  </svg>
);

// ic_fluent_chevron_down_20_regular
const ChevronDown = ({ rotated }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{
      transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s",
    }}
  >
    <path d="M15.8537 7.64582C16.0493 7.84073 16.0499 8.15731 15.855 8.35292L10.39 13.8374C10.1751 14.0531 9.82574 14.0531 9.6108 13.8374L4.14582 8.35292C3.9509 8.15731 3.95147 7.84073 4.14708 7.64582C4.34269 7.4509 4.65927 7.45147 4.85418 7.64708L10.0004 12.8117L15.1466 7.64708C15.3415 7.45147 15.6581 7.4509 15.8537 7.64582Z" />
  </svg>
);

// ic_fluent_search_20_regular
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="#9CA3AF">
    <path d="M13.7291 14.4362C12.5924 15.411 11.115 16 9.5 16C5.91015 16 3 13.0899 3 9.5C3 5.91015 5.91015 3 9.5 3C13.0899 3 16 5.91015 16 9.5C16 11.115 15.411 12.5924 14.4361 13.7292L17.8535 17.1465C18.0487 17.3417 18.0487 17.6583 17.8535 17.8536C17.6799 18.0271 17.4105 18.0464 17.2156 17.9114L17.1464 17.8536L13.7291 14.4362ZM13.0196 13.7266C13.276 13.5128 13.5127 13.2761 13.7265 13.0197C14.5216 12.0659 15 10.8388 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15C10.8388 15 12.0658 14.5217 13.0196 13.7266Z" />
  </svg>
);

// ── Podium Avatar (with colored ring border) ──────────────────────────────────
function PodiumAvatar({ person, innerSize, borderColor }) {
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      style={{
        width: innerSize,
        height: innerSize,
        borderRadius: "50%",
        border: `4px solid ${borderColor}`,
        overflow: "hidden",
        flexShrink: 0,
        background: person.color || "#ccc",
      }}
    >
      {person.avatar ? (
        <img
          src={person.avatar}
          alt={person.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "700",
            fontSize: innerSize * 0.28,
          }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

// ── Row Avatar ────────────────────────────────────────────────────────────────
function Avatar({ person, size = 56 }) {
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  if (person.avatar) {
    return (
      <img
        src={person.avatar}
        alt={person.name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: person.color || "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "700",
        fontSize: size * 0.33,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ── Podium ────────────────────────────────────────────────────────────────────
function PodiumCard({ person, rank }) {
  const isFirst = rank === 1;

  // innerSize = content area; with 4px border each side = visual size
  // rank1: 112 inner → 120 visual | rank2/3: 80 inner → 88 visual
  const avInner = isFirst ? 112 : 80;
  const avBorder = isFirst ? "#FBBF24" : "white";

  const badgeCfg = {
    1: { size: 40, bg: "#EAB308", fs: 16 }, // visually ~48 with 4px border
    2: { size: 32, bg: "#94A3B8", fs: 13 },
    3: { size: 32, bg: "#92400E", fs: 13 },
  };

  const blockCfg = {
    1: { h: 160, bg: "linear-gradient(#FEF3C7, #FDE68A)" },
    2: { h: 128, bg: "linear-gradient(#E2E8F0, #CBD5E1)" },
    3: { h: 128, bg: "linear-gradient(#E2E8F0, #CBD5E1)" },
  };

  const scoreCfg = isFirst
    ? {
        bg: "#FEF9C3",
        border: "1px solid #FDE047",
        color: AMBER,
        starColor: AMBER,
      }
    : {
        bg: "white",
        border: "1px solid #E2E8F0",
        color: BLUE,
        starColor: BLUE,
      };

  const badge = badgeCfg[rank];
  const block = blockCfg[rank];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
      }}
    >
      {/* Avatar + rank badge */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <PodiumAvatar
          person={person}
          innerSize={avInner}
          borderColor={avBorder}
        />
        <div
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: badge.size,
            height: badge.size,
            borderRadius: "50%",
            background: badge.bg,
            border: "4px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "700",
            fontSize: badge.fs,
          }}
        >
          {rank}
        </div>
      </div>

      {/* Name */}
      <div
        style={{
          fontWeight: "700",
          fontSize: 20,
          color: "#0F172A",
          textAlign: "center",
          padding: "0 8px",
          marginBottom: 4,
        }}
      >
        {person.name}
      </div>

      {/* Role */}
      <div
        style={{
          fontSize: 13,
          color: "#64748B",
          textAlign: "center",
          padding: "0 4px",
          marginBottom: 12,
        }}
      >
        {person.title} ({person.code})
      </div>

      {/* Score pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: scoreCfg.bg,
          border: scoreCfg.border,
          borderRadius: 20,
          padding: "6px 16px",
          fontWeight: "700",
          fontSize: 18,
          color: scoreCfg.color,
        }}
      >
        <StarFill size={16} color={scoreCfg.starColor} />
        {person.score}
      </div>

      {/* Platform block — only outer top corner rounded to avoid gaps between adjacent platforms */}
      <div
        style={{
          width: "100%",
          height: block.h,
          background: block.bg,
          borderRadius:
            rank === 2 ? "8px 8px 0 0" : rank === 3 ? "8px 8px 0 0" : "8px 8px 0 0",
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 80,
            fontWeight: "900",
            color: "rgba(0,0,0,0.06)",
            userSelect: "none",
          }}
        >
          {rank}
        </span>
      </div>
    </div>
  );
}

// ── Row ───────────────────────────────────────────────────────────────────────
function Row({ person, rank, expanded, onToggle }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E2E8F0",
        borderLeft: expanded ? `3px solid ${BLUE}` : "1px solid #E2E8F0",
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-left 0.15s",
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 24px",
          gap: 16,
        }}
      >
        {/* Rank */}
        <div
          style={{
            width: 32,
            textAlign: "center",
            flexShrink: 0,
            fontSize: 24,
            fontWeight: "700",
            color: "#94A3B8",
          }}
        >
          {rank}
        </div>

        {/* Avatar */}
        <Avatar person={person} size={56} />

        {/* Name + role */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: "700", color: "#0F172A" }}>
            {person.name}
          </div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 2 }}>
            {person.title} ({person.code})
          </div>
        </div>

        {/* Category stat icons */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {person.monitors > 0 && (
            <div
              title="Presentation"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: BLUE,
                gap: 4,
              }}
            >
              <PresentationIcon />
              <span
                style={{ fontSize: 12, fontWeight: "600", color: "#475569" }}
              >
                {person.monitors}
              </span>
            </div>
          )}
          {person.courses > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: BLUE,
                gap: 4,
              }}
            >
              <EducationIcon />
              <span
                style={{ fontSize: 12, fontWeight: "600", color: "#475569" }}
              >
                {person.courses}
              </span>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div
          style={{ width: 1, height: 44, background: "#E2E8F0", flexShrink: 0 }}
        />

        {/* TOTAL + score */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
            minWidth: 90,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#94A3B8",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            TOTAL
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: BLUE,
              fontWeight: "700",
              fontSize: 24,
            }}
          >
            <StarFill size={20} color={BLUE} />
            {person.score}
          </div>
        </div>

        {/* Expand button — circular, slate-200 */}
        <button
          onClick={onToggle}
          style={{
            background: "#E2E8F0",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ChevronDown rotated={expanded} />
        </button>
      </div>

      {/* Expanded: Recent Activity */}
      {expanded && (
        <div style={{ borderTop: "1px solid #E2E8F0", padding: "12px 24px 16px" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: "700",
              color: "#94A3B8",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            RECENT ACTIVITY
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ACTIVITY", "CATEGORY", "DATE", "POINTS"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: h === "POINTS" ? "right" : "left",
                      padding: "4px 8px",
                      fontSize: 10,
                      color: "#94A3B8",
                      fontWeight: "700",
                      letterSpacing: "0.08em",
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {person.activities.map((act, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td
                    style={{
                      padding: "8px 8px",
                      fontSize: 13,
                      color: "#1E293B",
                    }}
                  >
                    {act.name}
                  </td>
                  <td style={{ padding: "8px 8px" }}>
                    <span
                      style={{
                        background: "#F1F5F9",
                        borderRadius: 20,
                        padding: "2px 10px",
                        fontSize: 12,
                        color: "#475569",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {act.category}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "8px 8px",
                      fontSize: 13,
                      color: "#64748B",
                    }}
                  >
                    {act.date}
                  </td>
                  <td
                    style={{
                      padding: "8px 8px",
                      textAlign: "right",
                      color: BLUE,
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
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

// ── Date helpers for filtering ────────────────────────────────────────────────
const MONTHS = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };

function parseDate(dateStr) {
  // "17-Dec-2025" → Date
  const [d, m, y] = dateStr.split("-");
  return new Date(parseInt(y), MONTHS[m], parseInt(d));
}

function getQuarter(date) {
  const m = date.getMonth();
  if (m <= 2) return "Q1";
  if (m <= 5) return "Q2";
  if (m <= 8) return "Q3";
  return "Q4";
}

// ── FluentDropdown — matches original ms-Dropdown open/close behavior ─────────
function FluentDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
      {/* Trigger */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          height: 32,
          padding: "0 28px 0 8px",
          border: "1px solid rgb(55,55,55)",
          borderRadius: open ? "2px 2px 0 0" : "2px",
          background: "rgb(235,235,237)",
          fontSize: 14,
          color: "#000",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          userSelect: "none",
          position: "relative",
          whiteSpace: "nowrap",
          minWidth: 100,
          fontFamily: "inherit",
        }}
      >
        {value}
        <span style={{
          position: "absolute", right: 8, top: "50%",
          transform: `translateY(-50%) ${open ? "rotate(180deg)" : "rotate(0deg)"}`,
          transition: "transform 0.15s",
          display: "flex",
          pointerEvents: "none",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {/* Panel */}
      {open && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: -1,
          minWidth: "calc(100% + 2px)",
          background: "rgb(235,235,237)",
          border: "1px solid rgb(55,55,55)",
          borderTop: "none",
          borderRadius: "0 0 2px 2px",
          zIndex: 1000,
          overflow: "hidden",
        }}>
          {options.map((opt) => (
            <div
              key={opt}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              style={{
                height: 36,
                padding: "0 8px",
                fontSize: 14,
                color: opt === value ? "rgb(21,21,21)" : "rgb(0,0,0)",
                background: opt === value ? "rgb(234,234,234)" : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { if (opt !== value) e.currentTarget.style.background = "rgb(243,242,241)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = opt === value ? "rgb(234,234,234)" : "transparent"; }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [year, setYear] = useState("All Years");
  const [quarter, setQuarter] = useState("All Quarters");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const isFiltered = year !== "All Years" || quarter !== "All Quarters" || category !== "All Categories";

    return employees
      .map((e) => {
        const nameMatch = !q || e.name.toLowerCase().includes(q) || e.title.toLowerCase().includes(q);
        if (!nameMatch) return null;

        if (!isFiltered) return e; // original score + all activities

        // Filter recent activities by active criteria
        let acts = e.activities;
        if (year !== "All Years") acts = acts.filter((a) => parseDate(a.date).getFullYear().toString() === year);
        if (quarter !== "All Quarters") acts = acts.filter((a) => getQuarter(parseDate(a.date)) === quarter);
        if (category !== "All Categories") acts = acts.filter((a) => a.category === category);

        if (acts.length === 0) return null;

        const score    = acts.reduce((s, a) => s + a.points, 0);
        const monitors = acts.filter((a) => a.category === "Public Speaking").length;
        const courses  = acts.filter((a) => a.category === "Course").length;
        return { ...e, activities: acts, score, monitors, courses };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);
  }, [year, quarter, category, search]);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f2f1",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* max-width 1200 centred container */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      {/* Main card */}
      <div
        style={{
          marginTop: 28,
          marginBottom: 40,
          background: "white",
          borderRadius: 8,
          padding: "28px 28px 36px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: 22,
            fontWeight: "700",
            color: "#0F172A",
          }}
        >
          Leaderboard
        </h2>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: "#64748B" }}>
          Top performers based on contributions and activity
        </p>

        {/* Filter bar — no surrounding border/bg, just gap between items (matches original) */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 36,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FluentDropdown value={year} onChange={setYear} options={years} />
          <FluentDropdown value={quarter} onChange={setQuarter} options={quarters} />
          <FluentDropdown value={category} onChange={setCategory} options={categories} />
          {/* Search: same dark border + gray bg as dropdowns */}
          <div
            style={{
              flex: 1,
              minWidth: 220,
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 32,
              border: "1px solid rgb(55,55,55)",
              borderRadius: 2,
              padding: "0 12px",
              background: "rgb(235,235,237)",
            }}
          >
            <SearchIcon />
            <input
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: 14,
                color: "#374151",
                background: "transparent",
                fontFamily: "inherit",
              }}
            />
            {search && (
              <span
                onClick={() => setSearch("")}
                style={{ cursor: "pointer", color: "#605e5c", fontSize: 18, lineHeight: 1, flexShrink: 0, userSelect: "none" }}
              >×</span>
            )}
          </div>
        </div>

        {/* Podium — 2nd | 1st | 3rd, flex-end so platforms all share the same base */}
        {filtered.length >= 1 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 32, alignItems: "flex-end" }}>
            {filtered.length >= 2
              ? <PodiumCard person={filtered[1]} rank={2} />
              : <div style={{ flex: 1 }} />}
            <PodiumCard person={filtered[0]} rank={1} />
            {filtered.length >= 3
              ? <PodiumCard person={filtered[2]} rank={3} />
              : <div style={{ flex: 1 }} />}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 20px",
              background: "#FBF8F4",
              borderRadius: 8,
              border: "1px solid #E8E2DA",
              fontSize: 14,
              color: "#555",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#999" strokeWidth="1.5">
              <circle cx="10" cy="10" r="8" />
              <line x1="10" y1="6" x2="10" y2="11" />
              <circle cx="10" cy="14" r="0.5" fill="#999" />
            </svg>
            No activities found matching the current filters.
          </div>
        )}
      </div>
      </div> {/* end max-width container */}
    </div>
  );
}
