<template>
  <div class="home">

    


    <img alt="Groupomania logo" src="../assets/logo.png">
    <h1> Bienvenue sur votre résaux sociale Groupomania</h1>
    <router-link to="login">Connectez-vous</router-link>
    <router-link to="signup/">Enregistrez-vous</router-link>


    <input type="button" value="Logout" @click="logout" />
  </div>
</template>

<script>
// @ is an alias to /src





export default {

  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('login');
    }

  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('login');
    }
  }
};



</script>
