import { createStore } from 'vuex'

import account, { AccountState } from './modules/account';
import campaigns, { CampaignsState } from './modules/campaigns';

export interface RootState {
  account: AccountState;
  campaigns: CampaignsState;
}

const store =  createStore({
  modules: {
    account,
    campaigns,
  },
})

export default store
