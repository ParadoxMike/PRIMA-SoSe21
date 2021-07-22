namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Enemies extends ƒ.Node {
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

        }

        public handleCollisionWithPlayerProjectiles(playerProjectiles: PlayerProjectiles): void {
            let asteroidsArray: Asteroid[] = this.asteroids.getChildren() as Asteroid[];
            let ufosArray: UFO[] = this.ufos.getChildren() as UFO[];
            let projectilesArray: PlayerProjectile[] = playerProjectiles.getChildren() as PlayerProjectile[];

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