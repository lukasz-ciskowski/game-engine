import { Scene } from 'controllers/Scene';
import { InteractKey } from 'objects/InteractKey';
import { Player } from 'objects/Player';

export class LoadingScene extends Scene {
    public async preload() {
        await this.game.fileManager.readConfig('/assets/config.json');
        this.game.setScale(3);

        const playerSprite = await this.addSprite('player');
        playerSprite.setScale(0.4).setCollisionBox({ x: 4.5, y: 18, width: 10, height: 8 });
        new Player(playerSprite);
        this.game.camera.follow(Player.instance.sprite);

        await new InteractKey().load();

        // await new Promise((res) => setTimeout(res, 2000));
    }

    load() {
        this.game.loadScene('ResumeHouse');
    }
}
