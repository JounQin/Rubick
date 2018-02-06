import { NavCategory, NavIcon, NavText, NavTitle } from 'types'

const NAV_CONFIG: NavCategory[] = [
  {
    title: NavTitle.BOARD,
    items: [
      {
        text: NavText.DASHBOARD,
        icon: NavIcon.DASHBOARD,
      },
    ],
  },
  {
    title: NavTitle.INFRASTRUCTURE,
    items: [
      {
        text: NavText.CONTAINER,
        icon: NavIcon.CONTAINER,
        items: [
          {
            text: NavText.APPLICATION,
          },
          {
            text: NavText.SERVICE,
          },
          {
            text: NavText.TEMPLATE,
          },
          {
            text: NavText.ENVFILE,
          },
          {
            text: NavText.CONFIGURATION,
          },
        ],
      },
      {
        text: NavText.IMAGE,
        icon: NavIcon.IMAGE,
        items: [
          {
            text: NavText.IMAGE_REPOSITORY,
          },
          {
            text: NavText.SYNC_CENTER,
          },
          {
            text: NavText.SYNC_HISTORY,
          },
        ],
      },
    ],
  },
  {
    title: NavTitle.OTHERS,
    items: [
      {
        text: NavText.MIRROR,
        icon: NavIcon.MIRROR,
      },
      {
        text: NavText.DOCS,
        icon: NavIcon.DOCS,
      },
      {
        text: NavText.LOCALE,
        icon: NavIcon.LOCALE,
      },
    ],
  },
]

export default NAV_CONFIG
