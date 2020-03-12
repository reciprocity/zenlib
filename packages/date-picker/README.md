# Date Picker

A datepicker / datetimepicker component

## Installation

```
npm install @reciprocity/date-picker
```

or

```
yarn add @reciprocity/date-picker
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

After importing you can just register it with Vue. Eg:

app.vue

```vue
<template>
  <date-picker />
</template>
<script>
import DatePicker from '@reciprocity/date-picker';

export default Vue.extend({
  name: 'My App',
  components: {
    DatePicker
  }
};
</script>
```
