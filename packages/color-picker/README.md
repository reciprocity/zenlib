# Button

A color picker where you can select the color or type the relevant HEX value.

## Installation

```
npm install @reciprocity/color-picker
```
or
```
yarn add @reciprocity/color-picker
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

After importing you can just register it with Vue. Eg:

app.vue

```vue
<template>
	<color-picker value="#0099FF" />
</template>
<script>
	import ColorPicker from '@reciprocity/color-picker';

	export default Vue.extend({
		name: 'My App',
		components: {
			ColorPicker
		}
	};
</script>
```
