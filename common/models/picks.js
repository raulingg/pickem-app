'use strict';

module.exports = function(Picks) {
  Picks.validatesPresenceOf('gamerId', 'matchId');
  Picks.validateAsync('gamerId', existsGamerReference, {
    code: 'notFound.relatedInstance',
    message: 'related gamerId not found',
  });
  // Picks.validateAsync('matchId', existsMatchReference, {
  //   code: 'notFound.relatedInstance',
  //   message: 'related matchId not found',
  // });

  function existsGamerReference(err, next) {
    if (!this.gamerId) {
      return next();
    }

    var Gamers = Picks.app.models.gamers;

    Gamers.exists(this.gamerId, function(error, instance) {
      if (error || !instance) {
        err();
      }
      next();
    });
  }

  // function existsMatchReference(err, next) {
  //   if (!this.macthId) {
  //     return next();
  //   }

  //   var Matches = Picks.app.models.matches;

  //   Matches.exists(this.macthId, function(error, instance) {
  //     if (error || !instance) {
  //       err();
  //     }
  //     next();
  //   });
  // }
};
