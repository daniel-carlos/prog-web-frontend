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
  const { logged, loading } = useStore(s => s);

  const PrivateRoute = ({ children, ...rest }) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      if (!loading) {
        setRedirect(!logged);
      }
    }, [loading, logged])

    return (
      !loading ?
        <Route {...rest}
          render={
            ({ location }) => redirect ?
              (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
              :
              (children)
          } />
        :
        <></>
    );
  }

  return (
    <div>
      <Persist></Persist>
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


            <PrivateRoute
              path="/meus-pedidos"
            >
              <MyOrders></MyOrders>
            </PrivateRoute>


            <PrivateRoute
              path="/dashboard"
            >
              <AdminDashboardPage></AdminDashboardPage>
            </PrivateRoute>


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
    </div>
  );
}

export default App;
