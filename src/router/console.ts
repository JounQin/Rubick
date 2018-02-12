import Container from './container'
import Image from './image'

export default {
  path: '/console',
  component: () => import('views/console/Console.vue'),
  meta: {
    auth: true,
  },
  children: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('views/dashboard/Dashboard.vue'),
    },
    ...Container,
    ...Image,
  ],
}
