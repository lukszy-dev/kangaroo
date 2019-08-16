import React from 'react';

import Header from './common/Header/Header';
import Editor from './common/Editor/Editor';
import SnippetList from './common/SnippetList/SnippetList';

import './App.css';

const App = () => {
  return (
    <div className="bp3-dark">
      <Header />

      <div className="App--content">
        <SnippetList />
        <Editor />
      </div>
    </div>
  );
};

export default App;
