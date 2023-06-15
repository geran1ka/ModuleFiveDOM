export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', () => {
    console.log('err: ', reader.error);
    reject(reader.error);
  });

  reader.readAsDataURL(file);
});
