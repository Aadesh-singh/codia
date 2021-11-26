module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    return res.render('hello.ejs');
}

module.exports.aadesh = function(req, res){
    return res.end('<h1>HI aadesh</h1>');
}