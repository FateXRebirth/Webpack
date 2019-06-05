import React from 'react';
import ReactDOM from 'react-dom';
import '@scss/react';
import logo from '@image/react.png';

const ReactApp = () => {
  return (
    <div>
      <p>React here!</p>
      <img src={logo} alt="Logo" />
    </div>
  );
};

ReactDOM.render(<ReactApp />, document.getElementById('react-app'));

export default ReactApp;
