"use strict";
var L02_SpaceInvaders;
(function (L02_SpaceInvaders) {
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
})(L02_SpaceInvaders || (L02_SpaceInvaders = {}));
//# sourceMappingURL=functions.js.map