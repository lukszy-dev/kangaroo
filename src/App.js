import React from 'react';

import Header from './common/Header/Header';
import Editor from './common/Editor/Editor';
import SnippetListContainer from './common/SnippetListContainer/SnippetListContainer';

import './App.css';

const App = () => {
  return (
    <div className="bp3-dark">
      <Header />

      <div className="App--content">
        <SnippetListContainer />
        <Editor />
      </div>
    </div>
  );
};

export default App;
