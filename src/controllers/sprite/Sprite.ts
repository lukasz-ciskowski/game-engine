import { BaseController } from 'controllers/base/BaseController';
import { GameObjectProps } from 'controllers/base/GameObject';
import { SingleTile } from 'controllers/base/SingleTile';
import { Animator } from 'controllers/core/Animator';
import { SpriteData, SpriteProcessor } from 'preprocessors/SpriteProcessor';

export class Sprite extends BaseController {
    private _img: HTMLImageElement;
    private _frames: Map<string, SingleTile> = new Map();
    private _currentFrame?: SingleTile;
    private _scale: number;
    private _collisionBox?: GameObjectProps['collisionBox'];

    private _animator = new Animator();

    constructor(private readonly _spriteData: SpriteData, private readonly _dirLocation: string) {
        super();
    }

    async load() {
        const img = await SpriteProcessor.loadMetadata(this._spriteData, this._dirLocation);
        if (!img) {
            console.error('Sprite image not found');
            return;
        }

        this._img = img;
        this._frames = SpriteProcessor.getFrames(this._spriteData);
    }

    public playAnimation(animationName: string) {
        const animation = this.animator.play(animationName);
        if (!animation) {
            return this;
        }

        this.setFrame(animation.frame);
    }

    public setFrame(frameName: string) {
        const frame = this._frames.get(frameName);
        if (!frame) {
            console.error('Frame', frameName, 'not found');
            return this;
        }
        const prevFrame = this._currentFrame || frame;

        if (!prevFrame) return
        
        console.log("new frame");
        
        console.log(this._scale);
        
        this._currentFrame = new SingleTile({
            x: prevFrame._object.x,
            y: prevFrame._object.y,
            width: prevFrame._object.width,
            height: prevFrame._object.height,
            collisionBox: this._collisionBox,
            crop: frame.cropProps,
            scale: this._scale
        });

        return this;
    }

    public setScale(scale: number) {
        this._scale = scale;
        return this;
    }

    public toMiddle() {
        return this._currentFrame?.setPosition(
            (this.game.canvas.width / 2 - this._currentFrame.origin.w) / this.game.scale + this.game.camera.x,
            (this.game.canvas.height / 2 - this._currentFrame.origin.h) / this.game.scale + this.game.camera.y,
        );
    }

    public setPosition(x: number, y: number) {
        return this._currentFrame?.setPosition(x, y);
    }

    update(timestamp: number): void {
        this._currentFrame?.drawTile(this._img);

        if (this.animator.current?.config.speed && !this.currentFrame?.isColliding) {
            if (Math.floor(timestamp) % this.animator.current.config.speed === 0) {
                const nextAnimator = this.animator.playNext();
                if (!nextAnimator) return;
                this.setFrame(nextAnimator.frame);
            }
        }
    }

    public get currentFrame() {
        return this._currentFrame;
    }

    public get animator() {
        return this._animator;
    }

    public setCollisionBox(props: GameObjectProps['collisionBox']) {
        this._collisionBox = props
        return this;
    }
}
