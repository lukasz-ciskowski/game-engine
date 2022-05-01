import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { InteractiveObject } from 'objects/helpers/InteractiveObject';

export class Portal extends BaseController {
    private readonly _interaction: InteractiveObject;
    constructor(_triggers: SingleTile[], private readonly _sceneToLoad: string) {
        super();

        this._interaction = new InteractiveObject(_triggers, () => this.loadScene());
    }

    async load() {
        await this.game.currentScene.queue.addController(this._interaction);
    }

    private loadScene() {
        this.game.loadScene(this._sceneToLoad);
    }
}
