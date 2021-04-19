import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import Web3 from '@/api/web3';


export interface AccountState {
    address: string;
    chainId: number;
    balance: string;
}

const mutations ={
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
}

const getters = {
    address: (state: AccountState): string => {
        return state.address;
    },
}

const actions = {
    init: async({ dispatch }: ActionContext<AccountState, RootState>): Promise<void> => {
        await dispatch('connect');
    },
    connect: async ({ commit, dispatch, state }: ActionContext<AccountState, RootState>): Promise<void> => {
        const provider = (<any>window).ethereum
        if (!provider){
            console.log("Please install Metamask")
            return
        }
        const accounts = await provider.request({ method: 'eth_requestAccounts'})
        if (accounts.length === 0) {
            await dispatch("disconnect")
            return;
        }
        await dispatch('saveProvider', provider);

    },
    disconnect: async({ commit }: ActionContext<AccountState, RootState>): Promise<void> => {
        console.log('vuex: account disconnect')
    },
    saveProvider: async({ commit, dispatch }: ActionContext<AccountState, RootState>, provider: any): Promise<void> => {
        if (provider.removeAllListeners) {
            provider.removeAllListeners();
        }
        if (provider && provider.on) {
            provider.on('chainChanged', async () => {
                //commit('clear');
                dispatch('saveProvider', provider);
            });
            provider.on('accountsChanged', async () => {
                //commit('clear');
                await dispatch('saveProvider', provider);
            });
            provider.on('disconnect', async () => {
                dispatch('disconnect');
            });
        }
        const account = provider.selectedAddress
        let balance
        if (account) {
            balance =  await Web3.eth.getBalance(account)
        } else {
            balance = '0'
        }
        commit('setAddress', account)
        commit('setBalance', Web3.utils.fromWei(balance, "ether"))
        //commit('setChainId', network.chainId);
        //dispatch('fetchState');
    },
}

function state(): AccountState {
    return {
        address: '',
        chainId: 0,
        balance: '',
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}