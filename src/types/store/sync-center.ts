export interface SyncRegistryConfig {
  config_id: string
  config_name: string
  dest: Array<{ endpoint: string }>
  source: {
    info: {
      repository_name: string
      project_name: string
      registry_name: string
    }
  }
}

export interface SyncCenterState {
  syncRegistryConfigs: SyncRegistryConfig[]
}
