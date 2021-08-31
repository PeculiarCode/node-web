<template>
  <Header />
  <Tab />
  <Scroll class="singer">
    <ul>
      <li v-for="item in singer" :key="item.title">
        <div class="title">{{ item.title }}</div>
        <div class="item" v-for="it in item.list" :key="it.id">
          <img :src="it.pic" />
          <span>{{ it.name }}</span>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script>
import Header from '@/components/header/index.vue'
import Tab from '@/components/tab/index.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
export default {
  components: {
    Header,
    Tab,
    Scroll
  },
  data() {
    return {
      singer: []
    }
  },
  async mounted() {
    const { result } = await this.$axios('singer')
    this.singer = result.singers
    console.log(result, 1122)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.singer {
  ul {
    width: 100%;
    height: 100vh;
    padding-bottom: 100%;
    li {
      .title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        background: #333;
      }
      .item {
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        span {
          margin-left: 20px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }
      }
    }
  }
}
</style>
