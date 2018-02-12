import { routeMap } from './util'

export default routeMap(
  [
    {
      name: 'image-repository',
      path: '/image-repository',
      component: () =>
        import('views/image/image-repository/ImageRepository.vue'),
    },
    {
      name: 'image-repository.detail',
      path: '/image-repository/:repositoryName',
      component: () =>
        import('views/image/image-repository/RepositoryDetail.vue'),
    },
    {
      name: 'sync-center',
      path: '/sync-center',
      component: () => import('views/image/sync-center/SyncCenter.vue'),
    },
    {
      name: 'sync-center.detail',
      path: '/sync-center/:configId',
      component: () => import('views/image/sync-center/ConfigDetail.vue'),
    },
    {
      name: 'sync-history',
      path: '/sync-history',
      component: () => import('views/image/sync-history/SyncHistory.vue'),
    },
  ],
  'image',
)
