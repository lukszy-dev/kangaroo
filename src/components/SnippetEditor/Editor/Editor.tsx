import { memo } from 'react';
import { useSelector } from 'react-redux';
import AceEditor, { IEditorProps } from 'react-ace';

import { ThemeType } from 'components/Theme/Theme';
import useWindowDimensions from 'utils/useWindowDimensions';
import { RootState } from 'store/types';
import { languages, TEXT } from 'models/languages';

import styles from './Editor.module.scss';

import './ace-themes';

Object.keys(languages).forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
});

type EditorProps = {
  snippetId?: number;
  snippetContent?: string;
  snippetLanguage?: string;
  gutter: boolean;
  onChange: (value: string) => void;
};

const aceTheme: { [key: string]: string } = {
  [ThemeType.DARK]: 'sm-dark',
  [ThemeType.LIGHT]: 'sm-light',
};

const handleOnLoad = (editor: IEditorProps): void => {
  editor.resize();
  editor.setShowFoldWidgets(false);
  editor.renderer.scrollToRow(0);
  editor.commands.removeCommand('find');
};

const Editor: React.FC<EditorProps> = ({ snippetId, snippetContent, snippetLanguage, gutter, onChange }) => {
  const { theme, leftPanelWidth } = useSelector((state: RootState) => state.ui);
  const { height, width } = useWindowDimensions();

  return (
    <div className={styles.editor}>
      <AceEditor
        theme={aceTheme[theme]}
        onLoad={handleOnLoad}
        readOnly={!snippetId}
        mode={snippetLanguage ? snippetLanguage : TEXT}
        value={snippetContent ? snippetContent : ''}
        onChange={onChange}
        editorProps={{ $blockScrolling: true }}
        showGutter={gutter}
        showPrintMargin={false}
        wrapEnabled={true}
        scrollMargin={[2, 2]}
        tabSize={2}
        height={`${height - 77}px`}
        width={`${width - leftPanelWidth}px`}
        setOptions={{ useWorker: false }}
      />
    </div>
  );
};

export default memo(Editor);
