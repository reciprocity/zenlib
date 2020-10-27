# Multiselect

A select component with support multi value selection, auto-complete, etc.

Based on [Vue Multiselect](https://vue-multiselect.js.org). Check out [the documentation](https://vue-multiselect.js.org/#sub-getting-started) for more options.

## Installation

```
npm install @reciprocity/multiselect
```
or
```
yarn add @reciprocity/multiselect
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

After importing you can just register it with Vue. Eg:

app.vue

```vue
<template>
	<multiselect v-model='value' :options='options'>Click me!</multiselect>
</template>
<script>
	import ZenButton from '@reciprocity/button';

	export default Vue.extend({
		name: 'My App',
		data() {
			return {
				value: null,
				options: ['Argentina', 'Slovenia', 'United States']
			}
		},
		components: {
			Multiselect
		}
	};
</script>
```
