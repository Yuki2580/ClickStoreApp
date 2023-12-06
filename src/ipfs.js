import { create } from 'ipfs-http-client'

const projectId = 'PROJECT_ID';
const projectSecret = 'PROJECT_SECRET';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
})

export default ipfs;
