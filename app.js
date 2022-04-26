//jshint esversion:6
const express= require("express");
const app= express();
const https= require("https");
const bodyParser=require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
     const query=req.body.cityName; 
     const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=0b5fe646dbe2e83cf998177e28705e62";

https.get(url, function(response){
    console.log(response.statusCode);
    
    response.on("data",function(data){  
      const weatherData=JSON.parse(data);
      const Temp= weatherData.main.temp;
      const Description=weatherData.weather[0].description;
      const Icon=weatherData.weather[0].icon;
      const ImageURL=" http://openweathermap.org/img/wn/"+Icon+"@2x.png"

      res.write("<h1>The temperature in "+query+" is "+Temp+" degree celsius</h1>")
      res.write("<h2>The weather is "+Description+"</h2>");
      res.write("<img src="+ImageURL+">");
      res.send();
    })
  });

})

app.listen(3000,function(){
  console.log("Server runninmg at port 3000");
});
