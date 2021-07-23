"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    function updateUI(_player) {
        document.getElementById("health").innerHTML = _player.health.toString(); //update Health display
    }
    DoodleSpace.updateUI = updateUI;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=functions.js.map