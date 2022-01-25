import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./main/containers/main";


const renderApp = () => ReactDOM.render(
  React.createElement(Main),
  document.getElementById("root") as HTMLElement
);

const app = {
  // Application Constructor
  initialize() {
    document.addEventListener("deviceready", this.onReceiveEvent.bind(this), false);
  },

  onReceiveEvent(id: string) {
    this.onDeviceReady();
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady() {
    renderApp();
  },
};

const isBrowser = () => document.URL.indexOf( "http://" ) !== -1 || document.URL.indexOf( "https://" ) !== -1;

if (isBrowser()) {
  renderApp();
} else {
  app.initialize();
}
