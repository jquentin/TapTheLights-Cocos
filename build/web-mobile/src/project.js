require=function c(o,i,l){function s(t,e){if(!i[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}var r=i[t]={exports:{}};o[t][0].call(r.exports,function(e){return s(o[t][1][e]||e)},r,r.exports,c,o,i,l)}return i[t].exports}for(var u="function"==typeof require&&require,e=0;e<l.length;e++)s(l[e]);return s}({ColorManager:[function(e,t,n){"use strict";cc._RF.push(t,"fdb86hYylBFFZFND+3G2VuI","ColorManager");e("GameplayManager");var a=e("Global"),r=cc.Class({name:"ColorPalette",properties:{bgColor:{default:cc.Color.BLACK,type:cc.Color},padColors:{default:[],type:[cc.Color]}}});cc.Class({extends:cc.Component,properties:{colorPalettes:{default:[],type:[r]}},onLoad:function(){a.ColorManager=this},loadPalette:function(e){for(a.GameplayManager.background.color=this.colorPalettes[e].bgColor,i=0;i<a.GameplayManager.lights.length;i++){var t=Math.floor(Math.random()*this.colorPalettes[e].padColors.length);a.GameplayManager.lights[i].node.color=this.colorPalettes[e].padColors[t]}},loadRandomPalette:function(){var e=Math.floor(Math.random()*this.colorPalettes.length);this.loadPalette(e)}}),cc._RF.pop()},{GameplayManager:"GameplayManager",Global:"Global"}],GameOverScreen:[function(e,t,n){"use strict";cc._RF.push(t,"cf6b3v7AQdENYCj0NC7jDu8","GameOverScreen");var a=e("Global");cc.Class({extends:cc.Component,properties:{scoreLbl:{default:null,type:cc.Label},isOpen:!1},onLoad:function(){a.GameOverScreen=this},start:function(){cc.log("game over screen start"),this.node.opacity=0},onTap:function(e){this.close()},open:function(){this.scoreLbl.string=a.GameplayManager.currentScore,this.node.runAction(cc.sequence(cc.fadeIn(1),cc.callFunc(this.waitForTap,this))),this.isOpen=!0},waitForTap:function(){this.node.on(cc.Node.EventType.TOUCH_END,this.onTap,this)},close:function(){a.GameplayManager.resetGame(),this.node.runAction(cc.sequence(cc.fadeOut(1),cc.callFunc(this.restartGame,this))),this.isOpen=!1,this.node.off(cc.Node.EventType.TOUCH_END,this.onTap,this)},restartGame:function(){a.GameplayManager.startGame()},update:function(e){}}),cc._RF.pop()},{Global:"Global"}],GameplayManager:[function(e,t,n){"use strict";cc._RF.push(t,"20f1e6FuTFBVJSowxXK4i22","GameplayManager");var a=e("Global"),r=e("Light"),c=(e("GameOverScreen"),e("MusicManager"),e("ColorManager"),cc.Class({name:"DifficultyLevel",properties:{lengthInPoints:{default:0,type:cc.Integer},probDouble:0,probTriple:0,speedMultiplier:1,probHalfDelay:0}}));cc.Class({extends:cc.Component,properties:{currentLevel:{get:function(){return this.levels[this.currentLevelIndex]}},lights:{default:[],type:[r]},background:{default:null,type:cc.Node},levels:{default:[],type:[c]},currentScore:{default:0,type:cc.Integer},currentLevelIndex:{default:0,type:cc.Integer},currentIndexInLevel:{default:0,type:cc.Integer},currentTime:0,nextFireTime:0,dead:{default:!0,type:cc.Boolean,serializable:!1}},onLoad:function(){a.GameplayManager=this},start:function(){this.resetGame(),this.startGame()},resetGame:function(){for(i=0;i<this.lights.length;i++)this.lights[i].reset();this.currentScore=0,this.currentLevelIndex=0,this.currentIndexInLevel=0,a.MusicManager.loadRandomInstrument(),a.ColorManager.loadRandomPalette()},startGame:function(){this.currentTime=0,this.nextFireTime=1,this.dead=!1},increaseScore:function(){this.currentScore++,cc.log("increaseScore: "+this.currentScore),this.currentIndexInLevel++,this.currentLevelIndex<this.levels.length-1&&this.currentIndexInLevel>=this.currentLevel.lengthInPoints&&(this.currentLevelIndex++,this.currentIndexInLevel=0,cc.log("increaseLevel: "+this.currentLevelIndex))},fireOneRound:function(){for(cc.log("fireOneRound"),i=0;i<this.chooseNextFireAmount();i++){for(var e=!1;!e;){var t=Math.floor(9*Math.random()),n=this.lights[t];n.fireImg.active||(e=!0)}n.fire()}},chooseNextFireAmount:function(){return Math.random()<=this.currentLevel.probTriple?3:Math.random()<=this.currentLevel.probTriple+this.currentLevel.probDouble?2:1},chooseNextFireDelay:function(){return Math.random()<=this.currentLevel.probHalfDelay?.5:1},prepareNextFire:function(){cc.log("prepareNextFire");var e=this.chooseNextFireDelay();this.nextFireTime+=e},lose:function(){cc.log("Loser"),this.dead=!0,a.GameOverScreen.open()},update:function(e){this.dead||(this.currentTime+=e,this.currentTime>=this.nextFireTime&&(this.fireOneRound(),this.prepareNextFire()))}}),cc._RF.pop()},{ColorManager:"ColorManager",GameOverScreen:"GameOverScreen",Global:"Global",Light:"Light",MusicManager:"MusicManager"}],Global:[function(e,t,n){"use strict";cc._RF.push(t,"cbbadjHH2pP06Ms8T1oDVU5","Global"),t.exports={GameplayManager:null,GameOverScreen:null,ColorManager:null,MusicManager:null},cc._RF.pop()},{}],HelloWorld:[function(e,t,n){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},text:"Hello, World!"},onLoad:function(){this.label.string=this.text},update:function(e){}}),cc._RF.pop()},{}],Light:[function(e,t,n){"use strict";cc._RF.push(t,"54a2c6aUJNMKJYw7lhK0gQ7","Light");e("GameplayManager");var a=e("Global");cc.Class({extends:cc.Component,properties:{fireImg:{default:null,type:cc.Node}},start:function(){this.fire.active=!1},fire:function(){this.fireImg.active=!0,this.scheduleOnce(this.lose,1)},tap:function(){this.fireImg.active?(this.getComponent(cc.AudioSource).play(),this.fireImg.active=!1,this.unschedule(this.lose),a.GameplayManager.increaseScore()):this.lose()},lose:function(){a.GameplayManager.dead||(a.GameplayManager.lose(this),this.shake())},reset:function(){this.fireImg.active=!1,this.unschedule(this.lose)},shake:function(){this.node.runAction(cc.sequence(cc.scaleTo(.1*.4,1.1).easing(cc.easeSineOut()),cc.scaleTo(.1,.95).easing(cc.easeSineInOut()),cc.scaleTo(.1,1.05).easing(cc.easeSineInOut()),cc.scaleTo(.1,1).easing(cc.easeSineInOut())))}});cc._RF.pop()},{GameplayManager:"GameplayManager",Global:"Global"}],MusicManager:[function(e,t,n){"use strict";cc._RF.push(t,"72afbZ61cRCt7qqrvV3qW81","MusicManager");e("GameplayManager");var a=e("Global"),r=cc.Class({name:"Instrument",properties:{notes:{default:[],type:[cc.AudioClip]}}});cc.Class({extends:cc.Component,properties:{instruments:{default:[],type:[r]}},onLoad:function(){a.MusicManager=this},loadInstrument:function(e){for(i=0;i<a.GameplayManager.lights.length;i++)a.GameplayManager.lights[i].getComponent(cc.AudioSource).clip=this.instruments[e].notes[i]},loadRandomInstrument:function(){var e=Math.floor(Math.random()*this.instruments.length);this.loadInstrument(e)}}),cc._RF.pop()},{GameplayManager:"GameplayManager",Global:"Global"}],ScoreLabel:[function(e,t,n){"use strict";cc._RF.push(t,"b8a8d1xOHJBVoxtkIEbYry0","ScoreLabel");e("GameplayManager");var a=e("Global");cc.Class({extends:cc.Component,properties:{},start:function(){},update:function(e){this.getComponent(cc.Label).string=a.GameplayManager.currentScore}}),cc._RF.pop()},{GameplayManager:"GameplayManager",Global:"Global"}],TestScheduleRecursive:[function(e,t,n){"use strict";cc._RF.push(t,"466aeJYI6FBnqEGNdIxGnXa","TestScheduleRecursive"),cc.Class({extends:cc.Component,start:function(){this.fireOneRound()},fireOneRound:function(){cc.log("fire"),this.prepareNextFire()},prepareNextFire:function(){var e=Math.random();this.scheduleOnce(this.fireOneRound,e)}}),cc._RF.pop()},{}]},{},["ColorManager","GameOverScreen","GameplayManager","Global","HelloWorld","Light","MusicManager","ScoreLabel","TestScheduleRecursive"]);