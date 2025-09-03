import { create as ipfsHttpClient } from 'ipfs-http-client';
import { config } from './config.js';


let client;
export function ipfs() {
if (!client) {
client = ipfsHttpClient({ url: config.ipfs.endpoint });
}
return client;
}
