require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  GameplayManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "20f1e6FuTFBVJSowxXK4i22", "GameplayManager");
    "use strict";
    var Global = require("Global");
    var DifficultyLevel = cc.Class({
      name: "DifficultyLevel",
      properties: {
        lengthInPoints: {
          default: 0,
          type: cc.Integer
        },
        probDouble: 0,
        probTriple: 0,
        speedMultiplier: 1,
        probHalfDelay: 0
      }
    });
    var instance = null;
    cc.Class({
      extends: cc.Component,
      properties: {
        currentLevel: {
          get: function get() {
            return this.levels[this.currentLevelIndex];
          }
        },
        lights: {
          default: [],
          type: [ cc.Node ]
        },
        levels: {
          default: [],
          type: [ DifficultyLevel ]
        },
        currentScore: {
          default: 0,
          type: cc.Integer
        },
        currentLevelIndex: {
          default: 0,
          type: cc.Integer
        },
        currentIndexInLevel: {
          default: 0,
          type: cc.Integer
        }
      },
      onLoad: function onLoad() {
        Global.GameplayManager = this;
      },
      start: function start() {
        null == instance && (instance = this);
        this.scheduleOnce(this.fireOneRound, 1);
      },
      increaseScore: function increaseScore() {
        this.currentScore++;
        cc.log("increaseScore: " + this.currentScore);
        this.currentIndexInLevel++;
        if (this.currentLevelIndex < this.levels.length - 1 && this.currentIndexInLevel >= this.currentLevel.lengthInPoints) {
          this.currentLevelIndex++;
          this.currentIndexInLevel = 0;
          cc.log("increaseLevel: " + this.currentLevelIndex);
        }
      },
      fireOneRound: function fireOneRound() {
        for (i = 0; i < this.chooseNextFireAmount(); i++) {
          while (true) {
            var lightIndex = Math.floor(9 * Math.random());
            var lightNode = this.lights[lightIndex];
            var light = lightNode.getComponent("Light");
            if (!light.fireImg.active) break;
          }
          light.fire();
        }
        this.prepareNextFire();
      },
      chooseNextFireAmount: function chooseNextFireAmount() {
        return Math.random() <= this.currentLevel.probTriple ? 3 : Math.random() <= this.currentLevel.probTriple + this.currentLevel.probDouble ? 2 : 1;
      },
      chooseNextFireDelay: function chooseNextFireDelay() {
        return Math.random() <= this.currentLevel.probHalfDelay ? .5 : 1;
      },
      prepareNextFire: function prepareNextFire() {
        cc.log("prepareNextFire");
        var delay = this.chooseNextFireDelay();
        this.unschedule(this.fireOneRound);
        this.scheduleOnce(this.fireOneRound, delay);
      },
      lose: function lose() {
        cc.log("Loser");
        this.unschedule(this.fireOneRound);
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    Global: "Global"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbbadjHH2pP06Ms8T1oDVU5", "Global");
    "use strict";
    module.exports = {
      GameplayManager: null
    };
    cc._RF.pop();
  }, {} ],
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        },
        text: "Hello, World!"
      },
      onLoad: function onLoad() {
        this.label.string = this.text;
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  Light: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "54a2c6aUJNMKJYw7lhK0gQ7", "Light");
    "use strict";
    var GameplayManager = require("GameplayManager");
    var Global = require("Global");
    var Light = cc.Class({
      extends: cc.Component,
      properties: {
        sound: {
          default: null,
          type: cc.AudioClip
        },
        fireImg: {
          default: null,
          type: cc.Node
        }
      },
      start: function start() {
        this.fire.active = false;
      },
      fire: function fire() {
        cc.log(this.fireImg);
        this.fireImg.active = true;
        this.scheduleOnce(this.lose, 1);
      },
      tap: function tap() {
        if (this.fireImg.active) {
          this.fireImg.active = false;
          this.unschedule(this.lose);
          Global.GameplayManager.increaseScore();
        } else this.lose();
      },
      lose: function lose() {
        Global.GameplayManager.lose(this);
      }
    });
    cc._RF.pop();
  }, {
    GameplayManager: "GameplayManager",
    Global: "Global"
  } ]
}, {}, [ "GameplayManager", "Global", "HelloWorld", "Light" ]);