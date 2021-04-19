import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import FundingContract from '@/api/funding';
import moment from 'moment'
import BN from "bn.js";

export interface CampaignsState {
     campaigns: CampaignData[];
}

export interface CampaignData {
    id: number;
    owner: string;
    target: BN
    funded: BN
    startedAt: moment.Moment
    finishedAt: moment.Moment
}

const mutations = {
    setCampaigns: (_state: CampaignsState, campaigns: CampaignData[]): void => {
        _state.campaigns = campaigns;
    },
}

const getters = {
    campaignsInProgress: (state: CampaignsState): CampaignData[] => {
         const nowUnix = moment().unix()
         return state.campaigns.filter((campaign: CampaignData) => {
             return campaign.startedAt.unix() > nowUnix && campaign.finishedAt.unix() < nowUnix
        })
        return state.campaigns
    },
    campaigns: (state: CampaignsState): CampaignData[] => {
        return state.campaigns
    }
}

const actions = {
    init: async({ dispatch }: ActionContext<CampaignsState, RootState>): Promise<void> => {
        await dispatch('fetchCampaigns')
    },
    fetchCampaigns: async({commit}: ActionContext<CampaignsState, RootState>): Promise<void> => {
        const campaigns = await FundingContract.methods.getCampaigns().call()
        const convertedCampaigns: Array<CampaignData> = campaigns.map((campaign: any):CampaignData => {
            return {
                id: campaign[0],
                owner: campaign[1],
                target: new BN(campaign[2]),
                funded: new BN(campaign[3].reduce((sum: BN, tx: any) => sum.add(tx[1]), 0)),
                startedAt: moment.unix(campaign[4]),
                finishedAt: moment.unix(campaign[5]),
            }
        }).sort((a: CampaignData, b: CampaignData) => {
            if (a.finishedAt.unix() < b.finishedAt.unix()) {
                return -1;
            }
            if (a.finishedAt.unix() < b.finishedAt.unix()) {
                return 1;
            }
            return 0;
        })

        commit('setCampaigns', convertedCampaigns)

    }
}

function state(): CampaignsState {
    return {
       campaigns: []
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}