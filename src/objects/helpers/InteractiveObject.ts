import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { Player } from 'objects/Player';
import { InteractKey } from './InteractKey';

interface ObjectProperties {
    hideInteractionKey?: boolean;
    showQuestionmark?: boolean;
}

export class InteractiveObject extends BaseController {
    private readonly _interactKey: InteractKey;

    constructor(
        private readonly _triggers: SingleTile[],
        private readonly _onInteract: (timestamp: number) => void,
        private readonly _options?: ObjectProperties,
    ) {
        super();
        this._interactKey = new InteractKey();
    }

    async load() {
        await this.game.currentScene.addController(this._interactKey);
    }

    update(timestamp: number): void {
        if (Player.instance.interactsWith(this._triggers)) {
            if (!this._options?.hideInteractionKey) {
                this._interactKey.show();
            }

            if (this.game.cursor.keyboard.e.isPressed) {
                this._onInteract(timestamp);
            }
        } else {
            this._interactKey.hide();
        }
    }
}
