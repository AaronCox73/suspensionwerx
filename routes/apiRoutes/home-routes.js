
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        first_name: 'Jim Docs',
        last_name: 'Cox',
        machine_id: 10,
    });
});
module.exports = router