import { RouterView } from './util'

export default {
  path: 'container',
  component: RouterView('Container'),
  children: [
    {
      path: 'application',
      component: () => import('views/container/application/Application.vue'),
    },
    {
      path: 'service',
      component: () => import('views/container/service/Service.vue'),
    },
  ],
}
