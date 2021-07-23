namespace DoodleSpace {
    import ƒ = FudgeCore;

    export function updateUI(_player: Player): void {
        document.getElementById("health").innerHTML = _player.health.toString(); //update Health display
    }
    
}