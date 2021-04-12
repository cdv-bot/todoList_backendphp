
import React from 'react';
import './App.css';
import Todo from './component/list_todo';
function App() {

  return (
    <div className="App">
      <Todo />
      {/* <div className="hd">
        <span>
          double click : Để chỉnh sửa.
        </span>
        <span>
          click : Đánh dấu hoàn thành công việc.
        </span>
        <span>
          Đã hoàn thành : Hiện các mục đã hoàn thành công việc.
        </span>
        <span>
          Chưa hoàn thành : Hiện các việc chưa hoàn thành.
        </span>
        <span>
          Xóa đã hoàn thành : Xóa các mục đã hoàn thành.
        </span>
      </div> */}
    </div>
  );
}

export default App;
