"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class Enemies extends ƒ.Node {
        constructor(_fps, shotsPerUfoPerSecond, _shotChance, _healthPackChance, _asteroidHealth, _ufoHealth, _soundPath) {
            super("Enemies");
            this.deleteAt = -1;
            this.counter = 0;
            //init sub nodes
            this.asteroids = new ƒ.Node("Ateroids");
            this.ufos = new ƒ.Node("UFOs");
            //add as children
            this.addChild(this.asteroids);
            this.addChild(this.ufos);
            this.fps = _fps;
            this.counterMax = Math.floor(this.fps / shotsPerUfoPerSecond);
            this.shotChance = _shotChance;
            this.healthPackChance = _healthPackChance;
            this.asteroidHealth = _asteroidHealth;
            this.ufodHealth = _ufoHealth;
            this.soundPath = _soundPath;
        }
        randomizeShots() {
            return Math.floor(Math.random() * this.shotChance);
        }
        healthPackSpawnChance() {
            return Math.floor(Math.random() * this.healthPackChance);
        }
        spawnAsteroid(_atPos) {
            this.asteroids.addChild(new Asteroid(_atPos.x, _atPos.y, this.asteroidHealth, this.soundPath));
        }
        spawnUFO(_atPos) {
            this.ufos.addChild(new UFO(_atPos.x, _atPos.y, this.ufodHealth, this.soundPath));
        }
        handleCollisionWithPlayer(_target) {
            let asteroidsArray = this.asteroids.getChildren();
            let ufosArray = this.ufos.getChildren();
            //iterate through all asteroids and check collision with player
            for (let j = 0; j < asteroidsArray.length; j++) {
                if (_target.checkCollision(asteroidsArray[j])) {
                    //decrease health by 1 for projectile and asteroid
                    _target.health--;
                    asteroidsArray[j].health--;
                    //run checkHealth for both
                    _target.checkHealth();
                    asteroidsArray[j].checkHealth();
                }
            }
            //iterate through all ufos and check collision with player
            for (let k = 0; k < ufosArray.length; k++) {
                if (_target.checkCollision(ufosArray[k])) {
                    //decrease health by 1 for projectile and ufo
                    _target.health--;
                    ufosArray[k].health--;
                    //run checkHealth for both
                    _target.checkHealth();
                    ufosArray[k].checkHealth();
                }
            }
        }
        handleCollisionWithPlayerProjectiles(_playerProjectiles, _healthPacks) {
            //setup working arrays
            let asteroidsArray = this.asteroids.getChildren();
            let ufosArray = this.ufos.getChildren();
            let projectilesArray = _playerProjectiles.getChildren();
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
                        //play sound
                        asteroidsArray[j].playSound();
                    }
                }
                //iterate through all ufos and check collision with current projectile
                for (let k = 0; k < ufosArray.length; k++) {
                    if (projectilesArray[i].checkCollision(ufosArray[k])) {
                        //decrease health by 1 for projectile and ufo
                        projectilesArray[i].health--;
                        ufosArray[k].health--;
                        //ceck if ufo health is below 1 if true spawn health pack by chance
                        if (ufosArray[k].health < 1 && !this.healthPackSpawnChance())
                            _healthPacks.spawnHealthPack(ufosArray[k]);
                        //run checkHealth for both
                        projectilesArray[i].checkHealth();
                        ufosArray[k].checkHealth();
                        //play sound
                        ufosArray[k].playSound();
                    }
                }
            }
        }
        handleMovement(_speed) {
            let asteroidsArray = this.asteroids.getChildren();
            let ufosArray = this.ufos.getChildren();
            const enemyOffset = _speed * ƒ.Loop.timeFrameReal / 1000;
            //iterate through all asteroids and move them
            for (let i = 0; i < asteroidsArray.length; i++) {
                const asteroidPos = asteroidsArray[i].getPos();
                if (asteroidPos.x <= this.deleteAt) { //delete enemy if outside of screen
                    this.asteroids.removeChild(asteroidsArray[i]);
                }
                else {
                    asteroidsArray[i].moveBy(new ƒ.Vector2(-enemyOffset, 0));
                }
            }
            //iterate through all ufos and move them
            for (let j = 0; j < ufosArray.length; j++) {
                const ufoPos = ufosArray[j].getPos();
                if (ufoPos.x <= this.deleteAt) { //delete enemy if outside of screen
                    this.ufos.removeChild(ufosArray[j]);
                }
                else {
                    ufosArray[j].moveBy(new ƒ.Vector2(-enemyOffset, 0));
                }
            }
        }
        handleFiring(_projectiles) {
            let ufosArray = this.ufos.getChildren();
            if (this.counter == this.counterMax) {
                for (let i = 0; i < ufosArray.length; i++) {
                    if (this.randomizeShots())
                        _projectiles.spawnProjectileEnemy(ufosArray[i]);
                }
                this.counter = 0;
            }
            else {
                this.counter++;
            }
        }
    }
    DoodleSpace.Enemies = Enemies;
    class Asteroid extends DoodleSpace.BaseEntity {
        constructor(_x, _y, _health, _soundPath) {
            super(_x, _y, 1, 1, "Asteroid", _health, "./textures/enemy_asteroid.png", _soundPath);
            if (this.sound) {
                this.sound.volume = 1;
            }
        }
    }
    class UFO extends DoodleSpace.BaseEntity {
        constructor(_x, _y, _health, _soundPath) {
            super(_x, _y, 1.6, 1, "UFO", _health, "./textures/enemy_ufo.png", _soundPath);
            if (this.sound) {
                this.sound.volume = 1;
            }
        }
    }
    DoodleSpace.UFO = UFO;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Enemies.js.map