import { RouterView } from './util'

export default {
  path: '/image',
  component: RouterView('Image'),
  redirect: 'image/image-repository',
  children: [
    {
      path: 'image-repository',
      component: RouterView('ImageRepository'),
      children: [
        {
          path: '',
          component: () =>
            import('views/image/image-repository/ImageRepository.vue'),
        },
        {
          path: 'detail/:repositoryName',
          component: () =>
            import('views/image/image-repository/RepositoryDetail.vue'),
        },
      ],
    },
    {
      path: 'sync-center',
      component: RouterView('SyncCenter'),
      children: [
        {
          path: '',
          component: () => import('views/image/sync-center/SyncCenter.vue'),
        },
        {
          path: 'detail/:configId',
          component: () => import('views/image/sync-center/ConfigDetail.vue'),
        },
      ],
    },
    {
      path: 'sync-history',
      component: () => import('views/image/sync-history/SyncHistory.vue'),
    },
  ],
}
