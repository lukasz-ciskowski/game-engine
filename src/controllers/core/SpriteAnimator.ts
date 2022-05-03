import { Animator, CurrentAnimation } from './Animator';

interface AnimationConfig {
    delay?: number;
    frames: string[];
}

interface CurrentFrameAnimation extends CurrentAnimation<string> {
    frame: string
}

export class SpriteAnimator extends Animator<string> {
    public addFrames(name: string, config: AnimationConfig) {
        super.add(name, { ...config, animation: config.frames.map((f) => () => f) });
    }

    public setupFrames(name: string) {
        super.setup(name);
        return this.currentFrame;
    }

    public play(timestamp: number): CurrentFrameAnimation | undefined {
        super.play(timestamp);
        return this.currentFrame
    }

    public get currentFrame() {
        if (!this._current) return undefined
        return { ...this._current, frame: this.current?.animation() || '' };
    }
}
