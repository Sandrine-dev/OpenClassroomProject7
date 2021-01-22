<template>
  <div class="about">

    <section class="container newMessage">
      <div class="card">
        <div class="card-body">
           <div class="alert alert-primary" role="alert" :style="{opacity: isAlertShow ? 1 : 0}">
              Votre message à bien été publiez<loading-component width="30"></loading-component>
            </div>
          <form action="" class="panel panel-default">
              <div class="d-flex align-items-start flex-column form-group">
                <label for="text" class="panel-heading form-label">Nouveau message</label>
                <textarea type="message" class="panel-body container-fluid form-contro" placeholder="nouveau message" rows="3" v-model="message"></textarea>
              </div>
              <div class="mb-3 align-items-start">
                <label for="formFileMultiple" class="form-label d-flex align-items-start">Ajoutez une image</label>
                <input class="form-control" type="file" id="formFileMultiple" multiple>
              </div>
              <p v-if="msg" class="d-flex justify-content-center">{{msg}}</p>
              <div class="d-flex panel-footer form-group">
                <button class="btn btn-primary w-25" @click="createMessage" v-if="!isPublished">Publier</button>
                <button class="btn btn-primary w-25" disable v-if="isPublished"><loading-component  width="30"></loading-component></button>

              </div>
          </form>
        </div>
      </div>
    </section>

    <section class="container wallMessage">
      <Post></Post>
    </section>
  </div>
</template>

<script>

import LoadingComponent from '../components/Loading';
import AuthService from '@/AuthService.js';
import Post from '@/components/Post';


export default {

  components : { LoadingComponent, Post },
  data () {
    return {
      isPublished: false,
      isAlertShow: false,
      message: '',
      msg: ''
    }
  },

  methods :{
    async createMessage() {
      this.isPublished = true

      try {
        const post = {
          message: this.message,
        };
        const response = await AuthService.createMessage(post);
        this.msg = response.msg;
        setTimeout(() => {
          this.isPublished = false
          this.isAlertShow = true
          setTimeout (() => 
          this.createMessage, 1000)
        }, 1000)
        } catch (error) {
          this.isPublished = false
          this.msg = error.response.data.msg;
          console.log(error);
        }

      },

    }

    


  }

</script>

<style lang="scss">
  .card {
    border: #152544 solid 2px;
   }

  .btn-primary {
        background: #152544;
        border: none;
  }

</style>