import { Scene } from 'controllers/Scene';
import { InteractKey } from 'objects/InteractKey';
import { Player } from 'objects/Player';

export class LoadingScene extends Scene {
    public async preload() {
        await this.game.fileManager.readConfig('/assets/config.json');
        this.game.setScale(3);

        await new InteractKey().load();

        // await new Promise((res) => setTimeout(res, 2000));
    }

    load() {
        this.game.loadScene('ResumeHouse');
    }
}
