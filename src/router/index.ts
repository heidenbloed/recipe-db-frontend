import {createRouter, createWebHistory} from 'vue-router'
import TabsView from '@/components/TabsView.vue'
import ExamplePage from '@/components/ExamplePage.vue'
import RecipesGridView from '@/components/RecipesGridView.vue'
import RecipeDetailView from "@/components/RecipeDetailView.vue"

const routes = [
  {
    path: '/',
    component: TabsView,
    children: [
      {
        path: '',
        redirect: '/recipes/'
      },
      {
        path: 'recipes/',
        component: RecipesGridView,
      },
      {
        path: 'recipe/',
        component: RecipeDetailView,
      },
      {
        path: 'plan/',
        component: ExamplePage,
      },
      {
        path: 'cart/',
        component: ExamplePage,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router