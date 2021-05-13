import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
const store =new Vuex.Store({
    state: {
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
        saveToken: (state, value) =>
            value ? (state.token = value) : (state.token = ""),
        removeToken:(state)=>
            state.token = null,
        registerUser:(state,userName)=>{
            if(!state.users){state.users={};}
         //   let keys = Object.keys([value]);
            if(!state.users[userName]){
                state.users[userName]={log:[]};
            }
        },
        setLog:(state,user)=>{
            if(!state.users){state.users={};}
            if(state.users[user.username]){
                state.users[user.username].log.push(user.log);
            }
        }
},
    getters: {
        getUsers: state => {
            if(!state.users){
                state.users={};
            }
            return state.users;
        },
        getLogs: state =>user => {
            return  state.users[user].log;
        },

    }
});
export {store};