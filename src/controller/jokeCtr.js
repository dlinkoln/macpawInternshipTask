import render from '../view/mainJokeView';
import resetRender from '../view/resetView';


import lsData from '../model/localStorageModel';
import getJoke from '../model/jokeModel';

import getCategory from '../utils/getCategory';
import getSearch from '../utils/getSearch';
import likeDataHandler from '../utils/likeDataHandler';

const ctrForm = document.querySelector('.joke-form');
const mainRenderPlace = document.querySelector('.joke-list');
const favRenderPlace = document.querySelector('.aside__favbox');

function dogNailDislike(id) {
  const dislikedJoke = mainRenderPlace.querySelector(`[data-id="${id}"]`);
  if (dislikedJoke) {
    dislikedJoke.querySelector('.joke__like').classList.remove('joke__like_active');
  }
}

function likeListener() {
  mainRenderPlace.addEventListener('click', (e) => {
    if (e.target.parentNode.classList.contains('joke__like')) {
      const joke = e.target.closest('.joke');
      const jokeDataObj = likeDataHandler(joke);
      e.target.parentNode.classList.add('joke__like_active');
      const alreadyLiked = lsData().some((el) => jokeDataObj.id === el.id);
      if (!alreadyLiked) {
        lsData('post', jokeDataObj);
        render(favRenderPlace, jokeDataObj, 'beforeend');
      }
    }
  });
}
function dislikeListener() {
  favRenderPlace.addEventListener('click', (e) => {
    if (e.target.parentNode.classList.contains('liked')) {
      const joke = e.target.closest('.joke');
      const { id } = joke.dataset;
      const freshJoke = lsData();
      const index = freshJoke.findIndex((el) => el.id === id);
      if (index !== -1) {
        freshJoke.splice(index, 1);
      }
      lsData('del');
      resetRender(favRenderPlace);
      lsData('post', freshJoke);
      lsData().forEach((el) => render(favRenderPlace, el, 'beforeend'));
      dogNailDislike(id);
    }
  });
}

ctrForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const checkedTypeOfGettingJoke = this.querySelector('[name="joke_type"]:checked');
  switch (checkedTypeOfGettingJoke.id) {
    case 'random':
      resetRender(mainRenderPlace);
      getJoke()
        .then((res) => {
          render(mainRenderPlace, res);
        });
      break;
    case 'category':
      resetRender(mainRenderPlace);
      getJoke(getCategory())
        .then((res) => {
          render(mainRenderPlace, res);
        });
      break;
    case 'search':
      resetRender(mainRenderPlace);
      getJoke(getSearch())
        .then((res) => {
          if (res.result.length > 1 && res.result.length < 50) {
            res.result.forEach((el) => {
              render(mainRenderPlace, el);
            });
          } else if (res.result.length >= 50) {
            const newResult = res.result.slice(0, 49);
            newResult.forEach((el) => {
              render(mainRenderPlace, el);
            });
          } else {
            render(mainRenderPlace, res.result);
          }
        });
      break;
    default:
      getJoke();
      break;
  }
  likeListener();
});
window.onload = () => {
  lsData().forEach((el) => render(favRenderPlace, el, 'beforeend'));
  dislikeListener();
};
