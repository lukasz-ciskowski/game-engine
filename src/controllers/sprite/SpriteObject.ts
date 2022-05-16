import { SingleTile } from 'controllers/base/SingleTile';
import { SpriteAnimator } from 'controllers/core/SpriteAnimator';
import { SpriteData, SpriteProcessor } from 'preprocessors/SpriteProcessor';
import { Frame } from './helpers/Frame';

export class SpriteObject extends SingleTile {
    private _frames: Map<string, Frame> = new Map();
    private _img: HTMLImageElement;
    private _animator = new SpriteAnimator();

    constructor(private readonly _spriteData: SpriteData, private readonly _dirLocation: string) {
        super();
    }

    public async load() {
        const img = await SpriteProcessor.loadMetadata(this._spriteData, this._dirLocation);
        if (!img) throw new Error('Sprite image not found');

        this._img = img;
        this._frames = SpriteProcessor.getFrames(this._spriteData);
    }

    public playAnimation(animationName: string) {
        const animation = this._animator.setupFrames(animationName);
        if (!animation) {
            return this;
        }

        this.setFrame(animation.frame);
    }

    private setFrame(frameName: string) {
        const frame = this._frames.get(frameName);
        if (!frame) throw new Error('Frame not found');

        this.setSize({ width: frame.props.w, height: frame.props.h });
        this.setCrop({ x: frame.props.x, y: frame.props.y });

        return this;
    }

    /**
     * Before each move sprite should be validated if it is not colliding with anything
     */
    public move(moveX: number, moveY: number) {
        const newX = this.x + moveX;
        const newY = this.y + moveY;

        const isColliding = this.game.currentScene?.collisions.isColliding(newX, newY, this);
        if (isColliding) return false;
        this.setPosition(newX, newY);
        return true;
    }

    /**
     * Sets the sprite middle position related to camera position
     */
    public toMiddle() {
        return this.setPosition(
            (this.game.canvas.width / 2 - this.center.w) / this.game.scale + this.game.camera.x,
            (this.game.canvas.height / 2 - this.center.h) / this.game.scale + this.game.camera.y,
        );
    }

    update(timestamp: number): void {
        this.drawTile(this._img);

        const nextAnimator = this._animator.play(timestamp);
        if (!nextAnimator) return;
        this.setFrame(nextAnimator.frame);
    }

    public get animator() {
        return this._animator;
    }
}
