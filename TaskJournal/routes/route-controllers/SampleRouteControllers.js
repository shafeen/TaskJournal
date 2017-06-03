let SampleCreateRouteController = function (req, res) {
    res.send('yay sample create route works');
};


let SampleDeleteRouteController = function (req, res) {
    res.send('yay the sample delete route works');
};

module.exports = {
    SampleCreateRouteController: SampleCreateRouteController,
    SampleDeleteRouteController: SampleDeleteRouteController
};
