# Moddable SDK Instruction

The [Moddable SDK](https://github.com/Moddable-OpenSource/moddable) allows JavaScript developer to code for various microcontrollers.

- `memory.bmp` - 1bit depth BMP image
- `icons.js` - Mapping for each icon in the BMP file

## Usage

Coming soon.

```json
// manifest.json
{
    "include": [
		"$(MODDABLE)/examples/manifest_base.json",
		"$(MODDABLE)/examples/manifest_typings.json",
		"$(MODDABLE)/examples/manifest_commodetto.json",
		"$(MODDABLE)/modules/files/resourceiterator/manifest.json"
	],
    "resources": {
		"*": [
			"./assets/memory",
		]
	},
}
```

```js
// Code sample
```