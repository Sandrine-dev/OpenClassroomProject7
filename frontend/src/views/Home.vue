<template>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/logo.png">
    <HelloWorld msg="Bienvenue sur le réseau social de Groupomania"/>
    <router-link to="/login">Connectez-vous</router-link>
    <router-link to="/signup">Enregistrez-vous</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HomePage.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
