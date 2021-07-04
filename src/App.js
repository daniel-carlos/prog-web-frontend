import './App.css';
import PageHeader from './components/common/PageHeader';

import HomePage from './screens/home';
import LoginPage from './screens/login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useStore } from "./context/context";

function App() {

  return (
    <div className="App">
      <Router>
        <PageHeader></PageHeader>

        <Switch>
          <Route
            path="/login"
            render={() => {
              return <LoginPage></LoginPage>
            }}
          />

          <Route
            path="/"
            render={() => {
              return <HomePage></HomePage>
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
