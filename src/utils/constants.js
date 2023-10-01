const BASE_MAIN_URL = 'https://api.helga.movies.nomoredomains.xyz';
// const BASE_MAIN_URL = 'http://localhost:3000';
const BASE_IMAGE_URL = 'https://api.nomoreparties.co';
const BASE_MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const PATTERN_EMAIL =
  '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
  '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$';

const MOBILE_WIDTH = 320;
const TABLET_SMALL_WIDTH = 500;
const TABLET_BIG_WIDTH = 900;
const DESKTOP_WIDTH = 1280;
const MOBILE_MOVIES = 5;
const MOBILE_MOVIES_ADD = 2;
const TABLES_SMALL_MOVIES = 8;
const TABLES_BIG_MOVIES = 12;
const TABLET_SMALL_MOVIES_ADD = 2;
const TABLET_BIG_MOVIES_ADD = 3;
const DESKTOP_MOVIES = 16;
const DESKTOP_MOVIES_ADD = 4;

export {
  BASE_IMAGE_URL,
  BASE_MAIN_URL,
  BASE_MOVIES_URL,
  PATTERN_EMAIL,
  MOBILE_MOVIES,
  MOBILE_WIDTH,
  MOBILE_MOVIES_ADD,
  TABLES_SMALL_MOVIES,
  TABLES_BIG_MOVIES,
  TABLET_SMALL_WIDTH,
  TABLET_BIG_WIDTH,
  TABLET_SMALL_MOVIES_ADD,
  TABLET_BIG_MOVIES_ADD,
  DESKTOP_MOVIES,
  DESKTOP_MOVIES_ADD,
  DESKTOP_WIDTH,
};
