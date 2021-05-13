'use strict'
import UserManager from "./UserManager";
import {store} from '../store.js'
import router from '../router.js'
import Profile from '../core/Profile'
import TOKEN_SECRET from './tokenSecret'
import Log from './Log'
import UserNotFoundError from "../errors/notFound";

let activeProfile;
export default class Auth {

    static login(username, role) {
        let token;
        try {
            token = UserManager.getToken(username, role);
        } catch (e) {
            if (e instanceof UserNotFoundError) {
                UserManager.signUpUser(username);
                token = UserManager.getToken(username, role);
            } else {
                throw e;
            }
        }
        store.commit("saveToken", token);
        let decoded = tokenDecoder();
        console.log(decoded);
        createActiveProfile(decoded);

        let log = new Log(Log.types.login, new Date(), window.navigator.userAgent, role);

        UserManager.setLog(username, log);

    }

    static logout() {//(username,role){
        let decoded = tokenDecoder();
        let username = decoded.username;
        let role = decoded.role;
        let log = new Log(Log.types.logout, new Date(), window.navigator.userAgent, role);

        removeAuth();
        UserManager.setLog(username, log);
        redirectToAuth();
    }

    static checkAuth() {

        if (store.state.token) {

            let decoded = tokenDecoder();
            createActiveProfile(decoded);
            return true;

        } else {
            removeAuth();
            redirectToAuth();
            return false;
        }
    }

    static checkRole(roles) {

        let profile = Auth.getActiveProfile();
        console.log(profile);
        if (!profile || !profile.role || !Array.isArray(profile.role)) {
            return false;
        }
        let matched;
        for (let items of profile.role) {

            for (let item of items) {

                for (let i of roles) {

                    if (item.toLowerCase() === i.toLowerCase()) {
                        matched = true;
                        console.log(i);
                        //  return true;
                    }
                }
            }
        }
        return !!matched;
    }

    static getTokenSecret() {
        return TOKEN_SECRET;
    }

    static getActiveProfile() {
        return activeProfile;
    }

}

function createActiveProfile(decoded) {
    if (!activeProfile || (activeProfile.active_token !== store.state.token)) {
        activeProfile = new Profile(decoded.username, decoded.role, store.state.token);
    }

}

function removeAuth() {
    store.commit("removeToken");
    activeProfile = null;
}

function tokenDecoder() {
    const jwt = require('jsonwebtoken');
    return jwt.verify(store.state.token, TOKEN_SECRET, function (err, _decoded) {
        if (err) {
            removeAuth();
            return redirectToAuth();
        }
        return _decoded;
    });
}

function redirectToAuth() {

    if (router.currentRoute.path !== "/registration") {
        router.push("registration").catch(e => console.log(e));
    }
}