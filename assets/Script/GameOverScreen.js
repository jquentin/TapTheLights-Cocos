var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLbl: {
	        default: null,
        	type: cc.Label,
        },
        isOpen: false,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
     	Global.GameOverScreen = this;
     },
     
     start () {
     	cc.log ("game over screen start");
     	this.node.opacity = 0;
     },
     
     onTap (event) {
     	this.close ();
     },

    open () {
		this.scoreLbl.string = Global.GameplayManager.currentScore;
		this.node.runAction (cc.sequence (cc.fadeIn (1), cc.callFunc (this.waitForTap, this)));
		this.isOpen = true;
		
		/*wx.getFriendUserGameData({
			keyList:["score"],
			success:res=> {
				//let data = res.data
				console.log("getFriendUserGameData:",res);
			},
			fail:res=>{
				console.log("getFriendUserGameData fail:",res);
			}
		});*/
    },
    
    waitForTap () {
     	this.node.on (cc.Node.EventType.TOUCH_END, this.onTap, this);
    },
    
    close () {
	    Global.GameplayManager.resetGame ();
	    this.node.runAction (cc.sequence (cc.fadeOut (1), cc.callFunc(this.restartGame, this)));
		this.isOpen = false;
     	this.node.off (cc.Node.EventType.TOUCH_END, this.onTap, this);
    },
    
    restartGame () {
	    Global.GameplayManager.startGame ();
    },

     update (dt) {
     	
     },
});
