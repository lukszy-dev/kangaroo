import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor, { IEditorProps } from 'react-ace';

import StatusBar from './StatusBar/StatusBar';
import EditorHeader from './EditorHeader/EditorHeader';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { RootState } from 'store/types';
import { updateSnippet } from 'store/snippets/actions';
import { showGutter } from 'store/editor/actions';
import { languages, TEXT } from '../../models/languages';

import './Editor.scss';

// https://github.com/securingsincity/react-ace/issues/725
import 'ace-builds/webpack-resolver';
import './ace-themes';

Object.keys(languages).forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
});

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { theme, leftPanelWidth } = useSelector((state: RootState) => state.ui);
  const { gutter } = useSelector((state: RootState) => state.editor);
  const { current: snippet } = useSelector((state: RootState) => state.snippets);

  const { height, width } = useWindowDimensions();

  const handleOnLoad = (editor: IEditorProps): void => {
    editor.resize();
    editor.setShowFoldWidgets(false);
    editor.renderer.scrollToRow(0);

    editor.commands.removeCommand('find');
  };

  const handleOnChange = (value: string): void => {
    if (snippet) {
      dispatch(updateSnippet({ ...snippet, content: value }));
    }
  };

  const handleOnTagChange = (tag: string, remove: boolean): void => {
    if (snippet) {
      const { tags } = snippet;
      const tagElements = tags.split(',');

      let updated = tagElements;
      if (remove) {
        tagElements.splice(
          tagElements.findIndex((element) => element === tag),
          1,
        );
        updated = tagElements;
      } else {
        updated.push(tag);
      }

      dispatch(updateSnippet({ ...snippet, tags: updated.join(',') }));
    }
  };

  const handleOnLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (snippet) {
      dispatch(updateSnippet({ ...snippet, language: event.currentTarget.value }));
    }
  };

  const handleTitleChange = (value: string): void => {
    if (snippet) {
      dispatch(updateSnippet({ ...snippet, title: value }));
    }
  };

  const handleShowGutter = (): void => {
    dispatch(showGutter());
  };

  return (
    <div className="Editor--container">
      <EditorHeader snippet={snippet} onTitleChange={handleTitleChange} />

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
        onTagChange={handleOnTagChange}
        onLanguageChange={handleOnLanguageChange}
      />
    </div>
  );
};

export default Editor;
