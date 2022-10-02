import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import Header from '../components/HeaderNav.vue'
import EditProduct from '../components/EditProduct.vue'
import AddProduct from '../components/AddProduct.vue'
import ListProduct from '../components/ProductList.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Header
  // },
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/',
    name: 'ListProduct',
    component: ListProduct
  },
  {
    path: '/product/edit/:id?',
    name: 'EditProduct',
    component: EditProduct
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
