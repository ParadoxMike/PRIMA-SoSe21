namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Spawner {
        private spawnLimitTop: number = 11.5;
        private spawnLimitBottom: number = -11.5;
        private spawnAtX: number = 35;
        private counter: number = 0;
        private counterMax: number;

        constructor(_fps: number, _spawnsPerSecond: number) {
            this.counterMax = Math.floor(_fps / _spawnsPerSecond);
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