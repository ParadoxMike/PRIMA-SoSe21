namespace DoodleSpace {
    import ƒ = FudgeCore;

    export class Player extends BaseEntity {
        constructor(_x: number, _y: number) {
            super("Player", new ƒ.Color(0, 1, 0, 1), _x, _y, 1, 1);
        }
    }
}