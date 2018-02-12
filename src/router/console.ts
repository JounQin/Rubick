import Container from './container'
import Image from './image'

export default {
  path: '/',
  component: () => import('views/console/Console.vue'),
  redirect: '/dashboard',
  meta: {
    auth: true,
  },
  children: [
    {
      path: '/dashboard',
      component: () => import('views/dashboard/Dashboard.vue'),
    },
    Container,
    Image,
  ],
}
