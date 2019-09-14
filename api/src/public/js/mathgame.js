/**
 * Make a JQuery post, call the makeHtmlCB callback with the json data,
 * and place the result into the eleSelector element.
 * @param {string} url the api url to call
 * @param {string} postData the data to post to the url
 * @param {string} eleSelector the element selector where the result is placed
 * @param {Function} callback the callback to convert json to html, or process data
 * @param {string} reloadPage if true reload the current page
 * @param {string} dataType options = xml, json, script, text, html
 */
function ajaxPost(url, postData, eleSelector, callback, reloadPage = false, dataType='json') {
  // alert(url);
  jQuery.post( url, postData, function( data ) {
    // alert('res='+JSON.stringify(data));
    if (eleSelector) {
      if (callback) {
        $(eleSelector).html(callback(data));
      } else {
        $(eleSelector).html(data);
      }
    } else if (callback) {
      callback(data);
    }
    if (reloadPage) location.reload();
  }, dataType);
}

function createGame() {
  ajaxPost('/api/game', null, null, null, true);
}

function startGame(id) {
  sessionStorage.clear();
  ajaxPost('/api/game/'+id+'/start', null, null, (data) => {
    saveGame(data, 0);
  }, true);
}

function stopGame(id) {
  ajaxPost('/api/game/'+id+'/stop', getGame(), null, null, true);
  // sessionStorage.clear();
}

function handleInput(target) {
  let game = getGame();
  let gameIndex = getGameIndex();
  let question = game.questions[gameIndex];
  question.userAnswer=parseInt(target.value);
  gameIndex++;
  saveGame(game, gameIndex);
  target.value = '';
  if (gameIndex<game.questions.length) {
    jQuery("#gameCarousel").carousel('next');
    jQuery("#answer"+gameIndex).focus();
  } else {
    stopGame(game.id);
    // jQuery("#gameCarousel").carousel('dispose');
  }
}

function getGame() {
  return JSON.parse(sessionStorage.getItem('game'));
}

function getGameIndex() {
  return parseInt(sessionStorage.getItem('gameIndex'));
}

function saveGame(game, gameIndex) {
  sessionStorage.setItem('game', JSON.stringify(game));
  sessionStorage.setItem('gameIndex', gameIndex);
}

function saveUser() {
  jQuery.get('/api/user', null, (user) => {
    localStorage.setItem('mathuser', JSON.stringify(user));
  }, 'json').fail(() => {
    alert('Error loading user from server');
  });
}

function logout() {
  localStorage.removeItem('mathuser');
  return true;
}

jQuery(document).ready(() => {
  let user = localStorage.getItem('mathuser');
  if (!user) {
    saveUser();
  }
  if(jQuery("#answer0")) {
    jQuery("#answer0").focus();
  }
});
