<template>
  <div class="slider__wrapper"
  :class="`slider__wrapper--${categoryKey}`"
  >

    <div class="slider__headingContainer layout-container">
      <h2 class="slider__heading">{{ heading }}</h2>
    </div>

    <div class="slider__container slider-container"
    :class="{ 'more-info-is-active active': moreInfoIsActive }"
    :key="key"
    ref="slider"
    >
      <div class="slider">

        <div class="slider__slidesContainer">
          <ul v-if="books.length" class="slider__slides js-slider">
            <li v-for="(bookInstance, index) in books"
            :key="`${bookInstance.book.title}-${index}`"
            class="slider__slideContainer">
              <slide-item :class="{ 'active': moreInfoIsActive && index === moreInfoIndex }"
              @moreInfoWasClicked="handleMoreInfoClick"
              :bookInstance="bookInstance"
              :index="index"
              ></slide-item>
            </li>
          </ul>
        </div>

      </div>

      <transition name="fade" mode="out-in">
        <slider-more-info v-if="moreInfoIsActive && books.length && Number.isInteger(moreInfoIndex)"
        :bookInstance="books[moreInfoIndex]"
        :key="`${books[moreInfoIndex].book._id}`"
        @moreInfoCloseButtonWasClicked="moreInfoIsActive = false"
        ref="moreinfo"
        ></slider-more-info>
      </transition>

    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import SlideItem from '@/components/SlideItem'
import SliderMoreInfo from '@/components/SliderMoreInfo'
import jquery from 'jquery'
import 'slick-carousel'

const initialData = {
  page: 0,
  moreInfoIsActive: false,
  moreInfoIndex: null
}

export default {
  name: 'Slider',
  components: {
    Carousel,
    Slide,
    SlideItem,
    SliderMoreInfo
  },
  props: [
    'books',
    'heading',
    'categoryKey'
  ],
  data () {
    return {
      ...initialData,
      key: 1
    }
  },
  computed: {
    ...mapState([
      'isLoading'
    ])
  },
  watch: {
    books () {
      this.resetData()
      this.key += 1
      this.mountSlider()
    }
  },
  methods: {
    pageChange (page) {
      this.page = page
    },
    resetData () {
      Object.keys(initialData).forEach(key => {
        this[key] = initialData[key]
      })
    },
    scrollToTop () {
      const distanceToTop = this.$refs.slider.offsetTop

      jquery('html, body').animate({
        scrollTop: distanceToTop
      }, 300)
    },
    handleMoreInfoClick (index) {
      if (this.moreInfoIndex === index) {
        this.moreInfoIsActive = !this.moreInfoIsActive
      } else {
        this.moreInfoIndex = index
        this.moreInfoIsActive = true
      }

      this.scrollToTop()
    },
    mountSlider () {
      setTimeout(() => {
        const $slider = jquery('.js-slider')

        $slider.on('init', () => {
          this.stopLoading()
        })

        $slider.not('.slick-initialized').slick({
          dots: false,
          infinite: true,
          speed: 400,
          prevArrow: "<div class='slider__arrowContainer slider__arrowContainer--prev'><div class='slider__arrowWrapper'><i class='slider__arrow fa fa-angle-left'></i></div></div>",
          nextArrow: "<div class='slider__arrowContainer slider__arrowContainer--next'><div class='slider__arrowWrapper'><i class='slider__arrow fa fa-angle-right'></i></div></div>",
          slidesToShow: 10,
          slidesToScroll: 10,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 8,
                slidesToScroll: 8
              }
            },
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 7,
                slidesToScroll: 7
              }
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 360,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        })
      }, 0)
    },
    ...mapMutations([
      'stopLoading'
    ])
  },
  mounted () {
    this.mountSlider()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
