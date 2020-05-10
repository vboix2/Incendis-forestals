
define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/_base/html',
  'esri/dijit/Legend',
  'dojo/i18n!./nls/strings',
],
function(declare, BaseWidget, html, Legend, Strings) {
  var clazz = declare([BaseWidget], {

    name: 'Terreny',

    //Capes
    usos: null,
    aigua: null,
    rius: null,
    orientacions: null,
    elevacio: null,
    inflamabilitat: null,
    vegetacio: null,
    capesVegetacio: {"0":"AB", "1":"BAT", "2":"BF", "3":"CAT", "4":"DBHm","5":"FCC", "6":"Hmitjana", "7":"VAE"},

    legend: null,
    legendLayers: null,

    postCreate: function(){
      // Layers
      this.usos = this.map.getLayer("TeselaEspana_WFL1_2468");
      this.aigua = this.map.getLayer("Aigua_9752");
      this.rius = this.map.getLayer("Rius_2163");
      this.orientacions = this.map.getLayer("wms_4874");
      this.elevacio = this.map.getLayer("wms_4586");
      this.inflamabilitat = this.map.getLayer("wms_377");
      this.vegetacio = this.map.getLayer("wms_463");

      // Legend
      this.legendLayers = [
        {layer: this.aigua, title: Strings.waterLabel},
        {layer:this.orientacions, title: Strings.orientationLabel},
        {layer:this.elevacio, title: Strings.elevationLabel},
        {layer:this.inflamabilitat, title: Strings.flamLabel},
        {layer:this.vegetacio, title: Strings.treesLabel}
      ];
      var legendParams = {
        autoUpdate: true,
        map: this.map,
        layerInfos: this.legendLayers
      };
      this.legend = new Legend(legendParams, html.create("div", {}, this.legendDiv));
    },

    onOpen: function(){
      this.legend.startup();
    },

    BotoUsos: function(){
      if (!this.usos.visible){
        this.usos.show();
      } else {
        this.usos.hide();
      } 
    },

    BotoAigua: function(){
      if (!this.aigua.visible){
        this.aigua.show();
        this.rius.show();
      } else {
        this.aigua.hide();
        this.rius.hide();
      } 
    },

    BotoOrientacions: function(){
      if (!this.orientacions.visible){
        this.orientacions.show();
      } else {
        this.orientacions.hide();
      } 
    },

    BotoElevacions: function(){
      if (!this.elevacio.visible){
        this.elevacio.show();
      } else {
        this.elevacio.hide();
      } 
    },

    BotoInflamabilitat: function(){
      if (!this.inflamabilitat.visible){
        this.inflamabilitat.show();
      } else {
        this.inflamabilitat.hide();
      } 
    },

    BotoVegetacio: function(){
      this.vegetacio.hide();
      if (!this.vegetacio.visible){
        var valor = this.variables.value;
        this.vegetacio.setVisibleLayers([this.capesVegetacio[valor]]);
        this.vegetacio.show();
      }
    },

    canviVegetacio: function(){
      if (this.vegetacio.visible){
        this.vegetacio.hide();
        var valor = this.variables.value;
        this.vegetacio.setVisibleLayers([this.capesVegetacio[valor]]);
        this.vegetacio.show();
      }
    }

  });
  return clazz;
});