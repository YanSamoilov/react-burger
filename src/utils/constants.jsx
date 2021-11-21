import PropTypes from 'prop-types';

export const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const modalContainer = document.querySelector('#modal_container');
export const IngridientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});
