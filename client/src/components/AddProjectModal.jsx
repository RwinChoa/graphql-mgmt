import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";

export default function AddProjectModal() {
  const [project, setProject] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "new",
  });

  function a (x, y, z) {
    console.log(z, x, y);
  }
  const d = 1
  a(1,2, )
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
        name: project.name,
        description: project.description,
        clientId: project.clientId,
        status: project.status,
        
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.concat([addProject]) },
      });
    },
  });

  //Get Clients for select
  const { loading, error, data: clientsData } = useQuery(GET_CLIENTS);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      project.name === "" ||
      project.description === "" ||
      project.status === ""
    ) {
      return alert("Please fill in all fields!");
    }

    addProject();

    setProject({
      name: "",
      description: "",
      clientId: "",
      status: "new",
    });
  };

  console.log("af",project)
  if (loading) return null;
  if (error) return "Some Went Wrong";

  return (
    <>
      {!loading && !error && (
        <>
          {" "}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>
          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={project.name}
                        onChange={({ target: { value } }) =>
                          setProject((prevProject) => ({
                            ...prevProject,
                            name: value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={project.description}
                        onChange={({ target: { value } }) =>
                          setProject((prevProject) => ({
                            ...prevProject,
                            description: value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        id="status"
                        className="form-select"
                        value={project.status}
                        onChange={({ target: { value } }) =>
                          setProject((prevProject) => ({
                            ...prevProject,
                            status: value,
                          }))
                        }
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={project.clientId}
                        onChange={({ target: { value } }) =>
                          setProject((prevProject) => ({
                            ...prevProject,
                            clientId: value,
                          }))
                        }
                      >
                        <option  hidden>
                            Select A Client
                        </option>
                        {clientsData.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}


// import { useState } from 'react';
// import { FaList } from 'react-icons/fa';
// import { useMutation, useQuery } from '@apollo/client';
// import { ADD_PROJECT } from '../mutations/projectMutations';
// import { GET_PROJECTS } from '../queries/projectQueries';
// import { GET_CLIENTS } from '../queries/clientQueries';

// export default function AddProjectModal() {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [clientId, setClientId] = useState('');
//   const [status, setStatus] = useState('new');

//   const [addProject] = useMutation(ADD_PROJECT, {
//     variables: { name, description, clientId, status },
//     update(cache, { data: { addProject } }) {
//       const { projects } = cache.readQuery({ query: GET_PROJECTS });
//       cache.writeQuery({
//         query: GET_PROJECTS,
//         data: { projects: [...projects, addProject] },
//       });
//     },
//   });

//   // Get Clients for select
//   const { loading, error, data } = useQuery(GET_CLIENTS);

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (name === '' || description === '' || status === '' || clientId === '') {
//       return alert('Please fill in all fields');
//     }

//     addProject(name, description, clientId, status);

//     setName('');
//     setDescription('');
//     setStatus('new');
//     setClientId('');
//   };

//   if (loading) return null;
//   if (error) return 'Something Went Wrong';

//   return (
//     <>
//       {!loading && !error && (
//         <>
//           <button
//             type='button'
//             className='btn btn-primary'
//             data-bs-toggle='modal'
//             data-bs-target='#addProjectModal'
//           >
//             <div className='d-flex align-items-center'>
//               <FaList className='icon' />
//               <div>New Project</div>
//             </div>
//           </button>

//           <div
//             className='modal fade'
//             id='addProjectModal'
//             aria-labelledby='addProjectModalLabel'
//             aria-hidden='true'
//           >
//             <div className='modal-dialog'>
//               <div className='modal-content'>
//                 <div className='modal-header'>
//                   <h5 className='modal-title' id='addProjectModalLabel'>
//                     New Project
//                   </h5>
//                   <button
//                     type='button'
//                     className='btn-close'
//                     data-bs-dismiss='modal'
//                     aria-label='Close'
//                   ></button>
//                 </div>
//                 <div className='modal-body'>
//                   <form onSubmit={onSubmit}>
//                     <div className='mb-3'>
//                       <label className='form-label'>Name</label>
//                       <input
//                         type='text'
//                         className='form-control'
//                         id='name'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                     </div>
//                     <div className='mb-3'>
//                       <label className='form-label'>Description</label>
//                       <textarea
//                         className='form-control'
//                         id='description'
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                       ></textarea>
//                     </div>
//                     <div className='mb-3'>
//                       <label className='form-label'>Status</label>
//                       <select
//                         id='status'
//                         className='form-select'
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                       >
//                         <option value='new'>Not Started</option>
//                         <option value='progress'>In Progress</option>
//                         <option value='completed'>Completed</option>
//                       </select>
//                     </div>

//                     <div className='mb-3'>
//                       <label className='form-label'>Client</label>
//                       <select
//                         id='clientId'
//                         className='form-select'
//                         value={clientId}
//                         onChange={(e) => setClientId(e.target.value)}
//                       >
//                         <option value=''>Select Client</option>
//                         {data.clients.map((client) => (
//                           <option key={client.id} value={client.id}>
//                             {client.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <button
//                       type='submit'
//                       data-bs-dismiss='modal'
//                       className='btn btn-primary'
//                     >
//                       Submit
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }