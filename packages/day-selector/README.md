# DaySelector

A component that lets you pick days of the week.

## Installation

```
npm install @reciprocity/day-selector
```
or
```
yarn add @reciprocity/day-selector
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

After importing you can just register it with Vue. Eg:

app.vue

```vue
<template>
	<day-selector :value="[]" @input="onDaysSelected" />
</template>
<script>
	import DaySelector from '@reciprocity/day-selector';

	export default Vue.extend({
		name: 'My App',
		components: {
			DaySelector
		},
		methods: {
			onDaysSelected: days => {
				console.log('new days selected', days);
			}
		}
	};
</script>
```
