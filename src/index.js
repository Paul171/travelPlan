// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

//import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
      <Component/>,
    document.getElementById('root')
  );
};

render(App);