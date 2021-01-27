<template>
    <div class="container newMessage">
      <div class="card">
        <div class="card-body">
           <div class="alert alert-primary" role="alert" :style="{opacity: isAlertShow ? 1 : 0}">
              Votre message à bien été publiez<loading-component width="30"></loading-component>
            </div>
          <form action="" class="panel panel-default">
              <div class="d-flex align-items-start flex-column form-group">
                <label for="text" class="panel-heading form-label">Nouveau message</label>
                <textarea type="message" class="panel-body container-fluid form-contro" placeholder="nouveau message" rows="3" v-model="message" v-on:input="message = $event.target.value"></textarea>
              </div>
              <div class="mb-3 align-items-start">
                <label for="formFileSm" class="form-label d-flex align-items-start">Ajoutez une image</label>
                <input class="form-control form-control-sm" type="file" id="file" ref="fileInput" v-on:change="onFileUpload">
              </div>
              <p v-if="msg" class="d-flex justify-content-center">{{msg}}</p>
              <div class="d-flex panel-footer form-group">
                <button class="btn btn-primary w-25" @click="createMessage(message, image)" v-if="!isPublished">Publier</button>
                <button class="btn btn-primary w-25" disable v-if="isPublished"><loading-component  width="30"></loading-component></button>

              </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import LoadingComponent from '../components/Loading';
//import AuthService from '@/AuthService.js';
import Axios from 'axios';



export default {
  components : { LoadingComponent },
  data () {
    return {
      isPublished: false,
      isAlertShow: false,
      file: null,
      message: '',
      image: '',
      msg: ''
    }
  },


  methods :{
    onFileUpload(event){
      this.file = event.target.files[0];
    },

    createMessage() {

      const fromData = new FormData()
      fromData.append('image', this.file)
      fromData.append('message', this.message)
      Axios.post('http://localhost:3000/api/messages/new', fromData, {
      }).then(() => {
        setTimeout(() => {
          this.isPublished = false
          this.isAlertShow = true
          setTimeout (() => 
          this.redirect(), 1000)
        }, 1000);
      }).catch ((error) => {
          this.isPublished = false
          this.msg = error.response.data.msg;
          console.log(error);
        })
    }

  },

  redirect() {
    this.$router.push({ name: '/wall'})
  }


}

    
    


    
    /*async createMessage() {
      this.isPublished = true
      let formData = new FormData();
      formData.append('file', this.file);


      try {
        const post = {
          message: this.message,
          image: this.file,
        };
        console.log(this.file);
        Axios.post('http://localhost:3000/api/messages/new', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data'
          }
        })
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

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },

    }*/


</script>

<style lang="scss">
  .card {
    border: #152544 solid 2px;
   }

  .btn-primary {
        background: #152544;
        border: none;
  }

  .newMessage {
    margin-bottom: 25px ;
  }

</style>