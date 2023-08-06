const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path')


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/form.html'));
});


app.get('/sucess', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/sucess.html'));
});

app.post('/submitForm', (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const message = req.body.message;


    fs.readFile(path.join(__dirname, 'formdata.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }

        const formData = JSON.parse(data);
        formData.push({ userName, userEmail, message });

        fs.writeFile(path.join(__dirname, 'formdata.json'), JSON.stringify(formData, null, 2), 'utf8', err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            console.log('Form saved:', formData);
            res.redirect('/sucess');
        });
    });
});




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})