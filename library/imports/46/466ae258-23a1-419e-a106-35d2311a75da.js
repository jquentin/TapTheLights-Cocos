"use strict";
cc._RF.push(module, '466aeJYI6FBnqEGNdIxGnXa', 'TestScheduleRecursive');
// Script/TestScheduleRecursive.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    start: function start() {
        this.fireOneRound();
    },
    fireOneRound: function fireOneRound() {
        cc.log("fire");
        this.prepareNextFire();
    },
    prepareNextFire: function prepareNextFire() {
        var delay = Math.random();
        this.scheduleOnce(this.fireOneRound, delay);
    }
});

cc._RF.pop();