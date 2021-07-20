namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class EnemyType00 extends BaseEntity {
        constructor(_number: number,_x: number, _y: number) {
            super (_x, _y, 1, 1, "EnemyType00 No" + _number, "./textures/enemy_asteroid.png");
        }
    }

    export class EnemyType01 extends BaseEntity {
        constructor(_number: number,_x: number, _y: number) {
            super (_x, _y, 1.6, 1, "EnemyType00 No" + _number, "./textures/enemy_ufo.png");
        }
    }
}