<template>
	<el-container id="app">
		<Header v-show="$route.path!='/info'" />
		<transition name="el-fade-in" mode="out-in">
			<router-view></router-view>
		</transition>
	</el-container>
</template>

<script>
	import Header from "@/views/Header.vue"
	export default {
		name: 'App',
		components: {
			Header
		}
	}
</script>

<style lang="scss">
	#app {
		display: block;
		box-sizing: border-box;
		height: 100%;
		max-width: 1140px;
		padding: 0;
		margin: 0 auto
	}
	body {
		font-family: 'PingFang SC','Microsoft Yahei',Helvetica,Arial,sans-serif;
	}
</style>
