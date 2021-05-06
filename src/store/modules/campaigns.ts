import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import {ethers, BigNumber} from "ethers";
import provider from "@/utils/provider";
import Funding from "@/api/funding";
import moment from 'moment'

export interface CampaignsState {
    campaigns: CampaignData[];
    fundingTransactions: Map<number, FundingTransaction[]>
}

export interface FundingTransaction {
    amount: BigNumber,
    funder: string,
    campaignId: number,
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
    setFundingsTransaction: (_state: CampaignsState, payload:{campaignId: number, transactions: FundingTransaction[]}): void => {
        _state.fundingTransactions.set(payload.campaignId, payload.transactions)
    }
}

const getters = {
    campaigns: (state: CampaignsState): CampaignData[] => {
        return state.campaigns
    },
    campaignById: (state: CampaignsState) => (campaignId: number) => {
        return state.campaigns.find((c: CampaignData) => {
            return c.id === campaignId
        })
    },
    numberOfUniqueParticipants: (state: CampaignsState) => (campaignId: number) => {
        let participantsSet = new Set<string>();
        const campaignTransactions = state.fundingTransactions.get(campaignId)
        if (campaignTransactions != undefined){
            for(let t in campaignTransactions) {
                participantsSet.add(campaignTransactions[t].funder)
            }
        }
        return participantsSet.size
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
    },
    fetchFundingTransactionsByCampaignId: async({commit}: ActionContext<CampaignsState, RootState>, campaignId: number): Promise<void> => {
        const rawEvents = await Funding.getFundingTransactionsByCampaignId(BigNumber.from(campaignId))
        let transactions: FundingTransaction[] = []
        for (let e in rawEvents) {
            const event = rawEvents[e].decode(rawEvents[e].data, rawEvents[e].topics)
            transactions.push({
                amount: event.amount,
                funder: event.funder,
                campaignId: event.campaignId.toNumber()
            })
        }
        commit('setFundingsTransaction', {campaignId: campaignId, transactions: transactions})
    }
}

function state(): CampaignsState {
    return {
        campaigns: [],
        fundingTransactions: new Map<number, FundingTransaction[]>()
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
}