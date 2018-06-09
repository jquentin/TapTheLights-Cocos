"use strict";
cc._RF.push(module, 'b8a8d1xOHJBVoxtkIEbYry0', 'ScoreLabel');
// Script/ScoreLabel.js

"use strict";

var GameplayManager = require("GameplayManager");
var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        this.getComponent(cc.Label).string = Global.GameplayManager.currentScore;
    }
});

cc._RF.pop();