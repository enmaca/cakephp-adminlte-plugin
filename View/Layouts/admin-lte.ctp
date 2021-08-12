<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><?php
echo AdminLTE_Header;
?></title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<!-- Bootstrap 3.3.5 -->
  <?php

echo $this->Html->css('AdminLTE.bootstrap');
?>
  <!-- Font Awesome -->
  <?php

echo $this->Html->css('AdminLTE.font-awesome');
?>
  <!-- Ionicons -->
  <?php

echo $this->Html->css('AdminLTE.ionicons');
?>
  <!-- Msg -->
  <?php

echo $this->Html->css('AdminLTE.msg');
?>
  <!-- Theme style -->
  <?php

echo $this->Html->css('AdminLTE.AdminLTE');
?>
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <?php

echo $this->Html->css('AdminLTE.skins/' . AdminLTE_Skin);
?>
<?php

/**
 * Additional CSS
 */
if (! empty($additional_css))
    foreach ($additional_css as $css => $opts)
        echo $this->Html->css($css, $opts);
echo $this->fetch('css');
?>
<!--[if lt IE 9]>
  <?php

echo $this->Html->script('AdminLTE.html5shiv/html5shiv-3.7.3', array(
    'inline' => true
));
?>
  <?php

echo $this->Html->script('AdminLTE.respond/respond-1.4.2', array(
    'inline' => true
));
?>
  <![endif]-->
<?php
/**
 * Additional HeadScripts
 */
if (! empty($head_additional_scripts))
    foreach ($head_additional_scripts as $script => $opts)
        echo $this->Html->script($script, $opts);

?>

    <?php

    echo '<style type="text/css">' . $this->fetch('cssHead') . '</style>';
    ?>
    <?php

    echo $this->fetch('scriptHead');
    ?>
    <?php

    if (Configure::read('RaygunCake.apiKey')) :
        ?>
<script type="text/javascript">
  !function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
  (a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
  f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
  h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
  e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");
</script>
    <?php endif;

    ?>
</head>
<?php
if (AdminLTE_HasPurchasingFeature) :
    ?>
    <style>
    .purchasing_dialog_header {

        background-color: #337AB7;

        padding:16px 16px;

        color:#FFF;

        border-bottom:2px dashed #337AB7;

     }

     .purchasing_dialog_body {
        width: 900px;
    }
    </style>
<?php endif;

?>

<!-- ADD THE CLASS layout-boxed TO GET A BOXED LAYOUT -->
<body class="<?php

echo AdminLTE_BodyClass;
?>">
	<div class="wrapper">
		<header class="main-header"><?php

echo $this->Html->getMainHeaderLogo();
echo $this->Html->getMainHeaderNavBar();
?></header>
		<!-- LeftMainSideBar Element -->
        <?php

        echo $this->element('AdminLTE.left-main-sidebar');
        ?>
        <!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper"> <?php

echo $this->fetch('content');
?> </div>
		<!-- Purchasing request dialogs -->
        <?php
        if (AdminLTE_HasPurchasingFeature)
            echo $this->element('AdminLTE.purchasing-request-dialog');
        ?>
        <!-- Footer -->
		<footer class="main-footer"><?php

echo $this->element('AdminLTE.footer');
?></footer>
		<!-- Control Sidebar -->
	   <?php

    echo $this->element('AdminLTE.control-sidebar');
    ?>
	   <div class="control-sidebar-bg"></div>
	</div>
	<?php

echo $this->fetch('modal-dialogs');
?>
<!-- jQuery 2.2.0 -->
<?php

echo $this->Html->script('AdminLTE.jQuery/jQuery-2.2.4', array(
    'inline' => true
));
?>
<!-- Bootstrap 3.3.5 -->
<?php

echo $this->Html->script('AdminLTE.bootstrap/bootstrap-3.3.6', array(
    'inline' => true
));
?>
<!-- SlimScroll -->
<?php

echo $this->Html->script('AdminLTE.slimScroll/slimscroll-1.3.8', array(
    'inline' => true
));
?>
<!-- FastClick -->
<?php

echo $this->Html->script('AdminLTE.fastclick/fastclick', array(
    'inline' => true
));
?>
<!-- Bootbox 4.4.0 -->
<?php

echo $this->Html->script('AdminLTE.bootbox/bootbox-4.4.0', array(
    'inline' => true
));
?>
<!-- Noty 2.3.8 -->
<?php

echo $this->Html->script('AdminLTE.noty/packaged/noty-2.3.8', array(
    'inline' => true
));
?>
<!-- Center 1.1.1 -->
<?php

echo $this->Html->script('AdminLTE.center/center-1.1.1', array(
    'inline' => true
));
?>
<!-- Msg 1.0.7 -->
<?php

echo $this->Html->script('AdminLTE.msg/msg-1.0.7', array(
    'inline' => true
));
?>
<!-- purchasing modal plugin -->
<?php
if (AdminLTE_HasPurchasingFeature)
    echo $this->Html->script('AdminLTE.purchasing/plugin', array(
        'inline' => true
    ));
?>
<?php

/**
 * Additional BodyScripts
 */
if (! empty($body_additional_scripts))
    foreach ($body_additional_scripts as $script => $opts)
        echo $this->Html->script($script, $opts);

?>
<!-- App -->
<?php

echo $this->Html->script('AdminLTE.adminlte/app', array(
    'inline' => true
));
?>
<!-- AdminLTE Dynamic Script -->
<?php

echo $this->fetch('script');
?>
 <script>
 	$(this).addTemplateSetup(function(){
 	<?php

echo $this->fetch('scriptAddTemplate');
?>
 	});
 	<?php

echo $this->fetch('scriptBody');
?>
 	$(function(){$(document).ready(function(){$(document.body).applyTemplateSetup();});});
 </script>
<script type="text/javascript">
   var request_token = '<?php

echo CakeSession::read('rtoken');
?>';
</script>
</body>
</html>