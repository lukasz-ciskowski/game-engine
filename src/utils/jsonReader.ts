export async function fetchJson(path: string) {
    const response = await fetch(path);
    return await response.json();
}