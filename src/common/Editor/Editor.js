import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';

import StatusBar from '../StatusBar/StatusBar';
import useWindowDimensions from '../../useWindowDimensions';
import { updateSnippet } from '../../actions/snippets';

import 'brace/mode/java';
import 'brace/theme/tomorrow_night';

import './Editor.css';

const Editor = () => {
  const dispatch = useDispatch();
  const snippet = useSelector(state => state.snippets.current);

  const { height, width } = useWindowDimensions();

  const handleOnChange = (value) => {
    dispatch(updateSnippet({ ...snippet, content: value }));
  };

  return (
    <div>
      <AceEditor
        className="Editor"
        mode="java"
        theme="tomorrow_night"
        value={snippet.content}
        onChange={handleOnChange}
        name="editor"
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        showPrintMargin={false}
        height={height - 67}
        width={width - 200}
      />
      <StatusBar />
    </div>
  );
};

export default Editor;