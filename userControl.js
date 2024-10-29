
let file = require('fs');
const express = require('express');
const path = require('path');
const server = express();

const ejs = require('ejs');
server.set('view engine', 'ejs')
// server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }))

// server.use(express.static(path.join(__dirname, 'Public')));
let Filepath = path.join(__dirname, 'File')
let date = new Date();
let finaldate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

server.get('/', function (req, res) {
    res.send("I am home")
})


server.get('/user', function (req, res) {
    res.render('index');
    console.log("working");
})

server.get('/create', function (req, res) {
    res.render('create', { message: '' });
   
})

   server.post('/create', function (req, res) {
    const { filename, content } = req.body; 

    
    file.writeFile((`${Filepath}/${filename}.txt-${finaldate}`), content, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return res.status(500).send('Error creating file'); 
        }
        console.log('File has been created!');

    
        res.render('create', { message: 'File created successfully!' });
    });
});
server.get('/delete', function (req, res) {
    res.render('delete', { message: '' });
})
server.post('/delete', function (req, res) {
    const { filename } = req.body;


    const filePath = `${Filepath}/${filename}.txt-${finaldate}`;

    
    file.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.render('delete', { message: 'Error deleting file or file not found.' });
        }
        console.log('File has been deleted!');

        
        res.render('delete', { message: 'File deleted successfully!' });
    });
});



server.get('/read', function (req, res) {
    res.render('read', { message: '', content: '' }); 
});


server.post('/read', function (req, res) {
    const { filename } = req.body;


    const filePath = `${Filepath}/${filename}.txt-${finaldate}`;


    file.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.render('read', { message: 'Error reading file or file not found.', content: '' });
        }
        console.log('File has been read!');

    
        res.render('read', { message: 'File read successfully!', content: data });
    });
});
server.get('/edit',function(req,res){
    res.render('edit')
})
server.post('/edit',function(req,res){
    const { filename } = req.body;


    const filePath = `${Filepath}/${filename}.txt-${finaldate}`;
    if(err){
        console.log('error changing file:',err);
        return res.render(`edit ${message} `)
    }
})


server.get('*', function (req, res) {
    res.send("No page found");
})


server.listen(3000, () => {
    console.log("Server chalu  ");
})
