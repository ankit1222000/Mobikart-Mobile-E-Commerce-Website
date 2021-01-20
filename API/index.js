var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var cors = require('cors')
var multer=require('multer')
var connection=require('./db.conf')
var randomstring=require("randomstring")
var datetime=require("node-datetime")
var nodemailer = require('nodemailer');



var imagename;
const storage=multer.diskStorage({
destination: './uploads',
filename: function(req,file,cb){
 imagename=file.originalname.split(" ").join("");
 cb(null,file.originalname.split(" ").join(""));
 console.log(imagename);
}
})

const upload=multer({storage:storage})
app.use(cors());
app.use(express.static('uploads'));

app.get('/getProduct/:ProductId',(req,res)=>{
    console.log(req.params.ProductId)
sqlquery="SELECT COMPANY.COMPANY_NAME,PRODUCT.PRODUCT_ID,PRODUCT.PRODUCT_NAME,PRODUCT.PRODUCT_IMAGE,PRODUCT.PRICE,PRODUCT.COLOUR,PRODUCT.VARIANT,PRODUCT.DISPLAY,PRODUCT.PROCESSOR,PRODUCT.CAMERA,PRODUCT.AVAILABLE, PRODUCT.OS FROM PRODUCT INNER JOIN COMPANY ON COMPANY.COMPANY_ID=PRODUCT.COMPANY_ID WHERE PRODUCT_ID="+req.params.ProductId;
connection.query(sqlquery,(err,result)=>{
    if(err) console.log(err)
    if(result.length){
        console.log(result);
        res.send(result);
    }
})
})
app.get('/getAllProduct',(req,res)=>{
    sqlquery="SELECT CONCAT(COMPANY.COMPANY_NAME,' ',PRODUCT.PRODUCT_NAME) AS PRODUCT_NAME,PRODUCT.PRODUCT_ID,PRODUCT.PRODUCT_IMAGE,PRODUCT.PRICE,PRODUCT.COLOUR,PRODUCT.BATTERY,PRODUCT.VARIANT,PRODUCT.DISPLAY,PRODUCT.PROCESSOR,PRODUCT.CAMERA,PRODUCT.OS FROM PRODUCT INNER JOIN COMPANY ON COMPANY.COMPANY_ID=PRODUCT.COMPANY_ID"
connection.query(sqlquery,(err,result)=>{
    if(err) console.log(err)
    if(result.length){
        console.log(result);
        res.send(result);
    }
})
})

app.get('/deleteProduct/:id',(req,res)=>{
    console.log(req.params.id)
    sqlquery="Delete FROM PRODUCT WHERE PRODUCT_ID="+req.params.id
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        if(result.length){
            console.log(result);
            
        }
        res.send({success:true});
    })
    
})


app.get('/getLimitData/:limit',(req,res)=>{
    //console.log(req.params.limit);
sqlgetData1="SELECT COMPANY.COMPANY_NAME,PRODUCT.PRODUCT_ID,PRODUCT.PRODUCT_NAME,PRODUCT.PRODUCT_IMAGE,PRODUCT.PRICE,PRODUCT.COLOUR FROM PRODUCT INNER JOIN COMPANY ON COMPANY.COMPANY_ID=PRODUCT.COMPANY_ID ORDER BY PRODUCT.PRODUCT_ID LIMIT "+req.params.limit;



connection.query(sqlgetData1,(err,result)=>{
    if(err) console.log(err)
    if(result.length) {
        console.log(result)
        res.send(result)
    }
});
})


app.get('/getCategory',(req,res)=>{
    sqlquery="select company.company_id,company.company_name,count(product.company_id) AS count from company inner join product on company.company_id=product.company_id group by company.company_id";
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        if(result.length){
            console.log(result)
            res.send(result)
        }
    })
})

app.get('/CompanyFilter/:companyid',(req,res)=>{
    sqlquery="SELECT COMPANY.COMPANY_NAME,PRODUCT.PRODUCT_ID,PRODUCT.PRODUCT_NAME,PRODUCT.PRODUCT_IMAGE,PRODUCT.PRICE FROM PRODUCT INNER JOIN COMPANY ON COMPANY.COMPANY_ID=PRODUCT.COMPANY_ID where product.company_id="+req.params.companyid;
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        if(result.length){
            res.send(result)
        }
    })
})
app.get('/getAddress/:customer_id',(req,res)=>{
    sqlquery="Select pincode,locality,address,state,city,address_type from customer where customer_id="+req.params.customer_id+""
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        if(result.length>0) {
            console.log(result)
            res.send({success:true,data:result})
        }
        else res.send({success:false})
    })
})


app.post('/upload',upload.single('Image'),(req,res)=>{
console.log(`File Has been upload to Server ${req.file.originalname}`);
//res.end(JSON.stringify("File Upload to Server"))
})
app.use(bodyParser.json());

connection.connect(function(error){
    if(error) console.log(error)
    console.log("Successfully Connected to Database");
});

app.post('/processRegister',(req,res)=>{
    console.log(req.body);
    var name=req.body.Name
    var email=req.body.Email
    var phone=req.body.Phone
    var password=req.body.Password
    sqlcheck="SELECT * FROM CUSTOMER WHERE EMAIL='"+email+"' OR Phone='"+phone+"'"
    connection.query(sqlcheck,(err,result)=>{
        if(err) console.log(err)
        if(result.length>0) res.send({success:false})
        else{
            sqlquery="INSERT IGNORE INTO CUSTOMER(Name,Email,Phone,Password) VALUES('"+name+"','"+email+"','"+phone+"','"+password+"')"
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        
        res.send({success:true})
        var message=' '+name+' Welcome to Mobikart you have been successfully registered with Email '+email+''
        sendMessage(message,phone)
        sendEmail(email,'Mobikart New Customer','<h4>'+message+'</h4>')
    })
        }

    })

    
})
app.post('/processLogin',(req,res)=>{
    console.log(req.body)
    sqlquery="Select CUSTOMER_ID,NAME,EMAIL,PHONE,ADDRESS,PINCODE,LOCALITY,CITY,STATE,ADDRESS_TYPE from customer where email='"+req.body.email+"' and password='"+req.body.password+"' "
    connection.query(sqlquery,(err,result)=>{
        console.log(sqlquery)
        if(err) console.log(error)
        if(result.length>0) res.send({success:true,data:result})
        else res.send(
            {success:false}
        )
    })
})

app.post('/setReview',(req,res)=>{
    console.log(req.body)
    sqlquery="INSERT INTO PRODUCT_REVIEW(CUSTOMER_NAME,PRODUCT_ID,RATING,REVIEW) VALUES('"+req.body.Name+"',"+req.body.Product_Id+","+req.body.star+",'"+req.body.review+"')"
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        else res.send({success:true})
    })
})
app.get('/getReview/:id',(req,res)=>{
    sqlquery="SELECT * FROM PRODUCT_REVIEW WHERE PRODUCT_ID="+req.params.id+" ORDER  BY SNo DESC LIMIT 5"
    connection.query(sqlquery,(error,result)=>{
        if(error) console.log(error)
        else res.send(result)
    })
})
app.post('/changePassword',(req,res)=>{
    console.log(req.body)
    sqlquery="UPDATE CUSTOMER SET PASSWORD='"+req.body.Password+"' WHERE EMAIL='"+req.body.email+"' AND PASSWORD='"+req.body.Old+"'"
    console.log(sqlquery)
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        if (result.affectedRows>0) {
            res.send({success:true})
            var message='<h2>Hello User,<br/>Your Password Has Been Sucessfully Changed <br/> Your New Password is '+req.body.Password+' </h2> <br/> <h3> You Can Login to Mobikart from <a href="http://localhost:4200/">Here</a></h2>'
            sendEmail(req.body.email,'Mobikart Password Changed',message)
        }
        else res.send({success:false})
    })
})
app.post('/updateAddress',(req,res)=>{
    console.log(req.body)
    var pin=req.body.pincode;
    var locality=req.body.locality;
    var address=req.body.address;
    var state=req.body.state;
    var city=req.body.city;
    var addresstype=req.body.address_type;
    var customer=req.body.customer_id;
    sqlquery="update customer set pincode="+pin+",locality='"+locality+"',address='"+address+"',state='"+state+"',city='"+city+"',address_type='"+addresstype+"' where customer_id="+customer+" "
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        else res.send({success:true})
    })
    
})
function sendMessage(message,phone){
    const fast2sms = require('fast-two-sms')
    var number=phone
    var message=message
    console.log(number,message)
    var options = {authorization : 'Your Authorization Key' , message : message ,  numbers : [number]} 
    fast2sms.sendMessage(options).then(response=>{
        console.log(response)
      })
    
}
function sendEmail(Email,Subject,Message){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gamil.com',
        auth: {
          user: 'Your G-Mail Id',
          pass: 'GMail Password'
        }
      });
      
      var mailOptions = {
        from: 'Gmail Id',
        to: Email,
        subject: Subject,
        
        html: Message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

app.post('/setOrders',(req,res)=>{
console.log(req.body)
var order_id='#'+randomstring.generate(7);
var dt = datetime.create();
var time = dt.format('H:M:S');
var products=""
var total=0
console.log(time)
console.log(order_id)

for(var x=0;x<req.body.product.length;x++){
 sqlquery="INSERT INTO ORDERS VALUES('"+order_id+"',"+req.body.customer_id+",'"+req.body.product[x].product+"',"+req.body.product[x].price+",'"+req.body.payment_mode+"','"+req.body.customer_name+"',CURRENT_DATE(),'"+time+"','"+req.body.product[x].image+"')"
 products=products+req.body.product[x].product+","
 total=total+req.body.product[x].price
 console.log(sqlquery)
 connection.query(sqlquery,(err,result)=>{
    if(err) console.log(err)
    
})
}
var order="Order Placed: Your Order for "+products+" with OrderID "+order_id+" Amounting to Rs. "+total+" has been Recieved . Thankyou for Shopping with Mobikart."
var message='<h4> Regards '+req.body.customer_name+'</h4><br/><h4>'+order+'</h4>'
console.log(order)

var phone=req.body.phone
console.log(phone)
sendMessage(order,phone)
sendEmail(req.body.email,'Mobikart Order Placed',message)

res.send({success:true,purchase_time:time})

})
app.post('/sendEmail',(req,res)=>{
    var email=req.body.email
    sqlquery="SELECT PASSWORD,NAME FROM CUSTOMER WHERE EMAIL='"+email+"'"
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        if(result.length>0){
            var message='<h2>Hello '+result[0].NAME+',<br/>Your Password is '+result[0].PASSWORD+' <br/>  You Can Login to Mobikart from <a href="http://localhost:4200/">Here</a></h2><br/><h3> You can Change Your Password from <a href="http://localhost:4200/changePassword?email='+email+'">Here</a></h3>'
            sendEmail(email,'Mobikart Forget Password',message)
            res.send({success:true})
        }
        else res.send({success:false})
    })
})
app.post('/getOrderData',(req,res)=>{
    console.log(req.body)
    sqlquery="SELECT ORDERS.ORDER_ID,ORDERS.PURCHASE_DATE,ORDERS.PAYMENT_MODE,SUM(ORDERS.PRODUCT_PRICE) AS TOTAL,CUSTOMER.ADDRESS,CUSTOMER.CITY,CUSTOMER.STATE,CUSTOMER.PINCODE FROM ORDERS INNER JOIN CUSTOMER ON ORDERS.CUSTOMER_ID=CUSTOMER.CUSTOMER_ID WHERE ORDERS.CUSTOMER_ID="+req.body.customer+" AND ORDERS.PURCHASE_TIME='"+req.body.puchase_time+"' LIMIT 1"
    console.log(sqlquery)
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        else res.send({success:true,data:result})
    })
})
app.post('/getAdminOrders',(req,res)=>{
    if(req.body.id==1){
        sqlquery="select ORDERS.ORDER_ID,ORDERS.CUSTOMER_NAME,ORDERS.PRODUCT_PURCHASED,ORDERS.PRODUCT_PRICE,ORDERS.PAYMENT_MODE,ORDERS.PURCHASE_DATE,ORDERS.PURCHASE_TIME,CONCAT(CUSTOMER.ADDRESS,' ',CUSTOMER.PINCODE,' ',CUSTOMER.CITY,' ',CUSTOMER.STATE) AS ADDRESS ,CUSTOMER.PHONE,CUSTOMER.EMAIL FROM ORDERS INNER JOIN CUSTOMER ON ORDERS.CUSTOMER_ID=CUSTOMER.CUSTOMER_ID"
    }
    else{
        sqlquery="SELECT * FROM ORDERS WHERE CUSTOMER_ID="+req.body.id+""
    }
    connection.query(sqlquery,(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
app.post('/process',function(req,res){
console.log(req.body);

var company=req.body.company;
var product=req.body.product;
var image=imagename;
var range=req.body.range;
var colour=req.body.colour;
var variant=req.body.Variant;
var processor=req.body.processor;
var battery=req.body.battery;
var display=req.body.display;
var camera=req.body.camera;
var available=req.body.available;
var OS=req.body.OS;
available=Boolean(available);




    
    sqlcompany="INSERT IGNORE INTO COMPANY(COMPANY_NAME) VALUES('"+company+"')"; 
    sqlproduct="INSERT INTO PRODUCT(COMPANY_ID,PRODUCT_NAME,PRODUCT_IMAGE,PRICE,COLOUR,VARIANT,BATTERY,DISPLAY,PROCESSOR,CAMERA,AVAILABLE,OS) VALUES((SELECT COMPANY.COMPANY_ID FROM COMPANY WHERE COMPANY_NAME='"+company+"'),'"+product+"','"+image+"','"+range+"','"+colour+"','"+variant+"','"+battery+"','"+display+"','"+processor+"','"+camera+"',"+available+",'"+OS+"')"
    
    connection.query(sqlcompany,(err,result)=>{
        if(err) console.log(err);
        //console.log(result);
        
    
    //res.send("Company Inserted");
    });
    connection.query(sqlproduct,(err,result)=>{
        if(err) console.log(err)
        //console.log(result);
        //res.send("Product Inserted");
    });
res.send(JSON.stringify(req.body));
})

app.get('/ankit',(req,res)=>{
    res.send("Welcome to the Server of Mobikart E-Commerce Website")
})

var server=app.listen(3000,function(){
console.log("Server has Started at port 3000")});
