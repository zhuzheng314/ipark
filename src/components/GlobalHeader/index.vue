<template>
  <div class="g-header">
    <img src="../../../public/img/icons/message.png" class="g-header-handle">
    <img src="../../../public/img/icons/user.png" class="g-header-handle">
    <img src="../../../public/img/icons/setting.png" class="g-header-handle">
    <img src="../../../public/img/icons/message.png" class="g-header-handle">
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GlobalHeader extends Vue {

}
</script>

<style lang="less" scoped>
.g-header{
  width: 100%;
  height: 56px;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  &-handle{
    margin-top: 21px;
    width: 20px;
    height: 22px;
    margin-left: 25px;
  }
  &-handle:last-child{
    background-color: yellow;
    margin-right: 65px;
  }
}
</style>
