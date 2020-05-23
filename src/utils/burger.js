(function burger() {
  const burg = document.querySelector('.main__burger');
  const container = document.querySelector('.container');

  burg.onclick = function () {
    container.classList.toggle('opened');
  };
}());
