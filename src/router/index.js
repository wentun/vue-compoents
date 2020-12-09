import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("../App.vue"),
    },
    {
        path: "/selectExample/default/:id",
        component: () => import("../views/selectExample/default.vue"),
    },
    {
        path: "/description/stayTuned",
        component: () => import("../views//description/stayTuned.vue"),
    },
];

const router = new VueRouter({
    routes
});

export default router;