import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import productApi from '../apis/productsApi';
import './style.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {
        userName: "",
        password: ""
      }
    }
  }
  handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      inputValue: {
        ...this.state.inputValue,
        [name]: value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = this.state.inputValue;
    const { history } = this.props;


    if (userName.trim() !== "" && password.trim() !== "") {
      productApi.checkAccount({
        password,
        user: userName
      }).then(data => {
        if (data.length === 0) {
          alert("Tài khoản mật khẩu không đúng !!!");
        } else {
          localStorage.setItem("hash", data[0].hash);
          history.push('/todo');
        }
      })
    }
    this.setState({
      inputValue: {
        password: "",
        userName: ""
      }
    })
  }
  render() {
    if (localStorage.getItem('hash')) {
      const { history } = this.props;
      productApi.checkAccount({
        hash: localStorage.getItem('hash')
      }).then(data => {
        if (data.length !== 0) {
          history.push('/todo')
        }
      })
    }

    return (
      <div className="App" >
        <div className="form_login">
          <div className="logo">
          </div>
          <div className="App__form">
            <form onSubmit={this.handleSubmit} className="App__form-login">
              <p>Đăng nhập với tài khoản</p>
              <div className="input_name">
                <label htmlFor="userName">Tên đăng nhập:</label>
                <input type="text" name="userName" id="userName" onChange={this.handleOnChange} />
              </div>
              <div className="input_name">
                <label htmlFor="password">Mật khẩu:</label>
                <input type="password" name="password" id="password" onChange={this.handleOnChange} />
              </div>
              <label htmlFor="dk">
                <input type="checkbox" name="dk" id="dk" />
                Ghi nhớ trạng thái đăng nhập trên trình duyệt này
                <i className="fa fa-info-circle cPointer" />
              </label>
              <button type="submit" id="bt_login" className="button">
                <i className="fas fa-sign-in-alt" style={{ marginRight: "5px" }} />
                Đăng nhập
              </button>
            </form>
            <hr style={{ backgroundColor: '#CFCFD0', marginBottom: '15px' }} />
            <div className="App__form-sigin">
              <Link to='/registration' className="button">
                <i className="fas fa-lock" style={{ marginRight: "5px" }} />
                Mở khóa tài khoản
              </Link>
              <a href="/#">Trợ giúp</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
