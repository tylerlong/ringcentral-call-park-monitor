import SubX from 'subx';
import {TokenInfo, GetExtensionInfoResponse} from '@rc-ex/core/lib/definitions';
import RingCentral from '@rc-ex/core';
import localforage from 'localforage';
import AuthorizeUriExtension from '@rc-ex/authorize-uri';
import {CheckboxValueType} from 'antd/lib/checkbox/Group';

export type StoreType = {
  ready: boolean;
  token?: TokenInfo;
  authorizeUri: string;
  extensions: GetExtensionInfoResponse[];
  init: Function;
  load: Function;
  logout: Function;
  onExtensionChange: Function;
};

const redirectUri = window.location.origin + window.location.pathname;
const urlSearchParams = new URLSearchParams(
  new URL(window.location.href).search
);
const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});
const authorizeUriExtension = new AuthorizeUriExtension();
rc.installExtension(authorizeUriExtension);

const store = SubX.proxy<StoreType>({
  ready: false,
  token: undefined,
  authorizeUri: authorizeUriExtension.buildUri({redirect_uri: redirectUri}),
  extensions: [],
  async init() {
    const code = urlSearchParams.get('code');
    if (code) {
      await rc.authorize({
        code,
        redirect_uri: redirectUri,
      });
      await localforage.setItem('token', rc.token);
      window.location.href = redirectUri; // get rid of query string
    }
  },
  async load() {
    const token = await localforage.getItem<TokenInfo>('token');
    if (token !== null) {
      this.token = token;
      rc.token = token;
      await rc.refresh(); // refresh to get a brand new access token
      await localforage.setItem('token', rc.token);
      const r = await rc
        .restapi()
        .account()
        .extension()
        .list({
          perPage: 300,
          status: ['Enabled'],
          type: ['User'],
        });
      this.extensions = r.records!;
    }
  },
  async logout() {
    await localforage.clear();
    window.location.reload(false);
  },
  async onExtensionChange(checkboxValueTypes: CheckboxValueType[]) {
    console.log(checkboxValueTypes);
  },
});

export default store;
