namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class HealthPacks extends ƒ.Node {
        constructor() {
            super("HealthPacks");

        }

        public spawnHealthPack(_enemyObject: BaseEntity): void {
            this.addChild(new HealthPack(_enemyObject.mtxLocal.translation.x, _enemyObject.mtxLocal.translation.y));
        }

        public handleCollisionWithPlayer(_target: Player): void {
            let healthPacksArray: HealthPack[] = this.getChildren() as HealthPack[];

            //iterate through all health packs and check collision with player
            for (let j = 0; j < healthPacksArray.length; j++) {
                if (_target.checkCollision(healthPacksArray[j])) {

                    //increase health by 1 for player and decrease by one for health pack
                    _target.health++;
                    healthPacksArray[j].health--;

                    //run checkHealth for both
                    _target.checkHealth();
                    healthPacksArray[j].checkHealth();
                }
                
            }
        }
    }

    export class HealthPack extends BaseEntity {
        constructor(_x: number, _y: number) {
            super (_x, _y, 1, 1, "HealthPack", 1, "./textures/health_pack.png");
        }
    }
}