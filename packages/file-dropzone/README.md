# FileDropzone

A file input field with file drag and drop support.

## Installation

```
npm install @reciprocity/file-dropzone
```
or
```
yarn add @reciprocity/file-dropzone
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

After importing you can just register it with Vue. Eg:

app.vue

```vue
<template>
	<file-dropzone multiple @input="fileSelected" />
</template>
<script>
	import FileDropzone from '@reciprocity/file-dropzone';

	export default Vue.extend({
		name: 'My App',
		components: {
			FileDropzone
		},
		methods: {
			fileSelected(file) {
				console.log('File selected!');
			}
		}
	};
</script>
```
