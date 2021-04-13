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
            let playerProjectile: Projectile = playerProjectileNode.getChild(0) as Projectile;

            //remove projectile when out of screen
            if (playerProjectileNode.getChild(0).mtxLocal.translation.y >= playerProjectilePosMax) {
                playerProjectileNode.removeChild(playerProjectileNode.getChild(0));
                playerFiring = false;
            }
            //remove projectile when invader hit
            else if (invadersNode.handleAllInvadersHit(playerProjectile)) {
                playerProjectileNode.removeChild(playerProjectile);
                playerFiring = false;
            }
            //move projectile
            else {
                // playerProjectileNode.getChild(0).mtxLocal.translateY(projectileOffset);
                playerProjectile.moveNode(0, projectileOffset);
            }
        }
    }
}