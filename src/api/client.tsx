import Axios from 'axios'
export const client = Axios.create({
  baseURL: "http://178.63.13.157:8090/mock-api/api/"
})