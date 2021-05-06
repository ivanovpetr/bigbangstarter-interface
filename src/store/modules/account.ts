import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers} from "ethers";
import Funding from "@/api/funding";

export interface AccountState {
    address: string;
    chainId: number;
    balance: string;
    fundingBalances: Map<number, BigNumber>
}

const mutations = {
    setAddress: (_state: AccountState, address: string): void => {
        _state.address = address;
    },
    setChainId: (_state: AccountState, chainId: number): void => {
        _state.chainId = chainId;
    },
    setBalance: (_state: AccountState, balance: string): void => {
        _state.balance = balance;
    },
    clear: (_state: AccountState): void => {
        _state.balance = '';
    },
    setCampaignBalance: (_state: AccountState, payload: { campaignId: number, balance: BigNumber }): void => {
        _state.fundingBalances.set(payload.campaignId, payload.balance)
    }
}

const getters = {
    address: (state: AccountState): string => {
        return state.address;
    },
    fundingBalance: (state: AccountState) => (campaignId: number) => {
        return state.fundingBalances.get(campaignId)}
}

const actions = {
    init: async({ dispatch }: ActionContext<AccountState, RootState>): Promise<void> => {
        await dispatch('connect');
    },
    connect: async ({ commit, dispatch, state }: ActionContext<AccountState, RootState>): Promise<void> => {
        const metamask = (<any>window).ethereum
        if (!metamask){
            console.log("Please install Metamask")
            return
        }
        const accounts = await metamask.request({ method: 'eth_requestAccounts'})
        if (accounts.length === 0) {
            await dispatch("disconnect")
            return;
        }
        await dispatch('saveProvider', metamask);

    },
    disconnect: async({ commit }: ActionContext<AccountState, RootState>): Promise<void> => {
        console.log('vuex: account disconnect')
    },
    saveProvider: async({ commit, dispatch }: ActionContext<AccountState, RootState>, metamask: any): Promise<void> => {
        if (metamask.removeAllListeners) {
            metamask.removeAllListeners();
        }
        if (metamask && metamask.on) {
            metamask.on('chainChanged', async () => {
                //commit('clear');
                await dispatch('saveProvider', metamask);
            });
            metamask.on('accountsChanged', async () => {
                //commit('clear');
                await dispatch('saveProvider', metamask);
            });
            metamask.on('disconnect', async () => {
                await dispatch('disconnect');
            });
        }
        const account = metamask.selectedAddress
        const web3Provider = new Web3Provider(metamask)
        let balance
        if (account) {
            balance =  await web3Provider.getBalance(account)
        } else {
            balance = '0'
        }
        commit('setAddress', account)
        commit('setBalance', ethers.utils.formatEther(balance))
        //commit('setChainId', network.chainId);
        //dispatch('fetchState');
    },
    fetchFundingBalance: async({ commit, state }: ActionContext<AccountState, RootState>, campaignId: number): Promise<void> => {
        let balance = BigNumber.from(0)
        try {
            balance = await Funding.getCampaignFundingsSumByUser(BigNumber.from(campaignId) ,state.address)
        } catch (e){
            console.error('failed to fetch funding balance', e)
            return
        }
        commit('setCampaignBalance', {campaignId: campaignId, balance: balance})
    }
}

function state(): AccountState {
    return {
        address: '',
        chainId: 0,
        balance: '',
        fundingBalances: new Map<number, BigNumber>()
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}