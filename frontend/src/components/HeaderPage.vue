<template>
  <div class="menu-header">
    <div class="container">
      <div class="row">
        <nav class= "col navbar navbar-expand-lg bg-dark navbar-dark">
          <router-link to="/" class="navbar-brand">Groupomania</router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="navbarContent" class="collapse navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Acceuil</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link">Votre Profil</router-link>
              </li>
              <li class="nav-item">
                <router-link to= "login" class="nav-link">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/signup" class="nav-link">Sing Up</router-link>
              </li>
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
  }

  
</script>

<style>

</style>