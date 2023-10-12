// generate a random string to given length
export function generateAlphanumericRandomString(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomNumber);
  }

  return result;
}
