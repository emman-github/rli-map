$( document ).ready(function() {
	const baseUrl = `http://127.0.0.1:8080/`;
	// const baseUrl = `https://rlimap.000webhostapp.com/`;
	
   	var map = L.map(`map`, {zoomControl: false, scrollWheelZoom: false}).setView([54.71491, -113.89159], 5);

	var light = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xybWVkaWEiLCJhIjoiY2szMzhibTFpMDNxNjNob2x2ZGgzM3g3bSJ9.c8YOrU2p00DoW4P-jhv-Mw`, {
		maxZoom: 18,
		attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ` +
			`<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ` +
			`Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
		id: `mapbox.light`,
		opacity: 0.75,
		transparency: 'true'
	});	

	var dark = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xybWVkaWEiLCJhIjoiY2szMzhibTFpMDNxNjNob2x2ZGgzM3g3bSJ9.c8YOrU2p00DoW4P-jhv-Mw`, {
		maxZoom: 18,
		attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ` +
			`<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ` +
			`Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
		id: `mapbox.dark`,
		opacity: 1,
		transparency: 'true'
	});	

	var streets = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xybWVkaWEiLCJhIjoiY2szMzhibTFpMDNxNjNob2x2ZGgzM3g3bSJ9.c8YOrU2p00DoW4P-jhv-Mw`, {
		maxZoom: 18,
		attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ` +
			`<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ` +
			`Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
		id: `mapbox.streets`,
		opacity: 1,
		transparency: 'true'
	}).addTo(map);

	var satellite = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xybWVkaWEiLCJhIjoiY2szMzhibTFpMDNxNjNob2x2ZGgzM3g3bSJ9.c8YOrU2p00DoW4P-jhv-Mw`, {
		maxZoom: 18,
		attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ` +
			`<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ` +
			`Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
		id: `mapbox.satellite`,
		opacity: 0.75,
		transparency: 'true'
	});	

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

// 	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);


	layers = L.featureGroup(null);

	var zoomContol = L.control.zoom({
	    position: 'topright'
	}).addTo(map);

	const baseMap = { 
		'<span style="margin-left: 10px;">Satellite</span>': satellite,
		'<span style="margin-left: 10px;">Streets</span>': streets,
		'<span style="margin-left: 10px;">Light</span>': light,
		'<span style="margin-left: 10px;">Dark</span>': dark
		
	}; 
    
	var overlays = {};

	
	// /* START METIS */
	// var metis = new L.geoJson(null, {
	//     style: {
	//     	"color": "lightblue",
	// 	    "weight": 5,
	// 	    "opacity": 1
	//     },
	//     onEachFeature: function(feature, layer) { 
	//     	layer.bindPopup(`<h1 style="text-align: center;">${feature.properties.Name}</h1>`);
	//     	console.log(layer);
	//     }
	// });
	// layers.addLayer(metis);
	// metis.addTo(map); 
	// overlays['<span style="margin-left: 10px;">Metis Settlements</span>'] = metis;
	// loadGeoJSON(metis, `rli-geojson/Metis_Settlements.geojson`); 
	// /* END METIS */

	// /* START MNA */
	// var mna = new L.geoJson(null, {
	//     style: {
	//     	"color": "#9d9d9d",
	// 	    "weight": 2,
	// 	    "opacity": 1,
	// 	    "fillOpacity": 0
	//     },
	//     onEachFeature: function(feature, layer) { 
	//     	layer.bindPopup(`<h1 style="text-align: center; font-size: 15px;">${feature.properties.Name}</h1>`);
	//     	console.log(layer);
	//     }
	// });
	// mna.addTo(map);  
	// overlays['<span style="margin-left: 10px;">MNA Regions</span>'] = mna;
	// loadGeoJSON(mna, `rli-geojson/MNA_Regions.geojson`);  
	// /* END MNA */

	// /* START RLI HEAD */
	// var rliHead = new L.geoJson(null, {
	//     style: {
	//     	"color": "#ff7800",
	// 	    "weight": 5,
	// 	    "opacity": 1
	//     },
	//     onEachFeature: function(feature, layer) { 
	//     	layer.bindPopup(`<h1 style="text-align: center;">${feature.properties.Name}</h1>`);
	//     	console.log(layer);
	//     }
	// });
	// rliHead.addTo(map);  
	// overlays['<span style="margin-left: 10px;">RLI Head Office</span>'] = rliHead;
	// loadGeoJSON(rliHead, `rli-geojson/RLI_Head_Office.geojson`); 
	// /* END RLI HEAD */	

	// /* START RLI MEF */
	// var rliMef = new L.geoJson(null, {
	//     style: {
	//     	"color": "#ff7800",
	// 	    "weight": 5,
	// 	    "opacity": 1
	//     },
	//     onEachFeature: function(feature, layer) { 
	//     	layer.bindPopup(`<h1 style="text-align: center;">${feature.properties.Name}</h1>`);
	//     	console.log(layer);
	//     }
	    
	// });
	// rliMef.addTo(map);  
	// overlays['<span style="margin-left: 10px;">RLI MEF Post-Secondary Endowments</span>'] = rliMef;
	// loadGeoJSON(rliMef, `rli-geojson/RLI_MEF_Post_Secondary_Endowments.geojson`); 
	// /* END RLI MEF */	

	// /* START RLI MTE */
	// var rliMte = new L.geoJson(null, {
	//     style: {
	//     	"color": "#ff7800",
	// 	    "weight": 5,
	// 	    "opacity": 1
	//     },
	//     onEachFeature: function(feature, layer) { 
	//     	layer.bindPopup(`<h1 style="text-align: center;">${feature.properties.Name}</h1>`);
	//     	console.log(layer);
	//     }
	// });
	// rliMte.addTo(map);  
	// overlays['<span style="margin-left: 10px;">RLI MTE Offices</span>'] = rliMte;
	// loadGeoJSON(rliMte, `rli-geojson/RLI_MTE_Offices.geojson`); 
	// /* END RLI MTE */	

	// /* START RLI Regions */
	// var rliRegions = new L.geoJson(null, {
	//     style: function(feature) { 
	//     	return  {
	//     		color: feature.properties.color,
	//     		weight: 2,
	//     		fillOpacity: 0.4
	//     	}; 
	//     },
	//     onEachFeature: function(feature, layer) { 
	//     	layer.bindPopup(`<h1 style="text-align: center;">${feature.properties.Name}</h1>`);
	//     	console.log(layer);
	//     }
	// });

	// rliRegions.addTo(map);  
	// overlays['<span style="margin-left: 10px;">RLI Regions</span>'] = rliRegions;
	// loadGeoJSON(rliRegions, `rli-geojson/RLI_Regions.geojson`); 
	// /* END RLI Regions */	
 

	// load Alberta
	var albertaBorder = L.polygon([ 
            [ 
                [ 
                53.520742,
                    -119.856824
                    
                ],
                [                     53.800676,

                    -120.016126
                ],
                [ 59.991554,
                    -119.995324
                    
                ],
                [  59.998813,
                    -110.002207
                   
                ],
                [ 52.492533,
                    -109.998471
                    
                ],
                [ 49.003342,
                    -110.025455
                    
                ],
                [ 49.003342,
                    -114.068424
                    
                ],
                [ 53.520742,
                    -119.856824
                    
                ]
            ]
        ], {'color': '#9d9d9d', 'weight': 2, 'fillOpacity': 0, 'dashArray': [10, 5]}).addTo(map);

	map.fitBounds(albertaBorder.getBounds());

	

	// /* START RLI Regions */
	// var rliResearch = new L.geoJson(null, {
	//     style: {
	//     	"color": "#ff7800",
	// 	    "weight": 5,
	// 	    "opacity": 1
	//     },
	//     onEachFeature: function(feature, layer) { 
	//     	layer.bindPopup(`<h1 style="text-align: center;">${feature.properties.Name}</h1>`);
	//     	console.log(layer);
	//     }
	// });
	// rliResearch.addTo(map);  
	// overlays['<span style="margin-left: 10px;">RLI Research</span>'] = rliResearch;
	// loadGeoJSON(rliResearch, `rli-geojson/RLI_Research.geojson`); 
	// /* END RLI Regions */	

	// var controlLayers = L.control.layers(baseMap, overlays, {position: 'topleft', collapsed:false}).addTo(map);
	// map.fitBounds(layers.getBounds());
	// streets.addTo(map);
	// satellite.addTo(map);
	// var rliResearch = new L.geoJson(); 
	// loadGeoJSON(rliResearch, `rli-geojson/RLI_Research.geojson`);	


	function loadGeoJSON(geoJSON, url, overlays) {
		$.ajax({
			dataType: `json`,
			url: `${baseUrl}${url}`,
			success: function(data) {
				console.log(data);
			    $(data.features).each(function(key, data) {
			        geoJSON.addData(data);  
			    });
			}
		});
	}  

	L.easyButton({
	  id: 'id-for-the-button',  // an id for the generated button
	  position: 'topright',      // inherited from L.Control -- the corner it goes in
	  type: 'replace',          // set to animate when you're comfy with css
	  leafletClasses: true,     // use leaflet classes to style the button?
	  states:[{                 // specify different icons and responses for your button
	    stateName: 'get-center',
	    onClick: function(button, map){
	     map.fitBounds(albertaBorder.getBounds());
	    },
	    title: 'show me the middle',
	    icon: 'fa-home'
	  }]
	}).addTo(map);

	// var legend = L.control({position: 'topleft', collapsed:true});

    // legend.onAdd = function (map) {
	   //  var div = L.DomUtil.create('div', 'info legend'); 
	   //  div.innerHTML = "<h1>DISCLAIMER</h1>";
	   //      return div;
	   //  };
    // legend.addTo(map);

	// L.easyButton('fa-home', function(btn, map){
	   
	// }).addTo(map);



 	
 // 	var myCustomGroup = L.geoJSON(null, {
	//     style: getStyle,
	//     onEachFeature: onEachFeature
	// });

	// var kml = omnivore.kml('rli-map.kml', null, myCustomGroup)
	// 	.addTo(map)
	// 	.on('ready', function() {
	// 		map.fitBounds(myCustomGroup.getBounds())
	// 			var baseMaps = {
	// 				'Mapbox Street': baseLayer
	// 			};

	// 			var controlLayers = L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(map);
	// 	}); 

	// function getStyle(feature) {
	// 	//console.log(feature.properties.name);
	// 	//console.log(JSON.stringify(feature.properties));
	//     // if (feature.properties.styleUrl === '#PolyStyleOGreen') {
	//     //     if (feature.geometry.type === 'LineString') {
	//     //         return {
	//     //             color: '#ff6e6e6e',
	//     //             weight: 4
	//     //         }
	//     //     }
	//     // }
	// }

	// function onEachFeature(feature, layer) {  

	// 	console.log(feature.properties.name);
	// 	console.log(feature.geometry);
	// 	var name           = feature.properties.name;
	// 	var description    = feature.properties.description;
	// 	var hasDescription = description !== undefined ? true : false;
	// 	var content        = `<h1 style="text-align:center">${name}</h1>`;

	// 	if (hasDescription) { content += `<p>${description}</p>` }; 

	// 	layer.bindPopup(content); 
	// }
	// for (var i = 1; i <= 29; i++) {
	// 	$('#rli-head-layers').append('<p>123123</p>');
	// }
	
	// for (var i = 2; i <= 59; i++) {
	// 	$('#rli-regions-layers').append('<p>123123</p>');
	// }

	var geoJSONFiles = [ 
		'RLI_Head_Office.geojson',
		'RLI_Regions.geojson',
		'MNA_Regions.geojson',
		'Metis_Settlements.geojson',
		'RLI_MTE_Offices.geojson',
		'RLI_MEF_Post_Secondary_Endowments.geojson',
		'RLI_Research.geojson'
	];

	var geojsonLayers = [
		{layer: null},
		{layer: null}, 
		{layer: null},
		{layer: null},
		{layer: null},
		{layer: null},
		{layer: null}
	];

	// $.each(geoJSONFiles, function(index, file) {
		loadData(0, geoJSONFiles[0]);
	// });

	function loadData(index, file) {
		console.log(index);
		if (index === 7) {
			return false;
		} 
		// $.each(geoJSONFiles, function(index, file) {
		$.ajax({
			dataType: `json`,
			url: `${baseUrl}rli-geojson/${file}`,
			success: function(data) { 

			    var links = '<div class="btn-group-vertical">';

				geojsonLayers[index] = L.geoJSON(data, {
					style: function(feature, layer) {
						console.log(feature);
						return {"color": feature.properties.color, "width": 2};
					},
					onEachFeature: function(feature, layer) {
					 	layer.addTo(map);
						console.log(layer._leaflet_id);
						map.removeLayer(layer);
						// var latitude;
						// var longitude;

						// if (layer instanceof L.Marker) {
						// 	console.log('marker!');
						// } else if (layer instanceof L.Polygon) {
						// 	console.log('polygon!');
						// }  

						// console.log(map.getLayer(layer));

						// layer.on('click', function(event) {

						// });

						layer.bindPopup(`<h5 class="text-center">${feature.properties.Name}</h5>`);

						links += `<button data-parent-id="${index}" data-layer-id="${layer._leaflet_id}" class="link-button btn btn-link text-left"><img class="ml-4" src="${baseUrl}images/${feature.properties.icon}"><span class="ml-2" style="font-size: 14px;">${feature.properties.Name}</span></button>`;
					},
					pointToLayer: function(feature, latlng) { 
						console.log(`${baseUrl}images/${feature.properties.icon}`);
						if (turf.getType(feature) === 'Point') {
							var smallIcon = L.icon({ 
							iconAnchor:   [13.5, 14], // point of the icon which will correspond to marker's location  
		                        iconUrl: `${baseUrl}images/${feature.properties.icon}`
		                    
		                });
		                return L.marker(latlng, {icon: smallIcon});
						}
		                
		            },
				});

				links += '</div>'; 

			    var accordion = 
			    	`<div class="accordion" id="accordionExample${index + 1}">
		               <div class="card">
		                  <div class="card-header" id="heading${index + 1}"> 
		                     <div class="custom-control custom-checkbox">
		                        <input data-layer="${index}" type="checkbox" class="custom-control-input" id="customControlValidation${index + 1}" required data-toggle="collapse" data-target="#collapse${index + 1}" aria-expanded="true" aria-controls="collapse${index + 1}">
		                        <label class="custom-control-label ml-1" for="customControlValidation${index + 1}"><span class="ml-2">${data.name}</span></label> 
		                     </div>  
		                  </div>

		                   <div id="collapse${index + 1}" class="collapse" aria-labelledby="heading${index + 1}" data-parent="#accordionExample${index + 1}">
		                     <div id="rli-head-layers" class="card-body">
		                        ${links}
		                     </div>
		                   </div>
		               </div> 
		           </div>`
		        ;

			    $('#legend').append(accordion);

			   
			}
		}).done(function() {
			 loadData(index + 1, geoJSONFiles[index + 1]);
		});
		console.log(file);
	// });  
	}

	

	$(document).on('click', '.link-button', function(event) {
		const parentId = parseInt($(this).attr('data-parent-id'));
		const layerId = parseInt($(this).attr('data-layer-id'));

		// console.log(parentId);
		// console.log(layerId);

		if (geojsonLayers[parentId].getLayer(layerId).isPopupOpen()) {
			geojsonLayers[parentId].getLayer(layerId).closePopup();
		} else {
			geojsonLayers[parentId].getLayer(layerId).openPopup();
		}

		

		console.log(geojsonLayers[parentId].getLayer(layerId));
	});

	$(document).on('change', '.custom-control-input', function(event) {
		var index = $(this).attr('data-layer');

		if ($(this)[0].checked) {
			map.addLayer(geojsonLayers[index]);
		} else {
			map.removeLayer(geojsonLayers[index]);
		}
		// console.log($(this));
		// console.log($(this).attr('data-layer'));
	});

	// <div class="accordion" id="accordionExample1">
 
 //               <div class="card">
 //                  <div class="card-header" id="headingOne"> 
 //                     <div class="custom-control custom-checkbox ml-2">
 //                        <input type="checkbox" class="custom-control-input" id="customControlValidation1" required data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
 //                        <label class="custom-control-label" for="customControlValidation1"><span class="ml-3">RLI Head Office</span></label> 
 //                     </div>  
 //                  </div>

 //                   <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample1">
 //                     <div id="rli-head-layers" class="card-body">
                        
 //                     </div>
 //                   </div>
 //               </div> 
 //           </div>
});