export function compareString(string1: string, string2: string): boolean {
    for (let i = 0; i < Math.max(string1.length, string2.length); i++) {
        if (string1[i] !== string2[i]) {
            return false;
        }
    }
    return true;
}