
const axios = require('axios');

export default function getJoke(params = 'https://api.chucknorris.io/jokes/random') {
  return axios.get(params).then((response) => response.data).catch((err) => err);
}
