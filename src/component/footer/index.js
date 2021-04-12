import React, { Component } from 'react';
import productApi from '../apis/productsApi';
import './style.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  // componentDidMount() {
  //   productApi.getList().then(data => {
  //     let sus = data.filter(x => {
  //     return x.checks === "1";
  //   });
  //   let all = data.length;
  //   let key = `${sus.length} / ${all}`;
  //     this.setState({
  //       count: data.length
  //     })
  //   });
  // }



  handleDone = () => {
    this.props.done();
  }
  handleUnfinished = () => {
    this.props.unfinished();
  }
  handleDelete = () => {
    this.props.deletes();
  }
  handleAll = () => {
    this.props.all();
  }

  count = async () => {
    let data = await productApi.getList()
    let sus = data.filter(x => {
      return x.checks === "1";
    });
    let all = data.length;
    let key = `${sus.length} / ${all}`;
    return key;
  }

  showCount = () => {
    const { sumCount } = this.props;
    let sus = sumCount.filter(x => {
      return x.checks === "1";
    });
    let all = sumCount.length;
    let key = `${sus.length} / ${all}`;

    return key;
  }

  percent = () => {
    const { sumCount } = this.props;
    let sus = sumCount.filter(x => {
      return x.checks === "1";
    });

    let percent = (sus.length / sumCount.length) / 0.01;
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
export default Footer;

