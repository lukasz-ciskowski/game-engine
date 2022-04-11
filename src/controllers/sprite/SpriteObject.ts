import { SingleTile } from 'controllers/base/SingleTile';
import { Animator } from 'controllers/core/Animator';
import { SpriteData, SpriteProcessor } from 'preprocessors/SpriteProcessor';
import { Frame } from './helpers/Frame';

export class SpriteObject extends SingleTile {
    private _frames: Map<string, Frame> = new Map();
    private _img: HTMLImageElement;
    private _animator = new Animator();

    constructor(private readonly _spriteData: SpriteData, private readonly _dirLocation: string) {
        // there is no frame in the beginning so there is no position at start
        super({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            crop: {
                x: 0,
                y: 0,
            },
        });
    }

    public async load() {
        const img = await SpriteProcessor.loadMetadata(this._spriteData, this._dirLocation);
        if (!img) {
            console.error('Sprite image not found');
            return;
        }

        this._img = img;
        this._frames = SpriteProcessor.getFrames(this._spriteData);
    }

    public playAnimation(animationName: string) {
        const animation = this._animator.setup(animationName);
        if (!animation) {
            return this;
        }

        this.setFrame(animation.frame);
    }

    private setFrame(frameName: string) {
        const frame = this._frames.get(frameName);
        if (!frame) {
            console.error('Frame', frameName, 'not found');
            return this;
        }

        this.setSize({ width: frame.props.w, height: frame.props.h });
        this.setCrop({ x: frame.props.x, y: frame.props.y });

        return this;
    }

    public toMiddle() {
        return this.setPosition(
            (this.game.canvas.width / 2 - this.origin.w) / this.game.scale + this.game.camera.x,
            (this.game.canvas.height / 2 - this.origin.h) / this.game.scale + this.game.camera.y,
        );
    }

    update(timestamp: number): void {
        this.drawTile(this._img);

        const nextAnimator = this._animator.play();
        if (!nextAnimator) return;
        this.setFrame(nextAnimator.frame);
    }

    public get animator() {
        return this._animator;
    }
}
