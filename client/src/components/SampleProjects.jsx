import React, { useState, useEffect } from 'react'
import { useUpdate } from '../context/hasUpdated'
import Modal from './Modal';
import { sampleProjectData } from '../assets/sampledata';

const SampleProjects = ({ images }) => {
    const { isOffcanvasOpen } = useUpdate();
    const [modalInfo, setModalInfo] = useState({
        title: '',
        content: '',
        idM: 'sampleProjects'
    })
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            <div className={`d-flex justify-content-center align-items-center ${isOffcanvasOpen && !isMobile ? ' offcanvas-open container-sm' : 'offcanvas-close container-fluid'}`}>
                <div className='row w-100  d-flex justify-content-center align-items-center'>
                    {images.map((image, index) => {
                        return (
                            <div className={`col-md-4 my-3 mx-5 col-sm-6 col-12`} key={index}>
                                {index === 0 && <h2 className='text-dark text-start my-4' style={{ fontWeight: '500' }}><b>Sample Projects</b></h2>}

                                <div className={`card ${isOffcanvasOpen ? 'side_bar_open' : ''}`} onClick={
                                    () => {
                                        setModalInfo({
                                            title: sampleProjectData[index].name,
                                            content: sampleProjectData[index].description,
                                            idM: 'sampleProjects'
                                        })
                                    }
                                } data-bs-toggle="modal" data-bs-target="#sampleProjects"
                                    style={(isOffcanvasOpen || !isOffcanvasOpen) && index === 1 && !isMobile ? { width: '100%', maxWidth: '20rem', marginTop: "5.3em", cursor: "pointer" } : { width: '100%', maxWidth: '20rem', cursor: "pointer" }}>

                                    <div className='m-3'>
                                        <img
                                            src={image.download_url}
                                            alt="..."
                                            className='img-fluid rounded'
                                            style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                                        />
                                    </div>
                                    <div className={`card-body`}>
                                        <h5 className="card-title">{sampleProjectData[index].name}</h5>
                                        <p className="card-text">
                                            {sampleProjectData[index].description.slice(0, 80) + '...'}
                                        </p>

                                    </div>
                                </div>


                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal title={modalInfo.title} content={modalInfo.content} idM={modalInfo.idM} />
        </>
    )
}

export default SampleProjects