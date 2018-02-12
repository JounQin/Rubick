export default {
  path: '/landing',
  component: () => import('views/landing/Landing.vue'),
  children: [
    {
      path: '/login/:type(account)?',
      component: () => import('views/landing/Login.vue'),
      meta: {
        title() {
          return `${this.params.type ? 'account' : 'user'}_login`
        },
      },
    },
    {
      path: '/register',
      component: () => import('views/landing/Register.vue'),
    },
    {
      path: '/forget-password',
      component: () => import('views/landing/ForgetPassword.vue'),
    },
  ],
}
