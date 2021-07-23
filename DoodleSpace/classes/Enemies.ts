namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Enemies extends ƒ.Node {
        private deleteAt: number = -1;
        private asteroids: ƒ.Node;
        private ufos: ƒ.Node;
        private counter: number = 0;
        private counterMax: number;
        private fps: number;
        public shotChance: number;
        public healthPackChance: number;
        public asteroidHealth: number;
        public ufodHealth: number;
        private soundPath: string;

        constructor(_fps: number, shotsPerUfoPerSecond: number, _shotChance: number, _healthPackChance: number, _asteroidHealth: number, _ufoHealth:number, _soundPath: string) {
            super("Enemies");

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

        private randomizeShots(): number {
            return Math.floor(Math.random() * this.shotChance);
        }

        private healthPackSpawnChance(): number {
            return Math.floor(Math.random() * this.healthPackChance);
        }

        public spawnAsteroid(_atPos: ƒ.Vector2): void {
            this.asteroids.addChild(new Asteroid(_atPos.x, _atPos.y, this.asteroidHealth, this.soundPath));
        }

        public spawnUFO(_atPos: ƒ.Vector2): void {
            this.ufos.addChild(new UFO(_atPos.x, _atPos.y, this.ufodHealth, this.soundPath));
        }

        public handleCollisionWithPlayer(_target: Player): void {
            let asteroidsArray: Asteroid[] = this.asteroids.getChildren() as Asteroid[];
            let ufosArray: UFO[] = this.ufos.getChildren() as UFO[];

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

        public handleCollisionWithPlayerProjectiles(_playerProjectiles: PlayerProjectiles, _healthPacks: HealthPacks): void {
            //setup working arrays
            let asteroidsArray: Asteroid[] = this.asteroids.getChildren() as Asteroid[];
            let ufosArray: UFO[] = this.ufos.getChildren() as UFO[];
            let projectilesArray: PlayerProjectile[] = _playerProjectiles.getChildren() as PlayerProjectile[];

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
                        if (ufosArray[k].health < 1 && ! this.healthPackSpawnChance())
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

        public handleMovement(_speed: number): void {            
            let asteroidsArray: Asteroid[] = this.asteroids.getChildren() as Asteroid[];
            let ufosArray: UFO[] = this.ufos.getChildren() as UFO[];
            const enemyOffset: number = _speed * ƒ.Loop.timeFrameReal / 1000;

            //iterate through all asteroids and move them
            for (let i = 0; i < asteroidsArray.length; i++) {
                const asteroidPos: ƒ.Vector2 = asteroidsArray[i].getPos();
                
                if (asteroidPos.x <= this.deleteAt) { //delete enemy if outside of screen
                    this.asteroids.removeChild(asteroidsArray[i]);
                }
                else {
                    asteroidsArray[i].moveBy(new ƒ.Vector2(-enemyOffset, 0));
                }
            }

            //iterate through all ufos and move them
            for (let j = 0; j < ufosArray.length; j++) {
                const ufoPos: ƒ.Vector2 = ufosArray[j].getPos();
                
                if (ufoPos.x <= this.deleteAt) { //delete enemy if outside of screen
                    this.ufos.removeChild(ufosArray[j]);
                }
                else {
                    ufosArray[j].moveBy(new ƒ.Vector2(-enemyOffset, 0));
                } 
            }
        }

        public handleFiring(_projectiles: EnemyProjectiles): void {
            let ufosArray: UFO[] = this.ufos.getChildren() as UFO[];
            
            if (this.counter ==  this.counterMax) {
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

    class Asteroid extends BaseEntity {
        constructor(_x: number, _y: number, _health: number, _soundPath: string) {
            super (_x, _y, 1, 1, "Asteroid", _health, "./textures/enemy_asteroid.png", _soundPath);
            if(this.sound.volume) {
                this.sound.volume = 1;
            }
        }
    }

    export class UFO extends BaseEntity {
        constructor(_x: number, _y: number, _health: number, _soundPath: string) {
            super (_x, _y, 1.6, 1, "UFO", _health, "./textures/enemy_ufo.png", _soundPath);
            if(this.sound.volume) {
                this.sound.volume = 1;
            }
        }
    }
}