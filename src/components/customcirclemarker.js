import {React} from "react";
import {CircleMarker} from "react-leaflet";
import PropTypes from 'prop-types';


//circle marker for the map 
export default function Customcirclemarker(props){
    const {position, totalusage, Detailgraph} = props;
        const radius = totalusage/2000;
        

        if (totalusage >=60000)
        {
        return(

            <CircleMarker
                center={position}
                pathOptions={{color: "#940d0d"}}
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
                pathOptions={{color: "#d16213"}}
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
                pathOptions={{color: "#b59514"}}
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

//assign the types of the props
Customcirclemarker.propTypes = {
    position: PropTypes.array.isRequired,
    totalusage: PropTypes.number.isRequired,
    Detailgraph: PropTypes.func.isRequired,


}