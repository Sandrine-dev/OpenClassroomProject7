<template>
  <div id="app">
    <div id="nav">
    <headerPage></headerPage>
    </div>
    
    <div class="container">
    <router-view/>
    </div>

  </div>
  
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';





export default {
  name: 'Home',

  components: {
    headerPage: HeaderPage,
    },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: white;//#152544;

    &.router-link-exact-active {
      color: #cd515a;
    }
  }
}
</style>
