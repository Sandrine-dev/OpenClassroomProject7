<template>
  <div class="about">

    <section class="PostMessage">
      <NewMessage></NewMessage>
    </section>

    <section class="Actu">
      <h2 class="titre">Actualités de vos collègues</h2>

      <div class="container wallMessage">
        <Post></Post>
      </div>
    </section>
  </div>
</template>

<script>

import Post from '@/components/Post';
import NewMessage from '@/components/NewMessage';


export default {

  components : {Post , NewMessage },

  }

</script>

<style lang="scss">

  .titre{
    text-decoration: underline;
    font-weight: bold;
    color: #cd515a;
  }

</style>