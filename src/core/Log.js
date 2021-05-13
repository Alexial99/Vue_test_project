'use strict'
export default class Log {
    constructor(action, time, userAgent, role) {
        this.action = action;
        this.time = time;
        this.user_agent = userAgent;
        this.role = role;

    }
  static types={login:'login',logout:'logout'}
}