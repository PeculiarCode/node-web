<template>
  <div class="swiper-wrapper" ref="scroll">
    <slot />
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  created() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },

  updated() {},
  methods: {
    initScroll() {
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true,
        scrollX: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  height: 100vh;
  overflow: hidden;
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
</style>
