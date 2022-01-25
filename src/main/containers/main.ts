import * as h from "react-hyperscript";
import { Provider } from "react-redux";
import App from "../../app/containers/App";
import store from "../reducers/store";

const Main = () => (
  h(Provider, { store }, [
    h(App)
  ])
);

export default Main;
