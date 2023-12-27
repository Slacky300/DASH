import React, { useEffect, useState } from 'react'
import { useUpdate } from '../context/hasUpdated';
import Modal from './Modal';
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import { getUserProjects } from '../helpers/dash/dashFn';
import { toast } from 'react-toastify';
import BgImg from '../assets/BG.svg';

const MyProjects = () => {
  const { isOffcanvasOpen, shouldUpdate, loading, setLoading } = useUpdate();
  const [projects, setProjects] = useState([{}]);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    content: '',
    idM: '',
    isAddProjectModal: true,
    isEditProjectModal: false,
    isDeleteProjectModal: false,
    isViewProjectModal: false
  })
  const [pLoading, setPLoading] = useState(false);

  const [projectId, setProjectId] = useState('');

  const token = getLocalStorageWithExpiry('auth')?.token;

  useEffect(() => {

    const fetchProjects = async () => {
      setPLoading(true);
      const res = await getUserProjects(token).finally(() => setPLoading(false));
      if (res.status === 200) {
        setProjects(res.data);
      }
      else {
        toast(res.data, { type: 'error' });
      }
    }

    fetchProjects();

  }, [shouldUpdate])

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
      {pLoading ? <div className="spinner-border text-primary display-1" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> : (<>
        <div className={`d-flex justify-content-center align-items-center ${isOffcanvasOpen && !isMobile ? 'offcanvas-open container-sm' : 'offcanvas-close container-fluid'}`}>
          <div className={`row w-100 d-flex justify-content-${isMobile ? 'center' : 'start'} align-items-${isMobile ? 'center' : 'start'} ${isMobile ? 'ms-0' : 'ms-5'}`}>
            <div className={`col-12 mt-3 w-100 d-flex justify-content-${isMobile ? 'center' : 'end'}`}>
              <button onClick={() => setModalInfo({
                title: 'Add Project',
                content: '',
                idM: 'addProject',
                isAddProjectModal: true,
                isEditProjectModal: false,
                isDeleteProjectModal: false,
                isViewProjectModal: false

              })} className='btn mx-5 my-2' style={{ backgroundColor: "#FA782F", color: "#fff", width: "5em", height: "3em" }} data-bs-toggle="modal" data-bs-target={`#${modalInfo.idM}`}>
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
            {projects.length > 0 ? projects?.map((project, index) => {
              return (
                <div className={`col-md-4 my-3 mx-5 col-sm-6 col-12`} key={index}>
                  {index === 0 && <h2 className='text-dark text-start my-4' style={{ fontWeight: '500' }}><b>My Projects</b></h2>}

                  <div className={`card ${isOffcanvasOpen ? 'side_bar_open' : ''}`}
                    style={(isOffcanvasOpen || !isOffcanvasOpen) && index === 1 && !isMobile ? { width: '100%', maxWidth: '20rem', marginTop: "5.3em", cursor: "pointer" } : { width: '100%', maxWidth: '20rem', cursor: "pointer" }}>

                    <div className='m-3'>
                      <img
                        src={project?.image}
                        alt="..."
                        className='img-fluid rounded'
                        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                      />
                    </div>
                    <div className={`card-body`}>
                      <h5 className="card-title d-flex justify-content-between">{project?.title}
                        <span  data-bs-toggle="modal" data-bs-target={`#${modalInfo.idM}`} className='text-end' style={{ marginLeft: isMobile ? "0.5em" : "5em" }}>
                          <div style={{ cursor: "pointer" }}>
                            <i onClick={() => {
                              setModalInfo({
                                title: 'Delete Project',
                                content: 'Deete babe',
                                idM: 'deleteProject',
                                isAddProjectModal: false,
                                isEditProjectModal: false,
                                isDeleteProjectModal: true,
                                isViewProjectModal: false

                              });
                              setProjectId(project._id)
                            }} className="bi bi-trash-fill"></i>
                          </div>
                        </span>
                        <span data-bs-toggle="modal" data-bs-target={`#${modalInfo.idM}`} className='text-end'>
                          <div style={{ cursor: "pointer" }}>
                            <i onClick={() => {
                              setModalInfo({
                                title: 'Edit Project',
                                content: 'Edit Babe',
                                idM: 'editProject',
                                isAddProjectModal: false,
                                isEditProjectModal: true,
                                isDeleteProjectModal: false,
                                isViewProjectModal: false

                              });
                              setProjectId(project._id)
                            }}  className="bi bi-pencil-fill"></i>
                          </div>
                        </span>
                        <span  data-bs-toggle="modal" data-bs-target={`#${modalInfo.idM}`} className='text-end'>
                          <div style={{ cursor: "pointer" }}>
                            <i onClick={() => {
                              setModalInfo({
                                title: 'View Project',
                                content: 'View Babe',
                                idM: 'viewProject',
                                isAddProjectModal: false,
                                isEditProjectModal: false,
                                isDeleteProjectModal: false,
                                isViewProjectModal: true

                              });
                              setProjectId(project._id)
                            }}  className="bi bi-eye-fill"></i>
                          </div>
                        </span>
                      </h5>

                      <p className="card-text">
                        {project?.description + '...'}
                      </p>

                    </div>
                  </div>

                </div>
              )
            }) : (
              <>
                <div className={`col-md-4 my-3 mx-5 col-sm-6 col-12 vh-100 ${isMobile ? 'text-center' : ''}`}>
                  <h3 className={`${isMobile ? 'my-3' : 'text-start'}`}>My Projects</h3>
                  <div className={`card ${isMobile ? 'd-flex justify-content-center' : 'd-flex justify-content-start'} `} style={{ width: '100%', maxWidth: isMobile ? "20em" : "20rem" }}>
                    <div className='m-2' data-bs-toggle="modal" data-bs-target={`#${modalInfo.idM}`}>
                      <img
                        src={BgImg}
                        alt="..."
                        className='img-fluid rounded'
                        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                      />
                    </div>
                    <div className={`card-body ${isMobile ? 'text-center' : ''}`}>
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
        <Modal content={modalInfo.content} pId={projectId}

          isViewProjectModal={modalInfo.isViewProjectModal} isDeleteProjectModal={modalInfo.isDeleteProjectModal} isEditProjectModal={modalInfo.isEditProjectModal}
          isAddProjectModal={modalInfo.isAddProjectModal} idM={modalInfo.idM} title={modalInfo.title} />
      </>)}
    </>

  )
}

export default MyProjects