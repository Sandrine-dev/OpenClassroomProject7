<template>
  
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