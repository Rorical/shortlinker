<template>
	<el-header>
		<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item class="right" index="/about">关于</el-menu-item>
			<el-menu-item class="right" index="/">首页</el-menu-item>
		</el-menu>
	</el-header>
</template>

<script>
	export default {
		name: 'Header',
		methods: {
			handleSelect(key) {
				if(this.$route.path!=key)
					this.$router.push(key);
			}
		}
	}
</script>

<style lang="scss">
	.right{
		float: right !important;
	}
</style>
