// get specs
var vlOutputComparison = "js/output_by_sector.vg.json";
var vlServicesOverTime = "js/transforming_china.vg.json";
var vlResearchMapFunding = "js/research_maps_funding.vg.json";
var vlResearchMapActivity = "js/research_maps_activity.vg.json";
var vlResearchMapEffort = "js/research_maps_effort.vg.json";
var vlResearchImpacts = "js/research_bubbles.vg.json";
var vlManufacturingBreakup = "js/sector_breakup_manufacturing.vg.json";
var vlServicesBreakup = "js/sector_breakup_services.vg.json";
var vlIPStream = "js/wipo_stream.vg.json";
var vlIPHeatmap = "js/wipo_heatmap.vg.json";  

// embed specs
var opts = {actions:false}
vegaEmbed('#visOutputComp', vlOutputComparison, opts)
vegaEmbed('#visServicesOverTime', vlServicesOverTime, opts)
vegaEmbed('#visResearchMapFunding', vlResearchMapFunding, opts)
vegaEmbed('#visResearchMapActivity', vlResearchMapActivity, opts)
vegaEmbed('#visResearchMapEffort', vlResearchMapEffort, opts)
vegaEmbed('#visResearchImpacts', vlResearchImpacts, opts)
vegaEmbed('#visManufacturingBreakup', vlManufacturingBreakup, opts)
vegaEmbed('#visServicesBreakup', vlServicesBreakup, opts)
vegaEmbed('#visIPStream', vlIPStream, opts)
vegaEmbed('#visIPHeatmap', vlIPHeatmap, opts)
vegaEmbed('#visIPBOP', vlIPBOP, opts)

// function for showing / hiding sector breakup elements based on user interaction
function showSectorBreakup(name) {
  var manufacturingBreakup = document.getElementById("visManufacturingBreakup");
  var manufacturingButton = document.getElementById("manufacturingButton");
  var servicesBreakup = document.getElementById("visServicesBreakup");
  var servicesButton = document.getElementById("servicesButton");

  manufacturingBreakup.style.display = (name == "manufacturing") ? "block" : "none";
  manufacturingButton.className = (name == "manufacturing") ? "pressed" : "unpressed";
  servicesBreakup.style.display = (name == "services") ? "block" : "none";
  servicesButton.className = (name == "services") ? "pressed" : "unpressed";
}

// function for showing / hiding research map elements based on user interaction
function showResearchMap(name) {
  var effortMap = document.getElementById("visResearchMapEffort");
  var effortButton = document.getElementById("effortButton");
  var effortSliderDiv = document.getElementById("mapSliderEffort");
  var effortSlider = document.getElementsByName("RotateWorldEffort")[0];
  var fundingMap = document.getElementById("visResearchMapFunding");
  var fundingButton = document.getElementById("fundingButton");
  var fundingSliderDiv = document.getElementById("mapSliderFunding");
  var fundingSlider = document.getElementsByName("RotateWorldFunding")[0];
  var activityMap = document.getElementById("visResearchMapActivity");
  var activityButton = document.getElementById("activityButton");
  var activitySliderDiv = document.getElementById("mapSliderActivity");
  var activitySlider = document.getElementsByName("RotateWorldActivity")[0];

  if (effortMap.style.display=="block") {
    oldSlider = effortSlider;
  } else if (fundingMap.style.display=="block") {
    oldSlider = fundingSlider;
  } else if (activityMap.style.display=="block") {
    oldSlider = activitySlider;
  } else {
    oldSlider = null;
  }

  effortMap.style.display = (name=="effort") ? "block" : "none";
  effortButton.className = (name=="effort") ? "pressed" : "unpressed";
  effortSliderDiv.style.display = effortMap.style.display;

  fundingMap.style.display = (name=="funding") ? "block" : "none";
  fundingButton.className = (name=="funding") ? "pressed" : "unpressed";
  fundingSliderDiv.style.display = fundingMap.style.display;

  activityMap.style.display = (name=="activity") ? "block" : "none";
  activityButton.className = (name=="activity") ? "pressed" : "unpressed";
  activitySliderDiv.style.display = activityMap.style.display;
  
  // persist the rotation value to the currently displayed element
  if (oldSlider != null) {
    console.log(oldSlider)
    var event = new Event("change")
    if (effortSliderDiv.style.display == "block") {
      effortSlider.value = oldSlider.value;
      effortSlider.dispatchEvent(event);
    } else if (fundingSliderDiv.style.display == "block") {
      fundingSlider.value = oldSlider.value;
      fundingSlider.dispatchEvent(event);
    } else {
      activitySlider.value = oldSlider.value;
      activitySlider.dispatchEvent(event);
    }
  }

}

// show the desired default elements on load (where the shown element depends on user interaction)
window.addEventListener("load", function(){
    showResearchMap("funding");
    showSectorBreakup("manufacturing");
});