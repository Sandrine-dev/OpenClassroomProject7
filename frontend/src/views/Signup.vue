<template>
    <section class="container">
        <div class= "row justify-content-center">
            <div class= "col-lg-4">
                <div class= "login-panel bg-white text-left">
                    <div class="alert alert-primary" role="alert" :style="{opacity: isAlertShow ? 1 : 0}">
                        Votre profile a été créé ! <small> Vous allez être redirigé</small>
                        <loading-component width="30"></loading-component>
                    </div>
                    <h1 class="display-3 font-weight-bold">Sign Up</h1>
                    <p class="font-weight-bold">Bienvenue</p>
                    <br>
                    <form action="">
                        <div class="form-group">
                            <label for="nom" class="input-label" minlenght="3" maxlenght= "20" required>Nom</label>
                            <input type="nom" class="form-control" placeholder="Nom" v-model="nom">
                        </div>
                        <div class="form-group">
                            <label for="prenom" class="input-label" minlenght="3" maxlenght= "25" required>Prénom</label>
                            <input type="prenom" class="form-control" placeholder="Prénom" v-model="prenom">
                        </div>
                        <div class="form-group">
                            <label for="email" class="input-label" pattern= '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/' required >Email</label>
                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password" class="input-label" pattern='/^(?=.*\d).{4,8}$/' required>Password</label>
                            <input type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>
                        <p v-if="msg" class="d-flex justify-content-center">{{msg}}</p>
                        <div class="form-group d-flex justify-content-center">
                            <button class="btn btn-primary w-25" @click="signUp" v-if="!isSignIn">Sign Up</button>
                            <button class="btn btn-primary w-25" disabled v-if="isSignIn"><loading-component width="30"></loading-component></button>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import LoadingComponent from '../components/Loading';
    import AuthService from '@/AuthService.js';

    export default {
        components : { LoadingComponent },
        data() {
            return {
                isSignIn: false,
                isAlertShow: false,
                nom: '',
                prenom: '',
                email: '',
                password: '',
                msg: ''
            }
        },

        methods: {
            async signUp() {
                this.isSignIn = true

                try {
                    const credentials = {
                        nom: this.nom,
                        prenom: this.prenom,
                        email: this.email,
                        password: this.password
                    };
                    const response = await AuthService.signUp(credentials);
                    this.msg = response.msg;
                    setTimeout(() => {
                        this.isSignIn = false
                        this.isAlertShow = true
                        setTimeout(() =>
                            this.redirect(), 1000)
                    }, 1000)

                    } catch (error) {
                        this.isSignIn = false
                        this.msg = error.response.data.msg;
                        //console.log(error);
                    }

                    
                },
             
            redirect() {
                this.$router.push({ name: 'Login'})
            }

        }
    }
</script>

<style lang="scss">
    .widget {
        margin: 0;
        height: unset;
    }
    .login-panel {
        padding: 200px 0;
        position: relative;
    }
    .btn-primary {
        background: #152544;
        border: none;
    }
    .alert {
        opacity: 0;
        position: absolute;
        top: 100px;
        width: 100%;
        &.alert-primary {
            background: #152544;
            color: #ffffff;
            border: none;
            font-size: 15px;
        }
        .widget {
            position: absolute;
            right: 5px;
            top: 0;
            margin: 10px;
        }
    }

</style>