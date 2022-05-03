import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { Animator } from 'controllers/core/Animator';
import { MapImage } from 'controllers/map/MapImage';

const MARGIN = 20;

export class QuestionMark extends BaseController {
    private readonly _animator: Animator = new Animator();
    private _img: MapImage;

    constructor(private readonly _triggers: SingleTile[]) {
        super();
    }

    async load() {
        this._img = await this.game.currentScene.addImage('question', { x: 0, y: 0 });
        this._img.setScale(0.35)

        const position = this.getPosAboveTriggers();
        this._img.setPosition(position.x, position.y);

        const liftUp = Array.from({ length: 5 }).map(() => () => this._img.move(0, 0.8));
        const liftDown = Array.from({ length: 5 }).map(() => () => this._img.move(0, -0.8));
        this._animator.add('lift', {
            animation: [...liftUp, ...liftDown],
            delay: 15,
        });

        this._animator.setup('lift');
    }

    update(timestamp: number): void {
        this._animator.play(timestamp)?.animation();
    }

    /**
     * Try to place the question mark above the triggers in the approx middle
     */
    private getPosAboveTriggers() {
        const sortedByX = this._triggers.map((t) => t.x).sort();
        const sortedByY = this._triggers.map((t) => t.y).sort();

        const minY = sortedByY[0];
        const minX = sortedByX[0];
        const maxX = sortedByX[sortedByX.length - 1];

        return {
            // -2 because of imperfect img
            x: minX + (maxX - minX) / 2 + this._img.center.w - 2,
            y: minY - MARGIN,
        };
    }
}
