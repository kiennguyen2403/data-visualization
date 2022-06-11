
import { map } from 'd3';
import {React,useState, useEffect}from 'react';
import {GeoJSON} from "react-leaflet";


//Choropleth graph 
export default function Customgeojson(props){
    const {data,Overviewgraph} =props;

    //return the color based on the data
    const Colordistinctions = (data) =>{
        return data > 70000 ? '#800026' :
			data > 60000  ? '#BD0026' :
			data > 50000  ? '#E31A1C' :
			data > 40000  ? '#FC4E2A' :
			data > 14000   ? '#FD8D3C' :
			data > 10000   ? '#FEB24C' :
			data > 5000   ? '#FED976' : '#FFEDA0';
    }


    //Change the color when hovering
    const Colorchange = (e) =>{
      var layer = e.target;
    
      layer.setStyle({
        weight: 3,
        color: 'darkblue',
        dashArray: '',
        fillOpacity: 0.7
    });
    }


    const zoomtoFeature = (e) =>{
      var L = window.L;
      var latLngs = [e.target.getLatLng()];
      var markerBounds = L.latLngBounds(latLngs);
      map.fitBounds(markerBounds);

    }

    //create the style for each area
    const style = (data) =>{
    return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor:Colordistinctions(data.properties.consumption)
		};
    }
    return(
        <GeoJSON
        style= {style}
        data={data}
        eventHandlers={{
            click: () => {
              Overviewgraph();
         
            },
            mouseover: (e) => 
            {
             Colorchange(e);
             zoomtoFeature(e);
            },
            mouseout: (e)=>{
              e.target.setStyle({
                weight:0,
              })
            },
            
          }}
        />
    );

    
}