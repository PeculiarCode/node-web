import axios from 'axios'

export const request = async ({ ...options }) => {
  if (options.method === 'GET') {
    return axios({
      url: `/api/${options.url}`,
      method: options.method,
      params: options.params
    })
  } else {
    return axios({
      url: `/api/${options.url}`,
      method: options.method,
      data: options.data
    })
  }
}
