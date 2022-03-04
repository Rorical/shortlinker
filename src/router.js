import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		name: "Landing",
		path: "/",
		component: () => import("@/views/Landing.vue"),
	},
	{
		name: "About",
		path: "/about",
		component: () => import("@/views/About.vue"),
	},
	{
		name: "Info",
		path: "/info",
		component: () => import("@/views/Information.vue"),
		props: true,
	},
	{
		name: "Redirect",
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
