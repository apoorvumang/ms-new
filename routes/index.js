/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index');
};

exports.partial = function (req, res) {
    var name = req.params.name;
    res.render('partials/partial' + name);
};

exports.patient = function (req, res) {
    var view = req.params.view;
    res.render('patient/' + view);
};

exports.dash = function (req, res) {
    res.render('dash');
};