import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { CameraPosition } from 'core/Camera';
import { InteractiveObject } from 'objects/helpers/InteractiveObject';

export class Portal extends BaseController {
    private readonly _interaction: InteractiveObject;
    constructor(
        _triggers: SingleTile[],
        private readonly _sceneToLoad: string,
        private readonly _cameraNextPosition?: CameraPosition,
    ) {
        super();

        this._interaction = new InteractiveObject(_triggers, () => this.portalToScene());
    }

    async load() {
        await this.game.currentScene.addController(this._interaction);
    }

    private async portalToScene() {
        await this.game.loadScene(this._sceneToLoad);
        if (this._cameraNextPosition) {
            this.game.camera.setPosition(this._cameraNextPosition);
        }
    }
}
