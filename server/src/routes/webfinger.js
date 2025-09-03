import express from 'express';
import { config } from '../config.js';


const router = express.Router();


router.get('/.well-known/webfinger', async (req, res) => {
const resource = req.query.resource; // acct:handle@domain
if (!resource || !resource.startsWith('acct:')) return res.status(400).json({ error: 'Bad resource' });
const [handle, domain] = resource.replace('acct:', '').split('@');
if (!handle || !domain) return res.status(400).json({ error: 'Bad acct format' });


const subject = `acct:${handle}@${config.instance.handleDomain}`;
res.json({
subject,
links: [
{
rel: 'self',
type: 'application/activity+json',
href: `${config.publicUrl}/users/${handle}`
}
]
});
});


export default router;
