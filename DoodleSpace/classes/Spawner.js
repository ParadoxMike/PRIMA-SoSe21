"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class Spawner {
        constructor(_fps, _spawnsPerSecond) {
            this.spawnLimitTop = 11.5;
            this.spawnLimitBottom = -11.5;
            this.spawnAtX = 35;
            this.counter = 0;
            this.fps = _fps;
            this.counterMax = Math.floor(this.fps / _spawnsPerSecond);
        }
        adjustSpawnrate(_spawnsPerSecond) {
            this.counterMax = Math.floor(this.fps / _spawnsPerSecond);
        }
        randomPos() {
            return Math.floor(Math.random() * (this.spawnLimitTop - this.spawnLimitBottom + 1)) + this.spawnLimitBottom;
        }
        randomizeEnemy() {
            return Math.floor(Math.random() * 2);
        }
        spawnEnemy(_enemies) {
            if (this.counter == this.counterMax) {
                if (this.randomizeEnemy()) {
                    _enemies.spawnAsteroid(new ƒ.Vector2(this.spawnAtX, this.randomPos()));
                }
                else {
                    _enemies.spawnUFO(new ƒ.Vector2(this.spawnAtX, this.randomPos()));
                }
                this.counter = 0;
            }
            else {
                this.counter++;
            }
        }
    }
    DoodleSpace.Spawner = Spawner;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Spawner.js.map