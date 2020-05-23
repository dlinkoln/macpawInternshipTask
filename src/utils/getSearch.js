export default function getSearch() {
  const searchInput = document.querySelector('.joke-form__search input');
  let searchStr;
  if (!searchInput.value) {
    searchStr = 'https://api.chucknorris.io/jokes/random';
  } else {
    searchStr = `https://api.chucknorris.io/jokes/search?query=${searchInput.value}`;
  }
  return searchStr;
}
