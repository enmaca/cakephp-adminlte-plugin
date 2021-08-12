<?php
App::uses('HtmlHelper', 'View/Helper');

class AdminLTEWidgetsHelper extends HtmlHelper
{

    public $_defaultBoxOptions = array(
        'variant' => 'default'
    );

    public $helpers = [
        'Html'
    ];

    private $available_map_layers = [
        'heatmap',
        'traffic'
    ];

    private $available_map_types = [
        'roadmap',
        'satellite',
        'hybrid',
        'terrain'
    ];

    private $default_map_options = null;

    private $map_options = [
        // By default Monterrey center
        'center' => [
            'latitude' => 25.686613,
            'longitude' => - 100.316116
        ],
        'disable_default_ui' => false,
        'zoom' => 8,
        'type' => 'roadmap',
        'layer' => [], // This is an array because some layers need params
        'markers' => [],
        'debuggable' => true,
        'container_size' => 6, // Fully supported Only when debuggable is false, in any other case the row in divided in 2 cols
        'disable_zoom' => false
    ];

    public function __construct(View $view, $settings = array())
    {
        parent::__construct($view, $settings);

        if (! empty($settings['map_options'])) {
            $this->default_map_options = $this->map_options;
            $this->__setMapOptions($settings['map_options']);
        }
    }

    private function __setMapOptions(&$map_options)
    {
        if (! empty($map_options['center'])) {
            $this->map_options['center'] = $map_options['center'];
        }
        if (! empty($map_options['zoom'])) {
            $this->map_options['zoom'] = $map_options['zoom'];
        }
        if (! empty($map_options['type']) && in_array($map_options['type'], $this->available_map_types)) {
            $this->map_options['type'] = $map_options['type'];
        }
        if (! empty($map_options['markers']) && is_array($map_options['markers'])) {
            $this->map_options['markers'] = $map_options['markers'];
        }
        if (! empty($map_options['layer']['type']) && in_array($map_options['layer']['type'], $this->available_map_layers)) {
            $this->map_options['layer'] = $map_options['layer'];
        }
        if (isset($map_options['debuggable'])) {
            $this->map_options['debuggable'] = $map_options['debuggable'];
        }
        if (! empty($map_options['container_size'])) {
            $this->map_options['container_size'] = $map_options['container_size'];
        }
        if (isset($map_options['disable_default_ui'])) {
            $this->map_options['disable_default_ui'] = $map_options['disable_default_ui'];
        }
        if (isset($map_options['disable_zoom'])) {
            $this->map_options['disable_zoom'] = $map_options['disable_zoom'];
        }
    }

    public function drawMap($map_options = null)
    {
        /*
         * Override default/pre-defined parameters?
         */
        if (is_array($map_options)) {
            $this->map_options = $this->default_map_options;
            $this->__setMapOptions($map_options);
        }
        /*
         * The google maps API KEY is read from the container (Main) Project
         * because every project can have a different API Key
         */
        $google_maps_key = Configure::read('google_maps_key');
        $map_options = $this->map_options;

        if (empty($google_maps_key)) {
            throw new BadRequestException('Missing Google Maps API key');
        }
        $this->_View->set(compact('google_maps_key', 'map_options'));
        return $this->_View->render('AdminLTE.Elements/map_container', false);
    }

    /*
     * array (
     * 'full-color|color' => 'blue|yellow|red|green'
     * 'fa-icon' => ''
     * 'text' = 'text'
     * 'number' => 'number'
     * 'progress-bar => array( 'percentage' => '70', 'description' => 'description' )
     * )
     */
    /**
     *
     * @param array $options
     *            array(
     *            'type' => 'info|more_info',
     *            'full-color' => 'red',
     *            'color' => 'yellow',
     *            'fa-icon' => 'calendar',
     *            'number' => 45,
     *            'text' => 'New Order',
     *            'href' => 'https://www.google.com',
     *            'href-icon' => 'hand-o-right',
     *            'progress' => array(
     *            'percentage' => 67,
     *            'description' => 'Sesenta y siete',
     *            )
     * @return string
     * @link https://adminlte.io/themes/AdminLTE/pages/widgets.html
     */
    public function infoBox($options = array())
    {
        $html_data = '<div class="' . ((! empty($options['type']) && $options['type'] == 'more_info') ? 'small' : 'info') . '-box' . ((! empty($options['full-color'])) ? ' bg-' . $options['full-color'] : '') . '">';

        if (! empty($options['type']) && $options['type'] == 'more_info') {
            if (isset($options['number']) || ! empty($options['text']))
                $html_data .= '<div class="inner"><h3>' . (isset($options['number']) ? intval($options['number']) : '0') . '</h3> <p>' . (! empty($options['text']) ? $options['text'] : '') . '</p></div>';

            if (! empty($options['fa-icon']))
                $html_data .= '<div class="icon"><i class="fa fa-' . $options['fa-icon'] . '"></i></div>';

            if (! empty($options['href']))
                $html_data .= '<a href="' . $options['href'] . '" class="small-box-footer">' . (! empty($options['href-text']) ? $options['href-text'] : 'More info') . ' <i class="fa fa-' . (! empty($options['href-icon']) ? $options['href-icon'] : 'arrow-circle-right') . '"></i></a>';
        } elseif (! empty($options['type']) && $options['type'] == 'info') {
            if (! empty($options['fa-icon']))
                $html_data .= '<span class="info-box-icon ' . ((! empty($options['color'])) ? ' bg-' . $options['color'] : '') . '"><i class="fa fa-' . $options['fa-icon'] . '"></i></span>';

            $html_data .= '<div class="info-box-content"><span class="info-box-text">' . $options['text'] . '</span><span class="info-box-number">' . $options['number'] . '</span>';

            if (! empty($options['progress']))
                $html_data .= '<div class="progress"><div class="progress-bar" style="width: ' . $options['progress']['percentage'] . '%"></div></div><span class="progress-description">' . $options['progress']['description'] . '</span>';
            $html_data .= '</div>';
        }

        $html_data .= '</div>';

        return $html_data;
    }

    /**
     *
     * @param $options array(
     *            'header' => array(
     *            'title' => 'Header',
     *            'border' => true,
     *            )
     *            'footer' => 'Footer'
     *            'variant' => 'default|primary|info|warning|success|danger',
     *            'box-tools' => array(
     *            'collapsable' => 'collapsable tooltip',
     *            'remove' => 'remove tooltip',
     *            'label' => 'label title',
     *            'input' => 'place holder'
     *            ),
     *            'loading-state' => true
     * @return NULL
     */
    public function defaultBoxStart($options = array())
    {
        $this->_defaultBoxOptions = array_merge($this->_defaultBoxOptions, $options);
        ob_start();
        return null;
    }

    public function defaultBoxEnd($return = false)
    {
        $buffer = ob_get_clean();
        $_box_html_str = '<div class="box box-' . $this->_defaultBoxOptions['variant'] . '" ' . $this->process_box_params('box-params') . '>';
        if ($this->_defaultBoxOptions['header'] !== false) {
            $_box_html_str .= '<div class="box-header' . ((! empty($this->_defaultBoxOptions['header']['border'])) ? ' with-border' : '') . '">';
            $_box_html_str .= '<h3 class="box-title">' . $this->_defaultBoxOptions['header']['title'] . '</h3>';
            if (! empty($this->_defaultBoxOptions['box-tools'])) {
                $_box_html_str .= '<div class="box-tools pull-right">';
                if (! empty($this->_defaultBoxOptions['box-tools']['label']))
                    $_box_html_str .= '<span class="label label-primary">' . $this->_defaultBoxOptions['box-tools']['label'] . '</span>';
                if (! empty($this->_defaultBoxOptions['box-tools']['collapsable']))
                    $_box_html_str .= '<button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="' . $this->_defaultBoxOptions['box-tools']['collapsable'] . '"><i class="fa fa-minus"></i></button>';
                if (! empty($this->_defaultBoxOptions['box-tools']['remove']))
                    $_box_html_str .= '      <button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="' . $this->_defaultBoxOptions['box-tools']['remove'] . '"><i class="fa fa-times"></i></button>';
                $_box_html_str .= '</div>';
            }
            $_box_html_str .= '</div>';
        }

        $_box_html_str .= '<div class="box-body">' . $buffer . '</div>';
        if (! empty($this->_defaultBoxOptions['footer']))
            $_box_html_str .= '<div class="box-footer">' . $this->_defaultBoxOptions['footer'] . '</div>';
        $_box_html_str .= '</div>';

        if ($return == false)
            print $_box_html_str;
        else
            return $_box_html_str;
    }

    /**
     * Processes an array of parameters given at _defaultBoxOptions.
     *
     * @param string $params
     *            Index for search in _defaultBoxOptions
     * @return string
     */
    private function process_box_params($params = '')
    {
        if (empty($params) || ! is_string($params) || ! isset($this->_defaultBoxOptions[$params]))
            return '';

        $elements = [];

        foreach ($this->_defaultBoxOptions[$params] as $index => $param) {
            if (! is_string($param))
                continue;

            if (is_numeric($index))
                array_push($elements, $param);
            else {
                array_push($elements, $index . '="' . $param . '"');
            }
        }

        return implode(' ', $elements);
    }
}