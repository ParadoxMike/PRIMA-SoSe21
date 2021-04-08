"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
    var ƒ = FudgeCore;
    function createCovers(coversNode) {
        let xPos = [-6, -2, 2, 6];
        let yPos = 2;
        for (let i = 0; i < 4; i++) {
            let cover = new L02_SpaceInvaders.Cover(xPos[i], yPos, i);
            coversNode.appendChild(cover);
        }
    }
    L02_SpaceInvaders.createCovers = createCovers;
    function createInvaders(invadersNode) {
        // iterates for every invader
        let xPos = [-7.5, -6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6, 7.5];
        // iterates for every row
        let yPos = [10, 8.5, 7, 5.5];
        let rowCnt = 4;
        let cntPerRow = 11;
        let cnt = 0;
        for (let i = 0; i < rowCnt; i++) {
            for (let k = 0; k < cntPerRow; k++) {
                let invader = new L02_SpaceInvaders.Invader(xPos[k], yPos[i], cnt);
                invadersNode.appendChild(invader);
                cnt++;
            }
        }
    }
    L02_SpaceInvaders.createInvaders = createInvaders;
    function handlePlayerMovement(player, playerMovementCurrent) {
        let playerOffset = L02_SpaceInvaders.gameSpeed * ƒ.Loop.timeFrameReal / 1000;
        let playerMovementMax = 8.5;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]) && playerMovementCurrent >= -playerMovementMax) {
            player.mtxLocal.translateX(-playerOffset);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && playerMovementCurrent <= playerMovementMax) {
            player.mtxLocal.translateX(+playerOffset);
        }
    }
    L02_SpaceInvaders.handlePlayerMovement = handlePlayerMovement;
    function handlePlayerProjectile(playerProjectileNode, playerMovementCurrent) {
        let playerProjectilePosMax = 13.5;
        let projectileOffset = L02_SpaceInvaders.gameSpeed * ƒ.Loop.timeFrameReal / 500;
        //create new projectile
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]) && !L02_SpaceInvaders.playerFiring) {
            playerProjectileNode.addChild(new L02_SpaceInvaders.Projectile(playerMovementCurrent, 0, "Player"));
            L02_SpaceInvaders.playerFiring = true;
        }
        if (L02_SpaceInvaders.playerFiring) {
            //remove projectile
            if (playerProjectileNode.getChild(0).mtxLocal.translation.y >= playerProjectilePosMax) {
                playerProjectileNode.removeChild(playerProjectileNode.getChild(0));
                L02_SpaceInvaders.playerFiring = false;
            }
            //move projectile
            else {
                playerProjectileNode.getChild(0).mtxLocal.translateY(projectileOffset);
            }
        }
    }
    L02_SpaceInvaders.handlePlayerProjectile = handlePlayerProjectile;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=functions.js.map