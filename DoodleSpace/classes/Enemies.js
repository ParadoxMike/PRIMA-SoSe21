"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class Enemies extends ƒ.Node {
        constructor() {
            super("Enemies");
            //init sub nodes
            this.asteroids = new ƒ.Node("Ateroids");
            this.ufos = new ƒ.Node("UFOs");
            //add as children
            this.addChild(this.asteroids);
            this.addChild(this.ufos);
        }
        spawnAsteroid(_atPos) {
            this.asteroids.addChild(new Asteroid(_atPos.x, _atPos.y));
        }
        spawnUFO(_atPos) {
            this.ufos.addChild(new UFO(_atPos.x, _atPos.y));
        }
        handleCollisionWithPlayer(_target) {
        }
        handleCollisionWithPlayerProjectiles(playerProjectiles) {
            let asteroidsArray = this.asteroids.getChildren();
            let ufosArray = this.ufos.getChildren();
            let projectilesArray = playerProjectiles.getChildren();
            for (let i = 0; i < projectilesArray.length; i++) {
                for (let j = 0; j < asteroidsArray.length; j++) {
                    if (projectilesArray[i].checkCollision(asteroidsArray[j])) {
                        projectilesArray[i].health--;
                        asteroidsArray[j].health--;
                        projectilesArray[i].checkHealth();
                        asteroidsArray[j].checkHealth();
                    }
                }
                for (let k = 0; k < ufosArray.length; k++) {
                    if (projectilesArray[i].checkCollision(ufosArray[k])) {
                        projectilesArray[i].health--;
                        ufosArray[k].health--;
                        projectilesArray[i].checkHealth();
                        ufosArray[k].checkHealth();
                    }
                }
            }
        }
    }
    DoodleSpace.Enemies = Enemies;
    class Asteroid extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1, 1, "Asteroid", 1, "./textures/enemy_asteroid.png");
        }
    }
    class UFO extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1.6, 1, "UFO", 1, "./textures/enemy_ufo.png");
        }
    }
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Enemies.js.map