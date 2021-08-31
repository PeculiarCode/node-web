<template>
  <div class="slider">
    <swiper
      :slides-per-view="1"
      :pagination="{ clickable: true }"
      :autoplay="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="item in sliders" :key="item.id">
        <a :href="item.link">
          <img :src="item.pic" />
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
export default {
  name: 'slider',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    sliders: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    onSwiper() {
      // console.log('onSwiper')
    },
    onSlideChange() {
      // console.log('onSlideChange')
    }
  }
}
</script>

<style lang="scss">
.slider {
  .swiper-pagination-bullet-active {
    height: 8px;
    width: 30px;
    border-radius: 10px;
  }
}
</style>
<style lang="scss" scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  a {
    display: block;
    width: 100%;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>
