var GameplayManager = require("GameplayManager");
var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

     update (dt) {
     	this.getComponent (cc.Label).string = Global.GameplayManager.currentScore;
     },
});
