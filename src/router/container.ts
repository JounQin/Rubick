import { routeMap } from './util'

export default routeMap(
  [
    {
      name: 'application',
      path: '/application',
      component: () => import('views/container/application/Application.vue'),
    },
    {
      name: 'service',
      path: '/service',
      component: () => import('views/container/service/Service.vue'),
    },
  ],
  'container',
)
