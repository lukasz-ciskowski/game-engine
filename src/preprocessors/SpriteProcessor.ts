import { Frame } from 'controllers/sprite/helpers/Frame';
import path from 'path';
import { loadImgAsync } from 'utils/imageLoader';

export interface SpriteData {
    frames: Record<string, SpriteFrame>;
    meta: SpriteMeta;
}

interface SpriteFrame {
    frame: { x: number; y: number; w: number; h: number };
    pivot: { x: number; y: number };
}

interface SpriteMeta {
    image: string;
    size: {
        w: number;
        h: number;
    };
}

export class SpriteProcessor {
    public static async loadMetadata(spriteData: SpriteData, src: string) {
        const dir = path.dirname(src);
        return await loadImgAsync(path.join(dir, spriteData.meta.image));
    }

    public static getTiles(data: SpriteData): Map<string, Frame> {
        return Object.entries(data.frames).reduce<Map<string, Frame>>((acc, [frame, data]) => {
            acc.set(
                frame,
                new Frame({
                    x: data.frame.x,
                    y: data.frame.y,
                    w: data.frame.w,
                    h: data.frame.h,
                }),
            );
            return acc;
        }, new Map());
    }
}
