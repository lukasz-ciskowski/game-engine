import { BaseController } from 'controllers/base/BaseController';

type Keyboard = Record<'w' | 'a' | 's' | 'd' | 'e', Event>;

interface Event {
    isPressed: boolean;
}

const DEFAULT: Keyboard = {
    w: { isPressed: false },
    a: { isPressed: false },
    s: { isPressed: false },
    d: { isPressed: false },
    e: { isPressed: false },
};

export class Cursor extends BaseController {
    private _keyboard: Keyboard = DEFAULT;

    private _history: Map<string, Partial<Keyboard>> = new Map();

    constructor() {
        super();
        window.onkeydown = (e) => {
            e.preventDefault();
            this._history.set(e.key, { [e.key]: { isPressed: true } });
        };
        window.onkeyup = (e) => {
            e.preventDefault();
            this._history.delete(e.key);
        };
    }

    public get keyboard() {
        return { ...this._keyboard, ...Array.from(this._history.values()).at(-1) };
    }
}
