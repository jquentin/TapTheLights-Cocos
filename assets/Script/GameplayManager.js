// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Global = require("Global");

var DifficultyLevel = cc.Class({
	name: "DifficultyLevel",
	properties: {
       lengthInPoints: {
       		default: 0,
       		type: cc.Integer,
       },
 	   probDouble: 0,
 	   probTriple: 0,
 	   speedMultiplier: 1,
 	   probHalfDelay: 0,
    },
});

var instance = null;

cc.Class({
    extends: cc.Component,

    properties: {
         currentLevel: {
     		get () {
                 return this.levels[this.currentLevelIndex];
             },
         },
       lights: {
            default: [],
            type: [cc.Node],
       },
       levels: {
            default: [],
            type: [DifficultyLevel],
       },
       
       currentScore: {
       		default: 0,
       		type: cc.Integer,
       },
       
       currentLevelIndex: {
       		default: 0,
       		type: cc.Integer,
       },
       
       currentIndexInLevel: {
       		default: 0,
       		type: cc.Integer,
       },
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
     	Global.GameplayManager = this;
     },

    start () {
    	if (instance == null)
			instance = this;
     	
		this.scheduleOnce (this.fireOneRound, 1);
    },
    
    increaseScore () {
    	this.currentScore++;
		cc.log ("increaseScore: " + this.currentScore);
    	this.currentIndexInLevel++;
    	if (this.currentLevelIndex < this.levels.length - 1 && this.currentIndexInLevel >= this.currentLevel.lengthInPoints)
    	{
    		this.currentLevelIndex++;
    		this.currentIndexInLevel = 0;
			cc.log ("increaseLevel: " + this.currentLevelIndex);
    	}
    },

	fireOneRound () {
		for (i = 0 ; i < this.chooseNextFireAmount () ; i++)
		{
			while (true)
			{
				var lightIndex = Math.floor (Math.random() * 9);
				var lightNode = this.lights[lightIndex];
				var light = lightNode.getComponent("Light");
				if (!light.fireImg.active)
					break;
			}
			light.fire ();
		}
		this.prepareNextFire ();
	},
	
	chooseNextFireAmount () {
		if (Math.random() <= this.currentLevel.probTriple)
			return 3;
		else if (Math.random() <= this.currentLevel.probTriple + this.currentLevel.probDouble)
			return 2;
		else
			return 1;
	},
	
	chooseNextFireDelay () {
		if (Math.random() <= this.currentLevel.probHalfDelay)
			return 0.5;
		else
			return 1;
	},
	
	prepareNextFire () {
		var delay = this.chooseNextFireDelay ();
		this.scheduleOnce (this.fireOneRound, delay);
	},
	
	lose () {
		cc.log ("Loser");
		this.unschedule (this.fireOneRound);
	},
	
     update (dt) {
     	
     
     },
});
