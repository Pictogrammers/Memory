# Memory Icons

The Memory icon set contains 22x22 pixelated icons. Ideal for the Sharp Memory 2.7" Display.

![Preview](assets/preview.svg)

[Pictogrammers - Memory Icon Library](https://pictogrammers.com/library/memory/)

## Usage

### TypeScript / JavaScript

ES6 Package allows quick reference to the SVG path data for any icon.

```bash
npm install @pictogrammers/memory --save-dev
```

```ts
import { MemoryAccount } from '@pictogrammers/memory';

console.log(MemoryAccount); // M...Z
```

### SVG

This package includes all the SVG files, `meta.json`, and `font-build.json`.

```bash
npm install @pictogrammers/memory-svg --save-dev
```

### Moddable SDK

[View the usage instructions for the Moddable SDK](moddable)

### Playdate

[View the usage instructions for Playdate devs](playdate)

## Contributions

Create an issue instead of a Pull Request.

### Request an Icon

1. Create an issue requesting the icon.
1. Include examples of the icon.

### Contribute an Icon

1. Create an issue with the name of the icon.
1. Include the source path in a code block.
    ````markdown
    ```svg
    M...Z
    ```
    ````

> [Pictogrammers - Pixel Editor](https://pictogrammers.github.io/@pictogrammers/pixel-editor/)
> - No install, edit Memory icons directly in your browser.
> - Start from an existing icon to save time.
> - Optimized for pen input.

## Development

- `npm run preview` - Generates `assets/preview.svg`
- `npm run playdate` - Generates Playdate files.