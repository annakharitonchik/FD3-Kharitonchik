import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop.js';

const shopName ='Ромашка\uD83C\uDF3C';

import shopItems from './items.json';

ReactDOM.render(
  <Shop 
    name={shopName}
    items={shopItems}
  />
  , document.getElementById('container') 
);
