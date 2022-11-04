const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./db/conn");
const sendData = require("./db/conn");

const port = process.env.port || 8000;
const viewsPath = path.join(__dirname,"../template");
const partialPath = path.join(__dirname, '../template/partials');
app.use('/dist', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/coustom', express.static(path.join(__dirname, '../template/coustom')));
app.use('/image', express.static(path.join(__dirname, '../template/coustom/image')));
app.use(express.urlencoded());

app.set("view engine","hbs")
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

app.get('/',(req,res)=>{
    res.status(200).render('index',{title:'Welcome to our services'})
})
app.post('/', async(req,res)=>{
    try {
        const datadb = new sendData(req.body);
        console.log(datadb);
        await datadb.save();
        res.status(200).render('index',{mess:"Message send successfuly"}) ;
    } catch (error) {
        res.status(200).render('index',{mess:"Message not send try again"});
    }
    
})





// connect to port 
app.listen(port,()=>{
    console.log(`Server open port in ${port}`)
})