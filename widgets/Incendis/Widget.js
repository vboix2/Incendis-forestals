
define(['dojo/_base/declare',
  'jimu/BaseWidget'
],
function(declare, BaseWidget) {
  var clazz = declare([BaseWidget], {

    name: 'Incendis',

    //Capes
    incendis: null,
    cremes: null,
    zhr: null,
    firms: null,
    risc: null,

    postCreate: function(){
      this.incendis = this.map.getLayer("Incendis_forestals_9324");
      this.cremes = this.map.getLayer("Cremes_prescrites_1081");
      this.zhr = this.map.getLayer("ZHR_6550");
      this.firms = this.map.getLayer("wms_6618");
      this.risc = this.map.getLayer("wms_5694");
    },

    BotoIncendis: function(){
      if (!this.incendis.visible){
        this.incendis.show();
      } else {
        this.incendis.hide();
      } 
    },

    BotoCremes: function(){
      if (!this.cremes.visible){
        this.cremes.show();
      } else {
        this.cremes.hide();
      } 
    },

    BotoZHR: function(){
      if (!this.zhr.visible){
        this.zhr.show();
      } else {
        this.zhr.hide();
        this.zhrChecked = false;
      } 
    },

    BotoFirms: function(){
      if (!this.firms.visible){
        this.firms.show();
      } else {
        this.firms.hide();
      } 
    },

    BotoRisc: function(){
      if (!this.risc.visible){
        this.risc.show();
      } else {
        this.risc.hide();
      } 
    }
  });
  return clazz;
});