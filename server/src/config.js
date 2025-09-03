import dotenv from 'dotenv';
dotenv.config();


export const config = {
port: process.env.PORT || 4000,
publicUrl: process.env.PUBLIC_URL || 'http://localhost:4000',
instance: {
domain: process.env.INSTANCE_DOMAIN || 'localhost:4000',
handleDomain: process.env.INSTANCE_HANDLE_DOMAIN || 'localhost:4000',
name: process.env.INSTANCE_NAME || 'Local Social'
},
db: {
host: process.env.PGHOST || 'localhost',
user: process.env.PGUSER || 'postgres',
password: process.env.PGPASSWORD || 'postgres',
database: process.env.PGDATABASE || 'dsm',
port: Number(process.env.PGPORT || 5432)
},
ipfs: {
endpoint: process.env.IPFS_ENDPOINT || 'http://127.0.0.1:5001',
gateway: process.env.IPFS_GATEWAY || 'http://127.0.0.1:8080'
}
};
