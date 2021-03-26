<template>
	<el-main class="main">
		<el-row>
			<el-col :span="16">
				<el-input placeholder="请输入链接!" v-model="url" clearable></el-input>
			</el-col>
			<el-col :span="6">
				<el-input placeholder="想要的短链接" v-model="url" class="input-with-select">
					<el-button slot="append" plain type="info">提交！</el-button>
				</el-input>
			</el-col>
		</el-row>

		
		<hr class="line">
	</el-main>
</template>

<script>
	export default {
		name: 'Landing',
		components: {

		},
		data() {
			return {
				url: ""
			}
		},
		methods: {

		},
		computed: {

		},
		mounted() {}
	}
</script>

<style lang="scss">
	.main {
		text-align: center;

		margin: {
			top: 3%;
			bottom: 3%;
		}

		.box-card {
			max-width: 26.5rem;
			margin: auto;
		}
	}

	.large {
		padding: 25px 50px;
		font-size: 36px;
		border-radius: 5px;
	}

	.line {
		padding-top: 1rem;
		padding-bottom: 1rem;
		border: 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		box-sizing: content-box;
	}
</style>
