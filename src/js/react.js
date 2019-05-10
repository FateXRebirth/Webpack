import React from 'react';
import ReactDOM from 'react-dom';
import '@scss/react';

const ReactApp = () => {
  return (
    <div>
      <p>React here!</p>
    </div>
  );
};

ReactDOM.render(<ReactApp />, document.getElementById('react-app'));

export default ReactApp;
