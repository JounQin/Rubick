import { Store } from 'vuex'

import { ApplicationState } from './application'
import { CommonState } from './common'

export * from './application'
export * from './common'

export interface RootState {
  application: ApplicationState
  common: CommonState
}

export type RootStore = Store<RootState>
