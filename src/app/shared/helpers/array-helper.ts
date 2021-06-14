export function random<T>(input: T[]): T | undefined {
    return input[Math.floor(Math.random() * input.length)];
}
