export default {
  path: 'promotion',
  name: 'promotion',
  component: () => import('@/views/promotion/index.vue'),
  meta: {
    locale: 'menu.promotion',
    icon: 'icon-user',
    requiresAuth: true,
  },
  children: [
    {
      path: 'promotionAdd',
      name: 'promotionAdd',
      component: () => import('@/views/promotion/add-promotion/index.vue'),
      meta: {
        locale: 'menu.promotion',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
