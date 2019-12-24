<template>
  <div class="title-wrap">
    <div class="title"></div>
    <div class="cont">asdfsdafsadf</div>
  </div>
</template>

<script>
export default {
  name: 'Title'
}
</script>

<style lang="less" scoped>
.title-wrap {
  div{
    display: inline-block;
  }
  .title{
    width: 20px;
    height: 24px;
    margin-right: 8px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAgCAYAAAArBentAAAAQ0lEQVQ4T2NkQAMim/7/Bwm98WNkRJZC4YAkRhUOluCBxQR6VKLzGUlW+CPJEKuhHPPOg8XhJg4rhdQLx9HMNdRLCgCQ0oXJ4UVoywAAAABJRU5ErkJggg==) center no-repeat
  }
  .cont{
    color: #14B2FF;
    font-size: 24px;
  }
}
</style>
