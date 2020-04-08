export function parseColor(colorObj) {
  var hex = colorObj.value.substring(1);
  var r = parseInt(hex.substring(0, 2), 16) / 255;
  var g = parseInt(hex.substring(2, 4), 16) / 255;
  var b = parseInt(hex.substring(4, 6), 16) / 255;

  var max = Math.max.apply(Math, [r, g, b]);
  var min = Math.min.apply(Math, [r, g, b]);

  var chr = max - min;
  var hue = 0;
  var val = max;
  var sat = 0;

  if (val > 0) {
    sat = chr / val;
    if (sat > 0) {
      if (r == max) {
        hue = 60 * ((g - min - (b - min)) / chr);
        if (hue < 0) {
          hue += 360;
        }
      } else if (g == max) {
        hue = 120 + 60 * ((b - min - (r - min)) / chr);
      } else if (b == max) {
        hue = 240 + 60 * ((r - min - (g - min)) / chr);
      }
    }
  }
  colorObj.chroma = chr;
  colorObj.hue = hue;
  colorObj.sat = sat;
  colorObj.val = val;
  colorObj.luma = 0.3 * r + 0.59 * g + 0.11 * b;
  return colorObj;
}

const scaleName = color => {
  const array = color.split("-")[0].split(/(?=[A-Z])/);
  return `${array.join(" ")}`;
};

const colorVariable = color => {
  const array = color.split("-").splice(1);
  return `$${array
    .join("-")
    .split(":")[0]
    .toLowerCase()}`;
};

export const mergePalettes = (pal1, pal2) => {
  function createObj(pal, color, obj) {
    const group = scaleName(color);
    if (!obj[group]) obj[group] = [];
    obj[group].push({
      variable: colorVariable(color),
      value: pal[color]
    });
  }
  const group1 = Object.keys(pal1).reduce((acc, color) => {
    createObj(pal1, color, acc);
    return acc;
  }, {});

  const group2 = Object.keys(pal2).reduce((acc, color) => {
    createObj(pal2, color, acc);
    return acc;
  }, group1);

  Object.keys(group2).forEach(g => {
    group2[g].sort((a, b) => {
      const parsedA = parseColor(a);
      const parsedB = parseColor(b);

      return parsedA.luma - parsedB.luma;
    });
  });

  return group2;
};
