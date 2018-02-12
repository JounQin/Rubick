import { routeMap } from './util'

export default routeMap(
  [
    {
      path: 'image-repository',
      component: () =>
        import('views/image/image-repository/ImageRepository.vue'),
    },
    {
      path: 'image-repository/detail/:repositoryName',
      component: () =>
        import('views/image/image-repository/RepositoryDetail.vue'),
    },
    {
      path: 'sync-center',
      component: () => import('views/image/sync-center/SyncCenter.vue'),
    },
    {
      path: 'sync-center/detail/:configId',
      component: () => import('views/image/sync-center/ConfigDetail.vue'),
    },
    {
      path: 'sync-history',
      component: () => import('views/image/sync-history/SyncHistory.vue'),
    },
  ],
  'image',
)
