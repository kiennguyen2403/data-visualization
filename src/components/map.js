import {React,useState} from 'react';
import Customcirclemarker from './customcirclemarker';
import Customgeojson from './customgeojson.js';
import Timeline from './timebar';
import { MapContainer, TileLayer} from 'react-leaflet';
import { useMap } from 'react-leaflet';
import Customgraph from "./customgraph";
import { Australiatotal } from '../data/Australiaconsumption';
import { Statedata } from '../data/state';
import { statesData } from '../data/statedata';

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

export default function Map() 
{

    const [center,setCenter] =useState([-24.6060639,96.358032]);
    const [scale ,setScale] =useState(4);
    const [time,setTime] =useState(0);
    const [positionid, setLocationId] =useState(0)
    


    const Getlocationid=(position)=>{
        Statedata.forEach((data,i)=>{
            if (data.position==position){
                setLocationId(i);
            }
        })
    }
    const Detailedgraph = (position) =>{
        setCenter([position[0],position[1]-3]);
        setScale(6);
        Getlocationid(position)
    }
    const Overviewgraph = () =>{
        setCenter([-24.6060639,96.358032]);
        setScale(4);
    }
    const Changethetime = (index) =>
    {
        setTime(index);
       
    }


 
if (scale <=4)
{
return(
    <div id="container">
    <Timeline Changetime={Changethetime} mode="consumption"/>
    <Customgraph charttype="linechart" dataset={Australiatotal}></Customgraph>
    <MapContainer center={center} zoom={scale}>
    <MapConfigure center={center} zoom={scale}/>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
  
    {   Statedata.map((d,key)=>{

        return(

            <Customcirclemarker position={d.position} totalusage={d.value[time]['Total energy consumption a']*100} Detailgraph={Detailedgraph}/>
        );
        })}
    </MapContainer>
 

</div>
    
);

}
else {
    return(
        <div id="container">
        <Timeline Changetime={Changethetime} mode="consumption"/>
        <Customgraph charttype="barchart" dataset={Statedata[positionid].value[time] } extrainformation={Statedata[positionid].name}></Customgraph>
        <MapContainer center={center} zoom={scale}>
        <MapConfigure center={center} zoom={scale}/>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Customgeojson data={statesData} Overviewgraph={Overviewgraph}/>
        </MapContainer>
        </div>
    );

}



}