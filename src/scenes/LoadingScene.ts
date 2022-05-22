import { Scene } from 'controllers/Scene';
import { Player } from 'objects/Player';

export class LoadingScene extends Scene {
    public async preload() {
        await this.game.fileManager.readConfig('/assets/config.json');
        this.game.setScale(3);

        // await new Promise((res) => setTimeout(res, 2000));
    }

    async load() {
        Player.init();
        await this.game.loadScene("ResumeHouse");
    }
}
