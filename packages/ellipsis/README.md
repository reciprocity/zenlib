# ColorInput

A wrapper component that can shorten long text blocks to two lines and then expands when user clicks on `More` link.

## Installation

```
npm install @reciprocity/ellipsis
```
or
```
yarn add @reciprocity/ellipsis
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax. After importing you can just register it with Vue.

Any text you want to shorten is passed in the default slot of the component.

app.vue

```vue
<template>
	<ellipsis>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eleifend lorem massa, id porta mi efficitur vitae. Nunc vestibulum nibh sed molestie placerat. Ut euismod sem eget aliquet vehicula. Suspendisse volutpat tortor at pharetra eleifend. Mauris at maximus nulla. Suspendisse sagittis porttitor pulvinar. Mauris eu pulvinar dui. Aenean tempus rutrum augue, ac efficitur justo congue vel. Sed viverra fringilla dolor, non laoreet ligula congue eu. Praesent vehicula odio id hendrerit vehicula. Nullam nulla ex, ornare ac lacinia et, porttitor at augue. Suspendisse aliquet nibh aliquet, dignissim neque sed, luctus ligula.
		</p>
	</ellipsis>
</template>
<script>
	import Ellipsis from '@reciprocity/ellipsis';

	export default Vue.extend({
		name: 'My App',
		components: {
			Ellipsis
		}
	};
</script>
```
