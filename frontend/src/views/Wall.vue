<template>
  <div class="about">

    <section class="PostMessage">
      <h2 class="titre">Partagez votre actualités</h2>
      <div class="container newMessage">
        <div class="card">
          <div class="card-body">
            <form action="" class="panel panel-default">
              <div class="d-flex align-items-start flex-column form-group">
                <label for="text" class="panel-heading form-label">Nouveau message</label>
                <textarea type="message" class="panel-body container-fluid form-control" placeholder="nouveau message" rows="3" v-model="message" v-on:input="message = $event.target.value"></textarea>
              </div>
              <div class="mb-3 align-items-start">
                <label for="formFileSm" class="form-label d-flex align-items-start">Ajoutez une image</label>
                <input class="form-control form-control-sm" type="file" id="file" ref="fileInput" v-on:change="onFileUpload">
              </div>
              <div class="d-flex panel-footer form-group">
                <button class="btn btn-groupomania w-35" @click="createMessage(message)" type="submit" value="Publier">Publier</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="Actu">
      <h2 class="titre">Actualités de vos collègues</h2>

      <div class="container wallMessage">
        <Post v-for="message in response" :key="message.id" :message="message.message" :fileToDisplay="message.attachement" :user_nom="message.user.nom" :user_prenom="message.user.prenom" :user_photo='message.user.photo' :userId="message.userId" :messageId="message.id" :createdAt="message.createdAt" class="allPost"></Post>
      </div>
    </section>
  </div>
</template>

<script>

import Post from '@/components/Post';
import Axios from 'axios';


export default {
  components : {Post},
  data () {
    return {
      selectedFile: null,
      message: '',
      fileToDisplay: '',
      response: [],
    }
  },

  created (){
    this.allPost();
  },


  methods :{
    onFileUpload(event){
      this.selectedFile = event.target.files[0];
    },

    createMessage(message) {

      const fromData = new FormData()
      fromData.append('image', this.selectedFile)
      fromData.append('message', message)
      Axios.post('http://localhost:3000/api/messages/new', fromData, {
      }).then(() => {
        this.allPost();
      })
    },

    allPost: function() {
      Axios
      .get ('http://localhost:3000/api/messages')
      .then ((response) => {this.response = response.data;
      console.log(response.data);
      })
      .catch ( error=> console.log(error))
    }

  }
}

</script>

<style lang="scss">

  .titre{
    text-decoration: underline;
    font-weight: bold;
    color: #cd515a;
  }

  .Actu{
    margin-bottom: 30px;
  }
</style>