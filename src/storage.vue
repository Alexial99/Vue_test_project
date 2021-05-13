<!--
<template>
    <button v-on:click="getKey()"></button>
</template>

<script>

    import Vue from "vue"
    import Vuex from "vuex"
  //  import createPersistedState from "vuex-persistedstate"

    Vue.use(Vuex)
    import SecureLS from "secure-ls";
    const ls = new SecureLS({ isCompression: false });
  /*  this.getKey(){
        console.log(store.state );
    }*/
/*

    const store = new Vuex.Store({
      //  plugins: [createPersistedState()],
        state: {
            count: 0
        },
        mutations: {
            increment (state) {
                state.count++
            }
        }
    });*/
    const store =new Vuex.Store({
        state: {
            tokenSecret: ""
        },
        plugins: [
            createPersistedState({
                storage: {
                    getItem: (key) => ls.get(key),
                    setItem: (key, value) => ls.set(key, value),
                    removeItem: (key) => ls.remove(key),
                },
            }),
        ],
        mutations: {
            myString: (state, value) =>
                value ? (state.string = value) : (state.string = "")
        }
    });
    export default {
        name: "storage"
    }

</script>

<style scoped>

</style>-->
