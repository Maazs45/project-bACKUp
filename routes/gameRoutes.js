const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController.js');

/**
 * App routes
 */
router.get('/', gameController.homepage);

router.get('/games/:id', gameController.exploregames);
router.post('/search', gameController.searchgames)
router.get('/explore-latest', gameController.exploreLatest);
router.get('/random-article', gameController.randomarticle);
router.get('/submit-game', gameController.submitgame);
router.post('/submit-game', gameController.submitgameonpost);
router.get('/delete/:id',gameController.deletedata);
router.get('/edit/:id', gameController.updatedata);
router.post('/edit/:id', gameController.updatedataonpostnew);
router.get('/contact', gameController.contact);
router.get('/about', gameController.about);
module.exports = router;