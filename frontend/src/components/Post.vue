<template>
  <div class="messageSee">
    <div class="allMessage card">
        <div class="user">
          <h2>{{username}}</h2>
        </div>
        <div class="content">
            <p>{{message}}</p>
            <img v-bind:src= "fileToDisplay" class="imagePost">
        </div>
     

        <div class="react-news"> 
        <!--<input type="text" class="comment" placeholder="Ecrire un commentaire..." @click="comment" />-->
        <!-- Like -->
        </div>

    </div>
  </div>
</template>

<script>
  //import axios from "axios";

  export default {
    data () {
      return {
        username: '',
      }
    },

    props:{
      message: String,
      fileToDisplay: String,
      userId: Number,
      messageId:Number,
    },

}
</script>

<style lang="scss">
  .card{
    margin-bottom: 15px;
    margin-top: 15px
  }

</style>