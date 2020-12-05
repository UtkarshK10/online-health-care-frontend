import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://deploy-practice2.herokuapp.com',
});

export default instance;
