'use strict';

module.exports = function(matches) {
  matches.
  validatesPresenceOf('tournamentId', 'matchType', 'teamOne', 'teamTwo');
  matches.validateAsync('tournamentId', existsTournamentReference, {
    code: 'notFound.relatedInstance',
    message: 'related tournamentId not found',
  });

  function existsTournamentReference(err, next) {
    if (!this.tournamentId) {
      return next();
    }

    var tournaments = matches.app.models.tournaments;

    tournaments.exists(this.tournamentId, function(error, instance) {
      if (error || !instance) {
        err();
      }
      next();
    });
  }
};
