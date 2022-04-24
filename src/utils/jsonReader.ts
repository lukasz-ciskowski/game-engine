export async function fetchJson<T extends object = object>(path: string) {
    const response = await fetch(path);
    return await response.json() as T;
}