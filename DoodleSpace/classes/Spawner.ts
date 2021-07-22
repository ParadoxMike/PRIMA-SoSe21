namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Spawner {
        private spawnLimitTop: number = 11.5;
        private spawnLimitBottom: number = -11.5;
        private spawnAtX: number = 35;
        private counter: number = 0;
        private counterMax: number;
        private fps: number;

        constructor(_fps: number, _spawnsPerSecond: number) {
            this.fps = _fps;
            this.counterMax = Math.floor(this.fps / _spawnsPerSecond);
        }

        public adjustSpawnrate(_spawnsPerSecond: number): void {
            this.counterMax = Math.floor(this.fps / _spawnsPerSecond);
        }

        private randomPos(): number {
            return Math.floor(Math.random() * (this.spawnLimitTop - this.spawnLimitBottom + 1)) + this.spawnLimitBottom;
        }

        private randomizeEnemy(): number {
            return Math.floor(Math.random() * 2);
        }

        public spawnEnemy(_enemies: Enemies): void {
            if (this.counter ==  this.counterMax) {
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
}