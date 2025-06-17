const express = require('express');
const cors = require('cors');
const fs = require('fs');   //to retreive the data from the file 
const path = require('path'); 

const app = express();
const PORT = 5000;  //the PORT where the Express server Run 

const DATA_PATH = path.join(__dirname,"data","events.json");  //gives the proper file path 


app.use(cors()); 
app.use(express.json());  //data type is json 

const readEvents = () => JSON.parse(fs.readFileSync(DATA_PATH));  //readFileSync returns the data in the string form the parse convert it into object 
const writeEvents = (data) => {
    fs.writeFileSync(DATA_PATH,JSON.stringify(data,null,2)); // null -> replacer, 2-> give the 2 space of indendation 
}
 
app.get('/',(req,res)=>{
    res.send('API is Working!'); 
})

app.get('/api/events',(req,res) =>{
   try{
    const events = readEvents();
    res.json(events);
   }
   catch(error){
     res.status(500).json({message:'Error reading events data'});
   }
     
})

app.get('/api/events/:id',(req,res)=>{
    const events = readEvents();
    const event = events.find(s=>s.id === parseInt(req.params.id));  

    if(event){
        res.json(event);
    }
    else{
        res.status(404).json({message:'Event not Found'});
    }
});
app.post("/api/events",(req,res)=>{     //to add new Event
   const events = readEvents();
   const newEvent = {...req.body,id:Date.now()}; 
   events.push(newEvent);
   writeEvents(events);
   res.status(201).json(newEvent); 
});

app.put("/api/events/:id",(req,res) =>{
    let events = readEvents();
    const id = parseInt(req.params.id);
    events = events.map((s) =>(s.id === id ?{...s,...req.body}:s)); 
    writeEvents(events);
    res.json({message: "Event updated Successfully"});

});

app.delete("/api/events/:id",(req,res) => {
   let events = readEvents();
   events = events.filter(s=> s.id !== parseInt(req.params.id));
   writeEvents(events);
   res.json({message: "Event deleted Successfully"});
});

app.use((req,res) =>{
   res.status(404).json({message:"Route not found"});
});

app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`); 
}); 