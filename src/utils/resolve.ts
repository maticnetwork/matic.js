export function resolve(obj, path) {
    const properties = Array.isArray(path) ? path : path.split(".");
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
}