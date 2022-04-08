import { SingleTile } from 'controllers/base/SingleTile';
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

    public static getFrames(data: SpriteData): Map<string, SingleTile> {
        return Object.entries(data.frames).reduce<Map<string, SingleTile>>((acc, [frame, data]) => {
            acc.set(
                frame,
                new SingleTile({
                    crop: {
                        x: data.frame.x,
                        y: data.frame.y,
                    },
                    x: 0,
                    y: 0,
                    width: data.frame.w,
                    height: data.frame.h,
                }),
            );
            return acc;
        }, new Map());
    }
}
