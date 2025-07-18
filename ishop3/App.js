import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop.js';

import items from './items.json';

ReactDOM.render(
  <Shop  items={items} />
  , document.getElementById('container') 
);
