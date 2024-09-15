import { ofetch } from 'ofetch'

export const baseURL = 'https://puskesmas-tamblong-server.puskesmas-tamblong-api.workers.dev/'
// export const baseURL = 'http://localhost:8787/'

const apiFetch = ofetch.create({
  baseURL,
})

export default apiFetch
