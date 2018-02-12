import { RouterView } from './util'

export default {
  path: '/container',
  component: RouterView('Container'),
  redirect: '/container/application',
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
