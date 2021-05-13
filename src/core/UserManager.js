import TOKEN_SECRET from './tokenSecret'
import UserNotFoundError from '../errors/notFound'
import {store} from '../store'

export default class UserManager{


    static getToken(username, role) {
        if (store.getters.getUsers[username]) {
            const jwt = require('jsonwebtoken');
            return jwt.sign({username: username, role: [role]}, TOKEN_SECRET, {expiresIn: '1800s'});
        } else {
            throw new UserNotFoundError();
        }
    }

    static signUpUser(username) {
        store.commit('registerUser', username);
    }

    static setLog(username, log) {
        store.commit('setLog', {username: username, log: log});

    }

         static getLogs(username){
        {
            let logs = store.getters.getLogs(username);
            return  logs;
        }

    }

}