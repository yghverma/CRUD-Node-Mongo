module.exports = function(app){
    app.get('/', (req, res) => {
        res.send("Hello World");
    });

    app.get('/UserRegistration', (req, res)=>{
        res.sendFile('index.html', {root: 'view' });
    });
}