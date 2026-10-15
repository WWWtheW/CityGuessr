const map = new maplibregl.Map({
  container: 'map',
  style: {
  "version": 8,
  "name": "CityGuessr",
  "metadata": {
    "mapbox:autocomposite": false,
    "mapbox:type": "template",
    "openmaptiles:mapbox:owner": "openmaptiles",
    "openmaptiles:mapbox:source:url": "mapbox://openmaptiles.4qljc88t",
    "openmaptiles:version": "3.x",
    "maputnik:renderer": "mbgljs"
  },
  "center": [0, 0],
  "zoom": 1,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "https://api.maptiler.com/tiles/v3/tiles.json?key="+API_KEY
    }
  },
  "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key="+API_KEY,
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {"background-color": "#fff"}
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": ["all", ["!=", "brunnel", "tunnel"]],
      "layout": {"visibility": "visible"}
    },
    {
      "id": "place_label_other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 8,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["!in", "class", "city", "state", "country", "continent"]
      ],
      "layout": {
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Noto Sans Regular"],
        "text-max-width": 6,
        "text-size": {"stops": [[6, 10], [12, 14]]},
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 10%, 25%)",
        "text-halo-blur": 0,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2
      }
    },
    {
      "id": "place-continent",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "filter": ["==", "class", "continent"],
      "layout": {
        "text-field": "{name:latin}",
        "text-font": ["Metropolis Extra Bold Italic"],
        "text-line-height": 1.5,
        "text-max-width": 4,
        "text-size": 13,
        "visibility": "visible"
      },
      "paint": {"text-halo-color": "#fff", "text-halo-width": 2}
    },
    {
      "id": "place-country",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "filter": ["==", "class", "country"],
      "layout": {
        "text-field": "{name:en}",
        "text-font": ["Noto Sans Bold"],
        "text-size": 12,
        "visibility": "visible"
      },
      "paint": {"text-halo-color": "#fff", "text-halo-width": 1.5}
    },
    {
      "id": "waterway-name",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 13,
      "filter": ["all", ["==", "$type", "LineString"], ["has", "name"]],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-field": "{name:latin} {name:nonlatin}",
        "text-font": ["Noto Sans Italic"],
        "text-letter-spacing": 0.2,
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "text-size": 14
      },
      "paint": {
        "text-color": "rgba(6, 6, 6, 1)",
        "text-halo-color": "rgba(245, 242, 242, 0.83)",
        "text-halo-width": 1.5
      }
    },
    {
      "id": "water-name-lakeline",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": ["==", "$type", "LineString"],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Noto Sans Italic"],
        "text-letter-spacing": 0.2,
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "text-size": 14
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-color": "rgba(255, 255, 255, 0)",
        "text-halo-width": 1.5
      }
    },
    {
      "id": "water-name-ocean",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": ["all", ["==", "$type", "Point"], ["==", "class", "ocean"]],
      "layout": {
        "symbol-placement": "point",
        "symbol-spacing": 350,
        "text-field": "{name:latin}",
        "text-font": ["Noto Sans Italic"],
        "text-letter-spacing": 0.2,
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "text-size": 14,
        "text-transform": "uppercase"
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-color": "rgba(255, 255, 255, 0)",
        "text-halo-width": 1.5
      }
    },
    {
      "id": "water-name-other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": ["all", ["==", "$type", "Point"], ["!in", "class", "ocean"]],
      "layout": {
        "symbol-placement": "point",
        "symbol-spacing": 350,
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": ["Noto Sans Italic"],
        "text-letter-spacing": 0.2,
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "text-size": {"stops": [[0, 10], [6, 14]]},
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-color": "rgba(255, 255, 255, 0)",
        "text-halo-width": 1.5
      }
    },
    {
      "id": "boundary_country_z0-4",
      "type": "line",
      "metadata": {"mapbox:group": "a14c9607bc7954ba1df7205bf660433f"},
      "source": "openmaptiles",
      "source-layer": "boundary",
      "maxzoom": 5,
      "filter": ["all", ["==", "admin_level", 2], ["!has", "claimed_by"]],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-blur": {"base": 1, "stops": [[0, 0.4], [22, 4]]},
        "line-opacity": 1,
        "line-width": {"base": 1.1, "stops": [[3, 1], [22, 20]]},
        "line-color": "rgba(82, 81, 81, 1)"
      }
    },
    {
      "id": "boundary_country_z5-",
      "type": "line",
      "metadata": {"mapbox:group": "a14c9607bc7954ba1df7205bf660433f"},
      "source": "openmaptiles",
      "source-layer": "boundary",
      "minzoom": 5,
      "filter": ["all", ["==", "admin_level", 2], ["!has", "claimed_by"]],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-blur": {"base": 1, "stops": [[0, 0.4], [22, 4]]},
        "line-opacity": 1,
        "line-width": {"base": 1.1, "stops": [[3, 1], [22, 20]]},
        "line-color": "rgba(82, 81, 81, 1)"
      }
    },
    {
      "id": "boundary_disputed",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": ["all", ["==", "admin_level", 2], ["has", "claimed_by"]],
      "paint": {"line-color": "rgba(82, 81, 81, 1)", "line-dasharray": [3, 3]}
    }
  ],
  "id": "ciwigmbgt00fw2ps58s6klalp"
},
});
map.addControl(new maplibregl.NavigationControl());

map.once("idle", () => {
  window.dispatchEvent(new Event("map-ready"));
});