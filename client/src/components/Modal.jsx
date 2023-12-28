import React, { useEffect, useState } from 'react'
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import { addProjectData, deleteProject, getSingleProject, updateProject } from '../helpers/dash/dashFn';
import { useUpdate } from '../context/hasUpdated';
import { toast } from 'react-toastify';

const Modal = ({ title, content, idM, pId, isAddProjectModal, isViewProjectModal, isEditProjectModal, isDeleteProjectModal }) => {
    const [addProject, setAddProject] = useState({
        title: "",
        description: "",
        image: "",
        websiteLink: "",
        githubLink: ""
    });
    const [editProject, setEditProject] = useState({
        title: "",
        description: "",
        image: "",
        websiteLink: "",
        githubLink: ""
    });

    const isValidUrl = (url) => {
        const urlPattern = new RegExp(
            /^(ftp|http|https):\/\/[^ "]+$/i
        );

        return urlPattern.test(url);
    };
    const token = getLocalStorageWithExpiry('auth')?.token;
    const { triggerUpdate, loading, setLoading, shouldUpdate } = useUpdate()
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAddProject({ ...addProject, [id]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (addProject.title.trim() === "" || addProject.description.trim() === "") {
            toast.warning("Title and Description are required");
            return;
        }

        if(addProject.title.length > 50 || addProject.description.length > 500 ){
            toast.warning("some fields are too long");
            return;
        }
        if(addProject.image){
            if (!isValidUrl(addProject.image)) {
                toast.warning('Invalid image link');
                return;
            }
        }

        if(addProject.websiteLink){
            if (!isValidUrl(addProject.websiteLink)) {
                toast.warning('Invalid website link');
                return;
            }
        }

        if(addProject.githubLink){
            if (!isValidUrl(addProject.githubLink)) {
                toast.warning('Invalid GitHub link');
                return;
            }
        }

      
        setLoading(true);
        const res = await addProjectData(token, addProject).finally(() => {
            setLoading(false); document.getElementById('closeModal').click();
        });
        if (res.status === 201) {
            toast(res.data.message, { type: 'success' });
            triggerUpdate();
            setAddProject({
                title: "",
                description: "",
                image: "",
                websiteLink: "",
                githubLink: ""
            });

            return;
        } else {
            toast(res.data.message, { type: 'error' });
            return;
        }
    }
    useEffect(() => {

        const fetchCurrProject = async () => {
            setLoading(true);
            const res = await getSingleProject(token, pId).finally(() => setLoading(false));
            if (res.status === 200) {
                setEditProject(res.data.project);
            } else {
                toast(res.data.message, { type: 'error' });
            }
        }
        if (!isAddProjectModal) {
            fetchCurrProject();
        }
    }, [pId])

    const handleEditInputChange = (e) => {
        const { id, value } = e.target;
        setEditProject({ ...editProject, [id]: value });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (editProject.title.trim() === "" || editProject.description.trim() === "") {
            toast.warning("Title and Description are required");
            return;
        }
        if (!isValidUrl(editProject.websiteLink)) {
            alert('Invalid website link');
            return;
        }

        if (!isValidUrl(editProject.githubLink)) {
            alert('Invalid GitHub link');
            return;
        }
        setLoading(true);
        const res = await updateProject(token, pId, editProject).finally(() => {
            setLoading(false); 

        });
        if (res.status === 200) {
            toast(res.data.message, { type: 'success' });
            triggerUpdate();
            return;
        } else {
            toast(res.data.message, { type: 'error' });
            return;
        }
    }

    const handleDeleteProject = async () => {
        setLoading(true);
        const res = await deleteProject(token, pId).finally(() => { setLoading(false); });
        if (res.status === 200) {
            toast(res.data.message, { type: 'success' });
            triggerUpdate();
            document.getElementById('closeModal').click();
            return;
        } else {
            toast(res.data.message, { type: 'error' });
            return;
        }
    }

    return (
        <>
            <div className="modal fade" id={idM} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{!isAddProjectModal ? editProject?.title ? "Project " + editProject?.title : title : title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {isAddProjectModal ? (<>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="col-form-label">Title:</label>
                                        <input disabled={loading} required type="text" value={addProject.title} onChange={handleInputChange} className="form-control" id="title" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="col-form-label">Description:</label>
                                        <textarea disabled={loading} required className="form-control" value={addProject.description} onChange={handleInputChange} id="description" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="col-form-label">Image:</label>
                                        <input disabled={loading} type="text" value={addProject.image} onChange={handleInputChange} className="form-control" id="image" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="websiteLink" className="col-form-label">Link:</label>
                                        <input disabled={loading} type="text" value={addProject.websiteLink} onChange={handleInputChange} className="form-control" id="websiteLink" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="githubLink" className="col-form-label">Github:</label>
                                        <input disabled={loading} type="text" value={addProject.githubLink} onChange={handleInputChange} className="form-control" id="githubLink" />
                                    </div>
                                    <div className='mb- d-flex justify-content-end'>
                                        <button disabled={loading} type="submit" className="btn"  style={{ backgroundColor: "#FA782F", color: "#fff" }}>Submit</button>
                                        <button type="button" id="closeModal" style={{ display: "none" }} className="btn btn-secondary ms-3" data-bs-dismiss="modal">Close</button>
                                    </div>

                                </form>
                            </>) : isDeleteProjectModal ? (<>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Are you sure you want to delete {editProject.title} project?</label>
                                    <div className='text-end'>
                                        <button type="button" disabled={loading} onClick={() => handleDeleteProject()} className="btn btn-danger ms-3" data-bs-dismiss="modal">Yes</button>
                                        <button type="button" disabled={loading} className="btn btn-success ms-3" data-bs-dismiss="modal">No</button>
                                    </div>
                                </div>
                            </>) : isEditProjectModal ? (<>
                                {loading ? "Loading..." : <>
                                    <form onSubmit={handleEditSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="col-form-label">Title:</label>
                                            <input disabled={loading} required type="text" value={editProject?.title} onChange={handleEditInputChange} className="form-control" id="title" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="col-form-label">Description:</label>
                                            <textarea disabled={loading} required className="form-control" value={editProject?.description} onChange={handleEditInputChange} id="description" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="col-form-label">Image:</label>
                                            <input disabled={loading} type="text" value={editProject?.image} onChange={handleEditInputChange} className="form-control" id="image" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="websiteLink" className="col-form-label">Link:</label>
                                            <input disabled={loading} type="text" value={editProject?.websiteLink} onChange={handleEditInputChange} className="form-control" id="websiteLink" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="githubLink" className="col-form-label">Github:</label>
                                            <input disabled={loading} type="text" value={editProject?.githubLink} onChange={handleEditInputChange} className="form-control" id="githubLink" />
                                        </div>
                                        <div className='mb- d-flex justify-content-end'>
                                            <button disabled={loading} type="submit" className="btn" data-bs-dismiss="modal" style={{ backgroundColor: "#FA782F", color: "#fff" }}>Submit</button>
                                            <button type="button" id="closeModalEdit" style={{ display: "none" }} className="btn btn-secondary ms-3" data-bs-dismiss="modal">Close</button>
                                        </div>

                                    </form>
                                </>}
                            </>) : isViewProjectModal ? (<>
                                {loading ? "Loading..." : <>
                                    <div className="lead">
                                        <h4 className="modal-title fs-5" id="exampleModalLabel">Title: {editProject?.title}</h4>
                                        <p className="text-muted"><b style={{ color: "black" }}>Description:</b> {editProject?.description}</p>
                                        <img src={editProject?.image.length>0 ? editProject.image : "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA12rZ8k.img"} alt='project' className='img-fluid' />
                                        <p className="text-muted"><b style={{ color: "black" }}>Live Link:</b> {editProject?.websiteLink? editProject.websiteLink: "Not provided"}</p>
                                        <p className="text-muted"><b style={{ color: "black" }}>Github Link:</b> {editProject?.githubLink? editProject.githubLink: "Not provided"}</p>
                                    </div>
                                </>}

                            </>) : (<>{content}</>)}
                        </div>
                        {isAddProjectModal || isDeleteProjectModal || isEditProjectModal ? null : <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Modal