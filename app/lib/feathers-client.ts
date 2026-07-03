import { feathers } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios';

const restClient = rest(process.env.NODE_ENV === 'production' ? 'https://api.justinszaro.com' : 'http://localhost:3030');
const client = feathers();

client.configure(restClient.axios(axios.create({
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})));

export default client;
