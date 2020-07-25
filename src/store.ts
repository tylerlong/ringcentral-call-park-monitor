import SubX from 'subx';
import {TokenInfo} from '@rc-ex/core/lib/definitions';

export type StoreType = {
  ready: boolean;
  token?: TokenInfo;
};

const store = SubX.proxy<StoreType>({
  ready: false,
  token: undefined,
});

export default store;
