function clearAndUpper(text: string): string {
    return text.replace(/-/, '').toUpperCase();
}

export function snakeToPascalCase(text: string): string {
    return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function snakeToCamelCase(text: string): string {
    return text.replace(/-\w/g, clearAndUpper);
}
