<template>
  <div class="slider-container"
  :class="{ 'more-info-is-active': moreInfoIsActive }"
  ref="slider"
  >
    <div class="slider">
      <carousel :navigationEnabled="true"
      :paginationEnabled="false"
      :perPageCustom="[[768, 5], [1024, 8]]"
      :loop="true"
      :navigationClickTargetSize="0"
      :navigationNextLabel="`<i class='fa fa-angle-right'></i>`"
      :navigationPrevLabel="`<i class='fa fa-angle-left'></i>`"
      :scrollPerPage="true"
      @pageChange="pageChange"
      :class="{ 'first-page': page === 0 }"
      >
        <slide v-for="(book, index) in books"
        :key="`${book.title}-${index}`"
        >
          <slide-item
          @mouseDidEnterSlide="mouseDidEnterSlide"
          @mouseDidLeaveSlide="mouseDidLeaveSlide"
          @moreInfoWasClicked="handleMoreInfoClick"
          :class="{ 'active': index === moreInfoIndex }"
          :book="book"
          :index="index"
          :slideHoverIndex="slideHoverIndex"
          ></slide-item>
        </slide>

      </carousel>

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

const initialData = {
  page: 0,
  slideHoverIndex: null,
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
      this.page = page
    },
    mouseDidEnterSlide (index) {
      this.slideHoverIndex = index
    },
    mouseDidLeaveSlide (index) {
      this.slideHoverIndex = null
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
      })
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
