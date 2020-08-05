import React from 'react';
import {Component} from 'react-subx';
import {Spin, Button} from 'antd';

import {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};
class App extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return store.ready ? (
      store.token ? (
        <Main store={store} />
      ) : (
        <Login store={store} />
      )
    ) : (
      <Spin size="large" />
    );
  }
}

class Login extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return (
      <a href={store.authorizeUri} target="_parent">
        <Button type="primary">Login RingCentral</Button>
      </a>
    );
  }
}

class Main extends Component<PropsStore> {
  render() {
    // const store = this.props.store;
    return 'Main';
  }
}

export default App;
