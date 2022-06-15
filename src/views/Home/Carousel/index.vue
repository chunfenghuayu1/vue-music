<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide
      v-for="item in bannerList"
      :key="item.targetId"
      :style="{ backgroundImage: `url(${item.imageUrl}?param=320y120)` }"
    >
      <!-- <img
        :src="item.imageUrl"
        style="width: 100%; height: 100%; vertical-align: middle"
      /> -->
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
  </swiper>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapState } from 'vuex'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // loop: true,
        spaceBetween: 10, // 图片间距
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        slidesPerView: 4, // 展示几张
        // centeredSlides: true,//图片居中
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true, // 允许分页点击跳转
          dynamicBullets: false // 分页器过多是否隐藏
        }
      }
    }
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList
    })
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 120px;
  padding-bottom: 35px;
  margin-bottom: 10px;
  .swiper-wrapper {
    .swiper-slide {
      // height: 100%;
      // margin: 0 10px;
      // bug图片刷新会显示不全
      width: 24.45%!important;
      border-radius: 15px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
      cursor: pointer;
    }
  }
  .swiper-pagination {
    .swiper-pagination-bullet-active {
      border-radius: 4px;
      animation: widthChange 0.2s linear forwards;
      background-color: rgb(99, 187, 208);
    }
  }
}
//分页器动画
@keyframes widthChange {
  100% {
    width: 20px;
  }
}
</style>
