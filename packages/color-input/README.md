# Button

A generic button Vue.js component.

#### Dependencies

_This component depends on `bootstrap`, `bootstrap-vue`, and `@reciprocity/bootstrap` packages. So make sure you have those installed and imported wherever you're gonna use this component._

## Installation

```
npm install @reciprocity/button
```
or
```
yarn add @reciprocity/button
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

After importing you can just register it with Vue. Eg:

app.vue

```vue
<template>
	<zen-button>Click me!</zen-button>
</template>
<script>
	import ZenButton from '@reciprocity/button';

	export default Vue.extend({
		name: 'My App',
		components: {
			ZenButton
		}
	};
</script>
```
