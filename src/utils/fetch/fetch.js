import axios from 'axios'
import { HOST_CONFIG as hostConfig } from './fetchConifg'

function helloAlert(msg) { alert(msg.title) }

const { MOCK } = process.env
function dealRetCode(response = {}) {
  const res = { err: null, data: response.data }
  if (response.retCode === 4) {
    res.notAlert = true
    res.err = new Error('未登录')
    if (process.client) {
	// todo
	// window.location.reload()
	// window.location.href = '/login'
    }
    return res
  }
  if (response.retCode !== 1) {
    res.err = new Error(response.retMsg)
  }
  return res
}
function onUploadProgress(p) {
}
function fetchData(options) {
  const res = { err: null, data: '' }
  let { url } = options
  if (!url) {
    res.err = new Error('没有请求地址')
    return res
  }
  if (MOCK) {
    url = `http://67.209.187.22:3000/mock/15${url}`
  } else {
    url = process.env.NODE_ENV === 'development' ?
      `http://localhost:3001${url}` :
      process.client ? `${url}`: `http://127.0.0.1:3001${url}`
  }
  options.url = url
  options.method = options.method || 'get'
  options.onUploadProgress = onUploadProgress
  options.onDownloadProgress = onUploadProgress
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  if (options.type === 'formData') {
    options.headers = { 'Content-Type': 'multipart/form-data' }
    const formData = new FormData();
    const forDataKeys = Object.keys(options.data)
    forDataKeys.forEach((value) => {
      formData.append(value, options.data[value]);
    })
    options.data = formData
  }
  return axios(options)
}

const doFetchData = function (options) {
  const res = { err: null, data: '' }
  return new Promise((resolve) => {
    fetchData(options)
      .then((response) => {
        const result = dealRetCode(response.data)
        if(result.err) {
          res.err = result.err
          if(!result.notAlert && !options.notAlert) {
            helloAlert({
              title: res.err.message,
              showCancel: false
            })
          }
          resolve(res)
          return
        }
        res.data = result.data
        resolve(res)
      })
      .catch((err) => {
        resolve({ err, data: '' })
      })
  })
}

const uploadFile = function (params) {
  const options = {
    data: params,
    type: 'formData',
    method: 'post',
    url: '/api/uploadImg'
  }
  return doFetchData(options)
}

export default doFetchData

export {
  fetchData,
  uploadFile
}
