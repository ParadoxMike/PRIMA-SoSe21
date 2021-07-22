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
            //setup working arrays
            let asteroidsArray = this.asteroids.getChildren();
            let ufosArray = this.ufos.getChildren();
            let projectilesArray = playerProjectiles.getChildren();
            //iterate through all player projectiles
            for (let i = 0; i < projectilesArray.length; i++) {
                //iterate through all asteroids and check collision with current projectile
                for (let j = 0; j < asteroidsArray.length; j++) {
                    if (projectilesArray[i].checkCollision(asteroidsArray[j])) {
                        //decrease health by 1 for projectile and asteroid
                        projectilesArray[i].health--;
                        asteroidsArray[j].health--;
                        //run checkHealth for both
                        projectilesArray[i].checkHealth();
                        asteroidsArray[j].checkHealth();
                    }
                }
                //iterate through all ufos and check collision with current projectile
                for (let k = 0; k < ufosArray.length; k++) {
                    if (projectilesArray[i].checkCollision(ufosArray[k])) {
                        //decrease health by 1 for projectile and ufo
                        projectilesArray[i].health--;
                        ufosArray[k].health--;
                        //run checkHealth for both
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