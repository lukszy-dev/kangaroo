import { Colors } from '@blueprintjs/core';

const root = {
  '--header-height': '37px',
  '--editor-header-height': '47px',
  '--snippet-list-element-height': '40px',
  '--status-bar-height': '30px',
  '--color-selected': Colors.BLUE3,
};

const light = {
  ...root,
  '--background-color-primary': Colors.WHITE,
  '--background-color-secondary': Colors.LIGHT_GRAY5,

  '--icon-color': Colors.GRAY1,

  '--list-container-border': 'solid 1px rgba(16, 22, 26, .15)',
  '--tag-border': 'solid 1px rgba(16, 22, 26, .2)',
  '--tag-hover-background': 'rgba(167, 182, 194, 0.3)',

  '--divider': `linear-gradient(
    90deg,
    rgba(16, 22, 26, 0) 0,
    rgba(16, 22, 26, .15) 40%
  )`,
  '--active-snippet': `linear-gradient(
    90deg,
    rgba(167, 182, 194, 0) 0,
    rgba(167, 182, 194, .3) 40%
  )`,
  '--active-snippet-tag-border': Colors.LIGHT_GRAY2,
};

const dark = {
  ...root,
  '--background-color-primary': Colors.DARK_GRAY3,
  '--background-color-secondary': Colors.DARK_GRAY5,

  '--icon-color': Colors.GRAY4,

  '--list-container-border': 'solid 1px rgba(16, 22, 26, .5)',
  '--tag-border': 'solid 1px hsla(0, 0%, 100%, .2)',
  '--tag-hover-background': 'rgba(138, 155, 168, 0.15)',

  '--divider': `linear-gradient(
    90deg,
    rgba(16, 22, 26, 0) 0,
    rgba(16, 22, 26, .4) 80%,
    rgba(16, 22, 26, .5) 100%
  )`,
  '--active-snippet': `linear-gradient(
    90deg,
    rgba(48, 64, 77, 0) 0,
    #30404d 40%
  )`,
  '--active-snippet-tag-border': Colors.DARK_GRAY4,
};

export { root, light as Light, dark as Dark };
