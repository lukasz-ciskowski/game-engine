import { BaseController } from 'controllers/base/BaseController';
import { SingleTile } from 'controllers/base/SingleTile';
import { Player } from 'objects/Player';
import { InteractKey } from './InteractKey';
import { QuestionMark } from './QuestionMark';

interface ObjectProperties {
    hideInteractionKey?: boolean;
    showQuestionMark?: boolean;
}

export class InteractiveObject extends BaseController {
    private readonly _interactKey: InteractKey;
    private readonly _questionMark: QuestionMark;

    constructor(
        private readonly _triggers: SingleTile[],
        private readonly _onInteract: (timestamp: number) => void,
        private readonly _options?: ObjectProperties,
    ) {
        super();
        this._interactKey = new InteractKey();
        if (this._options?.showQuestionMark) this._questionMark = new QuestionMark(_triggers);
    }

    async load() {
        await this.game.currentScene.addController(this._interactKey);
        if (this._options?.showQuestionMark) await this.game.currentScene.addController(this._questionMark);
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
