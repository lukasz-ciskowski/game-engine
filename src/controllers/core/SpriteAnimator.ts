import { Animator } from './Animator';

interface AnimationConfig {
    delay?: number;
    frames: string[];
}

export class SpriteAnimator extends Animator<string> {
    public addFrames(name: string, config: AnimationConfig) {
        super.add(name, { ...config, fn: config.frames.map((f) => () => f) });
    }

    public setupFrames(name: string) {
        super.setup(name);
        return this.currentFrame;
    }

    public playFrame(timestamp: number) {
        super.play(timestamp);
        return this.currentFrame
    }

    public get currentFrame() {
        return { ...this._current, frame: this.current?.fn() || '' };
    }
}
