
define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/i18n!./nls/strings',
  'esri/layers/CSVLayer',
  'esri/Color',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/renderers/SimpleRenderer',
  'esri/dijit/Legend',
  'dojo/_base/html',
],
  function (declare, BaseWidget, Strings, CSVLayer, Color, SimpleMarkerSymbol, SimpleRenderer, Legend, html) {
    var clazz = declare([BaseWidget], {

      name: 'Meteo',

      // Layers
      weather: null,
      XDDE: null,
      XEMA: null,
      tempAnual: null,
      tempMensual: null,
      wmsTemperatura: {
        "1": "ATMOSFERA_ATLES6190_TMPGEN", "2": "ATMOSFERA_ATLES6190_TMPFEB",
        "3": "ATMOSFERA_ATLES6190_TMPMARC", "4": "ATMOSFERA_ATLES6190_TMPABRIL",
        "5": "ATMOSFERA_ATLES6190_TMPMAIG", "6": "ATMOSFERA_ATLES6190_TMPJUNY",
        "7": "ATMOSFERA_ATLES6190_TMPJULIO", "8": "ATMOSFERA_ATLES6190_TMPAGOST",
        "9": "ATMOSFERA_ATLES6190_TMPSETE", "10": "ATMOSFERA_ATLES6190_TMPOCT",
        "11": "ATMOSFERA_ATLES6190_TMPNOV", "12": "ATMOSFERA_ATLES6190_TMPDES"
      },
      precAnual: null,
      precMensual: null,
      wmsPrecipitacio: {
        "1": "ATMOSFERA_ATLES6190_PPTGEN", "2": "ATMOSFERA_ATLES6190_PPTFEB",
        "3": "ATMOSFERA_ATLES6190_PPTMARC", "4": "ATMOSFERA_ATLES6190_PPTABRI",
        "5": "ATMOSFERA_ATLES6190_PPTMAIG", "6": "ATMOSFERA_ATLES6190_PPTJUNY",
        "7": "ATMOSFERA_ATLES6190_PPTJULIO", "8": "ATMOSFERA_ATLES6190_PPTAGOST",
        "9": "ATMOSFERA_ATLES6190_PPTSETE", "10": "ATMOSFERA_ATLES6190_PPTOCT",
        "11": "ATMOSFERA_ATLES6190_PPTNOV", "12": "ATMOSFERA_ATLES6190_PPTDES"
      },

      // Selected values
      mapsChecked: false,
      variable: "temp",
      period: "0",

      // Legend
      legend: null,

      postCreate: function () {
        this.inherited(arguments);
        //Layers
        this.weather = this.map.getLayer("NOAA_METAR_current_wind_speed_direction_v1_8525");
        this.XEMA = this.map.getLayer("XEMA_6372");
        this.tempAnual = this.map.getLayer("wms_9115");
        this.tempMensual = this.map.getLayer("wms_8343");
        this.precAnual = this.map.getLayer("wms_347");
        this.precMensual = this.map.getLayer("wms_5172");

        // XDDE Layer
        this.XDDE = new CSVLayer("widgets/Meteo/xdde.csv", {
          columnDelimiter: ";",
          fields: [{ name: "latitude", type: "Number" },
          { name: "longitude", type: "Number" }],
          id: "XDDE",
          visible: false,
          name: "Llamps núvol-terra"
        });
        var blue = new Color([20, 20, 200, 0.8]);
        var marker = new SimpleMarkerSymbol("solid", 5, null, blue);
        var renderer = new SimpleRenderer(marker);
        this.XDDE.setRenderer(renderer);
        this.map.addLayer(this.XDDE);

        // set metadata
        this.metadadesMeteo.innerHTML = Strings.info_text;

        // Legend
        var legendLayers = [
          {layer: this.XEMA, title: Strings.layer_xema},
          {layer: this.XDDE, title: Strings.layer_xdde},
          {layer: this.weather, title: Strings.layer_weather},
          {layer: this.tempAnual, title: Strings.layer_temp},
          {layer: this.tempMensual, title: Strings.layer_temp},
          {layer: this.precAnual, title: Strings.layer_prec},
          {layer: this.precMensual, title: Strings.layer_prec}
        ];

        var legendParams = {
          autoUpdate: true,
          map: this.map,
          layerInfos: legendLayers
        };
        this.legend = new Legend(legendParams, html.create("div", {}, this.legendDiv));

      },

      onOpen: function(){
        this.legend.startup();
      },

      weatherBtn: function () {
        if (!this.weather.visible) {
          this.weather.show();
        } else {
          this.weather.hide();
        }
      },

      xddeBtn: function () {
        if (!this.XDDE.visible) {
          this.XDDE.show();
        } else {
          this.XDDE.hide();
        }
      },

      xemaBtn: function () {
        if (!this.XEMA.visible) {
          this.XEMA.show();
        } else {
          this.XEMA.hide();
        }
      },

      mapsBtn: function () {
        this.hideAll();
        if (!this.mapsChecked) {
          this.showMap();
          this.mapsChecked = true;
        } else {
          this.mapsChecked = false;
        }
      },

      variableBtn: function () {
        this.hideAll();
        if (this.mapsChecked) {
          this.showMap();
        }
      },

      hideAll: function () {
        this.tempAnual.hide();
        this.tempMensual.hide();
        this.precAnual.hide();
        this.precMensual.hide();
      },

      showMap: function () {

        this.readOptions();

        // Temperature selected
        if (this.variable == "temp") {
          if (this.period == "0") {
            this.tempAnual.show();
          } else {
            this.tempMensual.setVisibleLayers([this.wmsTemperatura[this.period]]);
            this.tempMensual.show();
          }

          // Precipitation selected 
        } else if (this.variable == "prec") {
          if (this.period == "0") {
            this.precAnual.show();
          } else {
            this.precMensual.setVisibleLayers([this.wmsPrecipitacio[this.period]]);
            this.precMensual.show();
          }
        }
      },

      readOptions: function () {
        var mapa;
        this.inputForm.mapa.forEach(function (radio) {
          if (radio.checked) {
            mapa = radio.value;
          }
        });
        this.variable = mapa;
        this.period = this.inputForm.period.value;
      }

    });
    return clazz;
  });