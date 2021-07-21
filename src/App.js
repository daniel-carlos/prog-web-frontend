import './App.css';
import PageHeader from './components/common/PageHeader';

import Persist from './components/common/Persist';
import PersistCart from './components/common/PersistCart';

import HomePage from './screens/home';
import LoginPage from './screens/login';
import ProductPage from './screens/product';
import CartPage from './screens/cart';
import MyOrders from './screens/my_orders';
import ProductList from './screens/product_list';
import PageCadastro from './screens/cadastro';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import { useStore } from "./context/context";

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function App() {
  const logged = useStore(state => state.logged);

  const PrivateRoute = ({ children, ...rest }) => {

    return (<Route {...rest} render={
      ({ location }) => getCookie("pw_tkn").length > 0 ?
        (children) :
        (<Redirect to={{ pathname: '/login', state: { from: location } }} />)} />
    );
  }

  return (
    <div className="App">
      <Persist></Persist>
      <PersistCart></PersistCart>
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

          <PrivateRoute
            path="/meus-pedidos"
          >
            <MyOrders></MyOrders>
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
  );
}

export default App;
