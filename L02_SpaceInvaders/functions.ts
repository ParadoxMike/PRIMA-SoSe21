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

    export function handlePlayerMovement(player: Player, playerMovementCurrent: number): void {
        let playerOffset: number = gameSpeed * ƒ.Loop.timeFrameReal / 1000;
        let playerMovementMax: number = 8.5;

        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && playerMovementCurrent >= -playerMovementMax) {
            player.mtxLocal.translateX(-playerOffset);
        }

        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && playerMovementCurrent <= playerMovementMax) {
            player.mtxLocal.translateX(+playerOffset);
        }
    }

    export function handlePlayerProjectile(playerProjectileNode: ƒ.Node, playerMovementCurrent: number): void {
        let playerProjectilePosMax: number = 13.5;
        let projectileOffset: number = gameSpeed * ƒ.Loop.timeFrameReal / 500;
        
        //create new projectile
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]) && !playerFiring) {
            playerProjectileNode.addChild(new Projectile(playerMovementCurrent, 0, "Player"));
            playerFiring = true;
        }

        if (playerFiring) {
            //remove projectile
            if (playerProjectileNode.getChild(0).mtxLocal.translation.y >= playerProjectilePosMax) {
                playerProjectileNode.removeChild(playerProjectileNode.getChild(0));
                playerFiring = false;
            }
            //move projectile
            else {
                playerProjectileNode.getChild(0).mtxLocal.translateY(projectileOffset);
            }
        }
    }
}