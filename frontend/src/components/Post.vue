<template>
  <div class="messageSee">
    <div class="allMessage card">
        <div class="user card-header d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <p>{{user_nom}} {{user_prenom}}</p>
          </div>
          <div> 
            <button class="btn btn-groupomania w-35 btn-separation" @click="deleteMessage(message.id)"><i class="fas fa-trash"></i></button>
          </div>
        </div>

        <div class="content">
            <p>{{message}}</p>
            <img v-bind:src= "fileToDisplay" class="img-fluid">
            <p class="card-text"><small class="text-muted"> Publiez le: {{createdAt}}</small></p>
        </div>
     

      <div class="card react-news">
        <div class="card-body">
          <form action="" class="panel panel-default">
            <div class="d-flex align-items-start flex-column form-group">
              <label for="text" class="panel-heading form-label">Ecrire un commentaire</label>
              <input type="commentaire" class="panel-body container-fluid form-control" placeholder="nouveau commentaire" rows="3" v-model="commentaire"/>
            </div>
            <div class="d-flex panel-footer form-group">
              <button class="btn btn-groupomania w-35" type="submit" value="Publier" @click="createCommentaire(commentaire)">Publier</button>
            </div>
          </form>
        </div>
      </div>
      <button class="btn btn-groupomania" data-toggle="collapse" data-target="#comments">Commentaire</button>
      <Comments v-for="commentaire in response" :key="commentaire.id" :commentaire="commentaire.commentaire" :userNom="commentaire.user.nom" :userPrenom="commentaire.user.prenom" :userId="commentaire.userId" :messageId="commentaire.messageId" :commentaireId="commentaire.id" :createdAt="commentaire.createdAt" class="allComments"></Comments>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";
  import Comments from "./Commentaire.vue";

  export default {
    components : {Comments},
    data () {
      return {
        user: '',
        commentaire: '',
        msg: '',
        response: [],
      }
    },

    props:{
      message: String,
      fileToDisplay: String,
      user_nom: String,
      user_prenom: String,
      user_photo: String,
      messageId:Number,
      createdAt:String,
    },

    created () {
      this.allComments();
    },


    methods: {


      createCommentaire: function(commentaire){

        Axios
        .post("http://localhost:3000/api/" + this.messageId + "/comment/new", {
          commentaire: commentaire})
        .then(() => {
          console.log('le commentaire c\'est envoyé');
          this.allComments();
        })
        .catch(() =>{
          console.log('le commentaire ne c\'est pas envoyé');
        })

      },

      allComments: function() {
        Axios
        .get('http://localhost:3000/api/'+ this.messageId + '/comment')
        .then ((response) => {this.response =response.data; 
        console.log(response.data);
        })
        .catch (error => console.log(error))
      },


      deleteMessage: function(id) {
        Axios
        .delete("http://localhost:3000/api/messages/" + this.messageId, {
          messageId: id
        })
        .then(() => {
          console.log('message supprimé');
        })
        .catch((error) => {
          console.log('impossible de supprimé ce message');
          console.log(error.response.data.msg);
        })
      }


    },

  }
</script>

<style lang="scss">
  .allMessage{
    margin-bottom: 35px;
    margin-top: 15px;
  }

  .react-news {
    margin-top: 15px ;
  }

  .btn-separation{
    margin-right: 15px;
    i {
      color: white;
    }
  }

  .padding{
    padding-bottom: 15px;
  }
  

  .user p {
    font-size: 20px;
    margin-top: 5px;
    color: white;
    text-transform: uppercase;
    border: 4px solid #2c3e50;
  }

  .card-header{
    background: #2c3e50;
  }

  .content {
    padding-top: 15px;
    font-size: 20px;
  }

</style>