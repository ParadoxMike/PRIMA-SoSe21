namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Player extends BaseEntity {
        constructor(_x: number, _y: number) {
            super (_x, _y, 1, 1, "Player");
        }
    }
}