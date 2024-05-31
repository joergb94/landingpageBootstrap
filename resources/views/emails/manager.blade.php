<!DOCTYPE html>
<html lang="en">
<head>
<title>CSS Template</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    margin: 0;
    padding: 0;
}


.header2 {
    background-color: #3d3868;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    padding: 30px;
    text-align: center;
    font-size: 35px;
    color: white;
}
.header {
    background-color: #3d3868;
    background-image: url("https://i.pinimg.com/originals/78/05/28/780528c2466c9284374cb1809ddd9203.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    padding: 30px;
    text-align: center;
    font-size: 35px;
    color: white;
    height:500px;
}
/* Responsive styles for medium screens (laptops) */
@media screen and (max-width: 2000px) {
    .header {
        padding: 20px;
        font-size: 28px;
        height:475px;
    }
}

/* Responsive styles for medium screens (laptops) */
@media screen and (max-width: 1200px) {
    .header {
        padding: 20px;
        font-size: 28px;
        height:300px;
    }
}

/* Responsive styles for medium screens (tablets) */
@media screen and (max-width: 768px) {
    .header {
        padding: 20px;
        font-size: 28px;
        height:250px;
    }
}

/* Responsive styles for small screens (phones) */
@media screen and (max-width: 480px) {
    .header {
        padding: 15px;
        font-size: 24px;
          height:150px;
    }
}


.column {
    float: left;
    width: 100%;
    padding: 10px;
    min-height: 300px;
    text-align: center;
}
.text-mail{
    padding-top:15%;
}

/* Medium screens (tablets, 768px and below) */
@media screen and (max-width: 768px) {
    .column {
        width: 100%;
        float: none;
    }
    
    .text-mail{
        padding-top:15%;
    }
}

/* Small screens (phones, 480px and below) */
@media screen and (max-width: 480px) {
    .column {
        width: 100%;
        float: none;
        padding: 5px; /* Reduce padding for smaller screens */
    }
    
    .text-mail{
        padding-top:35%;
    }
}

.row:after {
    content: "";
    display: table;
    clear: both;
}

.text-aqua {
    color: #438E8E;
}

.footer {
    background-color: #3d3868;
    padding: 10px;
    text-align: center;
    color: white;
}

.button-flex-link {
    background-color: #3d3868;
    border: none;
    color: white !important;
    padding: 10px 20px;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
}

.button-flex-link:hover {
    background-color: #817ab8;
    color: white;
}

.icon-f, .icon-mail, .icon-logo {
    color: white;
}

.icon-f {
    width: 24px;
    height: 24px;
}

.icon-mail {
    width: 150px;
    height: 150px;
    padding-top: 10%;
}

.icon-logo {
    min-width: 300px;
    padding-top: 10%;
}
</style>
</head>
<body>
<div class="row">
    <div class="header">
    </div>
    <div class="header2">
    	<img width="96" height="96" src="https://img.icons8.com/nolan/96/e-learning.png" alt="e-learning"/>
      <h3 style="color: white;">¡Tienes un nuevo mensaje!</h3>
</div>
</div>
<div class="row">
   <div class="column" style="background-color:white; text-aling:center;">
  	  	<h2 class="text-aqua">Datos de mensaje</h2>
          <h3>Nombre: <p>{{$name}}</p></h3>
          <h3>Correo: <p>{{$email}}</p></h3>
          <h3>Telefono: <p>{{$phone}}</p></h3>
          <h3>Mensaje: <p>{{$description}}</p></h3>
          <a href="{{ \Request::root() }}/adminFlex/inboxes" class="button-flex-link" target="_blank" >Ver mas</a>
  </div>
  
</div>

<div class="footer">
</div>

</body>
</html>


