let express= require('express');
let app = express();
let request=require('request');
let port=process.env.PORT || 7600;

//static file path
app.use(express.static(__dirname+'/public'));
//html file path
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

app.get('/weather/:city',(req,res)=>{
    let city=req.params.city;
    let url=`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    // Calling API
    request(url,(err,apiResponse)=>{
        if(err) throw err;
        const data=JSON.parse(apiResponse.body);
        res.render('index',{title:'Weather Application',result:data});
    })
})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is listening on port ${port}`);
})