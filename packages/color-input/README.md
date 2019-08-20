# Button

An input field that includes a color picker

## Installation

```
npm install @reciprocity/color-input
```
or
```
yarn add @reciprocity/color-input
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

After importing you can just register it with Vue. Eg:

app.vue

```vue
<template>
	<color-input value="#0099FF" />
</template>
<script>
	import ColorInput from '@reciprocity/color-input';

	export default Vue.extend({
		name: 'My App',
		components: {
			ColorInput
		}
	};
</script>
```
