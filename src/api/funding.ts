import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from "ethers";

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
            "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            FundingABI,
            provider.getSigner()
        )
        try {
            return await funding.createCampaign(owner, target, startDate, finishDate)
        } catch (e) {
            return e
        }
    }
}