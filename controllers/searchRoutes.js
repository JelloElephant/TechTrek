const router = require('express').Router();
const sequelize = require('../config/connection');
const { Results } = require('../models');

router.get('/',  async (req, res) => {
  try {

const count = await Results.findOne({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id')), 'idCount']
    ]
  });
  const idCount = count.get('idCount');
  /* console.log(idCount); */

const resultsData = await Results.findAll({
    where: {
      id: idCount
    }
  });

/* console.log(resultsData) */

    const results = resultsData.map((project) => project.get({ plain: true }));
    /* console.log(results) */
    res.render('searchpage', {
      results,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/button-home', (req, res) => {
  
    res.redirect('/');
  });

module.exports = router;
