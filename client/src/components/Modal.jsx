import React, {useState} from 'react'
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import { addProjectData } from '../helpers/dash/dashFn';
import { useUpdate } from '../context/hasUpdated';
import { toast } from 'react-toastify';

const Modal = ({ title, content, idM, isAddProjectModal }) => {
    const [addProject, setAddProject] = useState({
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
    const {triggerUpdate} = useUpdate()
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAddProject({ ...addProject, [id]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if(addProject.title.trim() === "" || addProject.description.trim() === ""){
            toast.warning("Title and Description are required");
            return;
        }
        if (!isValidUrl(addProject.websiteLink)) {
            alert('Invalid website link');
            return;
        }

        if (!isValidUrl(addProject.githubLink)) {
            alert('Invalid GitHub link');
            return;
        }
        const res = await addProjectData(token, addProject);
        console.log(res);
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
            document.getElementById('closeModal').click();

            return;
        }else{
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {isAddProjectModal ? (<>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="col-form-label">Title:</label>
                                        <input required type="text" value={addProject.title} onChange={handleInputChange} className="form-control" id="title" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="col-form-label">Description:</label>
                                        <textarea required className="form-control" value={addProject.description} onChange={handleInputChange} id="description" defaultValue={""} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="col-form-label">Image:</label>
                                        <input type="text" value={addProject.image} onChange={handleInputChange} className="form-control" id="image" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="websiteLink" className="col-form-label">Link:</label>
                                        <input type="text" value={addProject.websiteLink} onChange={handleInputChange} className="form-control" id="websiteLink" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="githubLink" className="col-form-label">Github:</label>
                                        <input type="text" value={addProject.githubLink} onChange={handleInputChange} className="form-control" id="githubLink" />
                                    </div>
                                    <div className='mb- d-flex justify-content-end'>
                                    <button type="submit" className="btn"  style={{backgroundColor: "#FA782F", color: "#fff"}}>Submit</button>
                                    <button type="button" id="closeModal" style={{display: "none"}} className="btn btn-secondary ms-3" data-bs-dismiss="modal">Close</button>
                                    </div>
                                   
                                </form>
                            </>) : content + idM}
                        </div>
                        {isAddProjectModal?null:<div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Modal