// src/AuthService.js

import axios from 'axios';

const url = 'http://localhost:3000/api/';

export default {

  //Profil

  //Login
  login(credentials) {
    return axios
      .post(url + 'login', credentials)
      .then(response => response.data);
  },
  //signUp
  signUp(credentials) {
    return axios
      .post(url + 'signup/', credentials)
      .then(response => response.data);
  },
  //Page Profil
  getUserProfile(id) {
    return axios
      .get(url + 'profile/me', id)
      .then(response => response.data);
  },

  //Modification
  updateUserProfile(modified) {
    return axios
      .put(url + 'profile/me', modified)
      .then(response => response.data);
  },

  //Suppression
  deleteUserProfile(credentials) {
    console.log(this);
    return axios
      .delete(url + 'profile/' + this.user.id, credentials)
      .then(response => response.data);
  },


  //Message

  //Créer un Nouveau Message
  createMessage(post) {
    return axios
      .post(url + 'messages/new', post)
      .then(response => response.data);
  },

  //Wall
  listMessages(get) {
    return axios
      .get(url + 'messages/', get)
      .then(response => response.data);
  },

  //Supprimer
  deleteMessage(id) {
    return axios
      .delete(url + 'messages/' + this.id , id )
      .then(response => response.data);
  },


  //Commentaire

  //Créer un Nouveau Commentaire
  createCommentaire(post) {
    return axios
      .post(url + ':messageId/comment/new', post)
      .then(response => response.data);
  },

  listCommentaire(get) {
    return axios
      .get(url + ':messageId/comment', get)
      .then(response => response.data);
  },

  deleteCommentaire(id) {
    return axios
      .delete(url + 'comment/' + this.id , id )
      .then(response => response.data);
  },


  //display if you are login

};