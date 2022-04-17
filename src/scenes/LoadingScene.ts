import { Scene } from 'controllers/Scene';
import { Player } from 'objects/Player';
import { GameCache } from './cache/GameCache';

export class LoadingScene extends Scene {
    public async preload() {
        this.game.setScale(3);

        const playerSprite = await this.addSprite('/assets/player/player.json');
        playerSprite.setScale(0.4).setCollisionBox({ x: 4.5, y: 18, width: 10, height: 8 });
        GameCache.player = new Player(playerSprite);
        this.game.camera.follow(GameCache.player.sprite)

        // await new Promise((res) => setTimeout(res, 2000));
    }

    load() {
        this.game.loadScene('ResumeHouse');
    }
}
