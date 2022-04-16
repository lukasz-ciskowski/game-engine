import { Game } from 'core/Game';
import { MainScene } from 'scenes/MainScene';

window.addEventListener('load', () => {
    Game.init({
        id: 'game',
        width: 1024,
        height: 700,
        scenes: [MainScene],
        debug: true
    });
});
