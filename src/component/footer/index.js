import React, { Component } from 'react';
import './style.scss';
import { doneItem, unfinishedItem, DataAddList, deleteItemsAll, nextPage, numberPage } from './../Actions';
import { connect } from 'react-redux';
import productApi from '../apis/productsApi';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counts: 0
    }
  }
  handleDone = () => {
    const { doneItem } = this.props;
    doneItem();
  }
  handleUnfinished = async () => {
    // const { unfinishedItem } = this.props;
    // unfinishedItem();


    const { page } = this.props.page;
    console.log(page)
    let arr = await productApi.getListPage();
    let count = Math.ceil(arr.length / 6);
    if (page > 1) {
      console.log(count)
      this.props.nextPage(page - 1)
    }
  }

  handleDelete = async () => {
    // const { deleteItemsAll } = this.props;
    // deleteItemsAll();



    const { page } = this.props.page;
    console.log(page)
    let arr = await productApi.getListPage();
    let count = Math.ceil(arr.length / 6);
    if (page < count) {
      console.log(count)
      this.props.nextPage(page + 1)
    }

  }
  handleAll = () => {
    const { DataAddList } = this.props;

    DataAddList();
  }


  showCount = () => {
    const { listItem } = this.props;
    let sus = listItem.filter(x => {
      return x.checks === true;
    });
    let all = listItem.length;
    let key = `${sus.length} / ${all}`;

    return key;
  }

  percent = () => {
    const { listItem } = this.props;
    let sus = listItem.filter(x => {
      return x.checks === true;
    });

    let percent = (sus.length / listItem.length) / 0.01;
    return percent;
  }

  render() {
    return (
      <div className="bt_change">
        <span>Hoàn thành:</span>
        <div className="point">
          <span className="progress" style={{ width: `${this.percent()}%` }}>
          </span>
          <span className="number">
            {
              this.showCount()
            }
          </span>
        </div>
        <div className="bt">
          <button onClick={this.handleDone}>Đã hoàn thành</button>
          <button onClick={this.handleUnfinished}>Chưa hoàn thành</button>
          <button onClick={this.handleDelete}>Xóa đã hoàn thành</button>
          <button onClick={this.handleAll}>Show All</button>
        </div>
      </div>
    );
  }
}

const statetoProps = state => {
  return {
    listItem: state.list,
    page: state.page
  }
};
const dispatchProps = {
  doneItem,
  unfinishedItem,
  DataAddList,
  deleteItemsAll,
  nextPage,
  numberPage
}
export default connect(statetoProps, dispatchProps)(Footer);

