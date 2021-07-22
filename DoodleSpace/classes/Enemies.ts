namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Enemies extends ƒ.Node {
        private deleteAt: number = -1;
        private asteroids: ƒ.Node;
        private ufos: ƒ.Node;

        constructor() {
            super("Enemies");

            //init sub nodes
            this.asteroids = new ƒ.Node("Ateroids");
            this.ufos = new ƒ.Node("UFOs");
            //add as children
            this.addChild(this.asteroids);
            this.addChild(this.ufos);
        }

        public spawnAsteroid(_atPos: ƒ.Vector2): void {
            this.asteroids.addChild(new Asteroid(_atPos.x, _atPos.y));
        }

        public spawnUFO(_atPos: ƒ.Vector2): void {
            this.ufos.addChild(new UFO(_atPos.x, _atPos.y));
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

        public handleCollisionWithPlayerProjectiles(playerProjectiles: PlayerProjectiles): void {
            //setup working arrays
            let asteroidsArray: Asteroid[] = this.asteroids.getChildren() as Asteroid[];
            let ufosArray: UFO[] = this.ufos.getChildren() as UFO[];
            let projectilesArray: PlayerProjectile[] = playerProjectiles.getChildren() as PlayerProjectile[];

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
    }

    class Asteroid extends BaseEntity {
        constructor(_x: number, _y: number) {
            super (_x, _y, 1, 1, "Asteroid", 1, "./textures/enemy_asteroid.png");
        }
    }

    class UFO extends BaseEntity {
        constructor(_x: number, _y: number) {
            super (_x, _y, 1.6, 1, "UFO", 1, "./textures/enemy_ufo.png");
        }
    }
}