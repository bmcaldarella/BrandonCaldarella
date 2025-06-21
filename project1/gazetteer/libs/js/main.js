let detectedCountryCode = null;
let countryBordersData;
let poiClusterGroup = L.markerClusterGroup();
let map;
let capitalGroup = L.layerGroup();
let airportGroup = L.layerGroup();
let townGroup = L.layerGroup();
let museumGroup = L.layerGroup();
let monumentGroup = L.layerGroup();
let churchGroup = L.layerGroup();
let parkGroup = L.layerGroup();
let hotelGroup = L.layerGroup();
let beachGroup = L.layerGroup();
let trainGroup = L.layerGroup();
let busGroup = L.layerGroup();
let restaurantGroup = L.layerGroup();
let cafeGroup = L.layerGroup();
let barGroup = L.layerGroup();
let universityGroup = L.layerGroup();
let stadiumGroup = L.layerGroup();
let hospitalGroup = L.layerGroup();
let pharmacyGroup = L.layerGroup();
let shoppingGroup = L.layerGroup();
let supermarketGroup = L.layerGroup();
let policeGroup = L.layerGroup();
let firestationGroup = L.layerGroup();
let gasGroup = L.layerGroup();
let bankGroup = L.layerGroup();
let atmGroup = L.layerGroup();
let embassyGroup = L.layerGroup();
let postGroup = L.layerGroup();
let libraryGroup = L.layerGroup();
let cinemaGroup = L.layerGroup();
let defaultGroup = L.layerGroup();



//icons
const extraIcons = {
  capital: L.ExtraMarkers.icon({ icon: 'fa-landmark', markerColor: 'blue', shape: 'square', prefix: 'fa' }),
  airport: L.ExtraMarkers.icon({ icon: 'fa-plane', markerColor: 'red', shape: 'circle', prefix: 'fa' }),
  town: L.ExtraMarkers.icon({ icon: 'fa-city', markerColor: 'green', shape: 'penta', prefix: 'fa' }),
  museum: L.ExtraMarkers.icon({ icon: 'fa-university', markerColor: 'purple', shape: 'circle', prefix: 'fa' }),
  monument: L.ExtraMarkers.icon({ icon: 'fa-monument', markerColor: 'darkpurple', shape: 'square', prefix: 'fa' }),
  church: L.ExtraMarkers.icon({ icon: 'fa-church', markerColor: 'cadetblue', shape: 'circle', prefix: 'fa' }),
  park: L.ExtraMarkers.icon({ icon: 'fa-tree', markerColor: 'green', shape: 'circle', prefix: 'fa' }),
  hotel: L.ExtraMarkers.icon({ icon: 'fa-hotel', markerColor: 'darkred', shape: 'square', prefix: 'fa' }),
  beach: L.ExtraMarkers.icon({ icon: 'fa-umbrella-beach', markerColor: 'orange', shape: 'circle', prefix: 'fa' }),
  train: L.ExtraMarkers.icon({ icon: 'fa-train', markerColor: 'blue', shape: 'penta', prefix: 'fa' }),
  bus: L.ExtraMarkers.icon({ icon: 'fa-bus', markerColor: 'yellow', shape: 'square', prefix: 'fa' }),
  restaurant: L.ExtraMarkers.icon({ icon: 'fa-utensils', markerColor: 'red', shape: 'circle', prefix: 'fa' }),
  cafe: L.ExtraMarkers.icon({ icon: 'fa-coffee', markerColor: 'orange', shape: 'circle', prefix: 'fa' }),
  bar: L.ExtraMarkers.icon({ icon: 'fa-beer', markerColor: 'darkpurple', shape: 'circle', prefix: 'fa' }),
  university: L.ExtraMarkers.icon({ icon: 'fa-school', markerColor: 'darkblue', shape: 'square', prefix: 'fa' }),
  stadium: L.ExtraMarkers.icon({ icon: 'fa-futbol', markerColor: 'green', shape: 'circle', prefix: 'fa' }),
  hospital: L.ExtraMarkers.icon({ icon: 'fa-hospital', markerColor: 'red', shape: 'penta', prefix: 'fa' }),
  pharmacy: L.ExtraMarkers.icon({ icon: 'fa-pills', markerColor: 'lightred', shape: 'square', prefix: 'fa' }),
  shopping: L.ExtraMarkers.icon({ icon: 'fa-shopping-bag', markerColor: 'pink', shape: 'circle', prefix: 'fa' }),
  supermarket: L.ExtraMarkers.icon({ icon: 'fa-shopping-cart', markerColor: 'darkgreen', shape: 'circle', prefix: 'fa' }),
  police: L.ExtraMarkers.icon({ icon: 'fa-shield-alt', markerColor: 'darkblue', shape: 'square', prefix: 'fa' }),
  firestation: L.ExtraMarkers.icon({ icon: 'fa-fire-extinguisher', markerColor: 'red', shape: 'square', prefix: 'fa' }),
  gas: L.ExtraMarkers.icon({ icon: 'fa-gas-pump', markerColor: 'black', shape: 'circle', prefix: 'fa' }),
  bank: L.ExtraMarkers.icon({ icon: 'fa-university', markerColor: 'blue', shape: 'square', prefix: 'fa' }),
  atm: L.ExtraMarkers.icon({ icon: 'fa-credit-card', markerColor: 'gray', shape: 'circle', prefix: 'fa' }),
  embassy: L.ExtraMarkers.icon({ icon: 'fa-flag', markerColor: 'darkblue', shape: 'penta', prefix: 'fa' }),
  post: L.ExtraMarkers.icon({ icon: 'fa-envelope', markerColor: 'yellow', shape: 'square', prefix: 'fa' }),
  library: L.ExtraMarkers.icon({ icon: 'fa-book', markerColor: 'darkgreen', shape: 'circle', prefix: 'fa' }),
  cinema: L.ExtraMarkers.icon({ icon: 'fa-film', markerColor: 'purple', shape: 'square', prefix: 'fa' }),
  default: L.ExtraMarkers.icon({ icon: 'fa-map-marker-alt', markerColor: 'orange', shape: 'circle', prefix: 'fa' })
};
// Detects the user's country based on latitude and longitude by calling the backend.
// If a valid country code is returned, it updates the dropdown selection and triggers a change event.
// If the map isn't ready, it waits until it's initialized before updating the selection.


function detectUserCountry(lat, lon) {
  $.ajax({
    url: 'libs/php/getCountryCode.php',
    method: 'GET',
    data: { lat: lat, lng: lon },
    dataType: 'json',
    success: function (data) {
      if (data.error) {
        console.warn("Error from backend:", data.error);
        return;
      }

      if (data && data.countryCode) {
        detectedCountryCode = data.countryCode;
        console.log("🌍 Detected country:", detectedCountryCode);

        const previous = $('#countrySelect').val();

        if (previous !== detectedCountryCode) {
          const updateSelect = () => {
            $('#countrySelect').val(detectedCountryCode).trigger('change');
          };

          if (typeof map !== "undefined") {
            updateSelect();
          } else {
            console.warn("⏳ Waiting for map to initialize...");
            const interval = setInterval(() => {
              if (typeof map !== "undefined") {
                updateSelect();
                clearInterval(interval);
              }
            }, 300);
          }
        } else {
          $('#countrySelect').trigger('change');
        }
      } else {
        console.warn(" Country code not found.");
      }
    },
    error: function (error) {
      console.warn(error + " Error calling getCountryCode.php");
    }
  });
}

// Loads the list of countries from the backend and populates the dropdown menu.
// Sorts country names alphabetically before adding them.
// Executes a callback function if provided.

function loadCountriesIntoSelect(callback) {
  $.ajax({
    url: "libs/php/getCountryList.php",
    dataType: "json",
    success: function (data) {


      countriesLoaded = true;
      const select = $("#countrySelect");
      select.empty();

      data.sort((a, b) => a.name.localeCompare(b.name));

      data.forEach(function (country) {
        select.append(`<option value="${country.code}">${country.name}</option>`);
      });

      if (typeof callback === "function") callback();
    },
    error: function () {
      alert("Error loading country list.");
    }
  });
}

// Fetches and displays important landmarks for the selected country using Wikipedia data.
// Classifies each place by type (e.g., museum, airport) and adds a custom marker with icon, tooltip, and popup to the map.
// Clears previous markers before loading new ones.

function mostrarLugaresWikipedia(countryName) {
  const allGroups = [
    capitalGroup, airportGroup, townGroup, museumGroup, monumentGroup, churchGroup,
    parkGroup, hotelGroup, beachGroup, trainGroup, busGroup, restaurantGroup, cafeGroup,
    barGroup, universityGroup, stadiumGroup, hospitalGroup, pharmacyGroup, shoppingGroup,
    supermarketGroup, policeGroup, firestationGroup, gasGroup, bankGroup, atmGroup,
    embassyGroup, postGroup, libraryGroup, cinemaGroup, defaultGroup
  ];

  // adding the cluster group to the map
  map.addLayer(poiClusterGroup);

  $.ajax({
    url: 'libs/php/getWikipediaSearch.php',
    method: 'GET',
    data: { country: countryName },
    dataType: 'json',
    success: function (response) {
      const searchResults = response.query?.search || [];
      const titles = searchResults.map(r => r.title).slice(0, 1000);

      const batchSize = 80;
      const requests = [];

      for (let i = 0; i < titles.length; i += batchSize) {
        const batch = titles.slice(i, i + batchSize);

        const request = $.ajax({
          url: 'libs/php/getWikiInfo.php',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ titles: batch }),
          dataType: 'json'
        });

        requests.push(request);
      }

      Promise.all(requests)
        .then(results => {
          results.forEach(data => {
            const pages = data.query?.pages || {};

            for (let pageId in pages) {
              const page = pages[pageId];
              if (!page.coordinates) continue;

              const lat = page.coordinates[0].lat;
              const lon = page.coordinates[0].lon;
              const title = page.title;
              const description = page.extract || '';
              const image = page.thumbnail?.source;
              const url = `https://en.wikipedia.org/?curid=${pageId}`;
              let tipo = "default";

              const tipoKeywords = {
                capital: ["capital", "government"],
                airport: ["airport", "airfield"],
                town: ["town", "village"],
                museum: ["museum", "gallery"],
                monument: ["monument", "castle", "bridge", "palace", "tower"],
                church: ["church", "cathedral", "basilica"],
                park: ["park", "garden", "reserve"],
                hotel: ["hotel", "hostel", "motel"],
                beach: ["beach", "coast"],
                train: ["train station", "railway"],
                bus: ["bus station", "bus terminal"],
                restaurant: ["restaurant", "diner", "bistro"],
                cafe: ["cafe", "coffee"],
                bar: ["bar", "pub"],
                university: ["university", "college"],
                stadium: ["stadium", "arena"],
                hospital: ["hospital", "clinic"],
                pharmacy: ["pharmacy", "drugstore"],
                shopping: ["shopping", "mall", "store"],
                supermarket: ["supermarket", "grocery"],
                police: ["police", "station"],
                firestation: ["fire station", "firehouse"],
                gas: ["gas station", "petrol"],
                bank: ["bank"],
                atm: ["atm", "cash machine"],
                embassy: ["embassy", "consulate"],
                post: ["post office", "mail"],
                library: ["library"],
                cinema: ["cinema", "movie theater"]
              };

              const allText = (title + " " + description).toLowerCase();
              for (let key in tipoKeywords) {
                if (tipoKeywords[key].some(word => allText.includes(word))) {
                  tipo = key;
                  break;
                }
              }

              const icon = extraIcons[tipo] || extraIcons.default;
              const popupContent = `
                <div style="max-width:100px; font-family: Arial, sans-serif;">
                  <h5 style="margin-bottom: 5px; font-size: 12px;">${title}</h5>
                  ${image ? `<img src="${image}" style="width: 100%; border-radius: 5px; margin-bottom: 5px;" />` : ""}
                  <p style="font-size: 13px; margin-bottom: 8px; line-height: 1.3;">${description.substring(0, 100)}...</p>
                  <a href="${url}" target="_blank" style="color: #007bff; text-decoration: underline; font-weight: bold;">Read more</a>
                </div>
              `;

              const marker = L.marker([lat, lon], { icon, title })
                .bindPopup(popupContent)
                .bindTooltip(title, { sticky: true, direction: "top", opacity: 0.9 });

              const groupMap = {
                capital: capitalGroup, airport: airportGroup, town: townGroup, museum: museumGroup,
                monument: monumentGroup, church: churchGroup, park: parkGroup, hotel: hotelGroup,
                beach: beachGroup, train: trainGroup, bus: busGroup, restaurant: restaurantGroup,
                cafe: cafeGroup, bar: barGroup, university: universityGroup, stadium: stadiumGroup,
                hospital: hospitalGroup, pharmacy: pharmacyGroup, shopping: shoppingGroup,
                supermarket: supermarketGroup, police: policeGroup, firestation: firestationGroup,
                gas: gasGroup, bank: bankGroup, atm: atmGroup, embassy: embassyGroup,
                post: postGroup, library: libraryGroup, cinema: cinemaGroup, default: defaultGroup
              };

              const targetGroup = groupMap[tipo] || defaultGroup;
              targetGroup.addLayer(marker);
              poiClusterGroup.addLayer(marker);
            }
          });

          // Add all groups to the map
          poiClusterGroup.refreshClusters();

          //ajust the map view
          setTimeout(() => {
            map.invalidateSize();
            map.panBy([1, 1]);
            map.panBy([-1, -1]);
          }, 200);
        })
        .catch(error => {
          console.warn("❌ Error loading Wikipedia data:", error);
        });
    },
    error: function () {
      console.warn("❌ Error al buscar títulos desde getWikipediaSearch.php");
    }
  });
}

$(document).ready(function () {
  let borderLayer;
  let clickMarker;
  let cityBorderLayer;



  $('#loader').fadeIn(100);

  // Loads all country borders from the backend and saves them as GeoJSON.
  // Then loads the country list into the dropdown and attempts to get the user's location.
  // If geolocation is successful, it initializes the map at the user's position.
  // Otherwise, it defaults to a neutral view.

  $.ajax({
    url: "libs/php/getCountryBorders.php",
    dataType: "json",
    success: function (geojson) {
      if (geojson.error) {
        console.error("Backend error:", geojson.error);
        return;
      }

      countryBordersData = geojson;

      loadCountriesIntoSelect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              window.selectedLat = lat;
              window.selectedLon = lon;

              detectUserCountry(lat, lon);
              initMap([lat, lon], true);
              $('#map').fadeIn(300);
              $('#loader').fadeOut(500);
            },
            function (error) {
              console.warn("Geolocation error:", error.message);
              initMap([20, 0], false);
              $('#map').fadeIn(300);
              $('#loader').fadeOut(500);
            }
          );
        } else {
          initMap([20, 0], false);
          $('#map').fadeIn(300);
          $('#loader').fadeOut(500);
        }
      });
    },
    error: function () {
      alert("❌ Error loading country borders.");
    }
  });



  // show my current location

  $("#myLocationBtn").on("click", function () {
    if (!map) {
      alert("Map not loaded.");
      return;
    }

    $("#loader").fadeIn(200);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        window.selectedLat = lat;
        window.selectedLon = lon;

        if (!countriesLoaded) {
          loadCountriesIntoSelect(() => {
            setTimeout(() => {
              detectUserCountry(lat, lon);
            }, 120);
          });
        } else {
          detectUserCountry(lat, lon);
        }



        $.ajax({
          url: 'libs/php/getOpenCageInfo.php',
          method: 'GET',
          data: { lat, lon },
          dataType: 'json',
          success: function (data) {
            let cityName = '';
            if (data.results && data.results.length > 0) {
              cityName = data.results[0].components.city ||
                data.results[0].components.town ||
                data.results[0].components.village ||
                data.results[0].components.county ||
                'Unknown location';
            }

            map.flyTo([lat, lon], 13, {
              animate: true,
              duration: 1.5
            });

            map.addLayer(poiClusterGroup);

            if (window.locationMarker) map.removeLayer(window.locationMarker);
            if (window.locationCircle) map.removeLayer(window.locationCircle);


            window.locationCircle = L.circle([lat, lon], {
              color: '#4A90E2',
              fillColor: '#4A90E2',
              fillOpacity: 0.3,
              radius: 1000
            }).addTo(map)
              .bindPopup(`<strong>📍 You're somewhere inside this 30 km area</strong>`)
              .openPopup();;

            $("#loader").fadeOut(500);
          },
          error: function () {
            console.warn("❌ Error.");
            $("#loader").fadeOut(500);
          }
        });

      }, function (error) {
        alert("Error: " + error.message);
        $("#loader").fadeOut(500);
      });

    } else {
      alert("Location not supported.");
      $("#loader").fadeOut(500);
    }
  });
  // Displays the boundary of a city by searching for its name in a local GeoJSON file.
  // If found, it adds the boundary to the map and adjusts the view to fit the area.


  function mostrarLimiteCiudad(cityName) {
    $.getJSON('data/cityBoundaries.geojson', function (data) {
      const cityFeature = data.features.find(
        feature => feature.properties.NAME.toLowerCase() === cityName.toLowerCase()
      );
      console.log("Looking limit", cityName);
      if (cityFeature) {
        if (cityBorderLayer) {
          map.removeLayer(cityBorderLayer);
        }

        cityBorderLayer = L.geoJSON(cityFeature, {
          style: {
            color: '#FF5733',
            weight: 4,
            opacity: 1,
            fillOpacity: 0.1
          }
        }).addTo(map);

        map.fitBounds(cityBorderLayer.getBounds());
      } else {
        console.log('Limit not found: ' + cityName);
      }
    });
  }

  // Initializes the map centered on given coordinates with base and overlay layers.
  // Adds click event to the map to detect the clicked country and city using coordinates,
  // then displays the country border, loads city boundaries and Wikipedia points of interest.
  // Also updates the dropdown selection based on the clicked location.


  function initMap(coords, showCircle) {
    map = L.map('map').setView(coords, 1.5);
    const ligthMode = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 13,
      attribution: ''
    });

    const darkMode = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 12,
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    });
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Earthstar Geographics, NASA, NGA, USGS'
    });


    ligthMode.addTo(map);

    const baseMaps = {
      "Light": ligthMode,
      " Dark": darkMode,
      " Satellite": satellite
    };

    const overlayMaps = {
      "Capitals": capitalGroup,
      "Airports": airportGroup,
      "Cities": townGroup,
      "Museums": museumGroup,
      "Monuments": monumentGroup,
      "Churches": churchGroup,
      "Parks": parkGroup,
      "Hotels": hotelGroup,
      "Trains": trainGroup,
      "Buses": busGroup,
      "Restaurants": restaurantGroup,
      "Cafés": cafeGroup,
      "Bars": barGroup,
      "Universities": universityGroup,
      "Hospitals": hospitalGroup,
      "Pharmacies": pharmacyGroup,
      "Shopping": shoppingGroup,
      "Police": policeGroup,
      "Others": defaultGroup
    };
    L.control.layers(baseMaps, overlayMaps, { position: 'topright' }).addTo(map);



    if (showCircle) {
      L.marker(coords, {
        opacity: 0,           // invisible
        interactive: false    // no clickeable
      }).addTo(map);
    }

    map.on('click', function (e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      window.selectedLat = lat;
      window.selectedLon = lon;

      $.ajax({
        url: 'libs/php/getNearbyPlace.php',
        method: 'GET',
        data: {
          lat: lat,
          lon: lon
        },
        success: function (response) {
          if (response.geonames && response.geonames.length > 0) {
            const place = response.geonames[0];
            const city = place.name || place.adminName1 || place.adminName2 || place.toponymName || 'Unknown City';

            const countryName = place.countryName;
            const countryCode = place.countryCode;

            window.selectedCountryCode = countryCode;

            if (clickMarker) map.removeLayer(clickMarker);

            const latLng = L.latLng(lat, lon);

            clickMarker = L.marker(latLng).addTo(map)
              .bindPopup(`<b>${city}, ${countryName}</b><br>Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`)
              .openPopup();

            // show borders countries
            if (countryBordersData) {
              const countryFeature = countryBordersData.features.find(
                f => f.properties.iso_a2 === countryCode
              );

              if (countryFeature) {
                if (borderLayer) borderLayer.remove();

                borderLayer = L.geoJSON(countryFeature, {
                  style: {
                    color: '#007BFF',
                    weight: 2,
                    opacity: 0.8,
                    fillColor: '#CCE5FF',
                    fillOpacity: 0.5
                  }

                }).addTo(map);

                map.fitBounds(borderLayer.getBounds());
              }
            }

            $('#countrySelect').val(countryCode);

            console.log("🧭 City:", city);
            if (city) {
              mostrarLimiteCiudad(city);
              if (countryName) {
                mostrarLugaresWikipedia(countryName);
              }


            } else {
              console.warn("No city name available, skipping city boundary display.");
            }

          } else {
            console.log("No nearby places found.");
          }
        },
        error: function () {
          console.log("Error contacting backend.");
        }
      });
    });


  }


  $("#countrySelect").on("change", function () {
    const selectedISO = $(this).val();
    if (!selectedISO || !countryBordersData) return;

    const selectedFeature = countryBordersData.features.find(
      f => f.properties.iso_a2 === selectedISO
    );
    if (!selectedFeature) {
      alert("Country not found");
      return;
    }

    if (borderLayer) borderLayer.remove();

    borderLayer = L.geoJSON(selectedFeature, {
      style: {
        color: '#007BFF',
        weight: 2,
        opacity: 0.8,
        fillColor: '#CCE5FF',
        fillOpacity: 0.5
      }
    }).addTo(map);

    map.fitBounds(borderLayer.getBounds());

    let lat, lon;

    if (
      selectedFeature.properties &&
      Array.isArray(selectedFeature.properties.capital_latlng) &&
      selectedFeature.properties.capital_latlng.length === 2 &&
      !isNaN(selectedFeature.properties.capital_latlng[0]) &&
      !isNaN(selectedFeature.properties.capital_latlng[1])
    ) {
      lat = selectedFeature.properties.capital_latlng[1]; // lat
      lon = selectedFeature.properties.capital_latlng[0]; // lon
    } else {
      const center = borderLayer.getBounds().getCenter();
      lat = center.lat;
      lon = center.lng;
    }

    window.selectedLat = lat;
    window.selectedLon = lon;
    window.selectedCountryCode = selectedISO;

    map.fitBounds(borderLayer.getBounds(), {
      padding: [50, 50],
      maxZoom: 7
    });




    mostrarLugaresWikipedia(selectedFeature.properties.name);

    setTimeout(() => {
      if (poiClusterGroup.getLayers().length > 0) {
        const group = new L.featureGroup(poiClusterGroup.getLayers());
        const bounds = group.getBounds();
      }
    }, 1000);
  });


  $("#currencyBtn").on("click", function () {
    if (!window.selectedCountryCode) {
      alert("Select a country first.");
      return;
    }

    $.ajax({
      url: "libs/php/getCountryInfo.php",
      type: "GET",
      data: { code: window.selectedCountryCode },
      dataType: "json",
      success: function (data) {
        const country = data[0];
        const name = country.name.common;
        const currencies = country.currencies;

        if (!currencies) {
          $('#currencyInfo').text("No currency info available.");
          return;
        }

        const code = Object.keys(currencies)[0];
        const currencyName = currencies[code].name;
        const symbol = currencies[code].symbol || '';

        $('#currencyInfo').html(`<p><strong>${currencyName} (${code})</strong> ${symbol}</p>`);
        $('#currencyConversion').show();

        $('#convertBtn').off('click').on('click', function () {
          const amount = parseFloat($('#amountInput').val());
          if (isNaN(amount) || amount <= 0) {
            $('#conversionResult').text("Enter a valid amount.");
            return;
          }

          $.ajax({
            url: `libs/php/getExchangeRate.php`,
            method: 'GET',
            data: { currency: code },
            dataType: "json",
            success: function (rateData) {
              const rateToUSD = 1 / rateData.rate;
              const result = amount * rateToUSD;
              $('#conversionResult').html(`${amount} ${code} ≈ <strong>${result.toFixed(2)} USD</strong>`);
            },
            error: function () {
              $('#conversionResult').text("Error loading exchange rate.");
            }
          });
        });

        const modal = new bootstrap.Modal(document.getElementById('currencyModal'));
        modal.show();
      },
      error: function () {
        alert("Error loading country info.");
      }
    });
  });

  //wiki InfoCountry Btn

  $("#wikiBtn").on("click", function () {
    if (!window.selectedCountryCode) {
      alert("Please select a country first.");
      return;
    }

    const countryName = $("#countrySelect option:selected").text();

    $("#wikiContent").html("Loading...");

    $.ajax({
      url: "libs/php/getWikiSummary.php",
      type: "GET",
      data: { country: countryName },
      dataType: "json",
      success: function (data) {
        const title = data.title || countryName;
        const description = data.extract || "No summary available.";
        const image = data.thumbnail?.source;
        const link = data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${countryName}`;

        let html = `
        <h5>${title}</h5>
        ${image ? `<img src="${image}" class="img-fluid mb-3" alt="${title}" />` : ''}
        <p>${description}</p>
        <a href="${link}" target="_blank" class="btn btn-info mt-2">Read more on Wikipedia</a>
      `;

        $("#wikiContent").html(html);
      },
      error: function () {
        $("#wikiContent").html("<p class='text-danger'>Failed to load summary.</p>");
      }
    });
  });

  //wiki news

  $("#newsBtn").on("click", function () {
    if (!window.selectedCountryCode) {
      alert("Please select a country first.");
      return;
    }
    const countryName = $("#countrySelect option:selected").text();
    $("#newsContent").html("Loading news...");
    $.ajax({
      url: "libs/php/getCountryNews.php",
      type: "GET",
      data: { country: countryName },
      dataType: "json",
      success: function (data) {
        console.log("📰 News data received:", data);
        if (!data.articles || data.articles.length === 0) {
          $("#newsContent").html("<p>No news articles found.</p>");
          return;
        }
        let html = '<ul class="list-unstyled">';
        data.articles.forEach(article => {
          html += `
          <li class="mb-3">
            <h6>${article.title}</h6>
            ${article.image ? `<img src="${article.image}" class="img-fluid mb-2" alt="news">` : ""}
            <p>${article.description || ""}</p>
            <a href="${article.url}" target="_blank" class="btn btn-sm btn-outline-info">Read more</a>
          </li>
        `;
        });
        html += '</ul>';

        $("#newsContent").html(html);
      },
      error: function () {
        $("#newsContent").html("<p class='text-danger'>Failed to load news.</p>");
      }
    });
  });


  $("#weatherBtn").on("click", function (e) {
    if (!window.selectedLat || !window.selectedLon) {
      e.preventDefault();
      alert("Select a location first.");



      return;
    }

    // Get current weather
    $.ajax({
      url: "libs/php/getWeather.php",
      type: "GET",
      data: {
        lat: window.selectedLat,
        lon: window.selectedLon
      },
      dataType: "json",
      success: function (weatherData) {
        const icon = weatherData.weather[0].icon;
        const description = weatherData.weather[0].description;
        const temp = Math.round(weatherData.main.temp);
        const feelsLike = Math.round(weatherData.main.feels_like);
        const maxTemp = Math.round(weatherData.main.temp_max);
        const minTemp = Math.round(weatherData.main.temp_min);
        const city = weatherData.name;
        const country = weatherData.sys.country;

        const html = `
        <div class="text-center mb-3">
          <h5>${city}, ${country}</h5>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
          <p><strong>${description}</strong></p>
          <p>Temp: ${temp}°C (feels like ${feelsLike}°C)</p>
          <p>Max: ${maxTemp}°C / Min: ${minTemp}°C</p>
        </div>
      `;
        $('#weather').html(html);
        const modal = new bootstrap.Modal(document.getElementById('weatherModal'));
        modal.show();

      },
      error: function () {
        $('#weather').html("<p>Error loading current weather.</p>");
      }
    });

    // Get forecast
    $.ajax({
      url: "libs/php/getForecast.php",
      type: "GET",
      data: {
        lat: window.selectedLat,
        lon: window.selectedLon
      },
      dataType: "json",
      success: function (forecastData) {
        if (forecastData.error) {
          $('#forecastBody').html("⚠️ Forecast error: " + forecastData.error);
          return;
        }

        const list = forecastData.list;
        let forecastHTML = "";

        for (let i = 0; i < list.length && forecastHTML.length < 5 * 300; i += 8) {
          const f = list[i];
          const day = dayjs(f.dt * 1000).format('dddd, D MMMM');
          const icon = f.weather[0].icon;
          const desc = f.weather[0].description;
          const temp = Math.round(f.main.temp);

          forecastHTML += `
        <div class="mb-2 p-2 border border-secondary rounded">
          <strong>${day}</strong><br>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" />
          ${desc}, ${temp}°C
        </div>
      `;
        }

        $('#forecastBody').html(forecastHTML);
      },
      error: function () {
        $('#forecastBody').html("<p>Error loading forecast.</p>");
      }
    });
  });

  $("#nearbyBtn").on("click", function () {
    if (!window.selectedLat || !window.selectedLon) {
      alert("Select a location firts.");
      return;
    }

    $.ajax({
      url: 'libs/php/getWikiInfo.php',
      method: 'GET',
      data: {
        lat: window.selectedLat,
        lng: window.selectedLon
      },
      dataType: 'json',
      success: function (data) {
        if (data.error) {
          $('#nearbyResults').html("⚠️ Wiki error: " + data.error);
          return;
        }

        if (data.geonames && data.geonames.length > 0) {
          let html = '<ul>';
          data.geonames.forEach(item => {
            html += `
              <li style="margin-bottom: 20px;">
                <h5>${item.title}</h5>
                ${item.thumbnailImg ? `<img src="${item.thumbnailImg}" alt="${item.title}" style="max-width:100px;">` : ''}
                <p>${item.summary}</p>
                <a href="https://${item.wikipediaUrl}" target="_blank">Ver más</a>
              </li>`;
          });
          html += '</ul>';
          $('#output').html(html);

          const modal = new bootstrap.Modal(document.getElementById('nearbyModal'));
          modal.show();
        } else {
          alert("No nearby data found.");
        }
      },
      error: function () {
        $('#output').html('<p>Error loading nearby places.</p>');
      }
    });
  });
  $("#countryInfoBtn").on("click", function () {
    if (!window.selectedCountryCode) {
      alert("Select a country firts.");
      return;
    }

    $.ajax({
      url: "libs/php/getCountryInfo.php",
      type: "GET",
      data: { code: window.selectedCountryCode },
      dataType: "json",
      success: function (data) {
        const country = data[0];
        const name = country.name.common;
        const capital = country.capital ? country.capital[0] : 'N/A';
        const population = country.population?.toLocaleString() || 'N/A';
        const region = country.region || 'N/A';
        const flag = country.flags?.svg || '';
        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

        const html = `
        <div style="padding: 30px; border-radius: 10px;">
          <h3>${name}</h3>
          <img src="${flag}" alt="${name}" style="max-width: 100%; height: auto; display: block; margin: 0 auto; object-fit: contain;" />
          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Languages:</strong> ${languages}</p>
        </div>
      `;

        $('#infoCard').html(html);
        const modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
        modal.show();


        $('#convertBtn').on('click', function () {
          const amount = parseFloat($('#amountInput').val());

          if (isNaN(amount) || amount <= 0) {
            $('#conversionResult');
            return;
          }

          $.ajax({
            url: `libs/php/getExchangeRate.php`,
            method: 'GET',
            data: { currency: currencyCode },
            dataType: "json",
            success: function (rateData) {
              const rateToUSD = 1 / rateData.rate;
              const result = amount * rateToUSD;
              $('#conversionResult').html(`${amount} ${currencyCode} ≈ <strong>${result.toFixed(2)} USD</strong>`);
            },
            error: function () {
              $('#conversionResult').text("Error.");
            }
          });

        });
      },
      error: function () {
        alert("Error.");
      }
    });
  });
});


