import {useEffect} from 'react';
import L from "leaflet";

// Legend for the map
export function Legend({ map }) {

    //return the color based on the data
    const getColor=(d) => 
    { 
      return d >= 60000
        ? "#940d0d"
        : d > 40000
        ? "#d16213"
        : "#b59514"
    }

    //change if the map changed
    useEffect(() => {
      if (map) {
        //put it in the bottom right of th graph
        const legend = L.control({ position: "bottomright" });
  
        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info legend");
          const grades = [ 0, 40000, 60000];
          let labels = [];
          let from;
          let to;
          for (let i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            labels.push(
              '<i style="background:' +
                getColor(from + 1) +
                '"></i> ' +
                from +
                (to ? "&ndash;" + to : "+")
            );
            //add the data to the labels
          }
          div.innerHTML = labels.join("<br>");
          return div;
        };
  
        legend.addTo(map);
      }
      else{
        const legend= document.getElementsByClassName("info legend")[0];
        if (legend)
        {
        legend.remove()
        }
      }
     
    }, [map]); //here add map
    return null;
  }