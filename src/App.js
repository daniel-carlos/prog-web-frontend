import './App.css';
import PageHeader from './components/common/PageHeader';

import HomePage from './screens/home';
import LoginPage from './screens/login';
import ProductPage from './screens/product';
import CartPage from './screens/cart';
import MyOrders from './screens/my_orders';

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
            path="/product"
            render={() => {
              return <ProductPage></ProductPage>
            }}
          />

          <Route
            path="/meus-pedidos"
            render={() => {
              return <MyOrders></MyOrders>
            }}
          />

          <Route
            path="/cart"
            render={() => {
              return <CartPage></CartPage>
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
