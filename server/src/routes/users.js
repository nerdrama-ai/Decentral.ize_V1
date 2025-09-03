import express from 'express';
import { db } from '../db.js';
import { v4 as uuidv4 } from 'uuid';
import { newKeyPair } from '../utils.js';
import { actorDoc } from '../activitypub.js';


const router = express.Router();


// Create local user (dev-only simple endpoint)
router.post('/api/users', async (req, res) => {
const { handle, display_name } = req.body || {};
if (!handle) return res.status(400).json({ error: 'handle required' });


const { publicKey, privateKey } = newKeyPair();
const id = uuidv4();
try {
await db.query(
'insert into users(id, handle, display_name, public_key, private_key) values($1,$2,$3,$4,$5)',
[id, handle, display_name || null, publicKey, privateKey]
);
} catch (e) {
if (e.code === '23505') return res.status(409).json({ error: 'handle taken' });
throw e;
}
res.json({ id, handle });
});


// Actor document
router.get('/users/:handle', async (req, res) => {
const { rows } = await db.query('select * from users where handle=$1', [req.params.handle]);
if (!rows.length) return res.status(404).json({ error: 'not found' });
res.set('Content-Type', 'application/activity+json');
res.json(actorDoc(rows[0]));
});


export default router;
