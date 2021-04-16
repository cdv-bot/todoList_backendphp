import React, { Component } from 'react';

class Item extends Component {
  render() {
    const { keys, index, deleteId, key, toggle, valueFix } = this.props;
    console.log(this.props)
    return (
      <>
        {/* <div
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
        </div > */}
      </>
    );
  }
}

export default Item;
