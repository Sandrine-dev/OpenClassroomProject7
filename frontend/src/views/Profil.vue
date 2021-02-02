<template>
    <div class="profil container">
    <h1>Informations personnelles</h1>

        <section class="userInfo">
            <div class="card">
                <div class="card-body">
                    <h4>Votre êtes <span>{{user.poste}}</span> </h4>
                    <div class="d-flex align-items-start flex-column form-group">
                        <label for="newBio" class="input-label">Modifier votre poste:</label>
                        <input type="text" name="Poste" id="Poste" class="form-control" v-model="poste" v-on:input="poste = $event.target.value">
                    </div>
                    <button type="submit" class="btn btn-primary w-35" @click="updateUserPoste(poste)">Valider</button>

                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h4>Votre photo de profile</h4>
                    <img class="img-profile" :src="user.photo">
                    <div class="mb-3 align-items-start">
                        <label for="formFileSm" class="form-label d-flex align-items-start">Ajoutez une photo de profile</label>
                        <input class="form-control form-control-sm" type="file" id="file" ref="fileInput" v-on:change="onFileUpload">
                    </div>
                    <button type="submit" class="btn btn-primary w-35" @click="updateUserImage()" value="Valider">Valider</button>
                </div>    
            </div>
            <!--<div class="card card-end">
                <div class="card-body">
                    <h4>Supprimer votre compte</h4>
                    <form action="">
                        <div class="d-flex align-items-start flex-column form-group">
                            <label for="email" class="input-label" required>Email</label>
                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                        </div>
                        <div class="d-flex align-items-start flex-column form-group">
                            <label for="password" class="input-label" required>Password</label>
                            <input type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>
                        <p v-if="msg" class="d-flex justify-content-center">{{msg}}</p>
                        <div class="form-group d-flex justify-content-center">
                            <button class="btn btn-primary w-35" @click="Supprimer">Supprimer</button>

                        </div>
                    </form>
                </div>
            </div>-->
        </section>
    </div>
    
</template>

<script>

import Axios from 'axios';

export default {
    data () {
        return {
            selectedFile: null,
            poste: '',
            user: '',
            fileToDisplay: '',
            response: [],
        }
    },

    mounted(){
        this.findInfo();
    },

    methods: {
        updateUserPoste(poste){
            Axios
            .put('http://localhost:3000/api/profile/me', {
                poste: poste,
            })  .then(() => {
                this.findInfo();
            })
            .catch(()=> {
                console.log('poste non modifié');
            })
        },

        onFileUpload(event){
            this.selectedFile = event.target.files[0];
        },

        updateUserImage() {
            const formData = new FormData()
            formData.append('image', this.selectedFile)
            Axios
            .put('http://localhost:3000/api/profile/me', formData, {
            })
             .then(() => {
                this.findInfo();
             })
        },



        findInfo: async function() {
            await Axios
            .get('http://localhost:3000/api/user/' + this.userId)
            .then ((response) => {this.user = response.data;
            return this.user;
            })
            .catch((error) => {
            console.log(error);
            });
        }
    }
    
}
</script>

<style lang='scss'>
    .card{
        margin-bottom: 15px;
    }

    .img-profile{
        width: 200px;
        border-radius: 50%;
        border: 4px solid #2c3e50;
    }
</style>