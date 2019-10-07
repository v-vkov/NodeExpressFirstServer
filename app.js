const path = require('path'),
      fs = require('fs'),
      express = require('express'),
      hBars = require('express-handlebars');
      
const app = express();
const port = 3000;
const users = [];
const houses = [];

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('.hbs', hBars({
    extname: '.hbs', 
    defaultLayout: null
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

app.get('/', (req, res) => res.render('main'));
app.get('/login', (req, res) => res.render('login'));
app.get('/sign', (req, res) => res.render('sign'));
app.get('/users', (req, res) => res.json(users));
app.get ('/gethouse', (req, res) => res.render('gethouse'));
app.get ('/houses', (req, res) => res.json(houses));

app.post('/register', (req, res) => {
    let body = req.body;
    console.log(body);
    users.push(body);
    body.userId = users.length;
    res.sendStatus(200);
});

app.get('/users/:userId', (req, res) => {
    const userId = users.find(profile => +req.params.userId === profile.userId);
    userId ? res.json(userId) : res.end('User not found!');
})

app.post('/log', (req, res) => {
    let body = req.body;
    const log = users.find(profile => profile.login === body.userName && profile.password === body.password);
    log ? res.redirect(`/users/${log.userId}`) : res.end('WRONG LOGIN OR PASSWORD');

})

///////////////////

app.post('/myHouse', (req, res) => {
    let body = req.body;
    houses.push(body);
    body.houseId = houses.length;
    res.sendStatus(200);
});

app.get('/houses/:houseId', (req, res) => {
    const houseId = houses.find(profile => +req.params.houseId === profile.houseId);
    houseId ? res.json(houseId) : res.end('House not found!');
});

app.all('*', (req, res) => res.render('nfound'));

app.listen(port, () => console.log(`App listening on port ${port}!`))
