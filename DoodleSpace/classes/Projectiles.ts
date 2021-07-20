namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class ProjectilePlayer extends BaseEntity {
        constructor(_number: number,_x: number, _y: number) {
            super (_x, _y, 1, 0.22, "ProjectilePlayer No" + _number, "./textures/projectile.png");
        }
    }

    export class ProjectileEnemy extends BaseEntity {
        constructor(_number: number,_x: number, _y: number) {
            super (_x, _y, 1, 0.22, "ProjectileEnemy No" + _number, "./textures/projectile.png");
        }
    }
}