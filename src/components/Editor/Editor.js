import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';
import { Button, EditableText } from '@blueprintjs/core';

import StatusBar from './StatusBar';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { updateSnippet, deleteSnippet } from '../../actions/snippets';

import { languages } from './languages';

import 'brace/theme/github';
import 'brace/theme/tomorrow_night';
import './Editor.scss';

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
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
      <div className="Editor--header">
        <EditableText
          className="Editor--snippet-title"
          placeholder="Edit title..."
          minWidth={200}
          value={snippet ? snippet.title : ''}
          disabled={!snippet}
          onChange={handleTitleChange}
        />
        <Button
          className="Editor--snippet-delete"
          small="true"
          icon="trash"
          minimal="true"
          disabled={!snippet}
          onClick={handleDeleteSnippet}
        />
      </div>

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