import Web3Provider from './web3'
import ABIFunding from '@/abi/fundingAbi'

const FundingContract = new Web3Provider.eth.Contract(ABIFunding, '0x92E8d6291d7F8662821278D22424395bc43c4BE7')

export default FundingContract