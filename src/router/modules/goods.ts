export default {
  path: 'goods',
  name: 'goods',
  component: () => import('@/views/goods-management/index.vue'),
  meta: {
    locale: 'menu.goods',
    icon: 'icon-unordered-list',
    requiresAuth: true,
  },
  children: [
    {
      path: 'goodsAdd',
      name: 'goodsAdd',
      component: () => import('@/views/goods-management/add-goods/index.vue'),
      meta: {
        locale: 'menu.goods.add',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'goodsManagement',
      name: 'goodsManagement',
      component: () => import('@/views/goods-management/list-goods/index.vue'),
      meta: {
        locale: 'menu.goods.management',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
