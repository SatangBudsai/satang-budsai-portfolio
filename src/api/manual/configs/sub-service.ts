import axios from 'axios'
import { param } from '@/lib/params'
import apiMethods from '@/api/manual/core/apiMethods'

const urlService = process.env.NEXT_PUBLIC_SERVICE

export class ServerError extends Error {
  status: number
  response: unknown

  constructor(status: number, response: unknown) {
    super('Error from server')
    this.status = status
    this.response = response
    this.name = 'ServerError'
  }
}

const AxiosInstanceConfig = axios.create({
  baseURL: urlService,
  headers: {
    Accept: process.env.NEXT_PUBLIC_ACCEPT,
    token: process.env.NEXT_PUBLIC_TOKEN
  }
})

AxiosInstanceConfig.interceptors.request.use(config => {
  //*send token in Header*/
  // const token = Cookies.get("token");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config
})

AxiosInstanceConfig.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log('error', error?.response)
    }
  }
)

const subService = apiMethods(AxiosInstanceConfig)
export { param, AxiosInstanceConfig, subService }
