import React, { Component } from 'react';
import './style.scss';
import { doneItem, unfinishedItem, DataAddList, deleteItemsAll, nextPage, numberPage } from './../Actions';
import { connect } from 'react-redux';

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
    this.props.actionPage(true);
  }
  handleUnfinished = async () => {
    const { unfinishedItem } = this.props;
    unfinishedItem();
    this.props.actionPage(false);
  }

  handleDelete = async () => {
    const { deleteItemsAll } = this.props;
    deleteItemsAll();
  }
  handleAll = () => {
    const { DataAddList } = this.props;

    DataAddList();
    this.props.actionPage('ALL');
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
    listItem: state.list.data,
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

