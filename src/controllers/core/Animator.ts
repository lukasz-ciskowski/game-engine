interface AnimationConfig<T> {
    delay?: number;
    frames: (() => T)[];
    variant: AnimationVariant;
}

type AnimationVariant = 'infinite' | 'linear';

export interface CurrentAnimation<T> {
    name: string;
    animation: () => T;
    config: AnimationConfig<T>;
    index: number;
    duration: number;
}

export class Animator<T = void> {
    protected _animations: Map<string, AnimationConfig<T>> = new Map();
    protected _current?: CurrentAnimation<T>;

    public add(name: string, config: AnimationConfig<T>) {
        this._animations.set(name, config);
    }

    public setup(name: string) {
        if (name === this._current?.name) return this._current;

        const currentAnimation = this._animations.get(name);
        if (!currentAnimation) throw new Error('Animation not found');

        this._current = {
            name,
            animation: currentAnimation.frames[0],
            config: currentAnimation,
            index: 0,
            duration: 0,
        };
        return this._current;
    }

    public play(timestamp: number): CurrentAnimation<T> | undefined {
        if (!this._current) return undefined;

        const { index, config } = this._current;
        const { delay, frames, variant } = config;

        if (!delay) return undefined;
        if (frames.length === 1) return this._current;
        const isLastFrame = frames.length <= index + 1;

        if (isLastFrame && variant === 'linear') return this._current;

        this._current.duration += 100 * timestamp;
        if (this._current.duration > delay) {
            this._current.index = isLastFrame ? 0 : index + 1;
            this._current.animation = frames[this._current.index];

            this._current.duration = 0;
            return this._current;
        }
    }

    public get current() {
        return this._current;
    }
}
