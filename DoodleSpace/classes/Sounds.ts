namespace DoodleSpace {
    import ƒ = FudgeCore;

    export enum SFXs {
        backgroundMusic,
        playerHit,
        enemyHit,
        shot,
        hpUp
    }

    export class Sounds {
        private audioBackgroundMusic: ƒ.Audio;
        private cmpAudioBackgroundMusic: ƒ.ComponentAudio;

        private audioPlayerHit: ƒ.Audio;
        private cmpAudioPlayerHit: ƒ.ComponentAudio;

        private audioEnemyHit: ƒ.Audio;
        private cmpAudioEnemyHit: ƒ.ComponentAudio;

        private audioShot: ƒ.Audio;
        private cmpAudioShot: ƒ.ComponentAudio;

        private audioHpUp: ƒ.Audio;
        private cmpAudioHpUp: ƒ.ComponentAudio;

        constructor(){
            this.audioBackgroundMusic = new ƒ.Audio("./sounds/background_music.mp3");
            this.cmpAudioBackgroundMusic = new ƒ.ComponentAudio(this.audioBackgroundMusic, true, false);
            this.cmpAudioBackgroundMusic.connect(true);
            // this.cmpAudioBackgroundMusic.volume = 1;
        }

        public backgroundMusic(_trueFalse: boolean): void {
            this.cmpAudioBackgroundMusic.play(_trueFalse);
        }
    }    
}