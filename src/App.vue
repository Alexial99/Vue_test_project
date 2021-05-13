<template>
    <div id="app">
        <b-container class="bv-example-row">
            <div class="content" v-if="!$route.meta.hideNavigation">
                <b-row class="justify-content-md-center">
                    <b-col cols="3" sm="2" md="2" lg="1" xl="1" v-if="checkRole(['user'])">
                        <b-button variant="outline-secondary" id="buttonGame" v-if="checkRole(['user'])">
                            <router-link id="element_2" to="/game" style="color:pink" exact>game</router-link>
                        </b-button>
                    </b-col>
                    <b-col cols="3" sm="2" md="2" lg="1" xl="1">
                        <b-button variant="outline-secondary" id="buttonProfile" v-on:click="activeProfile()">
                            <router-link id="element_3" to="/profile" style="color: #98caff">profile</router-link>
                        </b-button>
                    </b-col>
                </b-row>
                <hr/>
                <br/>

                <b-button class="exitButton" variant="outline-dark" id="exitButton" v-on:click="logout()">
                    exit
                </b-button>


            </div>
        </b-container>
        <b-container fluid>


            <router-view/>
        </b-container>
    </div>


</template>

<script>
    import auth from './core/Auth'

    export default {
        head: {
            script: {
                src: 'https://polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver',
                body: true
            }
        },
        name: 'App',
        data() {
            return {
                heightBlock: Number
            }
        },
        beforeCreate() {
            auth.checkAuth();
        },
        methods: {
            activeProfile: function () {
                console.log(auth.getActiveProfile());
            },
            checkRole: function (role) {
                return auth.checkRole(role);
            },
            logout: function () {
                auth.logout();
                this.$router.push("registration").catch(e => console.log(e));
            }

        },
        mounted() {
        },

    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .exitButton {
        position: absolute;
        right: 60px;
        top: 20px;
    }
</style>
