<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <h1 class="title">叶蔵 の空間</h1>
    <fade-cycle :begin-index="1" :src-list="srcList"></fade-cycle>
    <div class="welcome-content">
      <div v-if="hasUserInfo">
        <img class="avatar" :src="userInfo.avatarUrl">
        <span class="text">{{userInfo.nickName}}</span>
      </div>
      <div v-else>Hello.</div>
      <div class="text" style="margin-top:.5rem">Welcome my space.</div>
    </div>
    <div class="links">
      <div class="links-item" v-for="item in links" :key="item.text">
        <a class="link" @click="setClipboard(item)">{{ item.text }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import fadeCycle from "@/components/fadeCycle";

export default {
  data() {
    return {
      userInfo: {},
      links: [
        {
          text: "知乎",
          link: "https://www.zhihu.com/people/xie-cang-38-21/activities"
        },
        {
          text: "Github",
          link: "https://github.com/yozosann"
        },
        {
          text: "微博",
          link: "https://weibo.com/u/2400280851?refer_flag=1001030101_&is_all=1"
        }
      ],
      srcList: [],
      hasUserInfo: false
    };
  },

  components: {
    fadeCycle
  },

  methods: {
    getImgList() {
      this.$service({path: '/api/getImages'}).then((data) => {
        this.srcList = data.images.map(item => item.url);
      }).catch(e => {
        console.error(e);
      });
    },
    setClipboard(item) {
      wx.setClipboardData({
        data: item.link,
        success: function(res) {
          wx.showModal({
            title: "提示",
            content: `您已成功复制我的${item.text}链接，可以前往浏览器进行复制`,
            success: function(res) {
              if (res.confirm) {
                console.log("确定");
              } else if (res.cancel) {
                console.log("取消");
              }
            }
          });
        }
      });
    },
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.hasUserInfo = true;
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    this.getImgList();
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.welcome-content {
  width: 100%;
  margin-top: 2rem;
  padding: 0 1rem;
  box-sizing: border-box;
  opacity: 0.9;
  text-align: center;

  .avatar {
    height: 0.7rem;
    width: 0.7rem;
    border-radius: 50%;
    margin-right: 0.2rem;
  }

  .text {
    color: #505050;
    font-size: 0.32rem;

    &:last-child {
      margin-left: 0.2rem;
    }
  }
}

.title {
  font-size: 0.4rem;
  font-weight: 400;
  color: #505050;
  margin-top: 20px;
}

.links {
  position: fixed;
  text-align: center;
  height: 0.5rem;
  width: 100%;
  bottom: 20px;

  .links-item {
    display: inline-block;
    margin-right: 0.4rem;
    font-size: 0.32rem;
    text-decoration: underline;
    color: #8ba5a7;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
