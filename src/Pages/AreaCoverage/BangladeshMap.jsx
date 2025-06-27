import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaSearchLocation } from "react-icons/fa";


function FlyToDistrict({coords}){
    const map = useMap();

    if(coords){
        map.flyTo(coords , 14 , {duration: 1.5});
    }
    return null;
}
const BangladeshMap = ({ wareHousesData }) => {
  const bangladeshPosition = [23.685, 90.3563];
  // const  palestinePosition = [31.9522, 35.2332];
  // console.log(wareHousesData)

  const [searchDistrict , setSearchDistrict] = useState(''); 
  const [activeCoords , setActiveCoords] = useState(null);
  const [activeDistrict , setActiveDistrict] = useState(null);

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e,e.target.value);

    const district = wareHousesData.find((d) => 
    d.district.toLowerCase().includes(searchDistrict.toLowerCase()));

    console.log(district)

    if(district){
        setActiveDistrict(district.district);
        setActiveCoords([district.latitude , district.longitude]);
    }
  }

  return (
    <div>
        <div className='mb-20 flex gap-5'>
            <form onSubmit={handleSearch} className="flex gap-13 items-center border border-gray-300 rounded-xl">
                    <FaSearchLocation className="text-3xl text-gray-900" />
                    <input
                    type="text"
                    placeholder="Search..."
                    className="text-3xl rounded-xl h-1/2 focus:outline-none"
                    value={searchDistrict}
                    onChange={(e) => setSearchDistrict(e.target.value)}
                    />
            
            <button 
                type="submit"
                className="cursor-pointer rounded-2xl bg-[#CAEB66] text-gray-800 text-3xl font-bold m-1 px-4 py-2 hover:opacity-90 transition">
                Search
            </button>
            </form>
        </div>
        <div className="h-[800px] w-full rounded-lg overflow-hidden shadow-lg">

        <MapContainer
            center={bangladeshPosition}
            zoom={8}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
        >
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyToDistrict coords={activeCoords}/>

            {
                wareHousesData.map((wareHouses,index)=>
                    <Marker 
                        key={index}
                        position={[wareHouses.latitude , wareHouses.longitude]} 
                        icon={customIcon}
                    >
                        {
                            activeCoords !== null ? 
                            <Popup autoOpen={wareHouses.district === activeDistrict}>
                                <strong className="text-3xl font-bold">{wareHouses.district}</strong>
                                <p className="text-2xl font-medium">{wareHouses.covered_area.join(', ')}</p>
                            </Popup>
                        :
                            <h1>No district found</h1>
                        }
                        
                    </Marker>
                )
            }
        </MapContainer>
        </div>

    </div>
  );
};

export default BangladeshMap;
