<template>
  <section class="container">
    <div class= "row justify-content-center">
      <div class= "col">
        <img alt="Groupomania logo" src="../assets/logo.png" class="justify-item-center">
        <h1><span>Groupomania</span><br> Bienvenue sur votre résaux sociale</h1>
      </div>
    </div>

   <div class= "row justify-content-center">
      <div class= "col-lg-4">
        <div class= "bg-white text-left d-flex justify-content-center">
          <router-link to="login" class="font-weight-bold btn btn-dark mx-1 p-3">Login</router-link>
          <router-link to="signup/" class="font-weight-bold btn btn-dark mx-1 p-3">Sign Up</router-link>
        </div>
      </div>
    </div>
    
  </section>
</template>

<script>
// @ is an alias to /src

</script>

<style lang="scss">
  span{
    color: #cd515a;
    font-weight: bold;
  }
</style>