# BIES-DSP: Dyson Sphere Program Resource Counter

A minimal React-based resource counter for the Dyson Sphere Program game. Track multiple resource types with persistent browser storage and a cyberpunk-themed DSP aesthetic.

## Features

✨ **Data-Driven**: Resources defined in `src/data.json`  
💾 **Persistent**: Counts stored in browser localStorage  
✏️ **Editable**: Click to edit counts directly  
🎮 **Cyberpunk UI**: DSP-inspired neon cyan & deep purple styling  
⚡ **Responsive**: Mobile-friendly layout  
🔒 **Type-Safe**: Full TypeScript support

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens http://localhost:5173)
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Available Scripts

- `npm run dev` — Start Vite dev server with hot reload
- `npm run build` — Build optimized production bundle
- `npm run preview` — Preview production build locally
- `npm run type-check` — Run TypeScript type checking
- `npm run format` — Format code with Prettier
- `npm run lint` — Lint with ESLint (if configured)

## Project Structure

```
src/
├── App.tsx                 # Root component, data loading, state management
├── App.css                 # App styles (DSP theme)
├── main.tsx                # Entry point
├── index.css               # Theme variables, reset styles, grid background
├── data.json               # Resource definitions (loaded at runtime)
├── components/
│   ├── ResourceList.tsx    # Container component mapping resources
│   ├── ResourceItem.tsx    # Single resource row with +/−/edit
│   └── EditableNumber.tsx  # Editable number input field
├── hooks/
│   └── useLocalStorage.ts  # localStorage sync hook
├── utils/
│   └── storage.ts          # localStorage helpers
└── types/
    └── index.ts            # TypeScript interfaces
```

## Data Format

Create or modify `src/data.json` to add/remove resources:

```json
{
  "resources": [
    { "id": "iron-ore", "name": "Iron Ore" },
    { "id": "titanium", "name": "Titanium" },
    { "id": "copper", "name": "Copper Ore" }
  ]
}
```

Resources are hot-reloaded when you save the file.

## Storage

Counts are persisted to browser localStorage under the key `dsp-counters`:

```javascript
{
  "dsp-counters": {
    "iron-ore": 15,
    "titanium": 8,
    "copper": 42,
    ...
  }
}
```

### Reset Storage (Dev Only)

```javascript
// Open browser DevTools console:
localStorage.removeItem('dsp-counters');
location.reload();
```

## Styling

The app uses a **DSP Cyberpunk Aesthetic** with:
- **Colors**: Neon cyan (`#00ffff`), deep purple (`#1a0033`), neon pink (`#ff00ff`)
- **Fonts**: Monospace (`JetBrains Mono`, `Courier New`)
- **Effects**: Glow text shadows, grid background, hover animations

Theme colors and effects are defined as CSS variables in `src/index.css`:

```css
--color-primary-dark: #1a0033;
--color-accent-bright: #00ffff;
--glow-md: 0 0 12px rgba(0, 255, 255, 0.6);
```

Customize by editing these variables.

## Usage

1. **Add/Remove Resources**: Edit `src/data.json` and save
2. **Increment/Decrement**: Click `+` or `−` buttons
3. **Edit Directly**: Click on the count number to inline-edit
   - Press Enter to save
   - Press Escape to cancel
4. **Persistence**: Changes auto-save to localStorage

## Type Safety

The project uses strict TypeScript. Run type checking before committing:

```bash
npm run type-check
```

Key types are defined in `src/types/index.ts`:

- `Resource` — Single resource definition
- `ResourceData` — Root data structure from JSON
- `ResourceCounts` — In-memory count state
- `AppState` — Global application state

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development Tips

### Hot Reload
Vite provides fast hot module replacement (HMR) on file changes. If localStorage doesn't resync after edits, do a full browser refresh (`Ctrl+Shift+R`).

### localStorage Full
This app stores negligible data, but if localStorage is full:
1. Check DevTools → Application → Storage
2. Clear unrelated data
3. Refresh the page

### Debug Storage
```javascript
// In browser console:
console.log(JSON.parse(localStorage.getItem('dsp-counters')));
```

## License

MIT

## References

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [DSP Game](https://www.dysonsphereprogram.com/)
