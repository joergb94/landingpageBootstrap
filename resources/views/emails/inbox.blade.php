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


.header {
    background-color: rgb(61, 56, 104); 
    width: 100%; 
    padding: 10px;
    min-height: 300px;
    text-align: center;
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 37vh;
}

/* Medium screens (tablets, 768px and below) */
@media screen and (max-width: 768px) {
    .header {
        background-color: rgb(61, 56, 104); 
        width: 100%; 
        padding: 10px;
        min-height: 300px;
        text-align: center;
        display: flex; 
        justify-content: center; 
        align-items: center; 
        height: auto; 
        margin: auto;
    }
}



.column {
    float: left;
    width: 50%;
    padding: 10px;
    min-height: 300px;
    text-align: center;
}
.text-mail{
    padding-top:50px;
}


/* Medium screens (tablets, 768px and below) */
@media screen and (max-width: 768px) {
    .column {
        width: 100%;
        float: none;
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
        padding-top:100px;
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
        <img src="https://i.pinimg.com/originals/78/05/28/780528c2466c9284374cb1809ddd9203.png" style="width: 100%; max-width: 600px; height: auto; margin: auto;">
    </div>
</div>
<div class="row">
<div class="column" style="background-color:white;">
  		<h2 class="text-aqua text-mail">Te informamos que...</h2>
        <h3>Nuestro equipo se encuentra revisando tu consulta y nos pondremos en contacto contigo a la mayor brevedad posible para proporcionarte una atención personalizada.</h3>
  </div>
  <div class="column" style="background-color:white;">
  <h2 class="text-aqua text-mail">Gracias por contactarnos</h2>
    <img style ="width:100px; height:100px;" src="https://img.icons8.com/nolan/96/new-message.png" alt="flexbetta">
  </div>
</div>
<div class="row">
 <div class="column" style="background-color:#cccccc;">
  <h1 class="text-mail">Nuestros servicios</h1>
  <img style ="width:100px; height:100px;" src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/networking-manager.png" alt="flexbetta">
       
  </div>
  <div class="column" style="background-color:#cccccc;  text-align: left;">
  		<h2 style="padding-top:50px">¿Quieres conocer más </h2>
        <h2>sobre nuestros </h2>
        <h2>servicios?</h2>
  		<a href="{{ \Request::root() }}" class="button-flex-link" target="_blank" >Ver más</a>
  </div>
</div>

<div class="footer">
	<a href="https://www.facebook.com/Flexbetta"  target="_blank">
      <img class="icon-f"  src="https://img.icons8.com/glyph-neue/64/FFFFFF/facebook.png" alt="facebook"/>
   </a>
   <a href="https://www.instagram.com/flexbetta/"  target="_blank">
      <img class="icon-f" src="https://img.icons8.com/glyph-neue/64/FFFFFF/instagram-new--v1.png" alt="instagram"/>
   </a>
</div>

</body>
</html>