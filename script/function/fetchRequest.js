export const fetchRequest = async (url, {
  method = 'get',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = JSON.stringify(headers);

    const response = await fetch(url, options);
    console.log('response: ', response);

    if (response.ok) {
      const data = await response.json();
      console.log('data: ', data);
      if (callback) callback(null, data);
      return;
    }
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};
