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
            let playerProjectile = playerProjectileNode.getChild(0);
            //remove projectile when out of screen
            if (playerProjectileNode.getChild(0).mtxLocal.translation.y >= playerProjectilePosMax) {
                playerProjectileNode.removeChild(playerProjectileNode.getChild(0));
                L02_SpaceInvaders.playerFiring = false;
            }
            //remove projectile when invader hit
            else if (L02_SpaceInvaders.invadersNode.handleAllInvadersHit(playerProjectile)) {
                playerProjectileNode.removeChild(playerProjectile);
                L02_SpaceInvaders.playerFiring = false;
            }
            //move projectile
            else {
                // playerProjectileNode.getChild(0).mtxLocal.translateY(projectileOffset);
                playerProjectile.moveNode(0, projectileOffset);
            }
        }
    }
    L02_SpaceInvaders.handlePlayerProjectile = handlePlayerProjectile;
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=functions.js.map