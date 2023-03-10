import { createRouter, createWebHashHistory } from 'vue-router'
import { propose,forum,main,profile } from '@/router/list'

const router = createRouter({
  history:createWebHashHistory(),
  routes: main.concat(propose,forum,profile)
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 中學生校園事務參與平台`;
  }
  next();
})
<<<<<<< HEAD
router.afterEach((to, from) => {
=======
router.afterEach((to) => {
>>>>>>> 81b59802d59b70e7b11a6ba631a6ada02ce011e9
  if (to.meta.title) {
    document.title = `${to.meta.title} | 中學生校園事務參與平台`;
  }
})
export default router;