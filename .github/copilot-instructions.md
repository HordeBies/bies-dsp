# BIES-DSP: Dyson Sphere Program Resource Counter

**Project**: React-based resource counter for Dyson Sphere Program game  
**Tech Stack**: React, TypeScript (recommended), Vite, CSS/Tailwind, localStorage  
**Purpose**: Simple UI to count game resources with data-driven interface and persistent storage

---

## Code Style

- **Naming**: React components use PascalCase (e.g., `ResourceCounter`), utilities/hooks use camelCase
- **File structure**: `src/components/`, `src/utils/`, `src/hooks/`, `src/types/` (flat unless 3+ related files)
- **TypeScript**: Prefer interfaces for component props, types for utility returns
- **Formatting**: Prettier configured for 2-space indent, 80-char line wrap

**Key style exemplar**: Look for existing component files that enforce naming and structure patterns

---

## Architecture

### Component Hierarchy

- **App**: Root component, loads data.json, manages global resource state
- **ResourceList**: Maps resources from data.json → `ResourceItem` components (container)
- **ResourceItem**: Single resource row (data-driven): displays name, count (editable), +/- buttons
- **EditableNumber**: Reusable input field with validation, keyboard shortcuts (Enter to save, Esc to cancel)

### Data Flow

1. **Load**: Read `data.json` at app init → extract resource names and IDs
2. **Count**: User interacts (int +/- buttons, edit field) → state updates
3. **Persist**: On any count change, save to `localStorage` with key `dsp-counters`
4. **Sync**: On mount, restore counts from localStorage; fallback to 0 if missing

### Storage Schema

```json
{
  "dsp-counters": {
    "iron-ore": 15,
    "titanium": 8,
    "copper": 42
  }
}
```

---

## Build and Test

### Commands

```bash
# Install dependencies
npm install

# Dev server (Vite, hot reload)
npm run dev

# Build for production
npm run build

# Run type checking (if using TypeScript)
npm run type-check

# Format/lint (Prettier + ESLint recommended)
npm run format
npm run lint

# Optional: unit tests (if added)
npm run test
```

### First-time Setup

1. Clone repo
2. Run `npm install`
3. Create `src/data.json` with resource list (see Data Format below)
4. Run `npm run dev` → app opens at `http://localhost:5173`

### data.json Format

```json
{
  "resources": [
    { "id": "iron-ore", "name": "Iron Ore" },
    { "id": "titanium", "name": "Titanium" },
    { "id": "copper", "name": "Copper Ore" }
  ]
}
```

---

## Conventions

### DSP Styling: Cyberpunk/Futuristic Aesthetic

**Color Palette** (inspired by DSP UI):

- **Primary**: Deep blue-purple (`#1a0033`, `#2d0052`) — dominant background
- **Accent**: Neon cyan/electric blue (`#00ffff`, `#0099ff`) — interactive elements, borders, highlights
- **Secondary**: Neon pink/magenta (`#ff00ff`, `#ff1493`) — warnings, secondary accents
- **Text**: Light gray (`#e0e0e0`), pure white for headings
- **Grid lines**: Faint cyan grid overlay (`rgba(0, 255, 255, 0.1)`)

**Typography**:

- Font: Monospace or futuristic sans-serif (system: `Courier New`, `SF Mono`; web: `JetBrains Mono`, `Space Mono`)
- Font weight: 300 (light) for body, 600+ (bold) for labels/buttons
- Text shadow: Subtle glow effect on interactive text (`text-shadow: 0 0 8px rgba(0, 255, 255, 0.6)`)

**Components**:

- **Borders**: Thin solid lines in neon cyan, 1–2px; optional dotted grid pattern
- **Buttons**: Flat design; hover state adds glow (`box-shadow: 0 0 12px #00ffff`)
- **Input fields**: Dark background (`#0a0015`), cyan border on focus, thin glowing underline
- **Resource rows**: Slight background color shift on hover, subtle grid pattern behind text

**Example**: A resource row might look like:

```
┌─────────────────────────────────┐
│ Iron Ore        [15] ─ ┼ ┼ + │  ← cyan text, dark background
│                          └──────┘ ← neon grid faintly visible
```

### Component Patterns

- **Props validation**: Always include prop interface/type
- **State logic**: Use `useState` for local state (count, editing flag), consider `useReducer` if complex
- **Effects**: Use `useEffect` for localStorage sync only—avoid dependency array pitfalls
- **Error handling**: Gracefully handle missing data.json (fallback to empty list)

### Testing (if applicable)

- Unit tests for `EditableNumber` validation and edge cases
- Integration tests for +/- button interactions and localStorage persistence
- Manual browser testing: JSON load failures, concurrent edits, localStorage full scenarios

---

## Key Files and Structure

```
bies-dsp/
├── .github/
│   └── copilot-instructions.md    ← You are here
├── src/
│   ├── App.tsx                     ← Root, data load, state mgmt
│   ├── App.css                     ← Global styles (DSP theme)
│   ├── components/
│   │   ├── ResourceList.tsx        ← Maps resources → items
│   │   ├── ResourceItem.tsx        ← Single resource row
│   │   ├── EditableNumber.tsx      ← Input field with validation
│   │   └── *.css                   ← Component-scoped styles
│   ├── hooks/
│   │   └── useLocalStorage.ts      ← localStorage sync hook
│   ├── utils/
│   │   └── storage.ts              ← localStorage helpers
│   ├── types/
│   │   └── index.ts                ← TSResource, AppState, etc.
│   ├── data.json                   ← Resource definitions (must exist)
│   ├── main.tsx                    ← Entry point
│   └── index.css                   ← Reset & theme variables
├── vite.config.ts                  ← Vite config
├── tsconfig.json                   ← TypeScript config
├── package.json
├── package-lock.json
└── README.md                        ← User-facing docs
```

**Critical files**:

- `data.json`: Defines all countable resources—agent must ensure it exists before app runs
- `App.tsx`: Central logic; localStorage sync happens here
- `App.css`: DSP theme variables and baseline styles

---

## Development Workflow

### Adding a New Resource

1. Edit `src/data.json`: add entry to `resources` array
2. App auto-detects and renders new row
3. Count persists via localStorage

### Styling a Component

1. Create `src/components/ComponentName.css`
2. Use DSP color vars (define in `index.css`): `--color-primary`, `--color-accent`, etc.
3. Test glow effects and grid overlays on dark background

### Debugging

- **Storage issues**: Check browser DevTools → Application → localStorage → `dsp-counters`
- **Load failures**: Verify `src/data.json` path and JSON syntax
- **TypeScript errors**: Run `npm run type-check` before push

### Common Tasks

**Bump count for a resource**:

```javascript
// Manual localStorage edit (dev only)
localStorage.setItem(
  'dsp-counters',
  JSON.stringify({
    'iron-ore': 25, // updated value
    titanium: 8,
  }),
);
```

**Reset all counts**:

```javascript
localStorage.removeItem('dsp-counters');
location.reload();
```

**Export counts as JSON**:

- Use browser DevTools to copy localStorage content
- Or add export UI button to App component

---

## Agent-Critical Gotchas

1. **data.json must exist**: App crashes silently if missing. Ensure it's created before running dev server.
2. **localStorage key**: Always use exact key `dsp-counters`—if changed, old data is orphaned.
3. **Hot reload quirks**: Vite hot reload may not update localStorage subscriptions; full refresh (`Ctrl+Refresh`) resyncs state.
4. **Type safety**: If using TypeScript, define resource types strictly—prevents runtime "name undefined" errors.
5. **Browser storage limits**: Negligible for this scale, but avoid logging entire state to localStorage in production.

---

## Suggested First Steps

1. **Generate minimal project scaffold**: Create `vite.config.ts`, `tsconfig.json`, `package.json`, `src/` folder
2. **Create data.json**: With 3–5 sample resources (Iron, Titanium, Copper, etc.)
3. **Build App.tsx**: Component shell + useState for counters + localStorage sync
4. **Implement ResourceItem + EditableNumber**: UI row with +, −, and editable field
5. **Apply DSP styling**: Add theme variables and cyberpunk aesthetic to CSS
6. **Test**: Manual browser testing of count, persistence, and reload

---

## References

- **React docs**: https://react.dev
- **Vite guide**: https://vitejs.dev
- **localStorage API**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **DSP game**: https://www.dysonsphereprogram.com/ (visual reference for cyberpunk aesthetic)
