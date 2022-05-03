import { Scene } from 'controllers/Scene';
import { InteractiveObject } from 'objects/helpers/InteractiveObject';
import { Portal } from 'objects/interactives/Portal';
import { Player } from 'objects/Player';

export class ResumeHouseScene extends Scene {
    constructor() {
        super('ResumeHouse');
    }

    public async load() {
        super.load();

        const map = await this.loadTileMapJSON('resume-house');
        await map.addTileset('indoor', 'indoor-tileset', 1.5);

        map.createLayers(['floor'], 'indoor');
        map.createLayers(['furniture', 'walls'], 'indoor', { isObstacle: true });
        const shelves = map.createLayers(['shelfes'], 'indoor', { isObstacle: true });
        const doors = map.createLayers(['door'], 'indoor', { isObstacle: true });

        const player = new Player();
        await this.addController(player);

        await this.addController(new Portal(doors, 'Main'));
        await this.addController(
            new InteractiveObject(
                shelves,
                () => {
                    console.log('A');
                },
                { showQuestionMark: true },
            ),
        );

        this.game.camera.setPosition(248, 220);
        this.game.camera.setBounds([
            [150, 100],
            [600, 550],
        ]);
    }
}
