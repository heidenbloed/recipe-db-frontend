import { createRouter, createWebHistory } from "vue-router";
import TabsView from "@/components/TabsView.vue";
import RecipesGridView from "@/components/RecipesGridView.vue";
import RecipeDetailView from "@/components/RecipeDetailView.vue";
import PlanningGridView from "@/components/PlanningGridView.vue";
import ShoppingListView from "@/components/ShoppingListView.vue";

const routes = [
  {
    path: "/",
    component: TabsView,
    meta: {
      title: "Mahlzeit",
    },
    children: [
      {
        path: "",
        redirect: "/recipes/",
      },
      {
        path: "recipes/",
        component: RecipesGridView,
        meta: {
          title: "Rezepte - Mahlzeit",
        },
      },
      {
        path: "recipe/:id/",
        component: RecipeDetailView,
      },
      {
        path: "plan/",
        component: PlanningGridView,
        meta: {
          title: "Planung - Mahlzeit",
        },
      },
      {
        path: "cart/",
        component: ShoppingListView,
        meta: {
          title: "Einkaufsliste - Mahlzeit",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta?.title as string;
  }
  next();
});

export default router;
