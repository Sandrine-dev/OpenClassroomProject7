<template>
    <section class="container">
        <div class= "row justify-content-center">
            <div class= "col-lg-4">
                <div class= "login-panel bg-white text-left">
                    <div class="alert alert-primary" role="alert" :style="{opacity: isAlertShow ? 1 : 0}">
                        Vous êtes connecté ! <small> Vous allez être redirigé</small>
                        <loading-component width="30"></loading-component>
                    </div>
                    <h1 class="display-3 font-weight-bold">Login</h1>
                    <p class="font-weight-bold">Bon retour</p>
                    <br>
                    <form action="">
                        <div class="form-group">
                            <label for="email" class="input-label" required>Email</label>
                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password" class="input-label" required>Password</label>
                            <input type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>
                        <p v-if="msg" class="d-flex justify-content-center">{{msg}}</p>
                        <div class="form-group d-flex justify-content-center">
                            <button class="btn btn-primary w-25" @click="login" v-if="!isLoggingIn">Login</button>
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
    import AuthService from '@/AuthService.js'
    export default {
        components : { LoadingComponent },
        data() {
            return {
                isLoggingIn: false,
                isAlertShow: false,
                email: '',
                password: '',
                msg: ''
            }
        },

        methods: {
            async login() {
                this.isLoggingIn =true

                try {

                    const credentials = {
                    email: this.email,
                    password: this.password
                    };

                    const response = await AuthService.login(credentials);
                    this.msg = response.msg;

                    const token = response.token;
                    const user = response.user;

                    this.$store.dispatch('login', { token, user });
                    setTimeout(() => {
                        this.isLoggingIn = false
                        this.isAlertShow = true
                        setTimeout(() =>
                            this.redirect(), 1000)
                    }, 1000)
                    
                    } catch (error) {
                        this.isLoggingIn = false
                        this.msg = error.response.data.msg;
                        //console.log(error);
                    }
                
                    
                },
             
            redirect() {
                this.$router.push({ name: 'Wall'})
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