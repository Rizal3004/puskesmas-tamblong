import { ofetch } from 'ofetch'

export const baseURL = 'https://puskesmas-tamblong-server.puskesmas-tamblong-api.workers.dev/'
const apiFetch = ofetch.create({
  baseURL,
})

export default apiFetch
