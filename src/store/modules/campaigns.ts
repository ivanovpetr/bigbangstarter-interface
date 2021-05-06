import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import {ethers, BigNumber} from "ethers";
import provider from "@/utils/provider";
import Funding from "@/api/funding";
import moment from 'moment'

export interface CampaignsState {
     campaigns: CampaignData[];
}

export interface CampaignData {
    id: number;
    owner: string;
    target: BigNumber
    funded: BigNumber
    startedAt: moment.Moment
    finishedAt: moment.Moment
    collectedByOwner: boolean
}

const mutations = {
    setCampaigns: (_state: CampaignsState, campaigns: CampaignData[]): void => {
        _state.campaigns = campaigns;
    },
}

const getters = {
    campaigns: (state: CampaignsState): CampaignData[] => {
        return state.campaigns
    },
    campaignById: (state: CampaignsState) => (campaignId: number) => {
        return state.campaigns.find((c: CampaignData) => {
            return c.id === campaignId
        })
    }
}

const actions = {
    init: async({ dispatch }: ActionContext<CampaignsState, RootState>): Promise<void> => {
        await dispatch('fetchCampaigns')
    },
    fetchCampaigns: async({commit}: ActionContext<CampaignsState, RootState>): Promise<void> => {
        const campaigns = await Funding.getCampaigns()
        const convertedCampaigns: Array<CampaignData> = campaigns.map((campaign: any): CampaignData => {
            return {
                id: campaign.id.toNumber(),
                owner: campaign.owner,
                target: campaign.target,
                funded: campaign.funded,
                startedAt: moment.unix(campaign.startedAt),
                finishedAt: moment.unix(campaign.finishedAt),
                collectedByOwner: campaign.collectedByOwner
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