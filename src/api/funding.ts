import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from "ethers";
import config from "@/config/config";
import provider from "@/utils/provider";

import FundingABI from "../abi/Funding.json"


export default class Funding {
    static async createCampaign(
        provider: Web3Provider,
        owner: string,
        target: BigNumber,
        startDate: BigNumber,
        finishDate: BigNumber
    ): Promise<any> {
        const funding = new Contract(
            config.addresses.funding,
            FundingABI,
            provider.getSigner()
        )
        try {
            return await funding.createCampaign(owner, target, startDate, finishDate)
        } catch (e) {
            return e
        }
    }
    static async getCampaigns(): Promise<any> {
        const funding = new Contract(
            config.addresses.funding,
            FundingABI,
            provider.getSigner()
        )
        try {
            return await funding.getCampaigns()
        } catch (e) {
            return e
        }
    }
    static async getCampaignFundingsSumByUser(campaignId: BigNumber, account: string): Promise<any> {
        const funding = new Contract(
            config.addresses.funding,
            FundingABI,
            provider.getSigner()
        )
        try {
            return await funding.getBalance(campaignId, account)
        } catch (e) {
            return e
        }
    }
}