// import { AbiItem } from "web3-utils";
//
// const ABIFunding: AbiItem[] = [
//     {
//         anonymous: false,
//         inputs: [
//             {
//                 indexed: true,
//                 internalType: "address",
//                 name: "previousOwner",
//                 type: "address"
//             },
//             {
//                 indexed: true,
//                 internalType: "address",
//                 name: "newOwner",
//                 type: "address"
//             }
//         ],
//         name: "OwnershipTransferred",
//         type: "event"
//     },
//     {
//         inputs: [],
//         name: "getCampaigns",
//         outputs: [
//             {
//                 components: [
//                     {
//                         internalType: "uint256",
//                         name: "id",
//                         type: "uint256"
//                     },
//                     {
//                         internalType: "address",
//                         name: "owner",
//                         type: "address"
//                     },
//                     {
//                         internalType: "uint256",
//                         name: "target",
//                         type: "uint256"
//                     },
//                     {
//                         components: [
//                             {
//                                 internalType: "address",
//                                 name: "funder",
//                                 type: "address"
//                             },
//                             {
//                                 internalType: "uint256",
//                                 name: "amount",
//                                 type: "uint256"
//                             },
//                             {
//                                 internalType: "bool",
//                                 name: "filled",
//                                 type: "bool"
//                             }
//                         ],
//                         internalType: "struct Funding.FundTx[]",
//                         name: "fundTxs",
//                         type: "tuple[]"
//                     },
//                     {
//                         internalType: "uint256",
//                         name: "startedAt",
//                         type: "uint256"
//                     },
//                     {
//                         internalType: "uint256",
//                         name: "finishedAt",
//                         type: "uint256"
//                     }
//                 ],
//                 internalType: "struct Funding.Campaign[]",
//                 name: "",
//                 type: "tuple[]"
//             }
//         ],
//         stateMutability: "view",
//         type: "function"
//     },
//     {
//         inputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256"
//             }
//         ],
//         name: "campaigns",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "id",
//                 type: "uint256"
//             },
//             {
//                 internalType: "address",
//                 name: "owner",
//                 type: "address"
//             },
//             {
//                 internalType: "uint256",
//                 name: "target",
//                 type: "uint256"
//             },
//             {
//                 internalType: "uint256",
//                 name: "startedAt",
//                 type: "uint256"
//             },
//             {
//                 internalType: "uint256",
//                 name: "finishedAt",
//                 type: "uint256"
//             }
//         ],
//         stateMutability: "view",
//         type: "function"
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "owner",
//                 type: "address"
//             },
//             {
//                 internalType: "uint256",
//                 name: "target",
//                 type: "uint256"
//             },
//             {
//                 internalType: "uint256",
//                 name: "startDate",
//                 type: "uint256"
//             },
//             {
//                 internalType: "uint256",
//                 name: "finishDate",
//                 type: "uint256"
//             }
//         ],
//         name: "createCampaign",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256"
//             }
//         ],
//         stateMutability: "nonpayable",
//         type: "function"
//     },
//     {
//         inputs: [
//             {
//                 internalType: "uint256",
//                 name: "campaignId",
//                 type: "uint256"
//             }
//         ],
//         name: "fund",
//         outputs: [],
//         stateMutability: "payable",
//         type: "function"
//     },
//     {
//         inputs: [
//             {
//                 components: [
//                     {
//                         internalType: "address",
//                         name: "funder",
//                         type: "address"
//                     },
//                     {
//                         internalType: "uint256",
//                         name: "amount",
//                         type: "uint256"
//                     },
//                     {
//                         internalType: "bool",
//                         name: "filled",
//                         type: "bool"
//                     }
//                 ],
//                 internalType: "struct Funding.FundTx[]",
//                 name: "funds",
//                 type: "tuple[]"
//             }
//         ],
//         name: "fundsSum",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256"
//             }
//         ],
//         stateMutability: "pure",
//         type: "function"
//     },
//     {
//         inputs: [
//             {
//                 internalType: "uint256",
//                 name: "campaignId",
//                 type: "uint256"
//             }
//         ],
//         name: "getCampaign",
//         outputs: [
//             {
//                 components: [
//                     {
//                         internalType: "uint256",
//                         name: "id",
//                         type: "uint256"
//                     },
//                     {
//                         internalType: "address",
//                         name: "owner",
//                         type: "address"
//                     },
//                     {
//                         internalType: "uint256",
//                         name: "target",
//                         type: "uint256"
//                     },
//                     {
//                         components: [
//                             {
//                                 internalType: "address",
//                                 name: "funder",
//                                 type: "address"
//                             },
//                             {
//                                 internalType: "uint256",
//                                 name: "amount",
//                                 type: "uint256"
//                             },
//                             {
//                                 internalType: "bool",
//                                 name: "filled",
//                                 type: "bool"
//                             }
//                         ],
//                         internalType: "struct Funding.FundTx[]",
//                         name: "fundTxs",
//                         type: "tuple[]"
//                     },
//                     {
//                         internalType: "uint256",
//                         name: "startedAt",
//                         type: "uint256"
//                     },
//                     {
//                         internalType: "uint256",
//                         name: "finishedAt",
//                         type: "uint256"
//                     }
//                 ],
//                 internalType: "struct Funding.Campaign",
//                 name: "campaign",
//                 type: "tuple"
//             }
//         ],
//         stateMutability: "view",
//         type: "function"
//     },
//     {
//         inputs: [],
//         name: "owner",
//         outputs: [
//             {
//                 internalType: "address",
//                 name: "",
//                 type: "address"
//             }
//         ],
//         stateMutability: "view",
//         type: "function"
//     },
//     {
//         inputs: [],
//         name: "renounceOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function"
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "newOwner",
//                 type: "address"
//             }
//         ],
//         name: "transferOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function"
//     },
//     {
//         inputs: [
//             {
//                 internalType: "uint256",
//                 name: "campaignId",
//                 type: "uint256"
//             }
//         ],
//         name: "withdraw",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function"
//     }
// ]
//
// export default ABIFunding