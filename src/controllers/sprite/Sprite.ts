import { BaseController } from 'controllers/base/BaseController';
import { GameObjectProps } from 'controllers/base/GameObject';
import { SingleTile } from 'controllers/base/SingleTile';
import { SpriteData, SpriteProcessor } from 'preprocessors/SpriteProcessor';

export class Sprite extends BaseController {
    private _img: HTMLImageElement;
    private _frames: Map<string, SingleTile> = new Map();
    private _currentFrame?: SingleTile;
    private _scale: number;
    private _collisionBox?: GameObjectProps["collisionBox"]

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

    public setFrame(frameName: string) {
        const frame = this._frames.get(frameName);
        if (!frame) {
            console.error('Frame', frameName, 'not found');
            return this;
        }
        this._currentFrame = frame;
        this._currentFrame.setScale(this._scale);
        this._currentFrame.setCollisionBox(this._collisionBox)

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
        this.currentFrame?.update(timestamp)
        this._currentFrame?.drawTile(this._img);
    }

    public get currentFrame() {
        return this._currentFrame;
    }

    public setCollisionBox(props: GameObjectProps["collisionBox"]) {
        this._collisionBox = props
        this._currentFrame?.setCollisionBox(props)
        return this
    }
}
