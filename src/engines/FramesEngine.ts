import { GameObject } from 'controllers/base/GameObject';

interface Keyframe {
    move?: { x: number; y: number };
    opacity?: number;
}

interface FramesOptions {
    keyframes: Keyframe[];
    transition: number;
    fillMode: 'forwards' | 'backwards' | 'both';
}

export class FramesEngine {
    constructor(private readonly _object: GameObject, private readonly _options: FramesOptions) {}

    public generate(): (() => void)[] {
        const resultFrames: (() => void)[] = [];

        if (this._options.fillMode !== 'both') resultFrames.push(...this.generateKeyFrames(this._options.fillMode));
        else {
            resultFrames.push(...this.generateKeyFrames('forwards'), ...this.generateKeyFrames('backwards'));
        }

        return resultFrames;
    }

    private generateKeyFrames(order: 'forwards' | 'backwards') {
        const resultFrames: (() => void)[] = [];

        const toRender = order === 'forwards' ? this._options.keyframes : this._options.keyframes.slice().reverse();        
        toRender.forEach((frame, index) => {
            const nextFrame = toRender[index + 1];
            if (!nextFrame) return;

            resultFrames.push(...this.compareFrames(frame, nextFrame, order));
        });
        return resultFrames;
    }

    private compareFrames(frame: Keyframe, nextFrame: Keyframe, order: 'forwards' | 'backwards') {
        const resultFrames: (() => void)[] = [];
        for (let i = 1; i <= this._options.transition; i++) {
            const multiplication = order === 'forwards' ? 1 : -1;
            const singleFrame = this.generateMethods(frame, nextFrame, multiplication);
            resultFrames.push(() => singleFrame.forEach((fn) => fn()));
        }
        return resultFrames;
    }

    private generateMethods(frame: Keyframe, nextFrame: Keyframe, multiplication: number) {
        const singleFrame: (() => void)[] = [];
        if (frame.move && nextFrame.move) {
            const xDiff = this.diff(frame.move.x, nextFrame.move.x) * multiplication;
            const yDiff = this.diff(frame.move.y, nextFrame.move.y) * multiplication;
            
            singleFrame.push(() => this._object.move(xDiff, yDiff));
        }

        return singleFrame;
    }

    private diff(curr: number, next: number) {
        if (next < curr) return (curr - next) / this._options.transition;
        else return (next - curr) / this._options.transition;
    }
}
