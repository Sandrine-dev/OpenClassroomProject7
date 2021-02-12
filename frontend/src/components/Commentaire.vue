<template>
    <div class="comment">
        <div class="commentaire bd-highlight mb-3 collapse" id="comments">
                <div class="userComments"><span>{{userNom}} {{userPrenom}} :</span></div>
                <div class="contentComment flex-grow-1">{{commentaire}}</div>
            <button class="btn btn-groupomania w-35 btn-separation ms-auto p-2 bd-highlight" @click="deleteCommentaire()">supprimer</button>
        </div>
    
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        props: {
            commentaire: String,
            userNom: String,
            userPrenom: String,
            createdAt:String,
            commentaireId: Number,
        },

        methods: {

            deleteCommentaire: function() {

                //console.log(this.commentaireId); 

                Axios
                .delete("http://localhost:3000/api/comment/" + this.commentaireId, {
                })
                .then(() => {
                    console.log('commentaire supprimé');
                })
                .catch((error) => {
                    console.log('impossible de supprimé ce commentaire');
                    console.log(error.response.data.msg);
                })
            }

        }
    }

    

</script>

<style lang="scss">
    .commentaire{
        border-style: inset;
        padding: 15px;
        margin: 5px 10px 0px 10px;
        font-size: 15px;
    }

    .userComments{
        padding-bottom: 5px;
        text-decoration: underline;
        color: #cd515a;
    }
    
    .contentComment {
        padding-bottom: 5px;
    }

</style>