<template>
  <div class="menu-header">
    <div class="container-fluid">
      <div class="row">
          <nav class= "col navbar navbar-expand-lg navbar-dark">
            <router-link to="/" class="navbar-brand Groupomania"><img alt="Groupomania logo blanc" src="../assets/logoblanc.png" class="logo mx-1">Groupomania</router-link>
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
        
            <div id="navbarContent" class="collapse navbar-collapse">
              <ul class="navbar-nav">

                <div v-if="isLoggedIn">
                  <li class="nav-item">
                    <router-link to="/wall" class="nav-link">Acceuil</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/profil" class="nav-link">Votre Profil</router-link>
                  </li>
                  <li @click="logout" class="nav-item">
                    <p class="nav-link logout">Déconnexion</p>
                  </li>
                </div>

                <div v-else>
                  <li class="nav-item">
                    <router-link to="login" class="nav-link">Login</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/signup" class="nav-link">Sing Up</router-link>
                  </li>
                </div>

              </ul>
            </div>
          </nav>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderPage",

    computed: {
      isLoggedIn: function () {
        return this.$store.getters.isLoggedIn;
      },
    },
    methods: {
      logout: function () {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/");
        });
      }

    }
  }
  
</script>

<style lang="scss">
  .logout{ 
    font-weight: bold;
    color: white;
  }

  .logo{
    width: 30px;
    color: #cd515a;
  }
  .menu-header{
    background: #2c3e50
  }
</style>