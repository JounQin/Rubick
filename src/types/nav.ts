export enum NavIcon {
  // board
  DASHBOARD = 'dashboard',

  // delivery
  CONTAINER = 'cubes',

  // others
  MIRROR = 'rocket',
  DOCS = 'file',
  LOCALE = 'globe',
}

export enum NavText {
  // board
  DASHBOARD = 'dashboard',

  // delivery - container
  CONTAINER = 'container',
  APPLICATION = 'application',
  SERVICE = 'service',
  TEMPLATE = 'template',
  ENVFILE = 'envfile',
  CONFIGURATION = 'configuration',

  // others
  MIRROR = 'mirror',
  DOCS = 'docs',
  LOCALE = 'locale',
}

export enum NavTitle {
  BOARD = 'board',
  DELIVERY = 'delivery',
  INFRASTRUCTURE = 'infrastructure',
  OPS = 'ops',
  APP_PLATFORM = 'app-platform',
  PLATFORM_EXTENSION = 'platform-extension',
  OTHERS = 'others',
}

export interface NavSubItem {
  text: NavText
}

interface BaiscNavItem {
  icon: NavIcon
  beta?: boolean
  items?: NavSubItem[]
}

export type NavItem = BaiscNavItem & NavSubItem

export interface NavCategory {
  title: NavTitle
  items?: NavItem[]
}
