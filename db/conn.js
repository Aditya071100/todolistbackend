const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const local="mongodb://0.0.0.0:27017/AssignmentZedblock"
// Connect MongoDB at default port 27017.
mongoose.connect(local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   

   
}).then(()=>{
    console.log('connection succes');
}).catch((e)=>{
    console.log('no connect'+e);
})


