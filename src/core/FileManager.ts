import { loadImgAsync } from 'utils/imageLoader';
import { fetchJson } from 'utils/jsonReader';

interface ConfigFile {
    files: Array<{
        type: 'img' | 'json';
        key: string;
        url: string;
    }>;
}

export class FileManager<TKey extends string = string> {
    private readonly _images: Map<TKey, HTMLImageElement> = new Map();
    private readonly _jsons: Map<TKey, object> = new Map();
    private _configFile: ConfigFile;

    public async readConfig(path: string) {
        this._configFile = await fetchJson<ConfigFile>(path);
        await Promise.all(
            this._configFile.files.map(async (file) => {
                switch (file.type) {
                    case 'img':
                        const img = await loadImgAsync(file.url);
                        this._images.set(file.key as TKey, img);
                        break;
                    case 'json':
                        const json = await fetchJson(file.url);
                        this._jsons.set(file.key as TKey, json);
                        break;
                }
            }),
        );
    }

    public getImage(key: TKey) {
        return this._images.get(key);
    }

    public getJson<T extends object>(key: TKey) {        
        return this._jsons.get(key) as T | undefined;
    }

    public getConfig(key: TKey) {
        return this._configFile.files.find((f) => f.key === key);
    }
}
