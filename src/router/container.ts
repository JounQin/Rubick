import { routeMap } from './util'

export default routeMap(
  [
    {
      path: 'application',
      component: () => import('views/container/application/Application.vue'),
    },
    {
      path: 'service',
      component: () => import('views/container/service/Service.vue'),
    },
  ],
  'container',
)
