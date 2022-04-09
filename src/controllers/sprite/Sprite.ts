import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { SpriteData, SpriteProcessor } from 'preprocessors/SpriteProcessor';

export class Sprite extends BaseController {
    private _img: HTMLImageElement;
    private _frames: Map<string, SingleTile> = new Map();
    private _currentFrame?: SingleTile;
    private _scale: number;

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
        return this;
    }

    public setScale(scale: number) {
        this._scale = scale;
        return this;
    }

    public toMiddle() {
        this._currentFrame
            ?.setScale(this._scale)
            .setPosition(
                (this.game.canvas.width / 2 - this._currentFrame.origin.w) / this.game.scale + this.game.camera.x,
                (this.game.canvas.height / 2 - this._currentFrame.origin.h) / this.game.scale + this.game.camera.y,
            );
        return this;
    }

    update(timestamp: number): void {
        this._currentFrame?.drawTile(this._img);
    }

    public move(axis: { x?: number; y?: number }) {
        this._currentFrame?.setPosition(
            this._currentFrame.object.x + (axis.x || 0),
            this._currentFrame.object.y + (axis.y || 0),
        );
    }
}
