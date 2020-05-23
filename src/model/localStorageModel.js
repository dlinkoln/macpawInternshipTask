export default function lsData(opt = 'get', jokeObj = {}) {
  let res;
  if (opt === 'post') {
    const currLsData = JSON.parse(localStorage.getItem('jokes') || '[]');
    if (Array.isArray(jokeObj)) {
      jokeObj.forEach((el) => currLsData.push(el));
      localStorage.setItem('jokes', JSON.stringify(currLsData));
    } else {
      currLsData.push(jokeObj);
      localStorage.setItem('jokes', JSON.stringify(currLsData));
    }
  } else if (opt === 'get') {
    res = JSON.parse(localStorage.getItem('jokes') || '[]');
  } else if (opt === 'del') {
    localStorage.setItem('jokes', '[]');
  }
  return res;
}
