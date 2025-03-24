function generateSecureCaptcha(n) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let captcha = '';
  const randomValues = new Uint32Array(n);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < n; i++) {
    captcha += chars[randomValues[i] % chars.length];
  }

  return captcha;
}

export default generateSecureCaptcha;
