// import axios from 'axios';
import { api } from '@/helpers/api';
const token = localStorage.getItem('keruen-auth-token');
// https://api.qkeruen.kz
export const createUser = ({
  phone,
  firstName,
  lastName,
  avatar,
}) => {
  return api.post('/user', {
    lastName,
    firstName,
    phone,
    avatar,
  })
}

export const editUser = ({
  phone,
  firstName,
  lastName,
  avatar,
}) => {
  return api.put('/user', {
    lastName,
    firstName,
    phone,
    avatar,
  })
}

export const getUserProfile = () => {
  return api.get('/user')
}

export const createOrderUser = ({
  userId,
  latitudeFrom,
  longitudeFrom,
  latitudeTo,
  longitudeTo,
  comments,
  price,
  type,
  orderStatus,
}) => {
  return api.post('/order/user', {
    userId,
    latitudeFrom,
    longitudeFrom,
    latitudeTo,
    longitudeTo,
    comments,
    price,
    type,
    orderStatus,
  });
}

export const fetchUserOffers = ({
  from,
  to,
  type,
}) => {
  return api.post('/offer/user/search', {
    from,
    to,
    type,
  }) 
}

export const createIntercityOrderUser = ({
  userId,
  from,
  to,
  type,
  price,
  comment,
}) => {
  return api.post(`/offer/user/${userId}`, {
    from,
    to,
    type,
    price,
    comment,
  });
}

export const fetchOrders = (id) => {
  return api.get(`/order/user/${id}`);
}

export const deleteOrder = (id) => {
  return api.delete(`/order/user/${id}`);
}


export const getUserInfoById = (userId) => {
  return api.post(`/offer/driver/${userId}`);
}

export const getUserHistory = (driverId) => {
  return api.get(`/offer/user/my/${driverId}`);
}

export const deleteUserOffer = (offerId) => {
  return api.delete(`/offer/user/${offerId}`);
}