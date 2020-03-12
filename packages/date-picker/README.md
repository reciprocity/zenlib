# Date Picker

A datepicker / datetimepicker component. This this basically a wrapper of [vue2-datepicker](https://github.com/mengxiong10/vue2-datepicker)

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
  <date-picker v-model="time" valueType="format"></date-picker>
</template>
<script>
import DatePicker from '@reciprocity/date-picker';

export default Vue.extend({
  name: 'My App',
  data: {
    time: null
  },
  components: {
    DatePicker
  }
};
</script>
```

### Props

| Prop                | Description                                    | Type                                        | Default                |
| ------------------- | ---------------------------------------------- | ------------------------------------------- | -----------------------|
| type                | select the type of picker                      | date \|datetime\|year\|month\|time\|week    | 'date'                 |
| range               | if true, pick the range date                   | `boolean`                                   | false                  |
| format              | to set the date format. similar to moment.js   | [token](#token)                             | 'YYYY-MM-DD'           |
| value-type          | data type of the binding value                 | [value-type](#value-type)                   | 'date'                 |
| default-value       | default date of the calendar                   | `Date`                                      | new Date()             |
| lang                | override the default locale                    | `object`                                    | [here](#default-locale)|
| placeholder         | input placeholder text                         | `string`                                    | ''                     |
| editable            | whether the input is editable                  | `boolean`                                   | true                   |
| clearable           | if false, don't show the clear icon            | `boolean`                                   | true                   |
| confirm             | if true, need click the button to change value | `boolean`                                   | false                  |
| confirm-text        | the text of confirm button                     | `string`                                    | 'OK'                   |
| disabled            | disable the component                          | `boolean`                                   | false                  |
| disabled-date       | specify the date that cannot be selected       | `(date) => boolean`                         | -                      |
| disabled-time       | specify the time that cannot be selected       | `(date) => boolean`                         | -                      |
| append-to-body      | append the popup to body                       | `boolean`                                   | true                   |
| inline              | without input                                  | `boolean`                                   | false                  |
| input-class         | input classname                                | `string`                                    | 'mx-input'             |
| input-attr          | input attrs(eg: { name: 'date', id: 'foo'})    | `object`                                    | —                      |
| open                | open state of picker                           | `boolean`                                   | -                      |
| popup-style         | popup style                                    | `object`                                    | —                      |
| popup-class         | popup classes                                  |                                             | —                      |
| shortcuts           | set shortcuts to select                        | `Array<{text, onClick}>`                    | -                      |
| title-format        | format of the tooltip in calendar cell         | [token](#token)                             | 'YYYY-MM-DD'           |
| partial-update      | whether update date when select year or month  | `boolean`                                   | false                  |
| range-separator     | text of range separator                        | `string`                                    | ' ~ '                  |
| show-week-number    | determine whether show week number             | `boolean`                                   | false                  |
| hour-step           | interval between hours in time picker          | 1 - 60                                      | 1                      |
| minute-step         | interval between minutes in time picker        | 1 - 60                                      | 1                      |
| second-step         | interval between seconds in time picker        | 1 - 60                                      | 1                      |
| hour-options        | custom hour column                             | `Array<number>`                             | -                      |
| minute-options      | custom minute column                           | `Array<number>`                             | -                      |
| second-options      | custom second column                           | `Array<number>`                             | -                      |
| show-hour           | whether show hour column                       | `boolean`                                   | base on format         |
| show-minute         | whether show minute column                     | `boolean`                                   | base on format         |
| show-second         | whether show second column                     | `boolean`                                   | base on format         |
| use12h              | whether show ampm column                       | `boolean`                                   | base on format         |
| show-time-header    | whether show header of time picker             | `boolean`                                   | false                  |
| time-title-format   | format of the time header                      | [token](#token)                             | 'YYYY-MM-DD'           |
| time-picker-options | set fixed time list to select                  | [time-picker-options](#time-picker-options) | null                   |

#### Token

| Uint                       | Token | output                                 |
| -------------------------- | ----- | -------------------------------------- |
| Year                       | YY    | 70 71 ... 10 11                        |
|                            | YYYY  | 1970 1971 ... 2010 2011                |
|                            | Y     | -1000 ...20 ... 1970 ... 9999 +10000   |
| Month                      | M     | 1 2 ... 11 12                          |
|                            | MM    | 01 02 ... 11 12                        |
|                            | MMM   | Jan Feb ... Nov Dec                    |
|                            | MMMM  | January February ... November December |
| Day of Month               | D     | 1 2 ... 30 31                          |
|                            | DD    | 01 02 ... 30 31                        |
| Day of Week                | d     | 0 1 ... 5 6                            |
|                            | dd    | Su Mo ... Fr Sa                        |
|                            | ddd   | Sun Mon ... Fri Sat                    |
|                            | dddd  | Sunday Monday ... Friday Saturday      |
| AM/PM                      | A     | AM PM                                  |
|                            | a     | am pm                                  |
| Hour                       | H     | 0 1 ... 22 23                          |
|                            | HH    | 00 01 ... 22 23                        |
|                            | h     | 1 2 ... 12                             |
|                            | hh    | 01 02 ... 12                           |
| Minute                     | m     | 0 1 ... 58 59                          |
|                            | mm    | 00 01 ... 58 59                        |
| Second                     | s     | 0 1 ... 58 59                          |
|                            | ss    | 00 01 ... 58 59                        |
| Fractional Second          | S     | 0 1 ... 8 9                            |
|                            | SS    | 00 01 ... 98 99                        |
|                            | SSS   | 000 001 ... 998 999                    |
| Time Zone                  | Z     | -07:00 -06:00 ... +06:00 +07:00        |
|                            | ZZ    | -0700 -0600 ... +0600 +0700            |
| Week of Year               | w     | 1 2 ... 52 53                          |
|                            | ww    | 01 02 ... 52 53                        |
| Unix Timestamp             | X     | 1360013296                             |
| Unix Millisecond Timestamp | x     | 1360013296123                          |

#### custom format

The `format` accepts an object to customize formatting.

```html
<date-picker :format="formatter" />
```

```js
import { format, parse as dateParse } from 'date-fns';
// ...
data() {
  return {
    // Use date-fns instead of the default
    formatter: {
      // Date to String
      stringify: date => {
        return date ? format(date, this.currentFormat) : '';
      },
      // String to Date
      parse: value => {
        return value ? dateParse(value) : null;
      },
    }
  }
}

```

#### value-type

set the format of binding value

| Value             | Description                                          |
| ----------------- | ---------------------------------------------------- |
| 'date'            | return a Date object                                 |
| 'timestamp'       | return a timestamp number                            |
| 'format'          | returns a string formatted using pattern of `format` |
| token(MM/DD/YYYY) | returns a string formatted using this pattern        |

#### shortcuts

The shortcuts for the range picker

```js
[
  { text: 'today', onClick: () => new Date() },
  {
    text: 'Yesterday',
    onClick: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
];
```

| Attribute | Description                               |
| --------- | ----------------------------------------- |
| text      | title of the shortcut                     |
| onClick   | callback function , need to return a Date |

#### time-picker-options

Set fixed time list to select;

```js
{start: '00:00', step:'00:30' , end: '23:30', format: 'HH:mm' }
```

| Attribute | Description                          |
| --------- | ------------------------------------ |
| start     | start time                           |
| step      | step time                            |
| end       | end time                             |
| format    | the default is same as prop `format` |

#### Default Locale

```js
{
  // the locale of formatting and parsing function
  formatLocale: {
    // MMMM
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // MMM
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // dddd
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    // ddd
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    // dd
    weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    // first day of week
    firstDayOfWeek: 0,
    // first week contains January 1st.
    firstWeekContainsDate: 1,
    // format 'a', 'A'
    meridiem: (h: number, _: number, isLowercase: boolean) {
      const word = h < 12 ? 'AM' : 'PM';
      return isLowercase ? word.toLocaleLowerCase() : word;
    },
    // parse ampm
    meridiemParse: /[ap]\.?m?\.?/i;
    // parse ampm
    isPM: (input: string) {
      return `${input}`.toLowerCase().charAt(0) === 'p';
    }
  },
  // the calendar header, default formatLocale.weekdaysMin
  days: [],
  // the calendar months, default formatLocale.monthsShort
  months: [],
  // the calendar title of year
  yearFormat: 'YYYY',
  // the calendar title of month
  monthFormat: 'MMMM',
  // the calendar title of month before year
  monthBeforeYear: false,
}
```

### Events

| Name            | Description                          | Callback Arguments                           |
| --------------- | ------------------------------------ | -------------------------------------------- |
| input           | When the value change(v-model event) | date                                         |
| change          | When the value change(same as input) | date, type(date, hour, minute, second, ampm) |
| open            | When panel opening                   |                                              |
| close           | When panel closing                   |                                              |
| confirm         | When click 'confirm' button          | date                                         |
| clear           | When click 'clear' button            |                                              |
| input-error     | When user type a invalid Date        | the input text                               |
| focus           | When input focus                     |                                              |
| blur            | When input blur                      |                                              |
| pick            | when select date                     | date                                         |
| calendar-change | when change the calendar             | date, oldDate                                |

### Slots

| Name          | Description              |
| ------------- | ------------------------ |
| icon-calendar | custom the calender icon |
| icon-clear    | custom the clear icon    |
| input         | replace input            |
| header        | popup header             |
| footer        | popup footer             |
| sidebar       | popup sidebar            |
