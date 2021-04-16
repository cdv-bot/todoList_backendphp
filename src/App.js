
import React, { Suspense } from 'react';
import './App.css';
import Loading from './component/loading';
import Login from './component/login';

// import Todo from './component/list_todo';
const Todo = React.lazy(() => {
  return new Promise(res => {
    setTimeout(() => res(import('./component/list_todo')), 800);
  })
})
// import('./component/list_todo'));
function App() {

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Todo />
        {/* <Login /> */}
      </Suspense>
    </div>
  );
}

export default App;
