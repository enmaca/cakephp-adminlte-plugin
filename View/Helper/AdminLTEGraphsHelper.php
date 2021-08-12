<?php
App::uses('HtmlHelper', 'View/Helper');

class AdminLTEGraphsHelper extends HtmlHelper
{

    public function chartJS($chartName, $options = array())
    {
        $this->script('AdminLTE.chartjs/Chart-2.9.3', array(
            'inline' => false
        ));

        $options += array(
            'title' => __('Title'),
            'height' => '250'
        );
        $options = $this->_initInputField($chartName, $options);
        $html = <<<EOF
<div class="box box-info">
    <div class="box-header with-border">
        <h3 class="box-title">{$options['title']}</h3>
        <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
        </div>
    </div>
    <div class="box-body">
        <div class="chart">
            <canvas id="{$options['id']}" height="{$options['height']}"></canvas>
        </div>
    </div>
</div>
EOF;
        return $html;
    }
}