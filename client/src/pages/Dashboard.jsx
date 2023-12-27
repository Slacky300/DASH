import React, { useEffect, useState } from 'react';
import { useUpdate } from '../context/hasUpdated';
import { getRandomImages } from '../helpers/dash/dashFn';
import SampleProjects from '../components/SampleProjects';
import MyProjects from '../components/MyProjects';


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
        {sideBarOptions[0]?.isActive? <SampleProjects images={images} isMobile={isMobile} />:null}
        {/* {sideBarOptions[1].isActive && <SampleProjects images={images} isMobile={isMobile} />}
        {sideBarOptions[2].isActive && <SampleProjects images={images} isMobile={isMobile} />} */}
        {sideBarOptions[3]?.isActive?<MyProjects isMobile={isMobile} images={images}/>:null}
      </>
    );
};

export default Dashboard;

