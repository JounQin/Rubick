import { Store } from 'vuex'

import { RootState } from './common'

export interface Application {
  app_name: string
}

export interface ApplicationState {
  applications: Application[]
}

export type ApplicationStore = Store<ApplicationState> & {
  rootState: RootState
}
