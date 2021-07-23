"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    class HealthPacks extends ƒ.Node {
        constructor() {
            super("HealthPacks");
        }
        spawnHealthPack(_enemyObject) {
            this.addChild(new HealthPack(_enemyObject.mtxLocal.translation.x, _enemyObject.mtxLocal.translation.y));
        }
        handleCollisionWithPlayer(_target) {
            let healthPacksArray = this.getChildren();
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
    DoodleSpace.HealthPacks = HealthPacks;
    class HealthPack extends DoodleSpace.BaseEntity {
        constructor(_x, _y) {
            super(_x, _y, 1, 1, "HealthPack", 1, "./textures/health_pack.png");
        }
    }
    DoodleSpace.HealthPack = HealthPack;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=HealthPack.js.map