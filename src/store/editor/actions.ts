import { SHOW_GUTTER, EditorActionTypes } from './types';
import { AppThunk } from 'store/types';

const showGutterAction = (): EditorActionTypes => ({
  type: SHOW_GUTTER,
});

export const showGutter = (): AppThunk => {
  return (dispatch): void => {
    dispatch(showGutterAction());
  };
};
