<template>
  <div></div>
</template>

<script>
import config from '@/config.json'

export default {
  name: "Redirect",
  data() {
    return {
      loading: null,
      id: this.$route.path.split("/")[1],
      api: config.api
    }
  },
  methods: {
    isBlockedUA() {
      let ua = ua = window.navigator.userAgent
      if (ua !== null) {
        ua = ua.toLowerCase()
        if (ua.indexOf("tencent") != -1 || ua.indexOf("qq") != -1 || ua.indexOf("micromessenger") != -1 || ua.indexOf("ucbrowser") != -1 || ua.indexOf("ubrowser") != -1 || ua.indexOf("baidu") != -1 || ua.indexOf("quark") != -1 || ua.indexOf("sogou") != -1 || ua.indexOf("sogou") != -1) {
          return true
        }
      }
      return false
    },
    redirect(url) {
      if (this.isBlockedUA()) {
        this.$router.replace({ path: "/info", params: {url} })
      } else {
        window.location.assign(url)
      }
    },
  },
  mounted() {
    this.loading = this.$loading({
      lock: true,
      text: '正在前往目的地页面',
    })
    this.axios.get(this.api + "/api/short/" + this.id).then(response => {
      this.loading.close()
      if (response.data["code"] == 0) {
        this.redirect(response.data["data"]["to"])
      } else if (response.data["code"] == 1) {
        this.$message.error('目的地不存在！')
      } else{
        this.$message.error('未知错误！')
      }
    }).catch(error => {
      console.log(error)
      this.$message.error('网络错误或者服务器错误!')
    })
  }
}
</script>

<style scoped>

</style>