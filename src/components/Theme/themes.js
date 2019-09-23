const root = {
  "--header-height": "37px"
}

const light = {
  ...root,
  "--background-color-primary": "#f5f8fa",
  "--background-color-secondary": "#fff",

  "--list-container-border": "solid 1px rgba(16, 22, 26, .15)",

  "--divider": "linear-gradient(90deg,rgba(16, 22, 26, 0) 0, rgba(16, 22, 26, .15) 40%)",
  "--active-snippet": "linear-gradient(90deg, rgba(245, 248, 250, 0) 0, #f5f8fa 40%)"
};

const dark = {
  ...root,
  "--background-color-primary": "#30404d",
  "--background-color-secondary": "#394b59",

  "--list-container-border": "solid 1px rgba(16, 22, 26, .4)",

  "--divider": "linear-gradient(90deg, rgba(16, 22, 26, 0) 0, rgba(16, 22, 26, .4) 40%)",
  "--active-snippet": "linear-gradient(90deg, rgba(48, 64, 77, 0) 0, #30404d 40%)"
};

export { light as Light, dark as Dark };