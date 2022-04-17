import { Game } from 'core/Game';
import { LoadingScene } from 'scenes/LoadingScene';
import { MainScene } from 'scenes/MainScene';
import { ResumeHouseScene } from 'scenes/ResumeHouseScene';

window.addEventListener('load', () => {
    Game.init({
        id: 'game',
        width: 1024,
        height: 700,
        scenes: [LoadingScene, MainScene, ResumeHouseScene],
        debug: false
    });
});
