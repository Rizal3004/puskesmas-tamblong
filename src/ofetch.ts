import { ofetch } from 'ofetch'

export const baseURL = 'http://localhost:8787'
const apiFetch = ofetch.create({
  baseURL,
})

export default apiFetch
