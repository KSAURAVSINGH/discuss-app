const express=require('express')
const mongoose=require('mongoose')

//configure mongoose
var mongoDB='mongodb+srv://Saurav:myystruggless@chakra.7uygo.mongodb.net/local_db?retryWrites=true&w=majority';
// var mongoDB='mongodb+srv://Saurav:myystruggless@chakra.7uygo.mongodb.net/local_db?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
db.on("error",error=>{
    console.log(error);
});
db.once('open',()=>{
    console.log("Connnected to database");
});

const CommmentSchema=mongoose.Schema({
    user:String,
    message:String,
    likes:Number,
    editable:Boolean,
    replies:[{
        user:String,
        message:String,
        likes:Number
    }]
});

const CommentModel=mongoose.model('Comment',CommmentSchema);


// const commentToInsert=[{
//     user:"Jiriya",
//     message:"I am the legendary Sanin",
//     likes:106,
//     replies:[{
//         user:"Nagato",
//         message:"I will try to bring peace in this world",
//         likes:435
//     },{
//         user:"Minato Namikage",
//         message:"I will follow your direction Jiraya Sensei",
//         likes:90
//     },{
//         user:"Naruto Uzuamki",
//         message:"I will become the Naruto he prophesied that will bring peace to this world",
//         likes:095
//     }
// ]
// },{
//     user:"Madara Uchiha",
//     message:"No one compares to the power of Hashirama",
//     likes:28,
//     replies:[{
//         user:"Gaara",
//         message:"Is this the power of God",
//         likes:9320
//     }]
// }
// ];

// CommentModel.insertMany(commentToInsert,(err,data)=>{
//     if(err)
//     console.log(err);
//     else
//     console.log("Successfully Inserted the data");
// })



const app=express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
// Handle Routes
app.post('/get-data',(req,res)=>{
    console.log("Doing correct");
    CommentModel.find({},(err,data)=>{
        if(err)
        console.log(err);
        else
        res.send(data);
    });
})

app.post('/new-comment',(req,res)=>{
    let messageData=req.body.messageData;
    console.log("Added");
    const newMessage=new CommentModel({
        user:"Might Guy",
        message:messageData,
        likes:0,
        editable:true,
        replies:[]
    }).save();
    res.send('');
})

app.post('/new-sub-comment',(req,res)=>{
    console.log("New Sub Comment");
    let messageData=req.body.messageData;
    let messageId=req.body.messageId;
    const newSubMessage={
        user:"Might Guy",
        message:messageData,
        likes:0
    }
    CommentModel.updateOne({_id:messageId},{$push:{replies:newSubMessage}},(err,data)=>{
        if(err)
            console.log(err);
        res.send('');
    })
})

app.post('/update-comment',(req,res)=>{
    console.log("Update the comment");
    let commentId=req.body.commentId;
    CommentModel.findOne({_id:commentId},(err,data)=>{
        if(err)
        console.log(err);
        else
        {
            console.log(data);
            res.send(data);
        }
    })
})

app.post('/delete',(req,res)=>{
    let messageId=req.body.messageId;
    CommentModel.deleteOne({_id:messageId},(err,data)=>{
        if(err)
        console.log(err);
        res.send('');
    })
})


app.post('/delete-sub-comment',(req,res)=>{
    let messageId=req.body.messageId;
    let subId=req.body.subId;
    CommentModel.updateOne({_id:messageId},{$pull:{replies:{_id:subId}}},(err,data)=>{
        if(err)
        console.log(err);
        res.send('');
    })
})

app.listen(5000 || process.env.PORT,()=>
console.log("Server has started on port 5000 successfully")
);
