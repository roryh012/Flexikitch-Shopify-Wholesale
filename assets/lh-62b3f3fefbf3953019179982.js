!function(e){(function(e,t){(function(t){!function(){if(""!=e.settings.map_api&&("undefined"==typeof google||void 0===google.maps)){var t=document.createElement("script");t.src="https://maps.googleapis.com/maps/api/js?key="+e.settings.map_api,document.head.appendChild(t)}}();var i=setInterval((function(){"object"==typeof google&&"object"==typeof google.maps&&(!function(){var i={lat:parseFloat(e.settings.map_lat),lng:parseFloat(e.settings.map_lng)},s=new google.maps.Map(document.getElementById("map"),{zoom:parseInt(e.settings.map_zoom),center:i}),a='<div class="lh-infowindow">'+e.settings.map_info_box+"</div>",l=new google.maps.InfoWindow({content:a}),o="https://library.layouthub.com/HUB/files/TWF5LS0yMDIw/NTkwNDU2ODky/twenty-twenty-summer/pages/cJaU316XBS458Mm0/contact/assets/images/mapker.svg";""!=e.settings.map_marker&&(o=e.settings.map_marker);var n={position:i,map:s,icon:o,visible:!0};"no"==e.settings.map_show_marker&&(n.visible=!1);var r=new google.maps.Marker(n);if("style_2"==e.settings.map_style){var y=[{elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.arterial",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.local",stylers:[{visibility:"off"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#e9fefd"},{saturation:-35},{lightness:10},{weight:1.5}]}];s.set("styles",y)}if("style_3"==e.settings.map_style){y=[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#6e6e6e"}]},{featureType:"administrative.country",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"administrative.neighborhood",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f4f4f4"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"all",stylers:[{visibility:"simplified"},{color:"#d2ef9d"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#94dfed"},{visibility:"on"}]}];s.set("styles",y)}"yes"==e.settings.map_show_marker&&r.addListener("click",(function(){l.open(s,r)})),("yes"==e.settings.map_show_infobox||"no"==e.settings.map_show_marker&&"yes"==e.settings.map_show_infobox)&&google.maps.event.addListenerOnce(s,"tilesloaded",(function(){l.open(s,r)})),"no"==e.settings.map_show_marker&&"yes"==e.settings.map_show_infobox&&google.maps.event.addListenerOnce(s,"tilesloaded",(function(){t(".lh-google-map-section").addClass("lh-hide-close-infobox")}))}(),clearInterval(i))}),50)}).bind(t('section[data-section-id="jDnL7CA5uW"]').get(0))(jQuery)}).bind(e('section[data-section-id="jDnL7CA5uW"]').get(0))({url:"https://library.layouthub.com/HUB/files/TWF5LS0yMDIw/NTkwNDU2ODky/twenty-twenty-summer/pages/cJaU316XBS458Mm0/contact/",settings:{map_api:"AIzaSyCO2wd0X_cVfKx-Nex5VcvqtINED01NcHY",map_lat:"-37.731145",map_lng:"144.953913",map_zoom:"14",map_info_box:'<p style="margin-bottom:5px"><strong>Flexikitch Head Office</strong></p><p style="margin-bottom:5px">19 Roosevelt St, Coburg North</p><p style="margin-bottom:5px"><a href="mailto:info@flexikitch.com.au">info@flexikitch.com.au</a></p><p>1300 769 161</p>',map_marker:"https://cdn.shopify.com/s/files/1/0609/9543/6701/t/2/assets/flexikitch-logo-sym_axvG.png?v=1655961073",map_show_marker:"yes",map_style:"style_1",map_show_infobox:"no"}},jQuery)}(jQuery),function(e){(function(e,t){}).bind(e('section[data-section-id="VWPCT461ue"]').get(0))({url:"https://library.layouthub.com/HUB/files/TWF5LS0yMDIw/NTkwNDU2ODky/twenty-twenty-summer/pages/cJaU316XBS458Mm0/services/",settings:{}},jQuery)}(jQuery),console.log("This page layout has been built by https://www.layouthub.com");