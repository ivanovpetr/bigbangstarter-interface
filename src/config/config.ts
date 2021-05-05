import localhost from "./localhost.json"

interface Config {
    network: string;
    chainId: number;
    precision: number;
    url: string
    addresses: {
        funding: string;
    };
}

const configs = {
    31337: {
        ...localhost
    }
};
// eslint-disable-next-line no-undef
const network = process.env.APP_CHAIN_ID || 31337;

// @ts-ignore
const config: Config = configs[network];

export default config;