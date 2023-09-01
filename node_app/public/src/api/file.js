import axios from 'axios';
// import { api } from '@/helpers/api';

const baseUrl = 'https://s3.qkeruen.kz'

export const apiUploadAvatar = (file, fileName) => {
  const fd = new FormData();

  fd.append('file', file);
  return axios.post(`${baseUrl}/ava/upload/${fileName}`, fd)
}

export const apiDownloadAvatar = (name) => {
  return axios.post(`${baseUrl}/ava/download/${name}`, {}, { responseType: 'blob' })
}

export const apiUploadDocument = (file, fileName) => {
  const fd = new FormData();

  fd.append('file', file);
  return axios.post(`${baseUrl}/doc/upload/${fileName}`, fd)
}

export const apiDownloadDocument = (name) => {
  return axios.post(`${baseUrl}/doc/download/${name}`, {}, { responseType: 'blob' })
}


