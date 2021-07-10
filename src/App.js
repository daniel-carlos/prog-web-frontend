import './App.css';
import PageHeader from './components/common/PageHeader';

import Persist from './components/common/Persist';

import HomePage from './screens/home';
import LoginPage from './screens/login';
import ProductPage from './screens/product';
import CartPage from './screens/cart';
import MyOrders from './screens/my_orders';
import ProductList from './screens/product_list';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import { useStore } from "./context/context";



function App() {
  const logged = useStore(state=>state.logged);
  
  const requireLogin = (redirectTo) => {
      if(!logged){
        return <Redirect to={redirectTo}></Redirect>
      }else{
        return null;
      }
  }

  return (
    <div className="App">
      <Persist></Persist>
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
            path={`/product/:productId`}
            render={() => {
              return <ProductPage></ProductPage>
            }}
          />

          <Route
            path="/lista"
            render={() => {
              return <ProductList></ProductList>
            }}
          />

          <Route
            path="/meus-pedidos"
            render={() => {
              return logged? <MyOrders></MyOrders> : <Redirect to="/"></Redirect>
            }}
          />

          <Route
            path="/carrinho"
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
