export default function likeDataHandler(joke) {
  const { id } = joke.dataset;
  const updated_at = joke.querySelector('.joke__date').dataset.time;
  const url = joke.querySelector('.joke__ancor').href;
  const value = joke.querySelector('.joke__value').textContent;
  const jokeCategory = joke.querySelector('.joke__category').textContent || undefined;
  return {
    id,
    categories: [jokeCategory],
    updated_at,
    url,
    value,
    liked: true,
  };
}
