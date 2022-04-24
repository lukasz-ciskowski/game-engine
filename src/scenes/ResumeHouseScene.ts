import { GameMap } from 'controllers/map/GameMap';
import { MapImage } from 'controllers/map/MapImage';
import { Tileset } from 'controllers/map/Tileset';
import { Scene } from 'controllers/Scene';
import { SpriteObject } from 'controllers/sprite/SpriteObject';
import { HelperQuestionmark } from 'objects/HelperQuestionmark';
import { HouseEntry } from 'objects/HouseEntry';
import { Player } from 'objects/Player';

export class ResumeHouseScene extends Scene {
    private _map: GameMap;
    private _player: Player;
    private _playerSprite: SpriteObject;
    private _mainTileset: Tileset;
    private _questionMark: MapImage;

    constructor() {
        super('ResumeHouse');
    }

    public async load() {
        const map = await this.loadTileMapJSON('resume-house');
        await map.addTileset('indoor', 'indoor-tileset', 1.5);
        const questionMark = await this.addImage("question", { x: 354, y: 125, scale: 0.5 });

        map.createLayers(['floor'], 'indoor');
        const collisions = map.createLayers(['furniture', 'walls'], 'indoor');
        const doors = map.createLayers(['door'], 'indoor');
        const shelfes = map.createLayers(['shelfes'], 'indoor');

        const playerSprite = await this.addSprite("player")
        const player = new Player(playerSprite)
        this.queue.addController(player);

        this.collisions.addCollisions([[...collisions, ...doors, ...shelfes], [playerSprite]]);
        this.queue.addController(new HouseEntry(doors, 'Main'));
        this.queue.addController(questionMark);
        this.queue.addController(new HelperQuestionmark(questionMark, shelfes));

        this.game.camera.setPosition(248, 220);
        this.game.camera.setBounds([
            [150, 100],
            [600, 550],
        ]);
    }
}
