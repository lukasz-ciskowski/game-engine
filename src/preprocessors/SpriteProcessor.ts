import path from 'path';
import { loadImgAsync } from 'utils/imageLoader';

interface SpriteData {
    frames: Record<string, SpriteFrame>;
    meta: SpriteMeta;
}

interface SpriteFrame {
    frame: { x: number; y: number; w: number; h: number };
    pivot: { x: number; y: number };
}

interface SpriteMeta {
    image: string;
}

export class SpriteProcessor {
    private metaImage: HTMLImageElement
    constructor(private readonly _sprite: SpriteData) {}

    public async loadMetadata(src: string) {
        const dir = path.dirname(src);
        this.metaImage = await loadImgAsync(path.join(dir, this._sprite.meta.image));
    }
}
