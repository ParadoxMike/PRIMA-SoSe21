"use strict";
var DoodleSpace;
(function (DoodleSpace) {
    var ƒ = FudgeCore;
    let SFXs;
    (function (SFXs) {
        SFXs[SFXs["backgroundMusic"] = 0] = "backgroundMusic";
        SFXs[SFXs["playerHit"] = 1] = "playerHit";
        SFXs[SFXs["enemyHit"] = 2] = "enemyHit";
        SFXs[SFXs["shot"] = 3] = "shot";
        SFXs[SFXs["hpUp"] = 4] = "hpUp";
    })(SFXs = DoodleSpace.SFXs || (DoodleSpace.SFXs = {}));
    class Sounds {
        constructor() {
            this.audioBackgroundMusic = new ƒ.Audio("./sounds/background_music.mp3");
            this.cmpAudioBackgroundMusic = new ƒ.ComponentAudio(this.audioBackgroundMusic, true, false);
            this.cmpAudioBackgroundMusic.connect(true);
            // this.cmpAudioBackgroundMusic.volume = 1;
        }
        backgroundMusic(_trueFalse) {
            this.cmpAudioBackgroundMusic.play(_trueFalse);
        }
    }
    DoodleSpace.Sounds = Sounds;
})(DoodleSpace || (DoodleSpace = {}));
//# sourceMappingURL=Sounds.js.map