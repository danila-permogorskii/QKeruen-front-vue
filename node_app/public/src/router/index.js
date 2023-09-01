import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/LoginView'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView'),
  },
  {
    path: '/confirmation-code',
    name: 'confirmation-code',
    component: () => import('@/views/ConfirmationCodeView'),
  },
  {
    path: '/driver-edit',
    name: 'driver-edit',
    component: () => import('@/views/DriverEdit'),
  },
  {
    path: '/driver-profile',
    name: 'driver-profile',
    component: () => import('@/views/DriverProfileView'),
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: () => import('@/views/UserProfileView'),
  },
  {
    path: '/user-edit',
    name: 'user-edit',
    component: () => import('@/views/UserEdit'),
  },
  {
    path: '/user-main',
    name: 'user-main',
    component: () => import('@/views/UserMainView'),
  },
  {
    path: '/user-search-offer-view',
    name: 'user-search-offer-view',
    component: () => import('@/views/UserSearchOfferView'),
  },
  {
    path: '/user-trips',
    name: 'user-trips',
    component: () => import('@/views/UserTrips'),
  },
  {
    path: '/intercity',
    name: 'intercity',
    component: () => import('@/views/IntercityView'),
  },
  {
    path: '/trips',
    name: 'trips',
    component: () => import('@/views/TripsView'),
  },
  {
    path: '/driver-create-offer',
    name: 'driver-create-offer',
    component: () => import('@/views/DriverCreateOfferView'),
  },
  {
    path: '/driver-search-offer-view',
    name: 'driver-search-offer-view',
    component: () => import('@/views/DriverSearchOfferView'),
  },
  {
    path: '/driver-documents',
    name: 'driver-documents',
    component: () => import('@/views/DriverDocuments'),
  },
  {
    path: '/driver-offers-history',
    name: 'driver-offers-history',
    component: () => import('@/views/DriverOffersHistory'),
  },
  {
    path: '/download-instructions',
    name: 'download-instructions',
    component: () => import('@/views/DownloadInstructions'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
