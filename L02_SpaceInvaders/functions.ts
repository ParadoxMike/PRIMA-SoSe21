namespace L02_SpaceInvaders {
    import ƒ = FudgeCore;

    export function createCovers(coversNode: ƒ.Node): void {
        let xPos: number[] = [-6, -2, 2, 6];
        let yPos: number = 2;

        for (let i: number = 0; i < 4; i++) {
            let cover: ƒ.Node = new Cover(xPos[i], yPos, i);
            coversNode.appendChild(cover);
        }
    }

    export function createInvaders(invadersNode: ƒ.Node): void {
        // iterates for every invader
        let xPos:       number[] = [-7.5, -6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6, 7.5];
        // iterates for every row
        let yPos:       number[] = [10, 8.5, 7, 5.5];

        let rowCnt:     number   = 4;
        let cntPerRow:  number   = 11;
        let cnt:        number   = 0;

        for (let i: number = 0; i < rowCnt; i++) {
            for (let k: number = 0; k < cntPerRow; k++) {
                let invader: ƒ.Node = new Invader(xPos[k], yPos[i], cnt);
                invadersNode.appendChild(invader);
                cnt++;
            }
        }
    }
}