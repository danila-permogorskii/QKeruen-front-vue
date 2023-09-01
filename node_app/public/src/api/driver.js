// import axios from 'axios';
import { api } from '@/helpers/api';
// https://api.qkeruen.kz
export const createDriver = ({
  phone,
  firstName,
  lastName,
  avatar,
  carColor,
  carNumber,
  carModel,
  docsback,
  docsfront,
  carType,
  inn,
}) => {
  return api.post('/driver', {
    phone,
    firstName,
    lastName,
    avatar,
    carColor,
    carNumber,
    carModel,
    docsback,
    docsfront,
    carType,
    inn,
  })
}

export const editDriver = ({
  phone,
  firstName,
  lastName,
  avatar,
  inn,
  carColor,
  carNumber,
  carModel,
  docsback,
  docsfront,
  carType,
}) => {
  return api.put('/driver', {
    phone,
    firstName,
    lastName,
    inn,
    avatar,
    carColor,
    carNumber,
    carModel,
    docsback,
    docsfront,
    carType,
  });
}

export const getDriverProfile = () => {
  return api.get('/driver');
}

export const finishOrder = () => {
  return api.post('/process/finish');
}


export const fetchDriverOffers = ({
  from,
  to,
  type,
}) => {
  return api.post('/offer/driver/search', {
    from,
    to,
    type,
  }) 
}

export const createDriverOffer = ({
  driverId,
  from,
  to,
  type,
  comment,
  price,
}) => {
  return api.post(`/offer/driver/create/${driverId}`, {
    from,
    to,
    type,
    comment,
    price,
  }) 
}

export const startOffer = ({
  driverId,
  orderId,
}) => {
  return api.post(`/process/start/${driverId}/${orderId}`);
}

export const getDriverInfoById = (driverId) => {
  return api.post(`/offer/user/getByID/${driverId}`);
}

export const getDriverHistory = (driverId) => {
  return api.get(`/offer/driver/my/${driverId}`);
}

export const deleteDriverOffer = (offerId) => {
  return api.delete(`/offer/driver/${offerId}`);
}