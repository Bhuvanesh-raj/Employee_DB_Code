const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");



// db code
require("dotenv").config();
const sql=require("mysql2");

const pool=sql.createPool({
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD
});
let info;
let s="SELECT * FROM markdetails;";
pool.execute(s,function(err,result){
    if(err) throw err;
    info=result;
    console.log(info);
    
});

// module.exports=pool.promise();

// db code

app.get("/",function(req,res){
    pool.execute(s,function(err,result){
        if(err) throw err;
        info=result;
        console.log(info);
        
    });

    res.render("Mainpage",{details:info});
});
app.post("/",function(req,res){
    const id=req.body.id;
    const name=req.body.name;
    const gender=req.body.gender;
    const age=req.body.age;
    const department=req.body.department;
    console.log(id);
    console.log(name);
    console.log(gender);
    console.log(age);
    console.log(department);
    insertData(id,name,gender,age,department);

    async function insertData(i,n,g,a,d) {
        const query = 'INSERT markdetails (Id,Employee_name,Gender,Age,Department) VALUES (?, ? ,? ,? ,? )';
      
        try {
          const [rows, fields] = await pool.promise().execute(query, [i,n,g,a,d]);
          console.log('Data inserted successfully!');
        } catch (error) {
          console.error('Error inserting data:', error);
        }
      }
    res.redirect("/");
})  
app.listen(2000,function(){
    console.log("Server running on port 2000");
});