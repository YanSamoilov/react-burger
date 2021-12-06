import { INGREDIENTS_URL, ORDER_URL } from "./constants"

export const getIngridientsData = async () => {
  const response = await fetch(INGREDIENTS_URL);

  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(response.status);
  }
}

export const postOrder = async (arrayId) => {
  const response = await fetch(ORDER_URL, {
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
}
