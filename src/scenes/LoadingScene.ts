import { Scene } from 'controllers/Scene';

export class LoadingScene extends Scene {
    public async preload() {
        await this.game.fileManager.readConfig('/assets/config.json');
        this.game.setScale(3);

        // await new Promise((res) => setTimeout(res, 2000));
    }

    async load() {
        await this.game.loadScene('Main');
    }
}
