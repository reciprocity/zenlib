# Colors

Here is presented the colors set that are available to use through the Reciprocity applications.

## Installation

The way you import all the colors, is importing the following:

```
@import '~@reciprocity/styles/scss/colors.scss'; // custom colors

@import '~@reciprocity/bootstrap/scss/colors.scss'; // bootstrap colors

```

Also, we are are ready to import our scss files into our Javascript files:

```
import customColors from '~@reciprocity/styles/scss/colors.scss';

import bootstrapColors from '~@reciprocity/bootstrap/scss/colors.scss';

```

This will generate a pretty nice list of colors where each color key will be prefixed with the nested object key name.

For example, looking at the gray colors group in ~@reciprocity/bootstrap/scss/colors.scss:

```
  ...
  gray: {
    color-white: $color-white;
    color-alabaster: $color-alabaster;
    color-wild-sand: $color-wild-sand;
    color-athens-gray: $color-athens-gray;
    color-geyser: $color-geyser;
    color-iron: $color-iron;
    color-ghost: $color-ghost;
    color-hit-gray: $color-hit-gray;
    color-regent-gray: $color-regent-gray;
    color-oslo-gray: $color-oslo-gray;
    color-trout: $color-trout;
    color-gray: $color-gray;
    color-shark: $color-shark;
    color-black: $color-black;
    color-ebony-clay: $color-ebony-clay;
  };
  ...

```

Then, color-white will come in as gray-color-white.


