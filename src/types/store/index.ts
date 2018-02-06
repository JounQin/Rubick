import { Store } from 'vuex'

import { ApplicationState } from './application'
import { CommonState } from './common'
import { SyncCenterState } from './sync-center'

export * from './application'
export * from './common'
export * from './sync-center'

export interface RootState {
  application: ApplicationState
  common: CommonState
  syncCenter: SyncCenterState
}

export type RootStore = Store<RootState>
