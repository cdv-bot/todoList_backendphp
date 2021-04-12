import './style.scss';
import React, { Component } from 'react';
import productApi from '../apis/productsApi';

class Header extends Component {
  constructor(props) {
    super(props);
    this.refFocus = React.createRef();
    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    this.refFocus.current.focus();
  }

  handleValue = (e) => {
    const value = e.target.value;
    this.setState({
      text: value
    });
  }

  handleSubmit = e => {
    const { text } = this.state;
    e.preventDefault();
    if (text.trim() !== "") {
      productApi.setAdd({
        content: text
      }).then(data => {
        this.props.handlerValue(data)
      })

      this.setState({
        text: ""
      });
    } else {
      this.setState({
        text: ""
      });
    }
  }
  render() {
    const { text } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className="submit_form" >
          <input ref={this.refFocus} autoComplete="off" type="text" placeholder="Mời nhập..." className="ip_submit" name="ip" required value={text} onChange={this.handleValue} />
          <button type="submit" className="bt_submit">
            <i className="fas fa-plus icons"></i>
          </button>
        </form>
      </>
    );
  }
}

export default Header;
