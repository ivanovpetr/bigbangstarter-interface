import {JsonRpcProvider} from "@ethersproject/providers";
import config from "@/config/config";

const provider = new JsonRpcProvider(config.url)

export default provider