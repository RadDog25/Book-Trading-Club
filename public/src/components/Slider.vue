<template>
  <div class="slider-container"
  :class="{ 'more-info-is-active': moreInfoIsActive }"
  ref="slider"
  >
    <div class="slider">
      <carousel :navigationEnabled="true"
      :paginationEnabled="false"
      :perPageCustom="[[768, 5], [1024, 6]]"
      :loop="true"
      :navigationClickTargetSize="0"
      :navigationNextLabel="`<i class='fa fa-angle-right'></i>`"
      :navigationPrevLabel="`<i class='fa fa-angle-left'></i>`"
      :scrollPerPage="true"
      @pageChange="pageChange"
      :class="{ 'first-page': page === 0 }"
      >
        <slide v-for="(book, index) in books"
        :key="index"
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

    <slider-more-info v-if="moreInfoIsActive && books.length"
    :book="books[moreInfoIndex]"
    @moreInfoCloseButtonWasClicked="moreInfoIsActive = false"
    ></slider-more-info>

  </div>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import SlideItem from '@/components/SlideItem'
import SliderMoreInfo from '@/components/SliderMoreInfo'

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
      page: 0,
      slideHoverIndex: null,
      moreInfoIsActive: false,
      moreInfoIndex: null
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
    handleMoreInfoClick (index) {
      if (this.moreInfoIndex === index) {
        this.moreInfoIsActive = !this.moreInfoIsActive
      } else {
        this.moreInfoIndex = index
        this.moreInfoIsActive = true
      }

      const headerHeight = document.getElementById('masthead').offsetHeight
      const distanceToTop = this.$refs.slider.offsetTop
      window.scrollTo(0, distanceToTop + headerHeight)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
