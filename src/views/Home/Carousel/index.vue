<template>
  <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide
      v-for="item in bannerList"
      :key="item.targetId"
    >
    <img :src="`${item.imageUrl}?param=320y120`" @click="getTarget(item.targetType,item.targetId)">
      <p class="tag">{{ item.typeTitle }}</p>
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
  },
  methods: {
    getTarget (type, id) {
      // type 1新歌首发 1000歌单 10新碟
      switch (type) {
        case 1:
          this.$router.push({ path: '/songdetail', query: { id } })
          break
        case 10:
          // 暂无
          break
        case 1000:
          this.$router.push({ path: '/playlist/detail', query: { id } })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 150px;
  padding-bottom: 35px;
  margin-bottom: 10px;
  .swiper-wrapper {
    width: 100%;
    .swiper-slide {
      // height: 100%;
      // margin: 0 10px;
      // bug图片刷新会显示不全
      position: relative;
      width: calc(100% / 4);
      border-radius: 15px;
      // background-position: center center;
      // background-repeat: no-repeat;
      // background-size: cover;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
    .tag {
      padding: 0;
      margin: 0;
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 30%;
      height: 20%;
      line-height: 24px;
      border-radius: 15px 0 15px 0;
      text-align: center;
      font-size: 14px;
      color: #fff;
      background-color: #63bbd0;
    }
  }
  .swiper-pagination {
    /deep/ .swiper-pagination-bullet-active {
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
