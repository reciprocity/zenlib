/* This file holds helpers that enables easier turning vue components into
    web components */

function getAvailableProps(component) {
  let props = {};
  props = { ...props, ...component.props };
  for (const mixin of component.mixins) {
    props = { ...props, ...mixin.props };
  }
  return props;
}

export function addChildrenProps(original, components) {
  // this.$attrs is always empty when used as web component.
  // This is why we use this._props instead $attrs,
  // but this._props holds only values of attributes that matches *known* props.

  // So if we want attr value for a prop that's declared by some child component,
  // we need to merge child's props with parent props.
  // And this is exactly what we do in this function:
  for (const component of components) {
    const compProps = getAvailableProps(component);
    for (const key in compProps) {
      if (
        Object.prototype.hasOwnProperty.call(compProps, key) &&
        !Object.prototype.hasOwnProperty.call(original, key)
      ) {
        original[key] = compProps[key];
      }
    }
    return original;
  }
}

export function parseProp(value, defValue) {
  let result = value;
  if (typeof value === "string") {
    try {
      result = JSON.parse(result);
    } catch (error) {
      result = defValue;
    }
  }
  return result;
}
