export function loadImgAsync(src: string) {
    return new Promise<HTMLImageElement>((res, rej) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            res(img);
        };
        img.onerror = (err) => {
            rej(err)
        }
    });
}
