export default function renderError(place, data = 'This items does not exist.') {
  const $error = `
      <span class="joke-form__error"> ${data}</span>
    `;
  place.insertAdjacentHTML('beforeend', $error);
}
