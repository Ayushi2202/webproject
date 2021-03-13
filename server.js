const express=require('express');
const app = express();
const nodemailer=require("nodemailer");
const PORT=process.env.PORT||5000;


//Middleware
app.use(express.static('public'))
app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/contactform.html')
})
app.post('/',(req,res)=>{
    console.log(req.body);

    const transport=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:"ayushichoudhary2202@gmail.com",
            pass:"iamayushi@2202"
        }
    })
    const mailOptions={
        from:'ayushic061@gmail.com',
        to:req.body.email,
        
        subject:`Message from ${req.body.name}:${req.body.subject}`,
        text:req.body.message
    }
    transport.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }
        else{
            console.log('Email sent:'+info.response);
            res.send('success');
        }
    })
})
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})