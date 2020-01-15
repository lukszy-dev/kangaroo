import { Colors } from "@blueprintjs/core";

const root = {
  "--header-height": "37px",
  "--editor-header-height": "47px",
  "--snippet-list-element-height": "40px",
  "--color-selected": Colors.BLUE3
};

const light = {
  ...root,
  "--background-color-primary": Colors.WHITE,
  "--background-color-secondary": Colors.LIGHT_GRAY5,

  "--list-container-border": "solid 1px rgba(16, 22, 26, .15)",

  "--divider": `linear-gradient(
    90deg,
    rgba(16, 22, 26, 0) 0,
    rgba(16, 22, 26, .15) 40%
  )`,
  "--active-snippet": `linear-gradient(
    90deg,
    rgba(167, 182, 194, 0) 0,
    rgba(167, 182, 194, .3) 40%
  )`
};

const dark = {
  ...root,
  "--background-color-primary": Colors.DARK_GRAY3,
  "--background-color-secondary": Colors.DARK_GRAY5,

  "--list-container-border": "solid 1px rgba(16, 22, 26, .5)",

  "--divider": `linear-gradient(
    90deg,
    rgba(16, 22, 26, 0) 0,
    rgba(16, 22, 26, .4) 80%,
    rgba(16, 22, 26, .5) 100%
  )`,
  "--active-snippet": `linear-gradient(
    90deg,
    rgba(48, 64, 77, 0) 0,
    #30404d 40%
  )`
};

export { root, light as Light, dark as Dark };
