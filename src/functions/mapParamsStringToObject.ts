import { ParamsObject } from './../app/models/ParamsObject';
export function mapParamsStringToObject(_params: string): ParamsObject {
  let s, y, t, p;
  let isY, isT, isP;
  isY = isT = isP = false;

  if (_params.slice(0, 2) !== 's:') {
    return { s: null, y: null, t: null, p: null };
  }

  if (_params.includes('&y:')) {
    isY = true;
  }

  if (_params.includes('&t:')) {
    isT = true;
  }

  if (_params.includes('&p:')) {
    isP = true;
  }

  //
  s = _params.split('&')[0].slice(2);

  if (isY) {
    y = _params.split('&')[1].slice(2);
  }

  if (isY && isT) {
    t = _params.split('&')[2].slice(2);
  } else if (!isY && isT) {
    t = _params.split('&')[1].slice(2);
  }

  if (isY && isT && isP) {
    p = _params.split('&')[3].slice(2);
  } else if (!isY && isT && isP) {
    p = _params.split('&')[2].slice(2);
  } else if (isY && !isT && isP) {
    p = _params.split('&')[2].slice(2);
  } else if (!isY && !isT && isP) {
    p = _params.split('&')[1].slice(2);
  }

  return { s, y, t, p };
}
