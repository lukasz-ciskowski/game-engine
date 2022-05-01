import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { Animator } from 'controllers/core/Animator';
import { MapImage } from 'controllers/map/MapImage';
import { Player } from './Player';

export class HelperQuestionmark extends BaseController {
    private readonly _animator: Animator = new Animator();
    private _ekey: MapImage;

    constructor(private readonly _questionImg: MapImage, private readonly _triggers: SingleTile[]) {
        super();

        const liftUp = Array.from({ length: 5 }).map(() => () => this._questionImg.move(0, 0.8));
        const liftDown = Array.from({ length: 5 }).map(() => () => this._questionImg.move(0, -0.8));
        this._animator.add('lift', {
            animation: [...liftUp, ...liftDown],
            delay: 15,
        });

        this._animator.setup('lift');
    }

    async load() {
        if (!this.game.currentScene) return;
        this._ekey = await this.game.currentScene.addImage("ekey", { x: 300, y: 300 });
    }

    update(timestamp: number): void {
        this._animator.play(timestamp)?.animation();

        if (this._triggers.some((t) => t.isColliding === Player.instance.sprite)) {
            if (this.game.cursor.keyboard.e.isPressed) {
            } else {
                // InteractKey.instance.show();
            }
        } else {
            // InteractKey.instance.hide();
        }
    }
}
