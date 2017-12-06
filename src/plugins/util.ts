import Vue from 'vue'

const util = {}

if (__DEV__) {
  Object.assign(util, {
    log: console.log,
  })
}

Vue.prototype.$util = util
