<template>
  <div id="app">

    <div id="nav">
      <headerPage></headerPage>
    </div>

    
    <div id="page">
      <router-view/>
    </div>

    <div id="footer"> 
      <footerPage></footerPage>

    </div>

  </div>
  
</template>

<script>
  import HeaderPage from '@/components/HeaderPage.vue';
  import FooterPage from '@/components/FooterPage.vue';



  export default {
    name: 'Home',

    components: {
      headerPage: HeaderPage,
      footerPage: FooterPage,
      },

      computed: {
          isLoggedIn: function() {
            return this.$store.getters.isLoggedIn;
          }
        },
        methods: {
          logout: function() {
            this.$store.dispatch("logout").then(() => {
              this.$router.push("login");
            });
          }
        }
  }

</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: #2c3e50;
  }

  #page{
    padding-top: 15px;
    padding-bottom: 25px;
    background: white;
  }

  #nav {
    padding: 30px;

    .logout{
      font-weight: bold;
      color: white;

    }

    a {
      font-weight: bold;
      color: white;

      &.router-link-exact-active {
        color: #cd515a;
      }
    }
  }

  #footer{
    background: #2c3e50;
  }
</style>
