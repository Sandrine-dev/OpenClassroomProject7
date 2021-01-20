<template>
  <div>
    <div class="user">

    <h2 class="name">{{ nom }} {{prenom}}</h2>
    </div>
    <p>{{ message }}</p>

    

    <div class="react-news"> 
      <!--<input type="text" class="comment" placeholder="Ecrire un commentaire..." @click="comment" />-->
      <!-- Like -->
    </div>
  </div>
</template>

<script>
import AuthService from '@/AuthService.js';

export default {

    data () {
        return {
            nom: "",
            prenom: "",
            message: "",
        }
    },

    methods: {
        async listMessage(){

        try {


            const response = await AuthService.listMessage();
            this.nom = response.nom;
            this.prenom = response.prenom;
            } 
            catch (error) {
                console.log(error);
            }
        }
    }
}

</script>

<style>
</style>