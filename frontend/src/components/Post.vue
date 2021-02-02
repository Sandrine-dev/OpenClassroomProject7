<template>
  <div class="messageSee">
    <div class="allMessage card">
        <div class="user card-header">
          <p>{{user.nom}} {{user.prenom}}</p>
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
              <button class="btn btn-primary w-35" type="submit" value="Publier" @click="createCommentaire(commentaire)">Publier</button>
            </div>
          </form>
        </div>
      </div>
      <div class="padding">
        <button class="btn btn-primary w-35 btn-separation" @click="like(like)"><i class="fas fa-thumbs-up"></i> Like</button>
        <button class="btn btn-primary w-35" @click="dislike(dislike)"><i class="fas fa-thumbs-down"></i> Dislike</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";

  export default {
    data () {
      return {
        user: '',
        commentaire: ''
      }
    },

    props:{
      message: String,
      fileToDisplay: String,
      userId: Number,
      messageId:Number,
      createdAt:String,
    },

    
    mounted() {
    this.findId();
    },

    methods: {
      findId: async function () {
        await Axios
          .get("http://localhost:3000/api/user/" + this.userId)
          .then((response) => {
            this.user = response.data;
            return this.user;
          })
          .catch((error) => {
            console.log(error);
          });
      },

      createCommentaire: function(commentaire){

        Axios
        .post("http://localhost:3000/api/" + this.messageId + "/comment/new", {
          commentaire: commentaire
        })
        .then(() => {
          console.log('le commentaire c\'est envoyé');
        })
        .catch(() =>{
          console.log('le commentaire ne c\'est pas envoyé');
        })

      },

    like: function(like) {
      Axios
      .post("http://localhost:3000/api/messages/" + this.messageId + "/vote/like", {
        like: like
      })
      .then(()=> {
        console.log('post Liker')
      })
      .catch(() => {
        console.log('impossible de liker')
      })
    },

    dislike: function(dislike) {
      Axios
      .post("http://localhost:3000/api/messages/" + this.messageId + "/vote/dislike", {
        dislike: dislike
      })
      .then(()=> {
        console.log('post disliker')
      })
      .catch(() => {
        console.log('impossible de disliker')
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

  .filePost{
    width: 200px;
    height: 200px;
  }

  .react-news {
    margin-top: 15px ;
  }

  .btn-separation{
    margin-right: 15px;
  }

  .padding{
    padding-bottom: 15px;
  }
</style>