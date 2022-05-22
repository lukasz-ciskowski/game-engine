import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { Animator } from 'controllers/core/Animator';
import { MapImage } from 'controllers/map/MapImage';
import { FramesEngine } from 'engines/FramesEngine';

const MARGIN = 15;

export class QuestionMark extends BaseController {
    private readonly _animator: Animator = new Animator();
    private _img: MapImage;

    constructor(private readonly _triggers: SingleTile[]) {
        super();
    }

    async load() {
        this._img = await this.game.currentScene.addImage('question', { x: 0, y: 0 });
        this._img.setScale(0.35);

        const position = this.getPosAboveTriggers();
        this._img.setPosition(position.x, position.y);

        this._animator.add('lift', {
            frames: new FramesEngine(this._img, {
                keyframes: [
                    {
                        move: { x: 0, y: 2 },
                    },
                    {
                        move: { x: 0, y: -2 },
                    },
                ],
                transition: 5,
                fillMode: 'both',
            }).generate(),
            delay: 15,
            variant: 'infinite',
        });

        this._animator.setup('lift');
    }

    update(timestamp: number): void {
        this._animator.play(timestamp);
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
