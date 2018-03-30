<template>
  <div class="slide-show" id="slide-show">
    <div class="img-wrapper" v-for="(img, index) in imgList" :key="img.src" :style="{opacity: img.opacity}">
      <img @load="imageLoad(index, $event)" class="img-item" :src="img.src" :style="{width:img.width + 'px', height:img.height + 'px'}"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      srcList: {
        type: Array,
        default() {
          return [];
        }
      },
      beginIndex: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        imgList: [],
      }
    },
    created() {
      this.srcList.forEach((src, index) => {
        this.imgList.push({
          src,
          height: 0,
          width: 0,
          opacity: +index === +this.beginIndex ? 1 : 0
        })
      })
    },
    mounted() {
      this.initSlideSize();
      this.fadeStart(1500, 2000);
    },
    methods: {
      imageLoad(index, e) {
        let originWidth = e.target.width, originHeight = e.target.height;
        let thisradio = originWidth / originHeight;
        let radio = this.width / this.height;
        let imgInfo = this.imgList[index];

        if(originWidth<= this.width && originHeight<= this.height) {
          imgInfo.width = originWidth;
          imgInfo.height = originHeight;
        }
        else if(thisradio > radio) {
          imgInfo.width = this.width;
          imgInfo.height = this.width / thisradio;
        } else {
          imgInfo.height = this.height;
          imgInfo.width = this.height * thisradio;
        }
      },
      initSlideSize() {
        wx.createSelectorQuery().select('#slide-show').boundingClientRect((rect) => {
          this.height = rect.height;
          this.width = rect.width;
        }).exec();
      },
      // mode:true 0 -> 1, false: 1 -> 0
      slide(item, ms, mode) {
        let k = 1 / (ms / 16.7);
        let that = this;
        

        function reduce() {
          setTimeout(function(){
            if(mode ? item.opacity > 1 : item.opacity < 0) {
              return;
            } else {
              mode ? item.opacity += k : item.opacity -= k;
              this.$nextTick(()=>{
                reduce();
              })
            }
          }.bind(that), 16.7)
        };

        reduce();
      },
      fadeStart(ms, wait) {
        if(!this.imgList.length) return;

        let beginIndex = this.beginIndex;
        let that = this;

        function cycleFade() {
          that.slide(that.imgList[beginIndex], ms, false);
          beginIndex = +beginIndex + 1 === that.imgList.length ? 0 : +beginIndex + 1;
          that.slide(that.imgList[beginIndex], ms, true);
          setTimeout(()=>{
            cycleFade();
          }, ms + wait)
        }

        setTimeout(()=> {
          cycleFade();
        }, wait);
      },
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
.slide-show {
  position: relative;
  margin-top: .7rem;
  width: 100%;
  padding-bottom: 62.5%;

  .img-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .img-item {
    overflow: hidden;
    border-radius: 0.1rem; 
  }
}
</style>