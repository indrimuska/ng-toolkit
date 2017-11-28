export const replaceAll = (text: string, key: string, replace: string) => {
    return text.split(key).join(replace);
};