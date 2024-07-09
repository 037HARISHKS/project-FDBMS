import React from 'react';
import '../styles/fundedProject.css';  // Rename App.css to FundedProjects.css
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function FundedProjects() {

  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user)
  const projects = currentUser.data.fundedProjectProposals ;

  return (
    <div className="FundedProjects">
      <h1>Projects</h1>
      <div className="projects">
        {projects.map((project) => (
          <div className="project" key={project._id} >
            <div className="image" id={`image${project.feilId}`}>
              <img src={`http://localhost:5000/uploads/${project.fileId}`} alt={project.title} />
            </div>
            <div className="details">
              <p><strong>{project.title}</strong></p>
              <p>{project.status}</p>
              <p>DateSubmitted : {project.dateSubmitted}  </p>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='forbt'>
        <button className="bt1" onClick={()=> navigate('/addFppForm')}>Add New Project</button>
        </div>
    </div>
  );
}

export default FundedProjects;