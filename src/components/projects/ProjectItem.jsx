import React from 'react';
import './ProjectList.css';

const ProjectItem = ({
  _id,
  projectName,
  funnels,
  handleDelete,
}) => (
    <div className='project-wrapper'>
      <div className='project-image'>
        {/* {project.projectName} */}
      </div>

      <div className='project'>
        {projectName}
        <br />
        {funnels} funnels
      </div>

      <button className='delete-project' onClick={() => handleDelete(_id)}>Delete</button>
    </div>
  );

export default ProjectItem;