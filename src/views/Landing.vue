<template>
	<el-main class="main" v-loading="loading">
		<div class="title-text" :data-spotlight="shortTitle">{{shortTitle}}</div>
		<el-row>
			<el-col :span="9">
				<el-input placeholder="请输入链接!" v-model="url" clearable></el-input>
			</el-col>
			<el-col :span="5">
				<el-button :type="mainButton.type" :icon="mainButton.icon" :loading="mainButton.loading" :disabled="mainButton.disabled"
				 @click="verify()">{{mainButton.text}}</el-button>
			</el-col>
			<el-col :span="9">
				<el-input placeholder="短链接" v-model="short"><template slot="prepend">{{shortTitle}}/</template></el-input>
			</el-col>
			<vue-hcaptcha :sitekey="hcaptcha.siteKey" v-on:verify="convert" size="invisible" ref="captcha"></vue-hcaptcha>
		</el-row>
		<hr class="line">
		<el-row v-if="finalLink!=''">
			<el-col>
				<el-alert title="短链接生成成功!" type="success" show-icon></el-alert>
			</el-col>
			<el-col>
				<el-link class="show-link" type="success" :href="finalLink" target="_blank">{{finalLink}}</el-link>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
	import config from "@/config.json"
	import hasher from "../utils/hash.js"
	import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
	var urlReg = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]")
	var idReg = new RegExp("^[_a-zA-Z0-9]+$")
	export default {
		name: 'Landing',
		components: {
			VueHcaptcha
		},
		data() {
			return {
				url: "",
				short: "",
				loading: false,
				shortTimeout: null,
				mainButton: {
					type: "info",
					icon: "el-icon-right",
					loading: false,
					disabled: true,
					text: "转换！"
				},
				api: config.api,
				shortLink: config.url,
				shortTitle: config.title,
				finalLink: "",
				hcaptcha: {
					siteKey: config.hcaptcha.siteKey
				}
			}
		},
		watch: {
			"url": "urlChange",
			"short": "shortChange"
		},
		methods: {
			buttonLoading() {
				this.mainButton.type = "warning"
				this.mainButton.loading = true
				this.mainButton.text = "加载中"
				this.buttonDisable()
			},
			buttonError(err) {
				this.mainButton.type = "danger"
				this.mainButton.loading = false
				this.mainButton.icon = "el-icon-close"
				this.mainButton.disabled = true
				this.mainButton.text = err
			},
			buttonDisable() {
				this.mainButton.disabled = true
			},
			buttonEnable() {
				this.mainButton.disabled = false
			},
			buttonNoraml() {
				this.mainButton = {
					type: "info",
					icon: "el-icon-right",
					loading: false,
					disabled: false,
					text: "转换！"
				}
			},
			shortChange(curVal) {
				clearTimeout(this.shortTimeout)
				this.buttonLoading()
				this.shortTimeout = setTimeout(() => {
					if (idReg.test(curVal) && urlReg.test(this.url)) {

						var that = this
						this.axios.get(this.api + "/api/short/" + curVal + "/exist").then(function(response) {
							if (response.data["code"] == 0) {
								if (response.data["data"]["exist"]) {
									that.buttonError("存在")
								} else {
									that.buttonNoraml()
								}
							}

						}).catch(function(error) {
							console.log(error)
							that.$message.error('网络错误!')
							that.buttonError('错误')
						})
					} else {
						this.buttonNoraml()
						this.buttonDisable()
					}

				}, 500)

			},
			urlChange() {
				if (this.url != "") {
					this.short = this.shortener(this.url)
				} else {
					this.short = ""
				}
			},
			shortener(url) {
				var md5 = hasher.md5(url).toString()
				var sha = hasher.sha256(url).toString()
				var b64 = hasher.base64(md5).substr(0, 6)
				var res = ""
				for (var i = 0; i < b64.length; i++) {
					if (sha.charAt(i) < md5.charAt(i)) {
						res += b64.charAt(i)
					} else {
						res += md5.charAt(i) + sha.charAt(i)
					}
				}
				return res
			},
			verify() {
				if (!urlReg.test(this.url)) {
					this.$message.error('链接格式有误!')
					return
				}
				if (!idReg.test(this.short)) {
					this.$message.error('短链接格式有误!')
					return
				}
				this.buttonLoading()

				this.$refs.captcha.execute()
			},
			convert(token, eKey) {
				console.log(token)
				console.log(eKey)
				var that = this


				let data = new FormData()
				data.append('url', that.url)
				data.append('site-key', that.hcaptcha.siteKey)
				data.append('h-captcha-response', token)
				that.axios.post(that.api + "/api/shorten/" + that.short, data).then(function(response) {
					console.log(response.data)
					if (response.data["code"] == 0) {
						that.finalLink = that.shortLink + that.short

						that.buttonNoraml()
						that.buttonDisable()
					} else if (response.data["code"] == 1) {
						that.$message.error('短链接已经被占用!')
						that.buttonError('错误')
					} else if (response.data["code"] == -1) {
						that.$message.error('验证失败!')
						that.buttonError('错误')
					}
				}).catch(function(error) {
					console.log(error)
					that.$message.error('网络错误!')
					that.buttonError('错误')
				})


				this.$refs.captcha.reset()
				this.buttonNoraml()
				this.buttonDisable()
			},

		},
		computed: {

		},
		mounted() {

		}
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

	.show-link {
		text-align: center;

		font: {
			size: 2rem;
		}
	}

	.title-text {
		text-align: center;
		text-shadow: 0.04em 0.04em rgb(3 3 3 / 30%);
		font-family: Righteous Regular;
		font-size: 6.5rem;
		margin-bottom: 2rem;
		position: relative;
		color: #3c3e41;
		padding: 0;

		&::after {
			content: attr(data-spotlight);
			width: 100%;
			color: transparent;
			position: absolute;
			top: 0;
			left: 0;
			-webkit-clip-path: ellipse(100px 100px at 0% 50%);
			clip-path: ellipse(100px 100px at 0% 50%);
			animation: spotlight 5s infinite;
			background-image: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #48B3BF 75%);
			background-size: 150%;
			background-position: center center;
			-webkit-background-clip: text;
			background-clip: text;
		}
	}

	@keyframes spotlight {
		0% {
			-webkit-clip-path: ellipse(100px 100px at 0% 50%);
			clip-path: ellipse(100px 100px at 0% 50%);
		}

		50% {
			-webkit-clip-path: ellipse(100px 100px at 100% 50%);
			clip-path: ellipse(100px 100px at 100% 50%);
		}

		100% {
			-webkit-clip-path: ellipse(100px 100px at 0% 50%);
			clip-path: ellipse(100px 100px at 0% 50%);
		}
	}
</style>
