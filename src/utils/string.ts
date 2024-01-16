export function compareString(string1: string, string2: string): boolean {
  for (let i = 0; i < Math.max(string1.length, string2.length); i++) {
    if (string1[i] !== string2[i]) {
      return false;
    }
  }
  return true;
}

// HINT: This is something fancy that you believe would be used in the future, follow YAGNI principle
export function printTriangle(rows: number, character: string): void {
  for (let i = 1; i <= rows; i++) {
    let chars = "";
    for (let j = 1; j <= i; j++) {
      chars += character;
    }
    console.log(chars);
  }
}
