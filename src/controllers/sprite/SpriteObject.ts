import { SingleTile } from 'controllers/base/SingleTile';
import { Animator } from 'controllers/core/Animator';
import { SpriteData, SpriteProcessor } from 'preprocessors/SpriteProcessor';
import { Frame } from './helpers/Frame';

interface AnimationConfig {
    delay?: number;
    frames: string[];
}

export class SpriteObject extends SingleTile {
    private _tiles: Map<string, Frame> = new Map();
    private _img: HTMLImageElement;
    private _animator = new Animator();

    constructor(private readonly _spriteData: SpriteData, private readonly _dirLocation: string) {
        super();
    }

    public async load() {
        const img = await SpriteProcessor.loadMetadata(this._spriteData, this._dirLocation);
        if (!img) throw new Error('Sprite image not found');

        this._img = img;
        this._tiles = SpriteProcessor.getTiles(this._spriteData);
    }

    public addTilesAnimation(name: string, config: AnimationConfig) {
        this._animator.add(name, {
            ...config,
            frames: config.frames.map((frame) => () => {
                this.setTile(frame);
            }),
            variant: 'infinite',
        });
    }

    private setTile(frameName: string) {
        const frame = this._tiles.get(frameName);
        if (!frame) throw new Error('Frame not found');

        this.setSize({ width: frame.props.w, height: frame.props.h });
        this.setCrop({ x: frame.props.x, y: frame.props.y });
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

        const nextFrame = this._animator.play(timestamp);
        if (!nextFrame) return;
        this.setTile(nextFrame);
    }

    public get animator() {
        return this._animator;
    }
}
