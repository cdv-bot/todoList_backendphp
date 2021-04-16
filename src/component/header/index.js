import './style.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emendList } from './../Actions';

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
    const { emendListDp } = this.props;

    e.preventDefault();

    if (text.trim() !== "") {
      emendListDp(text);
      this.setState({
        text: ""
      });
      this.props.refInput();

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

const mapDispatchToProps = dispatch => {
  return {
    emendListDp: (data) => dispatch(emendList(data))
  }
}
export default connect(null, mapDispatchToProps)(Header);
