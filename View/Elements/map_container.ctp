<?php
/**
 * Include if exists CSS Styles
 */
if (file_exists(dirname(__FILE__) . '/css/' . basename(__FILE__, 'ctp') . 'css')) {
    $this->start('cssHead');
    include_once dirname(__FILE__) . '/css/' . basename(__FILE__, 'ctp') . 'css';
    $this->end();
}
/**
 * Include if exists JS Code
 */
if (file_exists(dirname(__FILE__) . '/js/' . basename(__FILE__, 'ctp') . 'js')) {
    $this->start('scriptBody');
    include_once dirname(__FILE__) . '/js/' . basename(__FILE__, 'ctp') . 'js';
    $this->end();
}
$this->Html->controlSideBarStart();
?>
Control Side Bar
<?php
    $this->Html->controlSideBarEnd();
    $this->Html->sectionStart([
        'class' => 'content-header'
    ]);
?>
<h1>
    Map Widget <small>Example for Google Maps Widget</small>
</h1>
<?= (defined('AdminLTE_Breadcrumb')) ? AdminLTE_Breadcrumb : '' ?>
<?= $this->Html->sectionEnd(); ?>
<?= $this->Html->sectionStart([
    'class' => 'content'
]) ?>
<?php
    $debug_col = [];
    if ($map_options['debuggable']) {
        $map_size = 6;
        $debug_col['size'] = 6;
        $debug_col['content'] = $this->element('AdminLTE.map_debugger', [
            'map_options' => $map_options
        ]);
    } else {
        $map_size = intval($map_options['container_size']);
        $debug_col['size'] = 0;
        $debug_col['content'] = '';
    }
?>
<?= $this->Form->inputRow([
        'size' => $map_size,
        'content' => $this->element('AdminLTE.map', [
            'map_options' => $map_options
        ])
    ],
    $debug_col, [
        'settings' => [
            'pre' => '<hr>'
        ]
]); ?>
<?= $this->Html->script('AdminLTE.jQuery/jQuery-2.2.4') ?>
<?= $this->Html->script('https://js.pusher.com/4.3/pusher.min.js') ?>
<?= $this->Html->script("https://maps.googleapis.com/maps/api/js?key={$google_maps_key}&libraries=visualization") ?>
<script type="text/javascript">
    var m_markers = JSON.parse('<?= json_encode($map_options['markers']) ?>');
    var m_layer = JSON.parse('<?= json_encode($map_options['layer']) ?>');
    var new_markers = [];
    var polylines = [];
    var markers = [];
    var map = null;

    $(document).ready(function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: <?= $map_options['center']['latitude'] ?>, lng: <?= $map_options['center']['longitude'] ?>},
            zoom: <?= $map_options['zoom'] ?>,
            mapTypeId: '<?= $map_options['type'] ?>',
            disableDefaultUI: <?= $map_options['disable_default_ui'] ? 'true' : 'false' ?>
        });

        if (typeof m_layer.type !== 'undefined') {
            switch (m_layer.type) {
                case 'heatmap':
                    var m_data = [];

                    $.each(m_layer.data, function (index, value) {
                        m_data.push(new google.maps.LatLng(value[0], value[1]))
                    });

                    var heatmap = new google.maps.visualization.HeatmapLayer({
                        data: m_data
                    });
                    heatmap.setMap(map);
                    break;
                case 'traffic':
                    var trafficLayer = new google.maps.TrafficLayer();
                    trafficLayer.setMap(map);
                    break;
                default:
                    break;
            }
        }

        $.each(m_markers, function (index, value) {

            // We need at least the position for the marker
            if (typeof value.position !== 'undefined') {
                var options = {
                    'position': new google.maps.LatLng(value.position[0], value.position[1]),
                    'map': map
                };
                if (typeof value.label !== 'undefined') {
                    options['label'] = value.label;
                }
                if (typeof value.title !== 'undefined') {
                    options['title'] = value.title;
                }
                var marker = new google.maps.Marker(options);
                markers.push(marker);
            }
        });

        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = <?= ((Configure::read('debug') > 0) ? 'true' : 'false') ?>;

        var pusher = new Pusher('<?= $pusher_key ?>', {
            cluster: '<?= $pusher_cluster ?>',
            forceTLS: true
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {

            json = JSON.parse(data.payload);
            if (json.type === 'FeatureCollection') {

                clearMapObjects();

                $.each(json.features, function (index, value) {

                    if (value.geometry.type === 'LineString') {
                        var driverCoordinates = [];
                        $.each(value.geometry.coordinates, function (i, v) {
                            driverCoordinates.push({
                                'lat': v[0],
                                'lng': v[1]
                            });
                        });
                        var drivePath = new google.maps.Polyline({
                            path: driverCoordinates,
                            geodesic: true,
                            strokeColor: '#FF0000',
                            strokeOpacity: 1.0,
                            strokeWeight: 2
                        });

                        drivePath.setMap(map);
                        polylines.push(drivePath);
                    }
                });
            }
        });

        $('#get_geojson').click(function () {
            var m_url = $('#url').val();

            if (m_url) {
                try {
                    new URL(m_url);
                } catch (_) {
                    alert('Invalid URL');
                    return;
                }
                $(this).addClass('disabled')
                    .html($('<img />', {src: '/img/ajax-loader.gif', width: 25}));
                $.ajax({
                    url: '<?= Router::url(['controller' => 'AdminLTEMap', 'action' => 'downloadGeoJson', 'plugin' => 'AdminLTE']) ?>',
                    data: {url: m_url},
                    cache: false,
                    type: 'POST',
                    dataType: 'json',
                    success: function (json) {
                        if (json.success) {
                            $('#geojson').val(JSON.stringify(json.data, null, 2));
                            drawPolyline(json.data);
                        } else {
                            alert(json.errorMsg);
                        }
                    }, error: function () {
                        alert('<?= __('Error in AJAX request') ?>');
                    }, complete: function () {
                        $('#get_geojson').removeClass('disabled')
                            .html('<?= __('Get and Draw') ?>');
                    }
                });
            } else {
                var m_data = $('#geojson').val();
                if (m_data) {
                    try {
                        m_data = JSON.parse(m_data);
                    } catch (e) {
                        alert('Invalid JSON');
                        return;
                    }
                    drawPolyline(m_data);
                } else {
                    alert('<?= __('No data in URL neither in GeoJson text area') ?>');
                }
            }
        });
    });
    
    function drawPolyline(data) {
        if (data.type === 'FeatureCollection') {

            var first_point = null;
            clearMapObjects();

            $.each(data.features, function (index, value) {

                var properties = null;

                if ($.type(value.properties) === 'object') {
                    properties = value.properties;
                } else if ($.type(value.properties) === 'array') {
                    properties = value.properties.pop();
                }
                if (typeof properties.name === 'undefined')
                    return; // Corrupt data
                
                if (value.geometry.type === 'LineString' && properties.name === 'gmap_overview_polyline') {
                    var driverCoordinates = [];

                    $.each(value.geometry.coordinates, function (i, v) {
                        driverCoordinates.push({
                            'lat': v[1],
                            'lng': v[0]
                        });
                        if (first_point === null) {
                            first_point = new google.maps.LatLng(v[1], v[0]);
                        }
                    });
                    var drivePath = new google.maps.Polyline({
                        path: driverCoordinates,
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });

                    drivePath.setMap(map);
                    polylines.push(drivePath);
                }

                if (value.geometry.type === 'Point' && properties.name === 'gmap_snaptoroad_point') {
                    var marker = new google.maps.Marker({
                        'position': new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]),
                        'map': map
                    });
                    console.log(marker);
                    new_markers.push(marker);
                }
            });
            map.setCenter(first_point);
            map.setZoom(13);
        }
    }

    function clearMapObjects() {
        for(var i = 0; i < polylines.length; i++) {
            polylines[i].setMap(null);
        }
        for(var j = 0; j < new_markers.length; j++) {
            new_markers[j].setMap(null);
        }
        new_markers = [];
        polylines = [];
    }

    function getBounds() {
        var response = {};
        if (map !== null) {
            var bounds = map.getBounds();
            if (bounds !== undefined) {
                var ne = bounds.getNorthEast(),
                    sw = bounds.getSouthWest();

                response = {
                    'north_east': [ne.lat(), ne.lng()],
                    'south_west': [sw.lat(), sw.lng()]
                }
            }
        }
        return response;
    }
</script>
<?= $this->Html->sectionEnd() ?>
