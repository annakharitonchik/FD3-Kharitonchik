import React from 'react';
import PropTypes from 'prop-types';

import './ShopName.css';

class ShopName extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
  };
  
  render() {
    return <div className='ShopName'>{this.props.name}</div>;
  }

}

export default ShopName;
