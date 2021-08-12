<?php
App::uses('HtmlHelper', 'View/Helper');

class AdminLTEHtmlHelper extends HtmlHelper
{

    public $_sectionBlockOptions = array();

    public $_divBlockOptions = array();

    public $_controlSideBarStartOptions = array(
        'color' => 'dark'
    );

    public $_timeLine = array();

    // required vars for tabs helpers
    public $_contentBlockOptions = array();

    public $_contentBlockTabs = array();

    public $_currentTab = null;

    public function __construct(View $View, $settings = array())
    {
        parent::__construct($View, $settings);
        $this->_tags['section'] = '<section %s>%s</section>';
        $this->_tags['divLTE'] = '<div %s>%s</div>';
        $this->_tags['span'] = '<span %s>%s</span>';
        /*
         *
         */
    }

    /**
     * If exist, it print the Javascript, Css and Html Elements files for get logo
     *
     * @return string
     */
    public function getMainHeaderLogo()
    {
        if (file_exists(APP . 'View/Elements/main-header-logo.ctp') && is_readable(APP . 'View/Elements/main-header-logo.ctp')) {
            $css_file = APP . 'View/Elements/css/main-header-logo.css';
            if (file_exists($css_file)) {
                $this->_View->start('cssHead');
                include_once $css_file;
                $this->_View->end();
            }
            $js_file = APP . 'View/Elements/js/main-header-logo.js';
            if (file_exists($js_file)) {
                $this->_View->start('scriptBody');
                include_once $js_file;
                $this->_View->end();
            }
            ob_start();
            require_once APP . 'View/Elements/main-header-logo.ctp';
            return ob_get_clean();
        } else if (file_exists(CakePlugin::path('AdminLTE') . 'View/Elements/main-header-logo.ctp') && is_readable(CakePlugin::path('AdminLTE') . 'View/Elements/main-header-logo.ctp')) {
            $css_file = CakePlugin::path('AdminLTE') . 'View/Elements/css/main-header-logo.css';
            if (file_exists($css_file)) {
                $this->_View->start('cssHead');
                include_once $css_file;
                $this->_View->end();
            }
            $js_file = CakePlugin::path('AdminLTE') . 'View/Elements/js/main-header-logo.js';
            if (file_exists($js_file)) {
                $this->_View->start('scriptBody');
                include_once $js_file;
                $this->_View->end();
            }
            ob_start();
            require_once CakePlugin::path('AdminLTE') . 'View/Elements/main-header-logo.ctp';
            return ob_get_clean();
        } else {
            return '<!-- [NoMainHeaderLogoDefined] -->';
        }
    }

    /**
     * If exist, it print the Javascript, Css and Html Elements files for get navbar
     *
     * @return string
     */
    public function getMainHeaderNavBar()
    {
        if (file_exists(APP . 'View/Elements/main-header-nav-bar.ctp') && is_readable(APP . 'View/Elements/main-header-nav-bar.ctp')) {
            $css_file = APP . 'View/Elements/css/main-header-nav-bar.css';
            if (file_exists($css_file)) {
                $this->_View->start('cssHead');
                include_once $css_file;
                $this->_View->end();
            }
            $js_file = APP . 'View/Elements/js/main-header-nav-bar.js';
            if (file_exists($js_file)) {
                $this->_View->start('scriptBody');
                include_once $js_file;
                $this->_View->end();
            }
            ob_start();
            require_once APP . 'View/Elements/main-header-nav-bar.ctp';
            return ob_get_clean();
        } else if (file_exists(CakePlugin::path('AdminLTE') . 'View/Elements/main-header-nav-bar.ctp') && is_readable(CakePlugin::path('AdminLTE') . 'View/Elements/main-header-nav-bar.ctp')) {
            $css_file = CakePlugin::path('AdminLTE') . 'View/Elements/css/main-header-nav-bar.css';
            if (file_exists($css_file)) {
                $this->_View->start('cssHead');
                include_once $css_file;
                $this->_View->end();
            }
            $js_file = CakePlugin::path('AdminLTE') . 'View/Elements/js/main-header-nav-bar.js';
            if (file_exists($js_file)) {
                $this->_View->start('scriptBody');
                include_once $js_file;
                $this->_View->end();
            }
            ob_start();
            require_once CakePlugin::path('AdminLTE') . 'View/Elements/main-header-nav-bar.ctp';
            return ob_get_clean();
        } else {
            return '<!-- [NoMainHeaderNavBarDefined] -->';
        }
    }

    /**
     * Set Html tags used by this helper.
     *
     * @param
     *            $key
     * @param
     *            $value
     */
    public function setTag($key, $value)
    {
        $this->_tags[$key] = $value;
    }

    /**
     * Initializes a Html section using ob_start()
     *
     * @param array $options
     *            An array of Html attributes
     * @return null
     */
    public function sectionStart($options = array())
    {
        array_push($this->_sectionBlockOptions, $options);
        ob_start();
        return null;
    }

    /**
     * Finalize a Html section using ob_get_clean(), print the result
     */
    public function sectionEnd()
    {
        $buffer = ob_get_clean();
        $options = array_pop($this->_sectionBlockOptions);
        print $this->useTag('section', $options, $buffer);
    }

    /**
     * Initializes a html div using ob_start()
     *
     * @param array $options
     *            An array of Html attributes
     * @return null
     */
    public function divStart($options = array())
    {
        array_push($this->_divBlockOptions, $options);
        ob_start();
        return null;
    }

    /**
     * Finalize a html div using ob_get_clean(), print the result
     */
    public function divEnd()
    {
        $buffer = ob_get_clean();
        $options = array_pop($this->_divBlockOptions);
        print $this->useTag('divLTE', $options, $buffer);
    }

    /**
     * Initializes the sidebar tag in the right side of the screen using ob_start()
     *
     * @param array $options
     *            An array of Html attributes
     * @return null
     */
    public function controlSideBarStart($options = array())
    {
        $this->_controlSideBarStartOptions = array_merge($this->_controlSideBarStartOptions, $options);
        ob_start();
        return null;
    }

    /**
     * Return html structure of control-sidebar
     *
     * $tabs_functions = array(
     * 'control_tabs' => '',
     * 'control_panes' => array(
     * 'tab_one' => array(
     * 'fa_icon' => 'wrench',
     * 'tab_li_class' => 'class_tab',
     * 'tab_pane_class' => 'class_pane',
     * 'content' => 'html code'
     * )
     * )
     * );
     *
     * ### Options
     * - `control_tabs` - String Html code of head tabs.
     * - `control_panes` - Array|String Html for tabs content.
     * - `tab_one` - Index from tab.
     * - `fa_icon` - Icon of tab.
     * - `tab_li_class` - Class of li tag in tabs header.
     * - `tab_pane_class` - Class of div tag in panes.
     * - `content` - Html code of content in body tabs.
     *
     * @param array $tabs_options
     *            Options and contents of the tabs
     * @return string Tabs and panes of sidebar
     */
    public function controlSideBarStruct($tabs_options = array())
    {
        $tab_options_default = array(
            'fa_icon' => 'wrench',
            'tab_li_class' => '',
            'tab_pane_class' => '',
            'content' => ''
        );
        $tabs_li = array();
        $tabs_panes = array();
        $error_building_sidebar = '<!-- ERROR BUILDING SIDEBAR -->';
        $html_final = '';
        $active_tab = true;

        if (! empty($tabs_options['control_panes']) && is_array($tabs_options['control_panes'])) {
            foreach ($tabs_options['control_panes'] as $tab => $options) {
                try {
                    $final_options = array_merge($tab_options_default, $options);
                    $tabs_li[] = '<li class="' . ($active_tab ? 'active' : '') . ' ' . $final_options['tab_li_class'] . '">
                                        <a href="#' . $tab . '" data-toggle="tab" aria-expanded="false"><i class="fa fa-' . $final_options['fa_icon'] . '"></i></a>
                                    </li>';

                    $tabs_panes[] = '<div id="' . $tab . '" class="tab-pane ' . $final_options['tab_pane_class'] . ' ' . ($active_tab ? 'active' : '') . '">
                                        <div>
                                            ' . $final_options['content'] . '
                                        </div>
                                    </div>';
                    $active_tab = false;
                } catch (Exception $e) {
                    return $error_building_sidebar;
                }
            }
            if (! empty($tabs_options['control_tabs']) && is_string($tabs_options['control_tabs'])) {
                $html_final .= $tabs_options['control_tabs'];
            } else
                $html_final .= '<!-- Create the tabs -->
                        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
                            ' . implode('', $tabs_li) . '
                        </ul>';

            $html_final .= '<!-- Tab panes -->
                        <div class="tab-content">
                            ' . implode('', $tabs_panes) . '
                        </div>';
        } elseif ((! empty($tabs_options['control_panes']) && is_string($tabs_options['control_panes'])) && (! empty($tabs_options['control_tabs']) && is_string($tabs_options['control_tabs']))) {
            $html_final .= $tabs_options['control_tabs'] . '
                        <!-- Tab panes -->
                        <div class="tab-content">
                            ' . $tabs_options['control_panes'] . '
                        </div>';
        }

        return (! empty($html_final) ? $html_final : $error_building_sidebar);
    }

    /**
     * Finalize the sidebar tag in the right side of the screen using ob_get_clean()
     *
     * @param array $options
     */
    public function controlSideBarEnd($options = array())
    {
        $buffer = ob_get_clean();
        $_sidebar_html_str = '<aside class="control-sidebar control-sidebar-' . $this->_controlSideBarStartOptions['color'] . '" style="position: fixed;">' . $buffer . '</aside><div class="control-sidebar-bg"></div>';
        if (! defined('AdminLTE_ControlSideBar_HTML'))
            define('AdminLTE_ControlSideBar_HTML', $_sidebar_html_str);
    }

    /**
     * See: https://datatables.net/extensions/responsive/examples/column-control/classes.html
     *
     * ##Options
     * - headers - Headers for table
     * - nowrap - If is set to false, take the table width 100%.
     *
     * @param string $fieldName
     * @param array $options
     * @param array $data
     * @return string
     */
    public function dataTableStruct($fieldName, $options = array(), $data = array())
    {
        $this->script('AdminLTE.datatables/1.10.15/js/jquery.dataTables', array(
            'inline' => false
        ));
        $this->script('AdminLTE.datatables/1.10.15/js/dataTables.bootstrap', array(
            'inline' => false
        ));

        $this->script('AdminLTE.datatables/1.10.15/extensions/Responsive/js/dataTables.responsive', array(
            'inline' => false
        ));

        $this->script('AdminLTE.datatables/1.10.15/extensions/Buttons/js/dataTables.buttons', array(
            'inline' => false
        ));

        $this->script('AdminLTE.datatables/1.10.15/extensions/Buttons/js/buttons.colVis', array(
            'inline' => false
        ));

        $this->script('AdminLTE.datatables/1.10.15/extensions/Buttons/js/buttons.html5', array(
            'inline' => false
        ));

        $this->script('AdminLTE.adminlte/datatables', array(
            'inline' => false
        ));

        $this->css('AdminLTE.datatables/1.10.15/css/dataTables.bootstrap', array(
            'inline' => false
        ));

        $this->css('AdminLTE.datatables/1.10.15/extensions/Responsive/css/responsive.dataTables', array(
            'inline' => false
        ));

        $this->css('AdminLTE.datatables/1.10.15/extensions/Responsive/css/responsive.bootstrap', array(
            'inline' => false
        ));

        $this->css('AdminLTE.datatables/1.10.15/extensions/Buttons/css/buttons.dataTables', null, array(
            'inline' => false
        ));

        $this->css('AdminLTE.datatables/1.10.15/extensions/Buttons/css/buttons.bootstrap', null, array(
            'inline' => false
        ));

        if ($fieldName !== false) {
            $class = '';

            $class .= (isset($options['nowrap']) && ($options['nowrap'] === false) ? '' : ' nowrap');

            $html = '<div class="table-responsive">';
            $html .= '<table id ="' . Inflector::variable($fieldName) . '" style="width: 100%" class="table responsive table-striped table-bordered ' . $class . '">';
            $html .= '<thead>' . ((! empty($options['headers'])) ? $this->tableHeaders($options['headers']) : '') . '</thead>';
            if (empty($data))
                $html .= '<tbody>' . ((! empty($options['body'])) ? $options['body'] : '') . '</tbody>';
            else {
                $ncols = count($options['headers']);
                foreach ($data as $_data) {
                    $cols = 0;
                    $html .= '<tr>';
                    foreach ($_data as $k => $v) {
                        $html .= '<td>' . $v . '</td>';
                        $cols ++;
                    }
                    if ($ncols > $cols)
                        $html .= str_repeat('<td>&nbsp;</td>', ($ncols - $cols));
                    $html .= '</tr>';
                }
            }
            $html .= '<tfoot>' . ((! empty($options['footer'])) ? $options['footer'] : '') . '</tfoot>';
            $html .= '</table>';
            $html .= '</div>';
            return $html;
        }
    }

    /**
     * Creates a bootstrap modal in the block modal-dialogs,
     * if it does not exist it will create the block.
     *
     * ### Options
     * - `dialog-header` - Header title of the modal.
     * - `dialog-content` - The Html content for the body of the dialog.
     * - `save-btn-label` - Label of the save button.
     * - `close-btn-label` - Label of the cancel button.
     * - `dialog-footer` - Html code in footer dialog.
     * - `save-btn-content` - Html code for add to dialog-footer.
     * - `close-btn-class` - Class style from bootstrap for button close, can be btn-default, btn-primary, etc.
     * - `save-btn-class` - Class style from bootstrap for button save, can be btn-default, btn-primary, etc.
     *
     * @param String $fieldName
     *            If dialog-header option don't exist, takes the value of $fieldName
     * @param array $options
     *            Array of options.
     * @return mixed
     */
    public function dialog($fieldName, $options = array())
    {
        if (empty($options['dialog-header']))
            $options['dialog-header'] = $fieldName;

        if (empty($options['dialog-content']))
            $options['dialog-content'] = '&nbsp;';

        if (isset($options['save-btn-label']) && $options['save-btn-label'] !== false && empty($options['save-btn-label'])) {
            $options['save-btn-label'] = 'Save changes';
        }

        if (empty($options['close-btn-label']))
            $options['close-btn-label'] = 'Close';

        $dialogId = Inflector::variable($fieldName . 'Dialog');

        if (empty($options['dialog-footer'])) {
            if (empty($options['close-btn-class']))
                $options['close-btn-class'] = 'btn-default';

            if (empty($options['save-btn-class']))
                $options['save-btn-class'] = 'btn-primary';

            $options['dialog-footer'] .= <<<EOF
                <button id="{$dialogId}CloseBtn" type="button" class="btn {$options['close-btn-class']}" data-dismiss="modal">{$options['close-btn-label']}</button>
EOF;
            if (isset($options['save-btn-content']) && ! empty($options['save-btn-content']))
                $options['dialog-footer'] .= '&nbsp;' . $options['save-btn-content'];
            else if (isset($options['save-btn-label']) && $options['save-btn-label'] !== false) {
                $options['dialog-footer'] .= <<<EOF
                    <button id="{$dialogId}SaveBtn" type="button" class="btn {$options['save-btn-class']}">{$options['save-btn-label']}</button>
EOF;
            }
        }
        $html_data = '';
        $style_wh = array();
        if (isset($options['height']) && ! empty($options['height']))
            $style_wh[] = 'height:' . $options['height'];

        if (isset($options['width']) && ! empty($options['width']))
            $style_wh[] = 'width:' . $options['width'];

        $style_wh_str = '';
        if (! empty($style_wh))
            $style_wh_str = ' style="' . str_replace('%', '%%', join(';', $style_wh)) . '" ';

        $html_data .= <<<EOF
        <div id="{$dialogId}" tabindex="-1" role="dialog" class="modal fade">
            <div class="modal-dialog" {$style_wh_str}>
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 id="{$dialogId}Header" class="modal-title"><i class="icon-hdd"></i> %s</h4>
                    </div>
                    <div id="{$dialogId}Body" class="modal-body">%s</div>
                    <div id="{$dialogId}Footer" class="modal-footer">%s</div>
                </div>
            </div>
        </div>
EOF;
        $this->_View->append('modal-dialogs', vsprintf($html_data, array(
            $options['dialog-header'],
            $options['dialog-content'],
            $options['dialog-footer']
        )));

        return $dialogId;
    }

    /**
     * Creates a `<button>` tag.
     * The type attribute defaults to `type="submit"`
     * You can change it to a different value by using `$options['type']`.
     *
     * ### Options:
     *
     * - `type` - type of button that can take the next options:
     * `app`
     * `dropdown`
     * `box-tool-icon`
     * - `button-size` - Size of the button
     * - `button-type` - Class style from bootstrap that can be btn-default, btn-primary, etc.
     *
     * @param string $fieldName
     *            The button's caption.
     * @param array $options
     *            Array of options and HTML attributes.
     * @return string A HTML button tag.
     * @link http://book.cakephp.org/2.0/en/core-libraries/helpers/form.html#FormHelper::button
     */
    public function button($fieldName, $options = array())
    {
        if (! empty($options['type'])) {
            switch ($options['type']) {
                case 'app':
                    return $this->buttonApp($fieldName, $options);
                    break;
                case 'dropdown':
                    return $this->buttonDropDown($fieldName, $options);
                    break;
                case 'box-tool-icon':
                    return $this->buttonBoxToolIcon($fieldName, $options);
                    break;
            }
        }

        $for_attr = '';
        if (array_key_exists('for', $options))
            $for_attr = 'for="' . $options['for'] . '"';

        if (! array_key_exists('button-size', $options))
            $options['button-size'] = '';

        if (! array_key_exists('button-type', $options))
            $options['button-type'] = 'btn-primary';

        if (array_key_exists('id', $options)) {
            $field_id = $options['id'];
            unset($options['id']);
        } else
            $field_id = Inflector::variable($fieldName . 'Button');

        $style = '';
        if (array_key_exists('style', $options)) {
            $style = ' style="' . $options['style'] . '"';
            unset($options['style']);
        }

        if (array_key_exists('nolabel', $options)) {
            $fieldName = '';
            unset($options['nolabel']);
        }

        $icon_str = '';
        if (array_key_exists('button-icon', $options)) {
            $icon_str = '<i class="fa fa-' . $options['button-icon'] . '"></i>';
            unset($options['button-icon']);
        }

        $onclick_str = '';
        if (isset($options['onclick'])) {
            $onclick_str = ' onclick="' . $options['onclick'] . '"';

            unset($options['onclick']);
        }

        $action = 'form';
        if (array_key_exists('action', $options))
            $action = $options['action'];

        $attributes_str = '';
        if (array_key_exists('attributes', $options) && is_array($options['attributes'])) {
            $attrb = [];
            foreach ($options['attributes'] as $attr => $value) {
                $attrb[] = $attr . '="' . $value . '"';
            }
            $attributes_str = implode(' ', $attrb);
            unset($options['attributes']);
        }

        $html_data = <<<EOF
        <button id="{$field_id}" {$for_attr} type="{$action}" class="btn {$options['button-size']} {$options['button-type']}"{$style}{$onclick_str}{$attributes_str}>{$icon_str}{$fieldName}</button>
EOF;
        return $html_data;
    }

    /**
     *
     * @param
     *            $fieldName
     * @param array $options
     * @return string
     */
    public function buttonBoxToolIcon($fieldName, $options = array())
    {
        if (isset($options['id']))
            $field_id = $options['id'];
        else
            $field_id = Inflector::variable($fieldName . 'Button');

        $data_toggle = '';
        if (isset($options['data-toggle']))
            $data_toggle = ' data-toggle="' . $options['data-toggle'] . '"';

        $data_widget = '';
        if (isset($options['data-widget']))
            $data_widget = ' data-widget="' . $options['data-widget'] . '"';

        $html_data = <<<EOF
        <button id="{$field_id}" class="btn btn-box-tool" type="button" {$data_toggle} {$data_widget}><i class="fa fa-{$options['button-icon']}"></i></button>
EOF;
        return $html_data;
    }

    /**
     *
     * @param
     *            $fieldName
     * @param array $options
     * @return string
     */
    public function buttonApp($fieldName, $options = array())
    {
        if (empty($options['button-icon']))
            $options['button-icon'] = 'plus';
        $fieldNotification = '';
        if (! empty($options['button-notification-color']) && ! empty($options['button-notification-label']))
            $fieldNotification = '<span class="badge bg-' . $options['button-icon'] . '">' . $options['button-notification-label'] . '</span>';

        if (empty($options['href']))
            $options['href'] = '#';

        if (isset($options['id']))
            $field_id = $options['id'];
        else
            $field_id = Inflector::variable($fieldName . 'Button');

        $on_click = '';
        if (isset($options['onclick']))
            $on_click = ' onclick="' . $options['onclick'] . '"';

        $style = '';
        if (isset($options['style']))
            $style = ' style="' . $options['style'] . '"';

        $html_data = <<<EOF
        <a id="{$field_id}" href="{$options['href']}" class="btn btn-app" {$on_click} {$style}>{$fieldNotification}<i class="fa fa-{$options['button-icon']}"></i>{$fieldName}</a>
EOF;
        return $html_data;
    }

    /**
     *
     * @param
     *            $fieldName
     * @param array $options
     * @return string
     */
    public function buttonDropDown($fieldName, $options = array())
    {
        if (empty($options['button-type'])) {
            $options['button-type'] = 'btn-primary';
        }

        if (empty($options['button-size'])) {
            $options['button-size'] = 'btn-sm';
        }

        $html_data = <<<EOF
        <div class="btn-group">
            <button type="button" class="btn {$options['button-type']} {$options['button-size']} dropdown-toggle" data-toggle="dropdown">
                {$fieldName} <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-arrow" role="menu">%s</ul>
        </div>
EOF;

        if (isset($options['id']))
            $field_id = $options['id'];
        else
            $field_id = Inflector::variable($fieldName . 'Button');

        $menu_opts = array();
        foreach ($options['menu'] as $opt_menu_data) {
            if (empty($opt_menu_data['href']))
                $opt_menu_data['href'] = 'javascript:;';
            if (! isset($opt_menu_data['type']))
                $opt_menu_data['type'] = 'button';
            switch ($opt_menu_data['type']) {
                case 'divider':
                    $menu_opts[] = '<li class="divider"></li>';
                    break;
                default:
                    $onclick_string = (isset($opt_menu_data['onclick'])) ? ' onclick="' . $opt_menu_data['onclick'] . '"' : '';
                    $menu_opts[] = '<li><a id="' . Inflector::variable($field_id . '_' . $opt_menu_data['name']) . ((isset($opt_menu_data['ref'])) ? '" ref="' . $opt_menu_data['ref'] : '') . '" href="' . $opt_menu_data['href'] . '" ' . $onclick_string . '>' . $opt_menu_data['name'] . '</a></li>';
                    break;
            }
        }

        return vsprintf($html_data, join('', $menu_opts));
    }

    /**
     *
     * @param
     *            $fieldName
     * @param array $options
     */
    public function startTimeLine($fieldName, $options = array())
    {
        $this->_timeLine = array();
    }

    /**
     *
     * @param
     *            $label
     * @param
     *            $header
     * @param
     *            $body
     * @param
     *            $footer
     * @param
     *            $time
     * @param array $options
     */
    public function addTimeLine($label, $header, $body, $footer, $time, $options = array())
    {
        $defaultOpts = array(
            'label-color' => 'red',
            'icon' => 'envelope',
            'icon-color' => 'blue',
            'header-class' => '',
            'body-class' => '',
            'footer-class' => ''
        );

        $options += $defaultOpts;

        $timeLine = <<<EOF
    <li class="time-label"><span class="bg-{$options['label-color']}"> {$label} </span></li>
    <li>
        <i class="fa fa-{$options['icon']} bg-{$options['icon-color']}"></i>
        <div class="timeline-item">
EOF;
        if (! empty($time)) {
            $timeLine .= <<<EOF
<span class="time"><i class="fa fa-clock-o"></i> {$time}</span>
EOF;
        }
        $timeLine .= <<<EOF
            <h3 class="timeline-header {$options['header-class']}">{$header}</h3>
            <div class="timeline-body {$options['body-class']}">{$body}</div>
            <div class="timeline-footer {$options['footer-class']}">{$footer}</div>
        </div>
    </li>
EOF;

        $this->_timeLine[] = $timeLine;
    }

    /**
     */
    public function endTimeLine()
    {
        echo '<ul class="timeline">' . join("\n", $this->_timeLine) . '<li><i class="fa fa-clock-o bg-gray"></i></li></ul>';
    }

    /**
     * Print a progress bar with a fieldname
     *
     * ### Options
     * - `type` - Style of adminlte progress bar.
     * - `label` - Label that is used how the title.
     *
     * @param string $fieldName
     *            Title of the progress bar.
     * @param array $options
     *            Array of options
     */
    public function pogressbar($fieldName, $options = array())
    {
        $defaultOpts = array(
            'label' => $fieldName,
            'type' => 'bar-primary',
            'value' => 0
        );
        $options += $defaultOpts;

        if (isset($options['id']))
            $field_id = $options['id'];
        else
            $field_id = Inflector::variable($fieldName . 'ProgressBar');

        $progressBar = <<<EOF
<p>{$options['label']}</p>
<div class="progress">
    <div id="{$field_id}" class="progress-bar progress-{$options['type']} progress-bar-striped" role="progressbar" aria-valuenow="{$options['value']}" aria-valuemin="0" aria-valuemax="100" style="width: {$options['value']}%">
        <span class="sr-only"></span>
    </div>
</div>
EOF;
        echo $progressBar;
        $this->_View->append("scriptBody", "var _set$field_id = function(percentage){ $('#$field_id').attr('style','width: ' + percentage + '%');};\n");
    }

    /**
     *
     * @param array $options
     * @return null
     */
    public function contentBlockStart($options = array())
    {
        ob_start();
        $this->_contentBlockOptions = $options;
        return null;
    }

    public function contentBlockEnd()
    {
        $buffer = ob_get_clean();
        $options = $this->_contentBlockOptions;
        $this->_contentBlockOptions = array();
        $tabs = $this->_contentBlockTabs;
        return $this->contentBlock($buffer, $options, $tabs);
    }

    /**
     *
     * @param
     *            $tab_title
     * @return null
     */
    public function contentTabStart($tab_title)
    {
        $this->_currentTab = $tab_title;
        ob_start();
        return null;
    }

    /**
     *
     * @return null
     */
    public function contentTabEnd()
    {
        $this->_contentBlockTabs[$this->_currentTab] = ob_get_clean();
        $this->_currentTab = null;
        return null;
    }

    /**
     *
     * @param
     *            $buffer
     * @param array $options
     * @param array $tabs
     */
    public function contentBlock($buffer, $options = array(), $tabs = array())
    {
        $_html = '<div class="nav-tabs-custom">';
        $_html .= '<ul class="nav nav-tabs pull-right">';

        $tab_iterator = count($tabs);

        if ($options['header'] !== false && ! is_array($options['header'])) {

            $_tmpHeader = $options['header'];
            unset($options['header']);
            $options['header']['title'] = $_tmpHeader;
        }

        $_defaultOptions = array(
            'variant' => 'default',
            'color' => 'primary'
        );

        $_options = array_merge($_defaultOptions, $options);

        $_html .= '<div class="box-header' . ((! empty($_options['header']['border'])) ? ' with-border' : '') . '">';
        $_html .= '<h3 class="box-title">' . ((! empty($_options['header']['icon'])) ? '<i class="fa fa-' . $_options['header']['icon'] . '"></i> ' : '') . $_options['header']['title'] . '</h3>';
        if (! empty($_options['box-tools'])) {
            $_html .= '<div class="box-tools pull-right">';
            if (! empty($_options['box-tools']['label']))
                $_html .= '<span class="label label-' . $_options['color'] . '">' . $_options['box-tools']['label'] . '</span>';
            if (! empty($_options['box-tools']['collapsable']))
                $_html .= '<button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="' . $_options['box-tools']['collapsable'] . '"><i class="fa fa-minus"></i></button>';
            if (! empty($_options['box-tools']['remove']))
                $_html .= '<button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="' . $_options['box-tools']['remove'] . '"><i class="fa fa-times"></i></button>';
            $_html .= '</div>';
        }
        $_html .= '</div>';
        $_html .= '</ul>';

        $_html .= '<div class="box-body">';

        if ($tab_iterator > 0) {
            $tabs_content = array();
            $tabs_headers = array_reverse($tabs);
            foreach ($tabs_headers as $header => $content) {
                $link_ref = '#tab_' . $tab_iterator . '-' . $tab_iterator;
                $class = ($tab_iterator == 1) ? ' class="active"' : '';
                $_html .= '<li' . $class . ' id="dynamic_tab_' . $tab_iterator . '"><a href="' . $link_ref . '" data-toggle="tab">' . $header . '</a></li>';
                $tab_iterator --;
                $tabs_content[] = $content;
            }

            $_html .= '<div class="tab-content">';
            foreach ($tabs_content as $content) {
                $class = ($tab_iterator == 1) ? 'active' : '';
                $div_id = 'tab_' . $tab_iterator . '-' . $tab_iterator;
                $_html .= '<div class="tab-pane ' . $class . '" id="' . $div_id . '">' . $content . '</div>';
                $tab_iterator --;
            }
            $_html .= '</div>'; // end div tab-content
        } else {
            $_html .= $buffer;
        }

        $_html .= '</div>';

        if (! empty($options['footer']))
            $_html .= '<div class="box-footer">' . $options['footer'] . '</div>';

        $_html .= '</div>'; // end div nav-tabs-custom
        echo $_html;
    }

    public function prettyDate($lastDate = null, $include_time = true, $abbreviated = false, $language = 'es')
    {
        $new_date = explode(' ', $lastDate);
        list ($year, $month, $day) = explode('-', $new_date[0]);

        if ($language == 'es') {
            $months = array(
                1 => 'Ene',
                2 => 'Feb',
                3 => 'Mar',
                4 => 'Abr',
                5 => 'May',
                6 => 'Jun',
                7 => 'Jul',
                8 => 'Ago',
                9 => 'Sep',
                10 => 'Oct',
                11 => 'Nov',
                12 => 'Dic'
            );
            $monthsComplete = array(
                1 => 'Enero',
                2 => 'Febrero',
                3 => 'Marzo',
                4 => 'Abril',
                5 => 'Mayo',
                6 => 'Junio',
                7 => 'Julio',
                8 => 'Agosto',
                9 => 'Septiembre',
                10 => 'Octubre',
                11 => 'Noviembre',
                12 => 'Diciembre'
            );
        } else {
            $months = array(
                1 => 'Jan',
                2 => 'Feb',
                3 => 'Mar',
                4 => 'Apr',
                5 => 'May',
                6 => 'Jun',
                7 => 'Jul',
                8 => 'Aug',
                9 => 'Sep',
                10 => 'Oct',
                11 => 'Nov',
                12 => 'Dec'
            );
            $monthsComplete = array(
                1 => 'January',
                2 => 'February',
                3 => 'March',
                4 => 'April',
                5 => 'May',
                6 => 'June',
                7 => 'July',
                8 => 'August',
                9 => 'September',
                10 => 'October',
                11 => 'November',
                12 => 'December'
            );
        }

        if ($abbreviated) {
            $date = $day . "/" . $months[intval($month)] . "/" . $year;

            if ($language != 'es')
                $date = $months[intval($month)] . "/" . $day . "/" . $year;
        } else {
            $date = $day . " de " . $monthsComplete[intval($month)] . " del " . $year;

            if ($language != 'es')
                $date = $monthsComplete[intval($month)] . " " . $day . ", " . $year;
        }

        if (! empty($new_date[1])) {
            list ($hour, $min, $sec) = explode(':', $new_date[1]);
            if ($hour >= 12) {
                if ($hour > 12) {
                    $hour = $hour - 12;
                    if (strlen($hour) == 1) {
                        $hour = "0" . $hour;
                    }
                }
                $meridian = "p.m.";
            } else {
                $meridian = "a.m.";
            }
            if ($include_time) {

                if ($language == 'es')
                    $date .= " a las " . $hour . ":" . $min . ":" . $sec . " " . $meridian;
                else
                    $date .= "  " . $hour . ":" . $min . ":" . $sec . " " . $meridian;
            }
        }

        return $date;
    }
}
