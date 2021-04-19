import React, { Component } from 'react';
import loading from './../../loading/gif-leaf-loading-gif-MAIN.gif';
class Loading extends Component {
  render() {
    return (
      <div className='loading'>
        <img src={loading} alt="im" />
      </div>
    );
  }
}

export default Loading;
