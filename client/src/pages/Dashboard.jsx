import React, { useEffect, useState } from 'react';
import { useUpdate } from '../context/hasUpdated';
import { getRandomImages } from '../helpers/dash/dashFn';
import SampleProjects from '../components/SampleProjects';
import MyProjects from '../components/MyProjects';
import Dummy from '../components/Dummy';


const Dashboard = () => {
    const { isOffcanvasOpen,sideBarOptions } = useUpdate();
    const [isMobile, setIsMobile] = useState(false);
    const [images, setImages] = useState([]); 
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [isOffcanvasOpen, isMobile]);

    useEffect(() => {
        const getImages = async () => {
            const res = await getRandomImages();
            if (res.status === 200) {
                console.log(res.data);
                setImages(res.data);
            }
        }
        getImages();
    }, [])

    return (
      <>
        {sideBarOptions[0]?.isActive? <SampleProjects images={images}  />:null}
        
        {sideBarOptions[3]?.isActive?<MyProjects isMobile={isMobile} images={images}/>:null}

        {!sideBarOptions[0]?.isActive && !sideBarOptions[3]?.isActive?<Dummy/>:null}
      </>
    );
};

export default Dashboard;

