
define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/_base/html',
  'esri/dijit/Legend',
  'dojo/i18n!./nls/strings',
],
function(declare, BaseWidget, html, Legend, Strings) {
  var clazz = declare([BaseWidget], {

    name: 'Incendis',

    //Capes
    incendis: null,
    cremes: null,
    zhr: null,
    firms: null,
    risc: null,

    legend: null,
    

    postCreate: function(){
      
      //Layers
      this.incendis = this.map.getLayer("Incendis_forestals_9324");
      this.cremes = this.map.getLayer("Cremes_prescrites_1081");
      this.zhr = this.map.getLayer("ZHR_6550");
      this.firms = this.map.getLayer("wms_6618");
      this.risc = this.map.getLayer("wms_5694");

      // Legend
      var legendLayers = [
        {layer: this.zhr, title: Strings.zhrLabel},
        {layer: this.cremes, title: Strings.burnsLabel},
        {layer: this.incendis, title: Strings.wildfiresLabel},
        {layer: this.risc, title: Strings.riskLabel}
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