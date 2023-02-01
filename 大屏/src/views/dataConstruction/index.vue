<template>
  <div class="data-construction">
      <div class="data-content">

      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .data-construction{
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
    }
    .data-content{
        width: 80vw;
        height: 96vh;
        background-image: url('../../../public/dataImg/blueData.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    //  .data-content{
    //     width: 100vw;
    //     height: 100vh;
    //     background-image: url('./images/dataPic.png');
    //     background-size: 80% 96%;
    //     background-repeat: no-repeat;
    //     background-position: center;
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%,-50%);
    // }
</style>