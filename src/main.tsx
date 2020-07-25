import React from 'react';
import {Component} from 'react-subx';
import {Spin} from 'antd';

import {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};
class App extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return store.ready ? <Main store={store} /> : <Spin size="large" />;
  }
}

class Main extends Component<PropsStore> {
  render() {
    return (
      <>
        <h1>Hello world</h1>
      </>
    );
  }
}

export default App;
