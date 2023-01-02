require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserControler = require('../controlers/UserControler');
const MissionControler = require('../controlers/MissionControler');
const checkToken = require('../middleware/checkToken');

app.use(express.json());

const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.c2ouij4.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000, () => { console.log('escutando na porta 3000') })
}).catch((err) => console.log(err))


app.get('/', (req, res) => {
    res.json({ msg: 'Wellcome' })
});
//mission Routes
app.get('/missions', MissionControler.index);

app.post('/missions', MissionControler.store);

app.get('/missions/:id', MissionControler.show);

app.put('/missions/:id', MissionControler.update);

app.delete('/missions/:id', MissionControler.destroy);

app.get('/userMissions/:id', MissionControler.userGet);

app.post('/userMissions/:id', MissionControler.userPost);

//user Routes
app.post('/register', UserControler.register);

app.post('/auth/user', UserControler.login);

app.get('/user/:id', UserControler.showuser);
