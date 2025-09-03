import { config } from './config.js';
import { actorUrl } from './utils.js';


export function actorDoc(user) {
const id = actorUrl(user.handle);
return {
'@context': [
'https://www.w3.org/ns/activitystreams',
'https://w3id.org/security/v1'
],
id,
type: 'Person',
preferredUsername: user.handle,
name: user.display_name || user.handle,
summary: user.bio || '',
inbox: `${id}/inbox`,
outbox: `${id}/outbox`,
followers: `${id}/followers`,
following: `${id}/following`,
publicKey: {
id: `${id}#main-key`,
owner: id,
publicKeyPem: user.public_key
}
};
}


export function createNoteActivity(note, user) {
const actor = actorUrl(user.handle);
return {
'@context': 'https://www.w3.org/ns/activitystreams',
id: `${actor}/statuses/${note.id}`,
type: 'Create',
actor,
published: new Date(note.created_at || Date.now()).toISOString(),
to: ['https://www.w3.org/ns/activitystreams#Public'],
object: {
id: `${actor}/notes/${note.id}`,
type: 'Note',
attributedTo: actor,
content: note.content,
mediaType: 'text/html',
attachment: (note.media_refs || []).map(r => ({
type: 'Document',
mediaType: r.mime_type,
url: r.url
})),
to: ['https://www.w3.org/ns/activitystreams#Public']
}
};
}
