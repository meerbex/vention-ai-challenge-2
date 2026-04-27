# Task 1 Report — The Clone Wars

## Approach

I used **Claude Code** (AI-enhanced IDE) to build this leaderboard replica entirely through AI-assisted "vibe coding" — no manual code was written.

### Process

1. **Analyzed the original** — Used Claude Code's Playwright MCP integration to open the original leaderboard in a browser, take screenshots, and inspect the UI at every scroll position including expanded rows.

2. **Identified all UI components** from screenshots:
   - Page header with breadcrumb navigation
   - Filter bar: 3 dropdown selectors (Year, Quarter, Category) + search input
   - Top-3 podium with gold/silver/bronze styling, rank badges, and score pills
   - Ranked list rows with avatar, name, role/code, category icons (monitor, graduation cap), total score, and expandable chevron
   - Expanded row showing "Recent Activity" table with activity name, category badge, date, and points

3. **Built with React + Tailwind CSS** — Generated the full app using AI prompting, including fake employee data to replace all real names, titles, and department codes.

4. **Deployed to GitHub Pages** via the `gh-pages` package.

## Data Replacement

All real employee names, photos, and department codes were replaced with:
- **Names**: Fictional international names (e.g., "Alex Johnson", "Maria Petrova", "Sophie Williams")
- **Titles**: Generic engineering/QA/HR titles matching the originals
- **Department codes**: Fictional codes using the same format pattern (e.g., `US.U1.D1.G1`, `EU.U1.G3`)
- **Avatars**: Color-coded initials instead of real photos
- **Activities**: Fictional but realistic-sounding EDU activity names

## Tools Used

- **Claude Code** — primary AI IDE for code generation and browser automation
- **Playwright MCP** — screenshot capture and UI inspection of the original
- **React 19** — frontend framework
- **Tailwind CSS 3** — styling
- **gh-pages** — GitHub Pages deployment
- **Create React App** — project scaffolding
