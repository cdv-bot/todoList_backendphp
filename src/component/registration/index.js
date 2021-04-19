import md5 from 'md5';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import productApi from '../apis/productsApi';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        userName: "",
        password1: "",
        password2: "",
      }
    }
  }
  handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let host = md5(Math.random() * 200);
    const { userName, password1, password2 } = this.state.input;
    if (userName.trim() === "" || password1.trim() === "" || password2.trim() === "") {
      alert("mời nhập thông tin");
    } else {
      if (password1 === password2) {
        let req = await productApi.checkuser(userName);
        if (req.length === 0) {
          await productApi.addUser({
            user: userName,
            password: password1,
            hash: host
          });
          this.props.history.push('/');
        } else {
          alert("Tên đăng nhâp đã tồn tại !!!")
        }
      } else {
        alert("Nhập password chưa khớp !!");
      }
    }
  }
  render() {
    return (
      <div className="App" >
        <div className="form_login">
          <div className="logo">
          </div>
          <div className="App__form">
            <form onSubmit={this.handleSubmit} className="App__form-login">
              <p>Đăng ký tài khoản</p>
              <div className="input_name">
                <label htmlFor="userName">Tên đăng nhập:</label>
                <input type="text" name="userName" id="userName" onChange={this.handleOnChange} />
              </div>
              <div className="input_name">
                <label htmlFor="password1">Mật khẩu:</label>
                <input type="password" name="password1" id="password1" onChange={this.handleOnChange} />
              </div>
              <div className="input_name">
                <label htmlFor="password2">Mật khẩu:</label>
                <input type="password" name="password2" id="password2" onChange={this.handleOnChange} />
              </div>
              <button type="submit" id="bt_login" className="button">
                <i className="fas fa-sign-in-alt" style={{ marginRight: "5px" }} />
                Đăng Ký
              </button>
            </form>
            <hr style={{ backgroundColor: '#CFCFD0', marginBottom: '15px' }} />
            <div className="App__form-sigin">
              <Link to='/' className="button">
                <i className="fas fa-lock" style={{ marginRight: "5px" }} />
               Đã có tài khoản
              </Link>
              <a href="/#">Trợ giúp</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Registration);
