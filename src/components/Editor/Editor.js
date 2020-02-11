import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';

import StatusBar from './StatusBar/StatusBar';
import EditorHeader from './EditorHeader/EditorHeader';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { updateSnippet } from 'store/snippets/actions';
import { showGutter } from 'store/editor/actions';
import { languages, TEXT } from '../../models/languages';

import './Editor.scss';

// https://github.com/securingsincity/react-ace/issues/725
import 'ace-builds/webpack-resolver';
import './ace-themes';

Object.keys(languages).forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
});

const Editor = () => {
  const dispatch = useDispatch();
  const { theme, leftPanelWidth } = useSelector(state => state.ui);
  const { gutter } = useSelector(state => state.editor);
  const { current: snippet } = useSelector(state => state.snippets);

  const { height, width } = useWindowDimensions();

  const handleOnLoad = (editor) => {
    editor.resize();
    editor.setShowFoldWidgets(false);

    editor.commands.removeCommand('find');
  };

  const handleOnChange = (value) => {
    dispatch(updateSnippet({ ...snippet, content: value }));
  };

  const handleOnLanguageChange = (event) => {
    dispatch(updateSnippet({ ...snippet, language: event.currentTarget.value }));
  };

  const handleTitleChange = (value) => {
    dispatch(updateSnippet({ ...snippet, title: value }));
  };

  const handleShowGutter = () => {
    dispatch(showGutter());
  };

  return (
    <div className="Editor--container">
      <EditorHeader
        snippet={snippet}
        onTitleChange={handleTitleChange}
      />

      <div className="Editor--editor">
        <AceEditor
          className="Editor--editor"
          theme={theme === 'dark' ? 'sm-dark' : 'sm-light'}
          onLoad={handleOnLoad}
          readOnly={!snippet}
          mode={snippet ? snippet.language : TEXT}
          value={snippet ? snippet.content : ''}
          onChange={handleOnChange}
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

      <StatusBar
        snippet={snippet}
        onShowGutter={handleShowGutter}
        onLanguageChange={handleOnLanguageChange}
      />
    </div>
  );
};

export default Editor;
