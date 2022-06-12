import {React,useState} from 'react';
import Customcirclemarker from './customcirclemarker';
import Customgeojson from './customgeojson.js';
import Timeline from './timebar';
import { MapContainer, TileLayer} from 'react-leaflet';
import { useMap } from 'react-leaflet';
import Customgraph from "./customgraph";
import { Statedata } from '../data/state';
import { statesData } from '../data/statedata';
import {Legend} from './legend'
import { resource } from '../data/resource';






export default function Map() 
{
    //assign the required value
    const [map, setMap] = useState(null);
    const [center,setCenter] =useState([-24.6060639,96.358032]);
    const [scale ,setScale] =useState(4);
    const [time,setTime] =useState(0);
    const [positionid, setLocationId] =useState(0)

    //assign some features related to the graph
    function MapConfigure({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        return null;
      }

    //get the location index based on the position
    const Getlocationid=(position)=>{
        Statedata.forEach((data,i)=>{
            if (data.position==position){
                setLocationId(i);
            }
        })
    }
    //zoom to the state
    const Detailedgraph = (position) =>{
        setCenter([position[0],position[1]-3]);
        setScale(6);
        Getlocationid(position)
    }

    //zoom to the Australia map
    const Overviewgraph = () =>{
        setCenter([-24.6060639,96.358032]);
        setScale(4);
    }
    const Changethetime = (index) =>
    {   
 
        if (index<Statedata[0].value.length)
        {
        setTime(index);
        }
        else
        { 
        setTime(0)
        }
       
    }
// CircleMarker if the scale is equal or smaller than 4
if (scale <=4)
{
return(
    <div id="container">
    <Timeline Changetime={Changethetime} mode="consumption"/>
    <Customgraph charttype="linechart" dataset={resource}></Customgraph>
    <MapContainer center={center} zoom={scale} whenCreated={setMap}>
    <MapConfigure center={center} zoom={scale}/>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Legend map={map} />
        {   
        Statedata.map((d,key)=>{
        return(

            <Customcirclemarker position={d.position} totalusage={d.value[time]['Total energy consumption']*100} Detailgraph={Detailedgraph}/>
        );
        })}
    </MapContainer>
    <p className="subtitle">Further information is available in the Department of Industry, Innovation, and Science.
</p>
    <h1 className="graph_title headtitle">Total energy consumption by different resources and of different states in Australia</h1>
    <div className="context">
    <p>The total amount of energy consumed in the Australian economy is measured as energy consumption. It equals domestic production minus imports minus exports (and changes in stocks). To avoid double-counting, it includes energy consumed in energy conversion activities such as electricity generation and petroleum refining but excludes derived fuels produced domestically. It is also known as total net energy consumption and is equal to the total primary energy supply. 
Following two years of decline, Australian energy consumption increased by 1% to 5,920 petajoules in 2014–15. Energy consumption in 2014–15 is similar to that of the previous two years. In 2014–15, the Australian economy grew by more than 2%, while the population grew by 1%.
Energy productivity increased by 1% in 2014–15, as measured by the ratio of GDP to energy consumption. Between 2000–01 and 2014–15, energy productivity increased by 28%. Over the same period, GDP increased by 51%, energy consumption increased by 18%, and the population increased by 23%.
Knowing that it is challenging to get the ideas of how the energy consumption has changed across years and regions, the data have been visualized on a map and graphs. The map below will show you the total energy consumed by Australia and guide you to the consumption of specific states or territories just by clicking on the bubble. The line chart and bar chart are used to visualize the consumption details by energy units.
</p>
</div>
</div>
    
);

}
// return the customgeojson if the scale is bigger than 4
else {
    return(
        <div id="container">
        <Timeline Changetime={Changethetime} mode="consumption"/>
        <Customgraph charttype="barchart" dataset={Statedata[positionid].value[time] } extrainformation={Statedata[positionid].name}></Customgraph>
        <MapContainer center={center} zoom={scale} >
        <MapConfigure center={center} zoom={scale}/>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Legend map={null} />
            <Customgeojson data={statesData} Overviewgraph={Overviewgraph}/>
        </MapContainer>
        <p className="subtitle">Further information is available in the Department of Industry, Innovation, and Science.
</p>

        <div className="context">

    <p>The total amount of energy consumed in the Australian economy is measured as energy consumption. It equals domestic production minus imports minus exports (and changes in stocks). To avoid double-counting, it includes energy consumed in energy conversion activities such as electricity generation and petroleum refining but excludes derived fuels produced domestically. It is also known as total net energy consumption and is equal to the total primary energy supply. 
Following two years of decline, Australian energy consumption increased by 1% to 5,920 petajoules in 2014–15. Energy consumption in 2014–15 is similar to that of the previous two years. In 2014–15, the Australian economy grew by more than 2%, while the population grew by 1%.
Energy productivity increased by 1% in 2014–15, as measured by the ratio of GDP to energy consumption. Between 2000–01 and 2014–15, energy productivity increased by 28%. Over the same period, GDP increased by 51%, energy consumption increased by 18%, and the population increased by 23%.
Knowing that it is challenging to get the ideas of how the energy consumption has changed across years and regions, the data have been visualized on a map and graphs. The map above will show you the total energy consumed by Australia and guide you to the consumption of specific states or territories just by clicking on the bubble. The line chart and bar chart are used to visualize the consumption details by energy units.
</p>
</div>
        </div>
    );

}

}