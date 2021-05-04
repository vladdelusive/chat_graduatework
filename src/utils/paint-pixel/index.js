const RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i;

export const hex2RGB = str => {
    const [, short, long] = String(str).match(RGB_HEX) || [];

    if (long) {
        const value = Number.parseInt(long, 16);
        // eslint-disable-next-line
        return [value >> 16, value >> 8 & 0xFF, value & 0xFF];
    } else if (short) {
        return Array.from(short, s => Number.parseInt(s, 16)).map(n => (n << 4) | n);
    }
};

export function colorToRGB(color) {
    return `rgb(${color.join(', ')})`;
}

export function BRESENHAM(x0, y0, x1, y1, pixelPaint) {
    let dx = Math.abs(x1 - x0),
        sx = x0 < x1 ? 1 : -1;
    let dy = Math.abs(y1 - y0),
        sy = y0 < y1 ? 1 : -1;
    let error = (dx > dy ? dx : -dy) / 2;

    while (true) {
        pixelPaint(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        let e2 = error;
        if (e2 > -dx) {
            error -= dy; x0 += sx;
        }
        if (e2 < dy) {
            error += dx; y0 += sy;
        }
    }
}

export function fillPixel(x, y, paintColor, data, { ctx, canvas }) {
    function getPixelCoordinates(x, y) {
        return (y * canvas.width + x) * 4;
    };
    function compareColor(data, pos, color) {
        return (data[pos] === color.r && data[pos + 1] === color.g &&
            data[pos + 2] === color.b && data[pos + 3] === color.a);
    };
    function colorPixel(data, pos, color) {
        data[pos] = color.r || 0;
        data[pos + 1] = color.g || 0;
        data[pos + 2] = color.b || 0;
        data[pos + 3] = color.hasOwnProperty("a") ? color.a : 255;
    };
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let arrayOfPixels = imageData.data;
    let width = imageData.width;
    let height = imageData.height;
    // where we clicked
    let stack = [[x, y]];
    let pixel;
    let pixelPosition;
    const pixelColor = {
        r: +data[0],
        g: +data[1],
        b: +data[2],
        a: +data[3]
    }
    while (stack.length) {
        pixel = stack.pop();

        if (pixel[0] < 0 || pixel[0] >= width) continue;
        if (pixel[1] < 0 || pixel[1] >= height) continue;

        pixelPosition = getPixelCoordinates(pixel[0], pixel[1]);

        if (!compareColor(arrayOfPixels, pixelPosition, paintColor)) {

            colorPixel(arrayOfPixels, pixelPosition, paintColor);

            let top = getPixelCoordinates(pixel[0], pixel[1] - 1);
            let right = getPixelCoordinates(pixel[0] + 1, pixel[1]);
            let bottom = getPixelCoordinates(pixel[0], pixel[1] + 1);
            let left = getPixelCoordinates(pixel[0] - 1, pixel[1]);

            // find pixel to paint =>
            // algorithm -> try to find in top || right || bottom || left pixel that appropriate to start pixel color
            // and push it to stack
            if (top >= 0 && compareColor(arrayOfPixels, top, pixelColor))
                stack.push([pixel[0], pixel[1] - 1]);

            if (right >= width && compareColor(arrayOfPixels, right, pixelColor))
                stack.push([pixel[0] + 1, pixel[1]]);

            if (bottom >= width && compareColor(arrayOfPixels, bottom, pixelColor))
                stack.push([pixel[0], pixel[1] + 1]);

            if (left >= 0 && compareColor(arrayOfPixels, left, pixelColor))
                stack.push([pixel[0] - 1, pixel[1]]);

        }
    }
    ctx.putImageData(imageData, 0, 0);
}

export function arrayRgbFormat(color) {
    return color.slice(4, -1).split(', ');
}

export function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');

    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    return !pixelBuffer.some(color => color !== 0);
}