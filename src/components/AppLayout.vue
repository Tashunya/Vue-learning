<template>
  <div class="app-layout">
    <header class="header">
      <div>
        <img class="img" src="../assets/logo.svg" />
      </div>
      <div>
        My shirt shop
      </div>
    </header>
    <!-- Menu -->
    <NavMenu />
    <router-view /> <!-- a special component provided by the vue-
router plugin that will render the component of the current matching route. It is
not a real component since it doesn't have its own template, and it will not appear
in the DOM-->
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'
export default {
  components: {
    NavMenu,
  },
}
</script>

<style lang="stylus">
@import '../style/main';
</style>

<style lang="stylus" scoped>
.header {
  .img {
    width: 64px;
    height: 64px;
  }
}
</style>
