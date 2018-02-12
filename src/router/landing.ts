export default {
  path: '/landing',
  component: () => import('views/landing/Landing.vue'),
  children: [
    {
      name: 'login',
      path: '/login/:type(account)?',
      component: () => import('views/landing/Login.vue'),
      meta: {
        title() {
          return `${this.params.type ? 'account' : 'user'}_login`
        },
      },
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('views/landing/Register.vue'),
    },
    {
      name: 'forget-password',
      path: '/forget-password',
      component: () => import('views/landing/ForgetPassword.vue'),
    },
  ],
}
