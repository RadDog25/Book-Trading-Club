<template>
  <div class="slider__container slider-container"
  :class="{ 'more-info-is-active active': moreInfoIsActive }"
  ref="slider"
  >
    <div class="slider">

      <div class="slider__slidesContainer">
        <ul class="slider__slides js-slider">
          <li v-for="(book, index) in books"
          :key="`${book.title}-${index}`"
          class="slider__slideContainer">
            <slide-item :class="{ 'active': moreInfoIsActive && index === moreInfoIndex }"
            @moreInfoWasClicked="handleMoreInfoClick"
            :book="book"
            :index="index"
            ></slide-item>
          </li>
        </ul>
      </div>

    </div>

    <transition name="fade">
      <slider-more-info v-if="moreInfoIsActive && books.length && Number.isInteger(moreInfoIndex)"
      :book="books[moreInfoIndex]"
      @moreInfoCloseButtonWasClicked="moreInfoIsActive = false"
      ref="moreinfo"
      ></slider-more-info>
    </transition>

  </div>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import SlideItem from '@/components/SlideItem'
import SliderMoreInfo from '@/components/SliderMoreInfo'
import velocity from 'velocity-animate'
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
    'books'
  ],
  data () {
    return {
      ...initialData
    }
  },
  watch: {
    books () {
      this.resetData()
    }
  },
  methods: {
    pageChange (page) {
      console.log(page)
      this.page = page
    },
    resetData () {
      Object.keys(initialData).forEach(key => {
        this[key] = initialData[key]
      })
    },
    scrollToTop () {
      const headerHeight = document.getElementById('masthead').offsetHeight
      const distanceToTop = this.$refs.slider.offsetTop
      window.scrollTo(0, distanceToTop + headerHeight)
    },
    slideInMoreInfo () {
      setTimeout(() => {
        const el = this.$refs.moreinfo.$el
        const left = el.querySelector('.left')
        left.style.opacity = 0
        const right = el.querySelector('.right')
        velocity(left, {
          translateX: ['0px', '30px'],
          opacity: [1, 0]
        }, {
          easing: 'ease-out',
          duration: 300,
          delay: 300
        })

        velocity(right, {
          opacity: [1, 0]
        }, {
          easing: 'ease-out',
          duration: 500
        })
      }, 0)
    },
    handleMoreInfoClick (index) {
      if (this.moreInfoIndex === index) {
        this.moreInfoIsActive = !this.moreInfoIsActive
      } else {
        this.moreInfoIndex = index
        this.moreInfoIsActive = true
      }

      this.scrollToTop()
      this.slideInMoreInfo()
    }
  },
  mounted () {
    setTimeout(() => {
      jquery('.js-slider').slick({
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
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
