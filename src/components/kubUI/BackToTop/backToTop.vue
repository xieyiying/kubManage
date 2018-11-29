<template>
  <div id="goTop">
    <div class="goTop" v-show="goTopShow" @click="goTop">
      <i class="goTopIcon"></i>
    </div>
  </div>
</template>
<script>
    export default {
      name: "goTop",
      data(){
          return{
            scrollTop: '',
            goTopShow: false,
          }
        },
      methods:{
        handleScroll () {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            console.log(this.scrollTop)
            if(this.scrollTop > 100){
                this.goTopShow = true
            } else {
                this.goTopShow = false
            }
        },
        goTop(){
            let timer= null,
                _that=this
                
            cancelAnimationFrame(timer)
            timer = requestAnimationFrame(function fn(){
                if(_that.scrollTop > 0){
                    _that.scrollTop -= 50;
                    document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
                    timer = requestAnimationFrame(fn)
                }else {
                    cancelAnimationFrame(timer);
                    _that.goTopShow=false;
                }
            })
        }
      },
      mounted() {
        window.addEventListener('scroll', this.handleScroll);
      },
      destroyed(){
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
</script>
 
<style>
  .goTop{
    position: fixed;
    right: 30px;
    bottom: 50px;
    width: 70px;
    height: 70px;
    background:rgba(0,0,0,.65);
  }
  .goTop:hover{
    background:rgba(0,0,0,.85);
  }
  .goTopIcon{
    display: block;
    width: 70px;
    height: 70px;
  }
</style>