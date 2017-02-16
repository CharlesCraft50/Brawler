
/* ************************************************
** GAME PLAYER CLASS
************************************************ */
var Player = function (startX, startY, startFacing, startPunching, newCrouching) {
  var x = startX;
  var y = startY;
  var facing = startFacing;
  var punching = startPunching;
  var crouching = newCrouching;
  var id;

  // Getters and setters
  var getX = function () {
    return x;
  }

  var getY = function () {
    return y;
  }

  var setX = function (newX) {
    x = newX;
  }

  var setY = function (newY) {
    y = newY;
  }

  var getFacing = function () {
    return facing;
  }

  var setFacing = function (newFacing) {
    facing = newFacing;
  }

  var getPunching = function () {
    return punching;
  }

  var setPunching = function (newPunching) {
    punching = newPunching;
  }

  var getCrouching = function () {
    return crouching;
  }

  var setCrouching = function (newCrouching) {
    crouching = newCrouching;
  }

  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    setX: setX,
    setY: setY,
    getFacing: getFacing,
    setFacing: setFacing,
    getPunching: getPunching,
    setPunching: setPunching,
    getCrouching: getCrouching,
    setCrouching: setCrouching,
    id: id
  }
}

module.exports = Player;