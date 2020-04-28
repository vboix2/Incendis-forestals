
define(['dojo/_base/declare',
  'jimu/BaseWidget'
],
function(declare, BaseWidget,) {
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

    postCreate: function(){
      this.usos = this.map.getLayer("TeselaEspana_WFL1_2468");
      this.aigua = this.map.getLayer("Aigua_9752");
      this.rius = this.map.getLayer("Rius_2163");
      this.orientacions = this.map.getLayer("wms_4874");
      this.elevacio = this.map.getLayer("Terrain_5119");
      this.inflamabilitat = this.map.getLayer("wms_377");
      this.vegetacio = this.map.getLayer("wms_463");
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