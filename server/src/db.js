import { Pool } from 'pg';
import { config } from './config.js';
import fs from 'fs';
import path from 'path';
import url from 'url';


const pool = new Pool(config.db);


export const db = {
query: (text, params) => pool.query(text, params),
};


export async function runSchema() {
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
await db.query(sql);
console.log('DB schema applied.');
}
