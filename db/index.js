import config from '../knexfile'
const knex = require('knex')(config.development)



export default knex