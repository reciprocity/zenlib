# Zen Tabs

A select component with support multi value selection, auto-complete, etc.

## Installation

```
npm install @reciprocity/tabs
```
or
```
yarn add @reciprocity/tabs
```

## Usage

This component is meant to be used as an ES module, so you can import it using the ES6 `import` syntax.

*Note!*
This component is *not meant to be used as standalone component* (it has no border, no background, ...).
It should be wrapped inside a parent componet!

## Available properties

- *items*
    type: Array,
    default: () => []

- *label*
    Items property that should be printed out in item
    type: String,
    default: "label"

- *customLabel*
    Custom function to substitute text for each item
    type: `function(item) { return 'custom string'; }`,
    default: undefined

- *moreText*
    Custom function to substitute text for more item
    type: `function(count) { return '+' + count + ' items'; }`,
    default: undefined

- *limitItemWidth*
    Width of more item to be used in available space calculation
    type: Number,
    default: 40

## Available slotes
- *item*
- *moreItemsCount*

## Available events
- *removeClicked*
    x on item was clicked. Parent component should do actual item removal!