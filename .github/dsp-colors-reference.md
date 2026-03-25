# DSP-Accurate Color Palette Reference

**Source**: [dsp-ratios.com](https://dsp-ratios.com/) - Authentic Dyson Sphere Program UI styling

## Neon Primary Colors

These colors use LCH format for perceptually uniform color representation. LCH is superior to RGB/Hex because it provides consistent perceived brightness across all hues.

### Neon Colors
```css
--neon-white:      lch(100 0 0 / 0.76);      /* Pure white with transparency */
--neon-red:        lch(75 45.02 40.39 / 0.78);         /* Neon red (warnings) */
--neon-orange:     lch(72 58.89 52.09 / 0.8);          /* Neon orange */
--neon-orange2:    lch(84 44.1 74.07);                  /* Bright orange */
--neon-yellow:     lch(97 79.89 103.3 / 0.76);         /* Neon yellow (highlight) */
--neon-green:      lch(89 78.97 147.57 / 0.83);        /* Neon green (success) */
--neon-cyan:       lch(88 36.65 209.6 / 0.78);         /* Neon cyan (primary) */
--neon-blue:       lch(87 21.33 249.3 / 0.77);         /* Neon blue (secondary) */
--neon-purple:     lch(67 74.83 318.61 / 0.85);        /* Neon purple (accent) */
```

## Tech State Colors

Used for technology research tree and technology availability states.

```css
--tech-unavailable:       lch(30 0.01 0);           /* Locked/unavailable tech (dark gray) */
--tech-available:         lch(24 16.68 233.76);     /* Available for research (blue tint) */
--tech-available-border:  white;                     /* Border for available tech */
--tech-researched:        lch(30 16.84 158.35);     /* Completed research (green tint) */
--tech-researched-border: var(--neon-orange2);      /* Border for researched tech */
```

## Matrix (Inventory Item) Colors

Used for Matrix/inventory item type colorization. **Matrix** is the game term; **jello** is the internal data representation in DSP's codebase.

```css
--jello-none:      lch(50 6.53 269.61);     /* Neutral (no category) */
--jello-blue:      lch(64 38.07 237.02);    /* Blue Matrix items */
--jello-red:       lch(59 57.06 18.87);     /* Red Matrix items */
--jello-yellow:    lch(90 86.79 91.46);     /* Yellow Matrix items */
--jello-purple:    lch(51 80.13 307.82);    /* Purple Matrix items */
--jello-green:     lch(74 70.36 139.05);    /* Green Matrix items */
--jello-white:     lch(87 6.53 269.61);     /* White/neutral Matrix items */
```

## Usage in BIES-DSP

### Current Implementation (v1.0)
- **Primary Text**: `--neon-cyan` (main interface labels, resource names)
- **Interactive Elements**: `--neon-cyan` border + `--neon-blue` on hover
- **Buttons**: Cyan on dark, inverted on hover with glow
- **Errors/Warnings**: `--neon-red`
- **Count Editor**: `--neon-blue` border + text
- **Glows**: Cyan-based box shadows for depth
- **Matrix Colors**: `--jello-*` variables (future expansion for Matrix item categorization)

### Color Psychology in DSP Context
- **Cyan** (`--neon-cyan`): Primary actionable interface - visibility and calm energy
- **Blue** (`--neon-blue`): Secondary interactions - stability and secondary functions
- **Green** (`--neon-green`): Success states and resource availability
- **Yellow** (`--neon-yellow`): Important highlights and warnings
- **Red** (`--neon-red`): Error states and critical warnings
- **Orange** (`--neon-orange2`): Completed tasks and secondary highlights
- **Purple** (`--neon-purple`): Special/tier items and premium states

## LCH Format Benefits

LCH (Lightness, Chroma, Hue) provides several advantages over RGB/Hex:

1. **Perceptual Uniformity**: Colors with same lightness appear equally bright
2. **Consistency Across Hues**: All neon colors are calibrated for same visual impact
3. **Accessibility**: Better contrast for varying visual abilities
4. **Animation-Ready**: Smooth transitions between LCH colors feel more natural
5. **Game Accurate**: Matches original DSP UI rendering system

## Conversion Reference

If you need hex equivalents for fallback support:
- `--neon-cyan`: ~#00ffff (with transparency)
- `--neon-blue`: ~#0099ff (with transparency)
- `--neon-red`: ~#ff3333 (with transparency)
- `--neon-green`: ~#00ff00 (with transparency)
- `--neon-yellow`: ~#ffff00 (with transparency)

*Note: Hex conversions are approximate. LCH provides superior color management.*

## References
- [dsp-ratios.com CSS Source](https://dsp-ratios.com/assets/index-eiujzC5p.css)
- [MDN: LCH Color Model](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch)
- [Dyson Sphere Program](https://www.dysonsphereprogram.com/)
