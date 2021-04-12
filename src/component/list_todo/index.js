import React, { Component } from 'react';
import productApi from '../apis/productsApi';
import Footer from '../footer';
import Header from '../header';
import './style.scss';


class Todo extends Component {
  constructor(props) {
    super(props);
    this.focusRef = React.createRef();

    this.state = {
      num: [],
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

  componentDidMount() {
    productApi.getList().then(x => {
      this.setState({
        num: x
      })
    });
  }


  // thêm value
  handleValues = async x => {
    const { num } = this.state;
    let arr = [...num, x];
    this.setState({
      num: arr
    });
    this.handeAll();
  }

  //hoàn thành
  handleCheck = async (id, check) => {
    if (check === "1") {
      check = 0;
    }
    if (check === "0") {
      check = 1;
    }
    let data = await productApi.endpoint({
      id,
      check: check
    })

    this.setState({
      num: data
    })
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
  submitFix = async e => {
    const { valueFix, toggle } = this.state;
    e.preventDefault();

    if (valueFix.trim() !== "") {
      let data = await productApi.updateList({
        content: valueFix,
        id: toggle.id
      });
      this.setState({
        num: data
      });

    }
    this.setState({
      toggle: {
        check: false,
        id: null
      }
    });
  }


  //delete one
  handeDeleteOne = async (id) => {
    let data = await productApi.delete({
      id
    });
    this.setState({
      deleteId: id
    })
    setTimeout(() => {
      this.setState({
        num: data,
        deleteId: null
      });
    }, 500)
  }


  //outfocus 
  outFocus = async x => {
    const { valueFix, toggle } = this.state;
    if (valueFix.trim() !== "") {
      let data = await productApi.updateList({
        content: valueFix,
        id: toggle.id
      });

      this.setState({
        num: data,
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
  //đã hoàn thành
  handeDone = async () => {
    let data = await productApi.checked({
      check: 1
    });

    this.setState({
      num: data
    })
  }

  //chưa xong
  handeUfinished = async () => {
    let data = await productApi.checked({
      check: 0
    });

    this.setState({
      num: data
    })
  }

  //xóa
  handeDelete = async () => {
    let data = await productApi.deleteAll({
      check: 1
    });
    this.setState({
      num: data
    })
  }

  //show all
  handeAll = async () => {
    let data = await productApi.getList();
    this.setState({
      num: data
    })
  }


  handleTime = (day) => {

    let today = new Date();
    let inday = new Date(day);

    let nam = today.getFullYear() - inday.getFullYear();
    let month = today.getMonth() - inday.getMonth();
    let days = today.getDay() - inday.getDay();
    let hours = today.getHours() - inday.getHours();
    let min = today.getMinutes() - inday.getMinutes();
    let sec = today.getSeconds() - inday.getSeconds();

    if (nam > 0) {
      return ` ${nam} năm`;
    }
    if (month > 0) {
      return `${month} tháng`;
    }
    if (days > 0) {
      return `${days} ngày`;
    }
    if (hours > 0) {
      return `${hours} giờ`;
    }
    if (min > 0) {
      return `${min} phút`;
    }
    if (sec > 0) {
      return `${sec} giây`;
    } else {
      return `bây giờ`
    }
  }

  show = () => {
    const { valueFix, num, toggle, deleteId } = this.state;
    let sort = [...num];
    if (sort.length === 0) return <div className="No_list">Không có mục nào !!!</div>;
    sort.sort(function (a, b) {
      return b.id - a.id;
    });
    let arr = [];
    arr = sort.map((key, index) => {
      return (
        <div key={index} className={`show_check ${deleteId === key.id ? "tranfrom" : ""}`}>
          <div id={key.id} onClick={() => this.handleCheck(key.id, key.checks)} >
            {
              (key.checks !== "0" ? true : false) ?
                <i className="fas fa-check-square icon icon_top" ></i>
                : <i className="fas fa-check-square icon " ></i>
            }
          </div>
          <div className="list_data" onDoubleClick={() => this.handTogger(key.id, key.content)} >
            {
              // toggle.id !== key.id
              (toggle.id !== key.id) ?
                // onClick = {() => this.handleCheck(key.id)}
                <div className="text_time">
                  <label className={`text_data ${key.checks === '1' ? 'unfinished' : ''}`}>{key.content}</label>
                  <span>{this.handleTime(key.day)}</span>
                </div>
                : <form onSubmit={this.submitFix} className="form_fix">
                  <input className="ip_hide" type="text" ref={this.focusRef} value={valueFix} onBlur={() => this.outFocus(key.id)} onChange={this.onValueFix} />
                </form>
            }
          </div>
          <i className="far fa-trash-alt icon_delete" onClick={() => this.handeDeleteOne(key.id)}></i>
        </div >
      )
    })
    return arr;
  }


  render() {
    return (
      <div className="All">
        <div className="input_add">
          <Header handlerValue={this.handleValues} />
        </div>
        <div className="container">
          <div className="content" >
            <div className="positon">
              {
                this.show()
              }
            </div>
          </div>
          <div className="bt_check">
            <Footer sumCount={this.state.num} done={this.handeDone} unfinished={this.handeUfinished} deletes={this.handeDelete} all={this.handeAll} />
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;




