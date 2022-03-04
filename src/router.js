import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: () => import("@/views/Landing.vue"),
	},
	{
		path: "/about",
		component: () => import("@/views/About.vue"),
	},
	{
		path: "/info",
		component: () => import("@/views/Information.vue"),
		props: true,
	},
	{
		path: "*",
		component: () => import("@/views/Redirect.vue"),
	}
]

export default new VueRouter({
	linkExactActiveClass: 'active',
	base: process.env.BASE_URL,
	mode: 'history',
	routes
});
