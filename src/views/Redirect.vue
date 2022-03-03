<template>
  <el-container class="card">
    <el-main class="now">
      <h1 class="title-text-show">Akizu酱温馨提示!</h1>
      <p> 欸，听我说一下嘛。就是因为反正各种各样的原因啦，在前往最终网站的路上竟然碰到了这个浏览器~ 呜呜呜，这样是打不开的说。 </p>
      <p> 但是嘛，听我的话就可以顺利到达目的地哦！啊，明明知道打不开还要这么调戏我吗，大坏蛋！ </p>
      <p> 就是说，吾现在能力有限，所掌握的精灵能力不足以将汝送至约定好的目的地。 </p>
      <p> 对不起，请原谅！吾现在只能给汝提供好链接，只要轻轻点一下便可复制到剪切板内。 </p>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input type="info" id="copyInput" :value="url" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" id="copy" data-clipboard-target="#copyInput">复制</el-button>
        </el-col>
      </el-row>
      <p> 复制之后只要打开其他浏览器并粘贴进去就可以咯！ </p>
      <p> 如果还在疑惑为什么我不能直接送你到目的地的话，请听我<del>狡辩</del>给你说： </p>
      <el-card class="tale">
        <p> 很久很久以前呢，有一位孤独的旅行者。他在自己的自传里写下了“走遍这片大陆”的雄心壮志。 </p>
        <p> 他为此付出了很大的努力，不断的提高自己的能力，想以此来开辟一条贯穿整个大陆的路线。 </p>
        <p> 他的自传里写到：这个世界上充满了一种神奇的能量可以被人类所使用。我命名它为精灵能量。 </p>
        <p> 通过精灵能量，他得以实现空间的快速跳跃，并开启了自己的旅行。 </p>
        <p> 可是呢，好景不长，整个大陆上的所有国家，各个势力全部得知了他的存在，并极度渴求对于精灵能量的掌握。 </p>
        <p> 这些人在他的前进路上布满埋伏，设立关卡，意图阻止他的继续前进并且得到使用精灵能量的秘诀。 </p>
        <p> 在与数量庞大的联合军斗争时，拥有使用精灵能量的能力的他也没能斗过无数袭来的敌人，被抓获了。 </p>
        <p> 在对他进行记忆读取妄想知道他的精灵能量使用方法时，这些人怎么也没想到的是，他使出了绝招，在他的自传里也是精灵能量的禁区。 </p>
        <p> 没错，他选择了用庞大的精灵能量自爆，与他们同归于尽。 </p>
      </el-card>
      <p> 这就是为什么现在精灵能量如此稀少，我无法在这个浏览器下带你到达目的网址的原因。 </p>
      <p> 我只是一个普通的精灵能量使用者，他口述相传的追随者。代号：短链接Akizu </p>
      <p> 哦对了，在你到达目的地之后呢，我就无法陪伴你咯。所以说，懂得使用精灵能力还是很重要的！别偷懒哦！ </p>
      <p> 最终可以通过很多种渠道到达目的地的！我先给你介绍这几种吧！ </p>
      <el-table
          :data="browsers">
        <el-table-column
            prop="name"
            label="名称"
            width="130">
        </el-table-column>
        <el-table-column
            label="推荐指数"
            width="180">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rate" disabled show-score></el-rate>
          </template>
        </el-table-column>
        <el-table-column
            prop="desc"
            label="简介"
            width="280">
        </el-table-column>
        <el-table-column
            label="网址">
          <template slot-scope="scope">
            <el-link :href="scope.row.link" target="_blank">{{ scope.row.link }}</el-link>
          </template>
        </el-table-column>
      </el-table>
      <p> 随便下载前面三个的某一个都可以的！哦对了千万不要忘记你要去的这个网站哦wwwww </p>
      <p> 就这样，我的精灵能量只能维持我到现在了，我要回去了，拜拜！ </p>
    </el-main>
  </el-container>
</template>

<script>
import ClipboardJS from 'clipboard';

export default {
  name: "Redirect",
  data(){
    return {
      url: this.$route.query.to,
      clipboard: null,
      browsers: [
        {
          name: "Chrome",
          rate: 5,
          desc: "应该是目前市面上最强浏览器，谷歌开发的",
          link: "https://www.google.cn/chrome/"
        },
        {
          name: "FireFox",
          rate: 4,
          desc: "比Chrome轻量一些，Mozilla家的浏览器",
          link: "https://www.mozilla.org/firefox/new"
        },
        {
          name: "Edge",
          rate: 3,
          desc: "现在是Chrome内核套皮的微软开发的浏览器",
          link: "https://www.microsoft.com/edge"
        },
        {
          name: "国产浏览器",
          rate: 0,
          desc: "我都无话可说了",
          link: "https://finance.sina.com.cn/tech/csj/2022-03-03/doc-imcwiwss3950169.shtml"
        }
      ]
    }
  },
  mounted() {
    document.getElementsByTagName("body")[0].setAttribute("style","background-image: url(\"https://api.daihan.top/api/acg\");")
    this.clipboard = new ClipboardJS('#copy')
    this.clipboard.on("success", () => {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    })
    this.clipboard.on("error", () => {
      this.$message.error('好像，浏览器都不支持复制？不过没关系，可以全选框里面的链接然后复制哦')
    })
  },
  methods: {

  },
  beforeDestroy() {
    this.clipboard.destroy()
    document.getElementsByTagName("body")[0].setAttribute("style","")
  }
}
</script>

<style lang="scss">
body {
  background-attachment: scroll;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

::selection {
  background-color: rgba(0,0,0,0.1);
}

.card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: auto;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, .7);
  margin: auto;

  .now {
    max-width: 1000px;
    margin: auto;

    .el-input__inner {
      background: rgba(255,255,255, 0.1);
      border-color: black;
      color: #000000;
      font-size: 1.2rem;
    }

    .tale {
      border-radius: 0;
      border: none;
      background: linear-gradient(to left bottom, transparent 50%, rgba(0,0,0,.2) 0) no-repeat 100% 0 / 2em 2em, linear-gradient(-135deg, transparent 1.5em, #fff 0);
    }

    .el-table {
      background-color: transparent;
      border-radius: 1rem;
    }

    .title-text-show {
      text-align: center;
      font-family: Righteous Regular;
      font-size: 2.5rem;
      margin-top: 1.5rem;
      margin-bottom: 2rem;
      position: relative;
      color: #3c3e41;
      padding: 0;
    }
  }
}
</style>