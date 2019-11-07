<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  html,
  body {
    margin: 0;
    height: 100%;
    color: #333;
    font-size: 14px;
    font-weight: 400;
    background-color: #edf2f5;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  }

  ul,li,h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100%;
    // overflow: hidden;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

</style>
