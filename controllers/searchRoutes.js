const router = require('express').Router();
const { User } = require('../models');
const { Results } = require('../models');


router.get('/',  async (req, res) => {
  try {
    const resultsData = await Results.findAll({
      /* attributes: { exclude: ['password'] }, */
    });

    const results = resultsData.map((project) => project.get({ plain: true }));

    res.render('searchpage', {
     /*  res.render('searchpage', { */
      results,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
