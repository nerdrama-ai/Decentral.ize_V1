import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { config } from './config.js';


export function newKeyPair() {
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
modulusLength: 2048,
publicKeyEncoding: { type: 'spki', format: 'pem' },
privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});
return { publicKey, privateKey };
}


export function actorUrl(handle) {
return `${config.publicUrl}/users/${handle}`;
}


export function activityId() {
return `${config.publicUrl}/activities/${uuidv4()}`;
}
