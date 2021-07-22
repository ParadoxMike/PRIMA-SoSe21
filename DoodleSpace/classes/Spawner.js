"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class Spawner {
        constructor() {
            this.spawnLimitTop = 11.5;
            this.spawnLimitBottom = -11.5;
            this.spawnAtX = 35;
        }
        randomPos() {
            return Math.floor(Math.random() * (this.spawnLimitTop - this.spawnLimitBottom + 1)) + this.spawnLimitBottom;
        }
        randomizeEnemy() {
            return Math.floor(Math.random() * 2);
        }
        spawnEnemy(_enemies) {
            if (this.randomizeEnemy()) {
                _enemies.spawnAsteroid(new ƒ.Vector2(this.spawnAtX, this.randomPos()));
            }
            else {
                _enemies.spawnUFO(new ƒ.Vector2(this.spawnAtX, this.randomPos()));
            }
        }
    }
    DoodleSpace.Spawner = Spawner;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Spawner.js.map