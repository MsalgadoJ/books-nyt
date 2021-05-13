import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3',
  headers: {
    "Accept": "application/json",
  },
});



