var Global = require("Global");
var Light = require("Light");
var GameOverScreen = require("GameOverScreen");
var MusicManager = require("MusicManager");
var ColorManager = require("ColorManager");

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
            type: [Light], 
       		serializable: false,
       },
       lightsContainer: {
            default: null,
            type: cc.Node,
       },
       background: {
            default: null,
            type: cc.Node,
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
       
       currentTime: 0,
       
       nextFireTime: 0,
       
       
       dead: {
       		default: true,
       		type: cc.Boolean,
       		serializable: false,
       },
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
     	Global.GameplayManager = this; 
     	this.lights = this.lightsContainer.getComponentsInChildren(Light);
     },

    start () {
	    this.resetGame ();
	    this.startGame ();
    },
    
    resetGame () {
		for (i = 0 ; i < this.lights.length ; i++)
		{
			this.lights[i].reset ();
		}
	    this.currentScore = 0;
	    this.currentLevelIndex = 0;
	    this.currentIndexInLevel = 0;
	    Global.MusicManager.loadRandomInstrument ();
	    Global.ColorManager.loadRandomPalette ();
    },

    startGame () {
	    this.currentTime = 0;
	    this.nextFireTime = 1;
	    this.dead = false;
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
		cc.log("fireOneRound");
		for (i = 0 ; i < this.chooseNextFireAmount () ; i++)
		{
			var found = false;
			while (!found)
			{
				var lightIndex = Math.floor (Math.random() * 9);
				var light = this.lights[lightIndex];
				if (!light.fireImg.active)
					found = true;
			}
			light.fire ();
		}
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
		cc.log("prepareNextFire");
		var delay = this.chooseNextFireDelay ();
		this.nextFireTime += delay;
	},
	
	lose () {
		cc.log ("Loser");
		this.dead = true;
		Global.GameOverScreen.open ();
	},
	
     update (dt) {
     	if (this.dead)
     		return;
     	this.currentTime += dt;
     	if (this.currentTime >= this.nextFireTime)
     	{
     		this.fireOneRound (); 		
			this.prepareNextFire ();
     	}
     
     },
});
