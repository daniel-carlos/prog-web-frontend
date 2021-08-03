import './App.css';
import MainHeader from './components/common/MainHeader';

import Persist from './components/common/Persist';

import HomePage from './screens/home';
import LoginPage from './screens/login';
import ProductPage from './screens/product';
import CartPage from './screens/cart';
import MyOrders from './screens/my_orders';
import ProductList from './screens/product_list';
import PageCadastro from './screens/cadastro';
import AdminDashboardPage from './screens/admin_dashboard';
import AdminPedidosPage from './screens/admin_pedidos';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import { useStore } from "./context/context";
import { useLayoutEffect, useEffect, useState } from 'react';


function App(props) {
  const { logged, loading, user } = useStore(s => s);

  return (
    <div>
      <Persist></Persist>
      {!loading &&
        <div className="App">
          <Router>
            <MainHeader></MainHeader>
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
                path={`/cadastro`}
                render={() => {
                  return <PageCadastro></PageCadastro>
                }}
              />

              <Route
                path="/lista"
                render={() => {
                  return <ProductList></ProductList>
                }}
              />


              <Route
                path="/pedidos"
              >
                <AdminPedidosPage></AdminPedidosPage>
              </Route>


              <Route
                path="/meus-pedidos"
              >
                <MyOrders></MyOrders>
              </Route>


              <Route
                path="/dashboard"
                render={() => {
                  return (
                    user.admin?
                      <AdminDashboardPage></AdminDashboardPage>
                      :
                      <Redirect to="/login" />
                  )
                }}
              >
              </Route>


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

      }
    </div>
  );
}

export default App;
