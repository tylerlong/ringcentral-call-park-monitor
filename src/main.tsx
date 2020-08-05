import React from 'react';
import {Component} from 'react-subx';
import {Spin, Button, Checkbox} from 'antd';

import {StoreType} from './store';
import {CheckboxOptionType} from 'antd/lib/checkbox/Group';

type PropsStore = {
  store: StoreType;
};
class App extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return (
      <>
        <h1>RingCentral Call Park Monitor</h1>
        {store.ready ? (
          store.token ? (
            <Main store={store} />
          ) : (
            <Login store={store} />
          )
        ) : (
          <Spin size="large" />
        )}
      </>
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
    const store = this.props.store;
    const options = store.extensions.map(
      ext =>
        ({
          label: `${ext.extensionNumber} - ${ext.name}`,
          value: ext.id,
        } as CheckboxOptionType)
    );
    return (
      <>
        <Button danger onClick={() => store.logout()}>
          Logout
        </Button>
        <h2>Open browser console to see real time log messages.</h2>
        <h2>Please select the extensions you want to monitor:</h2>
        <Checkbox.Group
          options={options}
          onChange={checkboxValueTypes =>
            store.onExtensionChange(checkboxValueTypes)
          }
        />
      </>
    );
  }
}

export default App;
