import { SERVER_URL } from './constants';

export const getIngredientsData = async () => {
  const response = await fetch(`${SERVER_URL}ingredients`);

  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(response.status);
  }
};

export const postOrder = async (arrayId) => {
  const response = await fetch(`${SERVER_URL}orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: arrayId
    })
  })
  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(response.status);
  }
};
