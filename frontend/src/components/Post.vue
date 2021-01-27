<template>
  <div class="messageSee">
    <div class="allMessage">

      <div v-for="message in message" class="message card" :key="message.id">
        <div>
          <h2>{{message.userId}}</h2>
          <div class="content">
            <p>{{ message.message }}</p>
            {{ message.image_url }}
          </div>
        </div>

        <div class="react-news"> 
        <!--<input type="text" class="comment" placeholder="Ecrire un commentaire..." @click="comment" />-->
        <!-- Like -->
      </div>

      </div>
    

      
    </div>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data () {
      return {
        message: '',
      }
    },

  mounted () {
    axios
      .get ('http://localhost:3000/api/messages')
      .then (response => this.message = response.data )
      .catch ( error=> console.log(error))
  }
}
</script>

<style lang="scss">
  .card{
    margin-bottom: 15px;
    margin-top: 15px
  }

</style>