<template>
    <section class="container-fluid">
        <div class= "row justify-content-center">
            <div class= "col-lg-4">
                <div class= "login-panel bg-white text-left">
                    <div class="alert alert-primary" role="alert" :style="{opacity: isAlertShow ? 1 : 0}">
                        Votre profile a été créé ! <small> Vous allez être redirigé</small>
                        <loading-component width="30"></loading-component>
                    </div>
                    <h1 class="display-3 font-weight-bold">Signup</h1>
                    <p class="font-weight-bold">Bienvenue</p>
                    <br>
                    <form action="">
                        <div class="form-group">
                            <label for="nom" class="input-label">Nom</label>
                            <input type="nom" class="form-control" placeholder="Nom">
                        </div>
                        <div class="form-group">
                            <label for="prenom" class="input-label">Prénom</label>
                            <input type="prenom" class="form-control" placeholder="Prénom">
                        </div>
                        <div class="form-group">
                            <label for="email" class="input-label">Email</label>
                            <input type="email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="password" class="input-label">Password</label>
                            <input type="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group d-flex justify-content-center">
                            <button class="btn btn-primary w-25" @click="login" v-if="!isLoggingIn">S'enregistrer</button>
                            <button class="btn btn-primary w-25" disabled v-if="isLoggingIn"><loading-component width="30"></loading-component></button>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import LoadingComponent from '../components/Loading'

    export default {
        components : { LoadingComponent },
        data() {
            return {
                isLoggingIn: false,
                isAlertShow: false
            }
        },

        methods: {
            login() {
                this.isLoggingIn =true

                setTimeout(() => {
                    this.isLoggingIn = false
                    this.isAlertShow = true
                    setTimeout(() =>
                        this.redirect(), 1000)
                }, 1000)
            },
             
            redirect() {
                this.$router.push({ name: 'home'})
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