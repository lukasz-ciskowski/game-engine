interface AnimationConfig<T> {
    delay?: number;
    fn: (() => T)[];
}

export class Animator<T = void> {
    protected _animations: Map<string, AnimationConfig<T>> = new Map();
    protected _current?: { name: string; fn: () => T; config: AnimationConfig<T>; index: number; duration: number };

    public add(name: string, config: AnimationConfig<T>) {
        this._animations.set(name, config);
    }

    public setup(name: string) {
        if (name === this._current?.name) return this._current;

        const currentAnimation = this._animations.get(name);
        if (!currentAnimation) {
            console.error('Animation', currentAnimation, 'not found');
            return this._current;
        }
        this._current = {
            name,
            fn: currentAnimation.fn[0],
            config: currentAnimation,
            index: 0,
            duration: 0,
        };
        return this._current;
    }

    public play(timestamp: number) {
        if (!this.current?.config.delay) return null;
        
        this.current.duration += 100 * timestamp;
        if (this._current && this._current.config.delay && this.current.duration > this._current.config.delay) {
            this._current.index =
                this._current.config.fn.length <= this._current.index + 1 ? 0 : this._current.index + 1;
            this._current.fn = this._current.config.fn[this._current.index];
            
            this._current.duration = 0;
            return this._current;
        }
    }

    public get current() {
        return this._current;
    }
}
