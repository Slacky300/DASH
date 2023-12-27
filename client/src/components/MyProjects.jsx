import React, { useEffect, useState } from 'react'
import { useUpdate } from '../context/hasUpdated';
import Modal from './Modal';
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import { getUserProjects } from '../helpers/dash/dashFn';
import { toast } from 'react-toastify';
import BgImg from '../assets/BG.svg';

const MyProjects = ({ isMobile }) => {
  const { isOffcanvasOpen, shouldUpdate, loading,setLoading } = useUpdate();
  const [projects, setProjects] = useState([{}]);
  const modalInfo = {
    title: "Add Project",
    idM: 'addProject',
    isAddProjectModal: true
  }
  const token = getLocalStorageWithExpiry('auth')?.token;
  useEffect(() => {

    const fetchProjects = async () => {
      setLoading(true);
      const res = await getUserProjects(token).finally(() => setLoading(false));
      if (res.status === 200) {
        setProjects(res.data);
      }
      else {
        toast(res.data, { type: 'error' });
      }
    }

    fetchProjects();

  }, [shouldUpdate])
  return (
    <>
      <div className={`d-flex justify-content-center align-items-center ${isOffcanvasOpen && !isMobile ? ' offcanvas-open container-sm' : 'offcanvas-close container-fluid'}`} style={{ backgroundColor: 'darkgrey ' }}>
        <div className='row w-100  d-flex justify-content-start align-items-start ms-5'>
          <div className='col-12 mt-3 w-100 d-flex justify-content-end'>
            <button className='btn mx-5 my-2' style={{backgroundColor: "#FA782F", color: "#fff", width: "5em", height: "3em"}} data-bs-toggle="modal" data-bs-target={`#${modalInfo.idM}`}><i class="bi bi-plus-circle"></i></button>
          </div>
          {projects.length> 0? projects?.map((project, index) => {
            return (
              <div className={`col-md-4 my-3 mx-5 col-sm-6 col-12`} key={index}>
                {index === 0 && <h2 className='text-dark text-start my-4' style={{ fontWeight: '500' }}><b>My Projects</b></h2>}
                {index === 1 && !isMobile ? (
                  <div className={`card ${isOffcanvasOpen ? 'side_bar_open' : ''}`}
                    style={!isOffcanvasOpen ? { width: '100%', maxWidth: '20rem', marginTop: "5.3em", cursor: "pointer" } : { marginTop: "5.3em", cursor: "pointer" }}>
                    <div className='m-3'>
                      <img
                        src={project?.image}
                        alt="..."
                        className='img-fluid rounded'
                        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                      />
                    </div>
                    <div className={`card-body`}>
                      <h5 className="card-title">{project?.title}</h5>
                      <p className="card-text">
                        {project?.description+ '...'}
                      </p>

                    </div>
                  </div>
                ) : (
                  <div className={`card ${isOffcanvasOpen ? 'side_bar_open' : ''}`} data-bs-toggle="modal" data-bs-target="#sampleProjects" style={!isOffcanvasOpen ? { width: '100%', maxWidth: '20rem', cursor: "pointer" } : null} >
                    <div className='m-3'>
                      <img
                        src={project?.image}
                        alt="..."
                        className='img-fluid rounded'
                        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                      />
                    </div>
                    <div className={`card-body`}>
                      <h5 className="card-title">{project?.title}</h5>
                      <p className="card-text">
                        {project?.description + '...'}
                      </p>

                    </div>
                  </div>
                )}
              </div>
            )
          }):(
            <>
              <div className='col-md-4 my-3 mx-5 col-sm-6 col-12 vh-100'>
                <h3 className='text-start my-3'>My Projects</h3>
                <div className='card d-flex justify-content-start ' style={{width: '100%' , maxWidth: "20em"}}>
                <div className='m-2'>
                      <img
                        src={BgImg}
                        alt="..."
                        className='img-fluid rounded'
                        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                      />
                    </div>
                    <div className={`card-body text-center`}>
                      <h5 className="card-title"><b>Create a new project</b></h5>
                      <p className="card-text">
                        or try a sample project
                      </p>

                    </div>
                  </div>
              </div>
            </>
          )}

        </div>
      </div>
      <Modal isAddProjectModal={modalInfo.isAddProjectModal} idM={modalInfo.idM} title={modalInfo.title} />
    </>
  )
}

export default MyProjects