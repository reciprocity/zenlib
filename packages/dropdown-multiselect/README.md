# Dropdown Multiselect

A component that renders a dropdown for selecting multiple values.

## Installation

```
npm install @reciprocity/dropdown-multiselect
```
or
```
yarn add @reciprocity/dropdown-multiselect
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

After importing you can just register it with Vue. Eg:

app.vue

```vue
<template>
    <dropdown-multiselect v-model='value' :options='options' @input='change' />
</template>
<script>
	import DropdownMultiselect from '@reciprocity/dropdown-multiselect';

	export default Vue.extend({
		name: 'My App',
		components: {
			DropdownMultiselect
		}
	};
```
