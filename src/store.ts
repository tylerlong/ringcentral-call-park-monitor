import SubX from 'subx';
import {TokenInfo} from '@rc-ex/core/lib/definitions';
import RingCentral from '@rc-ex/core';
import localforage from 'localforage';
import AuthorizeUriExtension from '@rc-ex/authorize-uri';

export type StoreType = {
  ready: boolean;
  token?: TokenInfo;
  authorizeUri: string;
  init: Function;
  load: Function;
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
  async init() {
    const code = urlSearchParams.get('code');
    if (code) {
      await rc.authorize({
        code,
        redirect_uri: redirectUri,
      });
      await localforage.setItem('token', rc.token);
    }
  },
  async load() {
    const token = await localforage.getItem<TokenInfo>('token');
    if (token !== null) {
      this.token = token;
      rc.token = token;
    }
  },
});

export default store;
