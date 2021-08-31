<template>
  <Header />
  <Tab />
  <div class="recommend">
    <Slider :sliders="sliders" />
    <div class="title">热门歌单推荐</div>
    <Scroll>
      <ul class="list">
        <li class="item" v-for="item in albums" :key="item.id">
          <img class="avatar" :src="item.pic" />
          <div class="right">
            <p>{{ item.username }}</p>
            <span>{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Slider from '@/components/base/slider/slider.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import Header from '@/components/header/index.vue'
import Tab from '@/components/tab/index.vue'
import axios from 'axios'
export default {
  components: {
    Slider,
    Scroll,
    Header,
    Tab
  },
  data() {
    return {
      sliders: [],
      albums: []
    }
  },
  async mounted() {
 

    // const data = await this.$axios('getRecommend')
    // this.sliders = data.result.sliders
    // this.albums = data.result.albums
  },
  methods: {
    handleDetail(data) {
      this.$router.push({
        path: `/recommend/${data.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  .title {
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 14px;
    color: #ffcd32;
  }
  .list {
    height: 100vh;
    padding-bottom: 80vh;
    .item {
      &:first-child {
        margin-top: 0;
      }
      display: flex;
      padding: 0 20px;
      margin-top: 30px;
      .avatar {
        height: 60px;
        width: 60px;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        font-size: 14px;
        justify-content: center;
        span {
          color: rgba(255, 255, 255, 0.3);
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
