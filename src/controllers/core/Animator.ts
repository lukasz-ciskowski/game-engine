interface AnimationConfig {
    speed?: number;
    frames: string[];
}

export class Animator {
    private _animations: Map<string, AnimationConfig> = new Map();
    private _current?: { name: string; frame: string; config: AnimationConfig; index: number; duration: number };

    public add(name: string, config: AnimationConfig) {
        this._animations.set(name, config);
    }

    public setup(name: string) {
        if (name === this._current?.name) return false;

        const currentAnimation = this._animations.get(name);
        if (!currentAnimation) {
            console.error('Animation', currentAnimation, 'not found');
            return;
        }
        this._current = {
            name,
            frame: currentAnimation.frames[0],
            config: currentAnimation,
            index: 0,
            duration: 0,
        };
        return this._current;
    }

    public play(timestamp: number) {
        if (!this.current?.config.speed) return null;

        
        this.current.duration += 100 * timestamp;
        if (this._current && this._current.config.speed && this.current.duration > this._current.config.speed) {
            this._current.index =
                this._current.config.frames.length <= this._current.index + 1 ? 0 : this._current.index + 1;
            this._current.frame = this._current.config.frames[this._current.index];
            this._current.duration = 0;
            return this._current;
        }
    }

    public get current() {
        return this._current;
    }
}
