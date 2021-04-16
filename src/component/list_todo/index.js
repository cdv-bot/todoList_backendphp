import React, { Component } from 'react';
import LazyLoad, { lazyload } from 'react-lazyload';
import { connect } from 'react-redux';
import productApi from '../apis/productsApi';
import { LOADING } from '../constants/addTask';
import Footer from '../footer';
import Header from '../header';
import { checkerItem, DataAddList, deleteItems, repairItem, numberPage } from './../Actions';
import loading from './../loading/gif-leaf-loading-gif-MAIN.gif';
import Item from './item';
import './style.scss';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.props.DataAddList(1);
    this.focusRef = React.createRef();
    this.scroll = React.createRef();
    this.state = {
      deleteId: null,
      toggle: {
        check: true,
        id: null
      },
      valueFix: "",
      count: 0,
      id: null,
      sumList: 0
    }
  }

  //hoàn thành
  handleCheck = async (id, check) => {
    this.props.checkerItem(check, id);
  }

  // _---------------------
  //double click show input
  handTogger = async (id, value) => {
    await this.setState({
      toggle: {
        check: false,
        id
      }
    });

    this.setState({
      valueFix: value
    })

    this.focusRef.current.focus();
  }

  // -------------
  //value fix
  onValueFix = e => {
    let value = e.target.value;
    this.setState({
      valueFix: value
    });
  }

  //submit Fix
  submitFix = e => {
    const { valueFix, toggle } = this.state;
    e.preventDefault();
    if (valueFix.trim() !== "") {
      this.props.repairItem(valueFix, toggle.id);
    };

    this.setState({
      toggle: {
        check: false,
        id: null
      }
    });
  }


  //delete one
  handeDeleteOne = id => {
    this.setState({
      deleteId: id
    })
    setTimeout(() => {
      this.props.deleteItems(id);
      this.setState({
        deleteId: null
      });
    }, 500)
  }


  //outfocus 
  outFocus = x => {
    const { valueFix, toggle } = this.state;
    if (valueFix.trim() !== "") {
      this.props.repairItem(valueFix, toggle.id);

      this.setState({
        toggle: {
          check: false,
          id: null
        }
      });
    } else {
      this.setState({
        toggle: {
          check: false,
          id: null
        }
      });
    }
  }

  // -----------footer

  //show all
  handeAll = async () => {
    let data = await productApi.getList();
    this.setState({
      num: data
    })
  }


  handleTime = (days) => {
    let today = new Date();
    let inday = new Date(days);
    let time = today.getTime() - inday.getTime();

    let sec = time / 1000;
    let min = time / 1000 / 60;
    let hours = time / 1000 / 60 / 60;
    let day = time / 1000 / 60 / 60 / 24;
    let month = time / 1000 / 60 / 60 / 24 / 30;
    let year = time / 1000 / 60 / 60 / 24 / 30 / 12;

    if (sec < 0) {
      return "bây giờ";
    } else if (sec < 60) {
      return `${Math.floor(sec)} giây`;
    } else if (min < 60) {
      return `${Math.floor(min)} phút`;
    } else if (hours < 24) {
      return `${Math.floor(hours)} giờ`;
    } else if (day < 30) {
      return `${Math.floor(day)} ngày`;
    } else if (month < 12) {
      return `${Math.floor(month)} tháng`;
    } else {
      return `${Math.floor(year)} năm`;
    }

  }


  handleScroll = () => {
    this.scroll.scrollIntoView();
  }

  show = () => {
    const { valueFix, toggle, deleteId } = this.state;
    const { arrList } = this.props;
    let sort = [...arrList];
    if (sort.length === 0) return <div className="No_list">Không có mục nào !!!</div>;
    sort.sort(function (a, b) {
      return b.id - a.id;
    });
    let arr = [];
    arr = sort.map((key, index) => {
      return (
        <div
          key={index}
          className={`show_check ${deleteId === key.id ? "tranfrom" : ""}`}
        >
          <div
            id={key.id}
            onClick={() => this.handleCheck(key.id, key.checks)}
          >
            {
              (key.checks) ?
                <i className="fas fa-check-square icon icon_top" ></i>
                : <i className="fas fa-check-square icon " ></i>
            }
          </div>
          <div className="list_data" onDoubleClick={() => this.handTogger(key.id, key.content)} >
            {
              // toggle.id !== key.id
              (toggle.id !== key.id) ?
                <div className="text_time">
                  <label className={`text_data ${key.checks ? 'unfinished' : ''}`}>{key.content}</label>
                  <span>{this.handleTime(key.time)}</span>
                </div>
                : <form onSubmit={this.submitFix} className="form_fix">
                  <input
                    className="ip_hide"
                    type="text"
                    ref={this.focusRef}
                    value={valueFix}
                    onBlur={() => this.outFocus(key.id)}
                    onChange={this.onValueFix}
                  />
                </form>
            }
          </div>
          <i
            className="far fa-trash-alt icon_delete"
            onClick={() => this.handeDeleteOne(key.id)}
          ></i>
        </div >
      )
    })
    return arr;
  }


  render() {
    const { loadingShow } = this.props;

    return (
      <div className="All">
        <div className={`loading ${loadingShow ? 'hider' : ''}`}>
          <img src={loading} alt="im" />
        </div>
        <div className="input_add">
          <Header handlerValue={this.handleValues} refInput={this.handleScroll} />
        </div>
        <div className="container">
          <div className="content" >
            <div className="positon" ref={(ref) => this.scroll = ref}>
              {
                this.show()
              }
            </div>
          </div>
          <div className="bt_check" counts={this.props.arrList}>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrList: state.list,
    loadingShow: state.loadings.loading
  }
}
const mapDispatchToProps = {
  DataAddList,
  repairItem,
  checkerItem,
  deleteItems,
  numberPage
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo);




