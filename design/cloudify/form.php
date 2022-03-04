<!DOCTYPE html>
<?php

$valid_route = false;
$date = date("M d Y");

// If the form was submitted

if($_SERVER['REQUEST_METHOD'] == "POST") {
    $valid_route = true;  

    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
    $comments = strip_tags($_POST['comments']);
}

?>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="description" content="Cloudify: become who you always wanted to be, in the cloud." />
        <meta name="keywords" content="cloud, technology, butterfly, cool, fantastic, christina, klassen, chrissi" />
        <title>Thank you for submitting a comment! - Cloudify Service</title>
        <link rel="stylesheet" type="text/css" href="css/reset.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="icon" type="image/png" href="favicon.png" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script type="text/javascript" src="js/script.js"></script>
    </head>
    <body>
        <div id="container">
            <div id="header">
                <div id="logo">
                    
                    <h1><a href="index.html">Cloudify</a></h1>
                    
                </div> <!-- End of logo -->
                <div id="nav">
                    <a href="aboutus.html">About Us</a>
                    <a href="technologies.html">Technologies</a>
                    <a href="friends.html">Friends</a>
                    <a href="contact-us.html">Contact Us</a>
                    
                </div> <!-- End of nav -->
                <div id="tagline">
                    
                </div>
            </div> <!-- End of head -->
                
            <div id="main">
                <section id="form-processing">
                    <?php
                    
                    if ($valid_route){
                        
                        $to = "cloudify@klssn.com";
                        $subject = "Someone submitted your form!";
                        $body = "Date: $date\n Name: $name \n Email address: $email
                                \n Comments: $comments \n\n";
                        mail($to, $subject, $body);
                        
                        print "<h2>Thank you, $name, for submitting the form.</h2>
                                <div><p>I should be in touch with you shortly.</p></div>";

                    } else {
                        print "<h2>Error!</h2>
                                <div><p>You somehow got here via an invalid means.
                                    Go back to the page you came from and begone!
                                </p></div>";
                    }
                    
                    ?>
                </section>
            </div> <!-- End of main. -->
            
            <div id="butterfly-image">
                <img src="images/butterfly.png" alt="" />
                
            </div>
        
        </div> <!-- End of container -->
        <div id="footer">
            <p>
                &copy; <a href="mailto:cloudify@klssn.com">Chrissi Klassen</a> 2013<br />
                Last updated: March 16, 2013<br />
                Calgary, AB
                
            </p>
            
        </div>
        
    </body>
</html>
