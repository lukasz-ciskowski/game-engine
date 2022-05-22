interface AnimationConfig {
    delay?: number;
    frames: (() => void)[];
    variant: AnimationVariant;
}

type AnimationVariant = 'infinite' | 'single';

export interface CurrentAnimation {
    name: string;
    animation: () => void;
    config: AnimationConfig;
    index: number;
    duration: number;
}

export class Animator<T = void> {
    protected _animations: Map<string, AnimationConfig> = new Map();
    protected _current?: CurrentAnimation;

    public add(name: string, config: AnimationConfig) {
        this._animations.set(name, config);
    }

    public setup(name: string) {
        if (name === this._current?.name) return this._current.animation();

        const currentAnimation = this._animations.get(name);
        if (!currentAnimation) throw new Error('Animation not found');

        this._current = {
            name,
            animation: currentAnimation.frames[0],
            config: currentAnimation,
            index: 0,
            duration: 0,
        };
        return this._current.animation();
    }

    public play(timestamp: number): void | undefined {
        if (!this._current) return undefined;

        const { index, config } = this._current;
        const { delay, frames, variant } = config;

        if (!delay) return undefined;
        if (frames.length === 1) return this._current.animation();
        const isLastFrame = frames.length <= index + 1;

        if (isLastFrame && variant === 'single') return this._current.animation();

        this._current.duration += 100 * timestamp;
        if (this._current.duration > delay) {
            this._current.index = isLastFrame ? 0 : index + 1;
            this._current.animation = frames[this._current.index];

            this._current.duration = 0;
            return this._current.animation();
        }
    }

    public get current() {
        return this._current;
    }
}
