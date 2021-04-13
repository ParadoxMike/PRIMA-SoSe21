"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    class BasicHitboxNode extends ƒ.Node {
        constructor(_xPos, _yPos, _xScale, _yScale, _name) {
            super(_name);
            //add transform component and move cover into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_xPos);
            this.mtxLocal.translateY(_yPos);
            //add and possition hitbox rectangle
            this.hitRect = new ƒ.Rectangle(_xPos, _yPos, _xScale, _yScale, ƒ.ORIGIN2D.CENTER);
        }
        checkCollision(_target) {
            return this.hitRect.collides(_target.hitRect);
        }
        moveNode(_x, _y) {
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            this.hitRect.position.x = this.mtxLocal.translation.x;
            this.hitRect.position.y = this.mtxLocal.translation.y;
        }
    }
    L02_SpaceInvaders.BasicHitboxNode = BasicHitboxNode;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=BasicHitboxNode.js.map