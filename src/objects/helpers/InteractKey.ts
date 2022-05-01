import { BaseController } from 'controllers/base/BaseController';
import { MapImage } from 'controllers/map/MapImage';
import { Player } from '../Player';

export class InteractKey extends BaseController {
    private _img: MapImage;

    constructor() {
        super();
    }

    async load() {
        this._img = await this.game.currentScene.addImage('ekey', { x: 0, y: 0 });
    }

    public show() {
        const currentAnim = Player.instance.sprite.animator.currentFrame.name;

        const posY =
            currentAnim === 'down-idle'
                ? Player.instance.sprite.object.y - Player.instance.sprite.pos.height
                : Player.instance.sprite.object.y + Player.instance.sprite.pos.height;

        this._img.setPosition(
            Player.instance.sprite.pos.x + Player.instance.sprite.pos.width / 2 - this._img.pos.width / 2,
            posY,
        );
        this.game.currentScene.queue.addController(this._img);
    }

    public hide() {
        this.game.currentScene.queue.removeController(this._img);
    }
}
