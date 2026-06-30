import { feathers } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'

const API_URL = 'http://localhost:3030'

export const client = feathers()
client.configure(rest(API_URL).fetch(fetch))
