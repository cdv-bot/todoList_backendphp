import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import productApi from '../apis/productsApi';
import Footer from '../footer';
import Header from '../header';
import { checkerItem, DataAddList, deleteItems, nextPage, numberPage, repairItem } from './../Actions';
import Loading from './loading';
import './style.scss';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.props.DataAddList();
    this.focusRef = React.createRef();
    this.scroll = React.createRef();
    this.state = {
      deleteId: null,
      toggle: {
        check: true,
        id: null,
      },
      valueFix: '',
      count: 0,
      id: null,
      sumList: 0,
      idPage: 1,
      action: "ALL"
    };
  }

  //hoàn thành
  handleCheck = (id, check) => {
    this.props.checkerItem(check, id);
  };

  // _---------------------
  //double click show input
  handTogger = async (id, value) => {
    await this.setState({
      toggle: {
        check: false,
        id,
      },
    });

    this.setState({
      valueFix: value,
    });

    this.focusRef.current.focus();
  };

  // -------------
  //value fix
  onValueFix = (e) => {
    let value = e.target.value;
    this.setState({
      valueFix: value,
    });
  };

  //submit Fix
  submitFix = (e) => {
    const { valueFix, toggle } = this.state;
    e.preventDefault();
    if (valueFix.trim() !== '') {
      this.props.repairItem(valueFix, toggle.id);
    }

    this.setState({
      toggle: {
        check: false,
        id: null,
      },
    });
  };

  //delete one
  handeDeleteOne = (id) => {
    this.setState({
      deleteId: id,
    });
    setTimeout(() => {
      this.props.deleteItems(id, this.state.idPage);
      this.setState({
        deleteId: null,
      });
    }, 500);
  };

  //outfocus
  outFocus = (x) => {
    const { valueFix, toggle } = this.state;
    if (valueFix.trim() !== '') {
      this.props.repairItem(valueFix, toggle.id);

      this.setState({
        toggle: {
          check: false,
          id: null,
        },
      });
    } else {
      this.setState({
        toggle: {
          check: false,
          id: null,
        },
      });
    }
  };

  // -----------footer

  //show all
  handeAll = async () => {
    let data = await productApi.getList();
    this.setState({
      num: data,
    });
  };

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
      return 'bây giờ';
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
  };

  handleScroll = () => {
    this.scroll.scrollIntoView();
    this.setState({
      idPage: 1
    })
  };

  show = () => {
    const { valueFix, toggle, deleteId } = this.state;
    const { data } = this.props.arrList;
    if (data.length === 0) return <div className="No_list">Không có mục nào !!!</div>;
    let arr = [];
    arr = data.map((key, index) => {
      return (
        <div key={index} className={`show_check ${deleteId === key.id ? 'tranfrom' : ''}`}>
          <div id={key.id} onClick={() => this.handleCheck(key.id, key.checks)}>
            {key.checks ? (
              <i className="fas fa-check-square icon icon_top"></i>
            ) : (
              <i className="fas fa-check-square icon "></i>
            )}
          </div>
          <div className="list_data" onDoubleClick={() => this.handTogger(key.id, key.content)}>
            {
              toggle.id !== key.id ? (
                <div className="text_time">
                  <label className={`text_data ${key.checks ? 'unfinished' : ''}`}>
                    {key.content}
                  </label>
                  <span>{this.handleTime(key.time)}</span>
                </div>
              ) : (
                <form onSubmit={this.submitFix} className="form_fix">
                  <input
                    className="ip_hide"
                    type="text"
                    ref={this.focusRef}
                    value={valueFix}
                    onBlur={() => this.outFocus(key.id)}
                    onChange={this.onValueFix}
                  />
                </form>
              )
            }
          </div>
          <i
            className="far fa-trash-alt icon_delete"
            onClick={() => this.handeDeleteOne(key.id)}
          ></i>
        </div>
      );
    });
    return arr;
  };

  handlePage = (data, action) => {
    this.props.nextPage(data, action);
    this.setState({
      idPage: data
    })
  }
  mapPage = () => {
    const { pagination } = this.props.arrList;
    if (pagination === null || pagination._totalRows === 0) {
      return (
        <div className="btPage" >
          1
        </div>
      );
    }

    let arr = [];
    let sumPage = Math.ceil(pagination._totalRows / 7);
    for (let i = 1; i <= sumPage; i++) {
      arr.push(
        <div key={i} >
          <div
            style={this.state.idPage === i ? {
              background: 'blue',
              color: 'white'
            } : null}
            className="btPage" onClick={() => {
              if (this.state.idPage !== i) {
                this.handlePage(i, this.state.action);
              } else {
                return false;
              }
            }} >
            {i}
          </div>
        </div>)
    }
    return arr;
  }

  actionPages = (x) => {
    this.setState({
      action: x,
      idPage: 1
    });
  }
  componentDidMount() {
    const { history } = this.props;
    if (localStorage.getItem('hash')) {
      productApi.checkAccount({
        hash: localStorage.getItem('hash')
      }).then(data => {
        if (data.length === 0) {
          console.log(data)
          history.push('/')
        }
      })
    } else {
      history.push('/');
    }

  }
  render() {
    const { loadingShow } = this.props;

    return (
      <div className="All">
        {
          loadingShow ? null : <Loading />
        }
        <div className="input_add">
          <Header handlerValue={this.handleValues} refInput={this.handleScroll} />
        </div>
        <div className="container">
          <div className="content">
            <div className="positon" ref={(ref) => (this.scroll = ref)}>
              {this.show()}
            </div>
          </div>
          <div className="bt_check" counts={this.props.arrList.data}>
            <Footer actionPage={(x) => this.actionPages(x)} />
          </div>
          <div className='page'>
            {this.mapPage()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrList: state.list,
    loadingShow: state.loadings.loading,
  };
};
const mapDispatchToProps = {
  DataAddList,
  repairItem,
  checkerItem,
  deleteItems,
  numberPage,
  nextPage
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Todo));
