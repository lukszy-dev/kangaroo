import React from 'react';

import './SnippetListElement.css';

const SnippetListElement = ({element, current, handleChangeSnippet}) => {
  return (
    <div key={element.id}>
      <div className={`SnippetListElement ${current.id === element.id ? 'SnippetListElement-active' : null}`} onClick={() => handleChangeSnippet(element.id)}>
        {element.title}
      </div>
      <div className="SnippetList--divider" />
    </div>
  );
};

export default SnippetListElement;