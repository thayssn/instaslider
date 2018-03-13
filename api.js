//  api.js
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();
var accessToken, user;
global.db = require('./db');

//location of our static files(css,js,etc..)
app.use(express.static(__dirname + '/public'));

//set the view engine to use ejs
app.set('view engine', 'ejs');

ig.use({
  client_id: '46e2b209ccc7402a9454335da801a1e8',
  client_secret: 'f08f8a8b205d4c4a9beac9ee95c3c187'
});

//the redirect uri we set when registering our application
var redirectUri = 'http://localhost:8000/handleAuth';

app.get('/authorize', function(req, res){
  // set the scope of our application to be able to access likes and public content
  console.log('AUTHORIZING')
  res.redirect(ig.get_authorization_url(redirectUri, { scope : ['public_content','likes']}) );
});

app.get('/handleAuth', function(req, res){
  //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access tokenA
  console.log('HANDLING')
  ig.authorize_user(req.query.code, redirectUri, function(err, result){
    if(err) res.send( err );

    // store this access_token in a global variable called accessToken
    accessToken = result.access_token;

    user = result.user;


    ig.use({
      access_token : accessToken
    });

    global.db.insert(user, function(err, result) {
      if(err) { return console.log(err); }
    });

    // After getting the access_token redirect to the '/' route
    res.redirect('/');
  });
});


app.get('/users', function(req, res){
  global.db.findAll( function(e, docs) {
    if(e) { return console.log(e); }
    res.render('pages/users', { title: 'Lista de Clientes', docs: docs });
  });
});

app.get('/', function(req, res){
  // create a new instance of the use method which contains the access token gotten
  if(accessToken && user){
/*
    ig.user_media_recent(user.id, function(err, medias, pagination, remaining, limit) {
      if(err) {
        res.json(err);
      }
      res.render('pages/index', { instagram : medias});
    });
*/
    console.log('GETTING MEDIA')
    ig.tag_media_recent('sdds', function(err, medias, pagination, remaining, limit) {
      if(err) {
        res.json(err);
      }

      res.render('pages/index', { instagram : medias});
    });

  }else{
    res.redirect('/authorize');
  }
});

app.listen(8000);