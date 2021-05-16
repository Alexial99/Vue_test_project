<template>
    <div id="app">
        <b-container class="bv-example-row">
            <div class="content" v-if="!$route.meta.hideNavigation">
                <b-row>
                    <b-col  cols="1" sm="0" md="3" lg="3" xl="3"></b-col>
                    <b-col  cols="6" sm="6">
                        <b-row class="justify-content-md-center">
                            <b-col class="navButton" cols="4" sm="4" md="3" lg="2" xl="2" v-if="checkRole(['user'])">
                                <b-button variant="outline-secondary" id="buttonGame" v-if="checkRole(['user'])">
                                    <router-link id="element_2" to="/game" style="color: #8e8e8e" exact>game
                                    </router-link>
                                </b-button>
                            </b-col>
                            <b-col class="navButton" cols="4" sm="2" md="3" lg="2" xl="2"><!-- >-->
                                <b-button variant="outline-secondary" id="buttonProfile" v-on:click="activeProfile()">
                                    <router-link id="element_3" to="/profile" style="color: #8e8e8e">profile
                                    </router-link>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="3" sm="3">
                        <b-row>
                            <b-col offset="8" cols="2" offset-sm="10" offset-md="7" offset-xl="8" lg="2">
                                <b-button class="exitButton" variant="outline-dark" id="exitButton"
                                          v-on:click="logout()">
                                    exit
                                </b-button>

                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <hr/>
                <br/>
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

    .navButton {
        min-width: 70px;
    }
    html{
        overflow-x: hidden;
    }
    body{
        height: 100%;
        width: 100%;
        position: fixed;
        overflow-x: hidden;
    }
</style>
