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

        await this.addController(Player.instance);

        await this.addController(new Portal(doors, 'Main', { x: 240, y: 720 }));
        await this.addController(
            new InteractiveObject(
                shelves,
                () => {
                    console.log('A');
                },
                { showQuestionMark: true },
            ),
        );

        this.game.camera.setPosition({ x: 420, y: 340 });
        this.game.camera.setBounds([
            [150, 100],
            [600, 550],
        ]);
    }
}
