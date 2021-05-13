<template>

    <div>
        <router-view id="up"/>
        <b-container style="margin-top: 200px">
            <b-row class="my-1">
                <b-col cols="1" sm="2" md="3" lg="4" xl="4"></b-col>
                <b-col cols="2" sm="2" md="1" lg="1" xl="1">
                    <label for="input-username">Username:</label>
                </b-col>
                <b-col cols="1" sm="1" md="auto" lg="1" xl="auto"></b-col><!--sm="1" md="1" lg="1"></b-col>-->
                <b-col cols="6" sm="6" md="5" lg="3" xl="3">
                    <b-form-input v-model="username" id="input-username" size="sm"
                                  placeholder="введите имя"></b-form-input>
                </b-col>
                <b-col></b-col>
            </b-row>
            <br/>
            <b-row>
                <b-col sm="2" md="3" lg="4" xl="4"></b-col>
                <b-col sm="1" md="1" lg="1" xl="1">
                    <b-button id="buttonProfile" v-on:click="auth(username,[])">
                        авторизоваться
                    </b-button>
                </b-col>
                <b-col cols="12" sm="2" md="1" lg="auto"></b-col>
                <b-col sm="6" md="5" lg="4" xl="3">
                    <b-button v-on:click="auth(username,['user','new'])">
                        авторизоваться with user
                    </b-button>
                </b-col>
                <b-col></b-col>


            </b-row>
        </b-container>


    </div>
</template>

<script>

    import auth from '../core/Auth'
    export default {
        name: 'Registration',
        data() {
            return {
                username: "",
            }
        },
        props: {
            msg: String
        },
        computed: {},
        beforeCreate() {
            if (auth.checkAuth()) {
                this.$router.push("/").catch(e => console.log(e));
            }
        },
        methods: {
            hi: function () {
                alert("hi");
            },
            auth: function (username, role) {
                auth.login(username, role);
                this.$router.push('profile').then(e => console.log(e));

            }
        }
    }

</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

</style>
