
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Loading from './component/loading';
import Login from './component/login';
import Registration from './component/registration';

// import Todo from './component/list_todo';
const Todo = React.lazy(() => {
  return new Promise(res => {
    setTimeout(() => res(import('./component/list_todo')), 800);
  })
})


function App() {

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/registration" exact>
              <Registration />
            </Route>
            <Route path="/todo" exact>
              <Todo />
            </Route>
          </Switch>
        </div>
      </Suspense>
      {/* <Todo /> */}
      {/* <Login /> */}


    </Router>
  );
}

export default App;
