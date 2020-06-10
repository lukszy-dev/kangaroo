import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import ReactAce, { IEditorProps } from 'react-ace';

import useWindowDimensions from 'utils/useWindowDimensions';
import { RootState } from 'store/types';
import { languages, TEXT } from 'models/languages';

import './Editor.scss';

// https://github.com/securingsincity/react-ace/issues/725
import 'ace-builds/webpack-resolver';
import './ace-themes';

Object.keys(languages).forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
});

const handleOnLoad = (editor: IEditorProps): void => {
  editor.resize();
  editor.setShowFoldWidgets(false);
  editor.renderer.scrollToRow(0);
  editor.commands.removeCommand('find');
};

type EditorProps = {
  snippetId?: number;
  snippetContent?: string;
  snippetLanguage?: string;
  gutter: boolean;
  onChange: (value: string) => void;
};

const Editor: React.FC<EditorProps> = ({ snippetId, snippetContent, snippetLanguage, gutter, onChange }) => {
  const { theme, leftPanelWidth } = useSelector((state: RootState) => state.ui);
  const { height, width } = useWindowDimensions();

  return (
    <div className="Editor--editor">
      <ReactAce
        theme={theme === 'dark' ? 'sm-dark' : 'sm-light'}
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
