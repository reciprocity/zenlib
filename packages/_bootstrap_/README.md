# Webpack customization files

This package is the place we'll keep all of our Bootstrap custom variables and colors, to be used in all projects.

## Usage

Basically, you would use this package alongside Bootstrap and BootstrapVue. And the way you use it is importing the provided `scss/custom.scss` file before importing Bootstrap and importing `scss/overrides.scss` afterwards.

*main.scss*
```
@import "~@reciprocity/bootstrap/scss/custom.scss";
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
@import "~@reciprocity/bootstrap/scss/overrides.scss";
```

This way, Bootstrap has all of our custom colors and variables available when it loads while additional styling overrides are applied on top.
