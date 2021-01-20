# Mobikart-Mobile-E-Commerce-Website
MySQL, Angular, Express.js and Node.js based Mobile E-Commerce Store

**Frontend -> Angular**

**Backend -> Node.js**

**Middileware -> Express.js**

**Database -> MySQL**

It is an E-Commerce Website which aims to sell the mobile phones and have almost all the functions and pages that an ecomm website have, the project is divided into two major sections

**1. Customer**

     1.1 Home/ Dashboard 
     1.2 Shop 
     1.3 Cart 
     1.4 Checkout
     1.5 Billing Page (With SMS and Billing PDF)
     1.6 Orders 
     1.7 Login/ Signup/ Change Password/ Forgot Password Screen (OTP Verification)
 
**2. Admin**

     2.1 Admin Login
     2.2 Admin Home / Dashboard
     2.3 Add Product to Website Screen (Adding Product to Server)
     2.4 All Products Management Screen (Products of Server Management)
     2.5 All Customer Orders Management Screen
     

**Note:**
```
  1.For Using the SMS Function after Order using FAST2SMS SMS API you need to genereate your own API key at [FAST2SMS](https://docs.fast2sms.com/) and paste it in the backend index.js
  2. You Need to upload the Phone Product Photo at time of Adding Product to Server
  3. All the Phone Product Photos will be stored into the uploads folder at the backend
 ```

  
     




## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

You'll need Angular 2+ (https://angular.io/guide/setup-local) [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com))  [Express.js] (https://www.npmjs.com/package/express) installed on your computer

```
angular @v7.0 or higher
node @v10.16.0 or higher
npm @6.9.0 or higher
express @4.17.1 or higher
git @2.17.1 or higher
```


## Setting & Using Database

```
# Moving to database table folder
$ cd DB

# Login to root
$ mysql -uroot -p
Your Password:

# Create Database
$ CREATE DATABASE Mobikartdb;

# Create New  Database User
$ create user 'Mobikart'@'localhost' identified by 'Mobikart@123';   

# Grant All Privileges to User
$ grant all privileges on Mobikartdb.* to 'Mobikart'@'localhost' with grant option;

# Now quit from mysql, then login as accounting by typing
$ mysql -uMobikart -p
$ Your Password: Mobikart@1234

# Choose Database
$ use Mobikartdb

# Create Customer Table in Database
$ source Customer.sql
$ source Company.sql
$ source Orders.sql
$ source Product.sql
$ source Product_Review.sql

(Tables will be created)

# Use SELECT Statement to check the data after the CRUD Operations into the MySql Tables.

```


## How To Use 

From your command line, clone and run Mobikart E-Commerce Website:

```
# Clone this repository
$ git clone https://github.com/ankit1222000/Mobikart-Mobile-E-Commerce-Website.git
```

### Starting & Using FrontEnd

```
# Install  Angular dependencies
$ npm install

# Start Angular Development Server
$ ng serve
(this will start the project on http://localhost:4200/)

# To see the Dashboard you can head over to http://localhost:4200/dashboard.
# To see the Admin Panel you can head over to http://localhost:4200/admin.  (**Password:Admin123**)

# For Production use
$ ng build --prod
```

### Starting & Using BackEnd

```
$ cd API

# Install Backend Express API Dependencies
$ npm install 

# Start Express API server
$ node index.js

(You will notice now the data appers on the dashboard and is coming form the server running at Port:3000)

```



**Some Screenshots of the Project**

### Home Page

![Home](https://user-images.githubusercontent.com/60085587/105044644-f9ee5700-5a8c-11eb-8e84-3aacf4482835.PNG)
![Home 2](https://user-images.githubusercontent.com/60085587/105044610-f064ef00-5a8c-11eb-911a-5ca90a0f94b5.PNG)


### Home Page Product Ads
![Add](https://user-images.githubusercontent.com/60085587/105048288-62d7ce00-5a91-11eb-9f70-16489d989071.PNG)

### Shop
![Shop](https://user-images.githubusercontent.com/60085587/105044714-0e325400-5a8d-11eb-9b2d-f97f5466c438.PNG)

### Product
![Product](https://user-images.githubusercontent.com/60085587/105044685-04a8ec00-5a8d-11eb-9592-f433f38c2e82.PNG)


### Product Review and Specifications
![Review](https://user-images.githubusercontent.com/60085587/105044709-0d012700-5a8d-11eb-8fb4-1db7e7e2d20d.PNG)
![Specification](https://user-images.githubusercontent.com/60085587/105044739-168a8f00-5a8d-11eb-9aec-83cddfce5800.PNG)


### Cart
![Cart](https://user-images.githubusercontent.com/60085587/105044578-e80cb400-5a8c-11eb-8485-b370bf5e3e4a.PNG)

### Checkout
![Checkout](https://user-images.githubusercontent.com/60085587/105044586-e93de100-5a8c-11eb-86e6-faef535c5c77.PNG)

### Billing

![Ordered](https://user-images.githubusercontent.com/60085587/105044665-ffe43800-5a8c-11eb-9a7d-5ad700815eae.PNG)
![Billing](https://user-images.githubusercontent.com/60085587/105056504-48562280-5a9a-11eb-931a-b25f9f1337c0.PNG)

### Orders
![Customer Orders](https://user-images.githubusercontent.com/60085587/105044599-ec38d180-5a8c-11eb-9031-a84a64444aa8.PNG)


## Admin Panel

### Admin Dash
![Admin DAsh](https://user-images.githubusercontent.com/60085587/105044770-1f7b6080-5a8d-11eb-97ac-41267990369f.PNG)


### Add Product to Server
![Add Product](https://user-images.githubusercontent.com/60085587/105044743-17bbbc00-5a8d-11eb-93ac-33ba786251d1.PNG)

### Managing Products on Website Server 
![Product List](https://user-images.githubusercontent.com/60085587/105044671-01156500-5a8d-11eb-93a1-f433a8576c0e.PNG)

### All Customer Orders List
![Admin Orders List](https://user-images.githubusercontent.com/60085587/105044575-e6db8700-5a8c-11eb-9d02-696952757e62.PNG)


## Customer Login , Change Password , Forgot Password and New Customer Panel

![l](https://user-images.githubusercontent.com/60085587/105057030-d03c2c80-5a9a-11eb-8dfb-1fb5f08307c8.PNG)
![Register](https://user-images.githubusercontent.com/60085587/105057036-d16d5980-5a9a-11eb-9197-a38bc45a27bb.PNG)
![Change Password](https://user-images.githubusercontent.com/60085587/105057015-cd413c00-5a9a-11eb-8960-c0d0b64ac406.PNG)
![Forgot Password](https://user-images.githubusercontent.com/60085587/105057023-cf0aff80-5a9a-11eb-882a-f2ba2e72c46f.PNG)



