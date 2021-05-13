'use strict'

export default class Profile {
    constructor(username, role, activeToken) {
        this.username = username;
        this.role = role
        this.active_token = activeToken;
    }

/*
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(newValue) {
        [this.firstName, this.lastName] = newValue.split(' ');
    }*/
}