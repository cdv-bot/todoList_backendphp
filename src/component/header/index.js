import './style.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emendList } from './../Actions';
import { withRouter } from 'react-router';
import productApi from '../apis/productsApi';
import md5 from 'md5';

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
  handleSignout = async () => {
    const { history } = this.props;
    let hash = localStorage.getItem('hash');
    let host = md5(Math.random() * 200);
    let req = await productApi.checkId(hash);
    await productApi.fixHash(req[0].id, host);
    localStorage.removeItem('hash');
    history.push('/');
  }


  render() {
    const { text } = this.state;

    return (
      <>
        <div className="signout" onClick={this.handleSignout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Sign out</span>
        </div>
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
export default connect(null, mapDispatchToProps)(withRouter(Header));
