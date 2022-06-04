import {React} from "react";
import {CircleMarker} from "react-leaflet";
import PropTypes from 'prop-types';

export default function Customcirclemarker(props){
    const {position, totalusage, Detailgraph} = props;
        const radius = totalusage/1000;
        

        if (totalusage >=60000)
        {
        return(

            <CircleMarker
                center={position}
                pathOptions={{color: "red"}}
                radius={radius}
                eventHandlers={{
                    click: () => {
                      Detailgraph(position)
                    },
                    mouseover: (e) => {
                        e.target.openPopup()
                        
                    },
                    mouseout: (e) => {
                        e.target.closePopup()
                    }
                       
                  }} 
                >       
            </CircleMarker>
        )
        }

        else if ((totalusage<60000) && (totalusage>40000))
        {
            return (
                <CircleMarker   
                center={position}
                pathOptions={{color: "orange"}}
                radius={radius}
                eventHandlers={{
                    click: () => {
                      Detailgraph(position)

                    },
                    mouseover: (e) => {
                        e.target.openPopup()
                        
                    },
                    mouseout: (e) => {
                        e.target.closePopup()
                    }
                  }}
                >             
                </CircleMarker>
            )
        }

        else if (totalusage<=40000)
        {
            return(
                <CircleMarker  center={position}
                pathOptions={{color: "yellow"}}
                radius={radius}
                eventHandlers={{
                    click: () => {
                      Detailgraph(position)
                    },
                    mouseover: (e) => {
                       e.target.openPopup()
                    },
                    mouseout: (e) => {
                        e.target.closePopup()
                    }
                  }}
                >
                     
                </CircleMarker>
            )
        }
   
}


Customcirclemarker.propTypes = {
    position: PropTypes.array.isRequired,
    totalusage: PropTypes.number.isRequired,
    Detailgraph: PropTypes.func.isRequired,


}