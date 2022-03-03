import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "@/views/Landing.vue";
import About from "@/views/About.vue"
import Redirect from '@/views/Redirect.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: Landing
	},
	{
		path: "/about",
		component: About
	},
	{
		path: "/shit",
		component: Redirect
	},
]

export default new VueRouter({
	linkExactActiveClass: 'active',
	mode: 'hash',
	routes
});
