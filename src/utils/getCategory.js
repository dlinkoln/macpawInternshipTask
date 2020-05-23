export default function getCategory() {
  const categoryInputs = document.querySelector('.joke-form__category');
  const category = categoryInputs.querySelector('[name="category"]:checked').id;
  return `https://api.chucknorris.io/jokes/random?category=${category}`;
}
