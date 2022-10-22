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
      id: this.$route.path.substring(1),
      api: config.api
    }
  },
  methods: {
    isHeadLess() {
      let ua = window.navigator.userAgent
      if (ua.includes("HeadlessChrome") || navigator.languages === []) {
        return true
      }
    },
    isBlockedUA() {
      let ua = window.navigator.userAgent
      if (ua !== null) {
        ua = ua.toLowerCase()
        if (ua.indexOf("tencent") != -1 || ua.indexOf("qq") != -1 || ua.indexOf("micromessenger") != -1 || ua.indexOf("ucbrowser") != -1 || ua.indexOf("ubrowser") != -1 || ua.indexOf("baidu") != -1 || ua.indexOf("quark") != -1 || ua.indexOf("sogou") != -1 || ua.indexOf("sogou") != -1) {
          return true
        } else if (this.isHeadLess()){
          return true
        }
      }
      return false
    },
    redirect(url) {
      if (this.isBlockedUA()) {
        this.loading.close()
        this.$router.replace({ name: "Info", params: {url} })
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

    if (this.id.startsWith("pxi/")) {
      try {
        parseInt(this.id.substring(4))
      } catch {
        this.$message.error('不是一个正确的短链接！')
        this.loading.close()
        return
      }
      this.redirect("https://pixivel.moe/illust/" + this.id.substring(4))
      return;
    } else if (this.id.startsWith("pxu/")) {
      try {
        parseInt(this.id.substring(4))
      } catch {
        this.$message.error('不是一个正确的短链接！')
        this.loading.close()
        return
      }
      this.redirect("https://pixivel.moe/illustrator/" + this.id.substring(4))
      return;
    }

    if (this.id.includes("/")) {
      this.$message.error('不是一个正确的短链接！')
      this.loading.close()
      return
    }

    this.axios.get(this.api + "/api/short/" + this.id).then(response => {
      if (response.data["code"] == 0) {
        this.redirect(response.data["data"]["to"])
      } else if (response.data["code"] == 1) {
        this.$message.error('目的地不存在！')
        this.loading.close()
      } else{
        this.$message.error('未知错误！')
        this.loading.close()
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