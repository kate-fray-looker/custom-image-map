const dumpToConsole = function(message, obj) {
    console.log(message, JSON.stringify(obj, null, 2));
}

const default_options = {
  // Image Options
  imageURL: {
    section: "Image",
    type: "string",
    label: "Background Image URL",
    display: "select",
    values: [
      {"PUBG": "https://user-images.githubusercontent.com/688415/52364982-acff4a80-2a46-11e9-9bda-2de135bb4872.png"},
      {"Darts": "http://freepngimages.com/wp-content/uploads/2017/01/winmau-dartboard.png"}
    ],
    default: "https://i.ebayimg.com/images/i/221428428152-0-1/s-l1000.jpg",
  },
  
  // Scale and Padding
  minX: {
    section: "Scales",
    type: "number",
    label: "Min X",
    display: "number",
    placeholder: 0,
    default: 0,
    display_size: "half",
  },
  maxX: {
    section: "Scales",
    type: "number",
    label: "Max X",
    display: "number",
    placeholder: 10,
    default: 10,
    display_size: "half",
  },
  minY: {
    section: "Scales",
    type: "number",
    label: "Min Y",
    display: "number",
    placeholder: 0,
    default: 0,
    display_size: "half",
  },
  maxY: {
    section: "Scales",
    type: "number",
    label: "Max Y",
    display: "number",
    placeholder: 10,
    default: 10,
    display_size: "half",
  },
  paddingVertical: {
    section: "Scales",
    type: "number",
    label: "Padding Vertical",
    display: "number",
    placeholder: 0.02,
    default: 0.02,
    display_size: "half",
  },
  paddingHorizontal: {
    section: "Scales",
    type: "number",
    label: "Padding Horizontal",
    display: "number",
    placeholder: 0.02,
    default: 0.02,
    display_size: "half",
  },
  // Dev Options
  debugOutput: {
    section: "Debug",
    type: "boolean",
    label: "vis",
    default: "false",
    display_size: "half",
  },
  dumpData: {
    section: "Debug",
    type: "boolean",
    label: "data",
    default: "false",
    display_size: "half",
  },
  dumpConfig: {
    section: "Debug",
    type: "boolean",
    label: "config",
    default: "false",
    display_size: "half",    
  },
  dumpQueryResponse: {
    section: "Debug",
    type: "boolean",
    label: "queryResponse",
    default: "false",
    display_size: "half",    
  },
};

const vis = {
  options: default_options,

  create: function(element, config) {
        var csslink  = document.createElement('link');
        csslink.rel  = 'stylesheet';
        csslink.type = 'text/css';
        csslink.href = 'https://raw.githack.com/ContrastingSounds/Looker-Custom-Vis/leaflet_images_dev/leaflet_images/leaflet_image_overlay.css';
        csslink.crossorigin = "";
        document.head.appendChild(csslink);

        this.container = element.appendChild(document.createElement("div"));
        this.container.id = "map_container";
    },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    if (config.dumpData) { dumpToConsole("data: ", data) }
    if (config.dumpConfig) { dumpToConsole("config: ", config) }
    if (config.dumpQueryResponse) { dumpToConsole("queryResponse: ", queryResponse) }

    var LeafIcon = L.Icon.extend({});
    const chartHeight = element.clientHeight - 16;

    function displayVis(scenarioImage, config, data=[]) {
      var scaleLengthX = config.maxX - config.minX;
      var scaleLengthY = config.maxY - config.minY;

      var trim_top = trim_bottom = config.paddingVertical;
      var trim_left = trim_right = config.paddingHorizontal;


      // Create HTML elements and load Leaflet map
      // Removes map_element if already present
      const map_container = document.getElementById('map_container');
      map_container.setAttribute("style", "background-color:white");
      var map_element = document.getElementById('map');
      if (map_element) {
          map_container.removeChild(map_element);
      }
      map_element = map_container.appendChild(document.createElement("div"));
      map_element.setAttribute("style", "height:" + chartHeight + "px");
      map_element.id = "map";

      var map = L.map('map', {
          crs: L.CRS.Simple,
          minZoom: -5,
          zoomSnap: 0.2,
          zoomControl: false,
          attributionControl: false,
      });

    function loadBackground() {
      let image = new Image();
      image.onload = function() {
        displayVis(this, config, data);
      }
      image.src = config.imageURL;
    }

    loadBackground();
  }
}

looker.plugins.visualizations.add(vis);
