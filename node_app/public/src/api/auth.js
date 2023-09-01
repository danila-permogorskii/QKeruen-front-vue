// import axios from 'axios';
import { api } from '@/helpers/api';

export const authUser = ({phoneNumber, role}) => {
  return api.post('/authorization/sign', {
    phoneNumber,
    role,
  })
}

export const sendSMS = ({phoneNumber, role, code}) => {
  return api.post('/authorization/check', {
    phoneNumber,
    role,
    code,
  })
} 

export const checkToken = () => {
  return api.post('/authorization/check-token')
} 
