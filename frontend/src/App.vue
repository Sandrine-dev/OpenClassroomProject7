<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Acceuil</router-link>
      <router-link to="/about">À propos de nous</router-link>
    </div>
    <router-view/>



  </div>
  
</template>



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
    color: #152544;

    &.router-link-exact-active {
      color: #cd515a;
    }
  }
}
</style>
