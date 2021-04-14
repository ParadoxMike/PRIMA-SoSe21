namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;
    
    export class BasicHitboxNode extends ƒ.Node {
        public hitRect: ƒ.Rectangle;

        constructor(_xPos: number, _yPos: number, _xScale: number, _yScale: number, _name: string) {
            super(_name);
            
            //add transform component and move cover into possiton
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_xPos);
            this.mtxLocal.translateY(_yPos);

            //add and possition hitbox rectangle
            this.hitRect = new ƒ.Rectangle(_xPos, _yPos, _xScale, _yScale, ƒ.ORIGIN2D.CENTER);
        }

        public checkCollision(_target: BasicHitboxNode): boolean {
            return this.hitRect.collides(_target.hitRect);
        }

        public moveNode(_x: number, _y: number): void {
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            this.hitRect.position.x = this.mtxLocal.translation.x - this.hitRect.size.x / 2;
            this.hitRect.position.y = this.mtxLocal.translation.y - this.hitRect.size.y / 2;
        }
    }
}