import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';

import StatusBar from './StatusBar';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { updateSnippet, deleteSnippet } from '../../actions/snippets';
import { languages } from './languages';

import './Editor.scss';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import EditorHeader from './EditorHeader';

Object.keys(languages).forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
});

const Editor = () => {
  const dispatch = useDispatch();
  const { theme, leftPanelWidth } = useSelector(state => state.ui);
  const { current: snippet } = useSelector(state => state.snippets);

  const { height, width } = useWindowDimensions();

  const handleOnLoad = (editor) => {
    editor.resize();
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

  const handleDeleteSnippet = () => {
    dispatch(deleteSnippet(snippet.id));
  };

  // const tags = ['Java', 'JavaScript', 'XML', 'SQL', 'HTML'];

  // const visibleItemRenderer = (item, index) => {
  //   return <Tag key={index} style={{marginRight: '3px'}}>{item}</Tag>;
  // };

  // const overflowRenderer = (overflowItems) => {
  //   return <Tag icon="more" style={{marginRight: '3px'}} />
  // }

  return (
    <div className="Editor--container">
      <EditorHeader
        snippet={snippet}
        onTitleChange={handleTitleChange}
        onDeleteSnippet={handleDeleteSnippet}
      />

      <div className="Editor--editor">
        <AceEditor
          className="Editor--editor"
          theme={theme === 'dark' ? 'tomorrow_night' : 'github'}
          onLoad={handleOnLoad}
          readOnly={!snippet}
          mode={snippet ? snippet.language : languages[0]}
          value={snippet ? snippet.content : ''}
          onChange={handleOnChange}
          editorProps={{ $blockScrolling: true }}
          showGutter={false}
          showPrintMargin={false}
          wrapEnabled={true}
          scrollMargin={[2, 2]}
          tabSize={2}
          height={`${height - 67}px`}
          width={`${width - leftPanelWidth}px`}
        />
      </div>
      
      <StatusBar snippet={snippet} onLanguageChange={handleOnLanguageChange} />
    </div>
  );
};

export default Editor;