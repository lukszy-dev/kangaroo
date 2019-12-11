const namespace = name => `EDITOR_${name}`;

export const SHOW_GUTTER = namespace('SHOW_GUTTER');

const showGutterAction = () => ({
  type: SHOW_GUTTER
});

export const showGutter = () => {
  return (dispatch) => {
    dispatch(showGutterAction());
  }
};
