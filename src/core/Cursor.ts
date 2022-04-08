import { BaseController } from 'controllers/base/BaseController';

type Keyboard = Record<'w' | 'a' | 's' | 'd', Event>;

interface Event {
    isPressed: boolean;
}

const DEFAULT: Keyboard = {
    w: { isPressed: false },
    a: { isPressed: false },
    s: { isPressed: false },
    d: { isPressed: false },
};

export class Cursor extends BaseController {
    private _keyboard: Keyboard = DEFAULT;

    constructor() {
        super();
        window.onkeydown = (e) => {
            e.preventDefault();
            this._keyboard = {
                ...DEFAULT,
                [e.key]: { isPressed: true },
            };
        };
        window.onkeyup = (e) => {
            e.preventDefault()
            this._keyboard = {
                ...this._keyboard,
                [e.key]: { isPressed: false }
            }
        }
    }

    public get keyboard() {
        return this._keyboard;
    }
}
