const getHashParameters = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export default getHashParameters;

// convert time in ms to mm:ss

export const formatDuration = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// key to symbol

export const parseKey = (key) => {
  let response;

  switch (key) {
    case 0:
      response = "C";
      break;
    case 1:
      response = "D♭";
      break;
    case 2:
      response = "D";
      break;
    case 3:
      response = "E♭";
      break;
    case 4:
      response = "E";
      break;
    case 5:
      response = "F";
      break;
    case 6:
      response = "G♭";
      break;
    case 7:
      response = "G";
      break;
    case 8:
      response = "A♭";
      break;
    case 9:
      response = "A";
      break;
    case 10:
      response = "B♭";
      break;
    case 11:
      response = "B";
      break;
    default:
      return null;
  }

  return response;
};

export const parseFollowerCount = (followers) => {
  // less than 1000
  if (followers < 1000) return followers;
  //between 1000 and 1m
  if (followers >= 1000 && followers < 1000000) {
    let str = followers.toString();
    let hundreds = str.substring(str.length - 3, str.length - 2);
    let thousands = str.substring(0, str.length - 3);
    if (parseInt(thousands) >= 100) return `${parseInt(thousands)}K`;
    else return `${thousands}${hundreds === "0" ? "" : `,${hundreds}`}K`;
  }
  if (followers >= 1000000) {
    let str = followers.toString();
    let millions = str.substring(0, str.length - 6);
    let thousands = str.substring(str.length - 6, str.length - 5);
    return `${millions}${thousands === "0" ? "" : `,${thousands}`}M`;
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
