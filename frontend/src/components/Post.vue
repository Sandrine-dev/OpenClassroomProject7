<template>
  <div class="messageSee">
    <div class="allMessage card">
        <div class="user" >
          <h2>{{nom}}</h2>
        </div>
        <div class="content">
            <p>{{message}}</p>
            <img v-bind:src= "fileToDisplay" class="filePost">
        </div>
     


        <div class="react-news">

        </div>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";
  
  export default {
    data () {
      return {
        nom: '',
      }
    },

    props:{
      message: String,
      fileToDisplay: String,
      userId: Number,
      messageId:Number,
    },

    
    mounted() {
    this.findId();
    },

    methods: {
      findId: async function () {
        await Axios
          .get("http://localhost:3000/api/user/" + this.userId)
          .then((response) => {
            this.nom = response.data.user.nom;
            return this.nom;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },

  }
</script>

<style lang="scss">
  .card{
    margin-bottom: 15px;
    margin-top: 15px
  }

  .filePost{
    width: 200px;
    height: 200px;
  }
</style>