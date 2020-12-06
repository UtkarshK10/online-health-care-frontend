import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://deploy-practice4.herokuapp.com/',
});

export default instance;
