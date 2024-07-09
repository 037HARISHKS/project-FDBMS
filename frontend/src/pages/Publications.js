import React from 'react';
import '../styles/Publications.css'
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';


function Publications() {
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)
  const publications = currentUser.data.publications;
  
//   [
//     {
//       id: '1',
//       category:'National',
//       title: 'A Reliable Broadcasting Scheme in Self-Pruning based MANETs',
//       description: 'Presented in NCCTSC’07 at Sri RamaKrishna College of Engineering Coimbatore on January 2007.',
//     },
//     {
//       id: '2',
//       category:'National',
//       title: 'Broadcasting in MANET using Adjustable transmission ranges',
//       description: 'Presented in Vision’07 at Government College of Engineering Tirunelveli on April 2007.',
//     },
//     {
//       id: '3',
//       title: 'A Novel Protocol for Effective Data Dissemination in VANETs',
//       category:'National',
//       description: 'Presented in ReCANT’2012 at PSR College of Engineering and Technology on April 2012.',
//     },
//     {
//       id: '4',
//       title: 'E-Street: LED powered Intelligent Street Lighting System',
//       category:'National',
//       description: 'Presented in 4th International conference on “Advanced Computing Control Systems Machines and Embedded Technology” at JKKN College of engineering and Technology.',
//     },
//     {
//       id: '5',
//       title: 'A Review On Agent Technologies In Wireless Sensor Networks',
//       category:'National',
//       description: 'Presented in International Conference on DESIGN AND APPLICATION OF STRUCTURES DRIVES COMMUNICATIONAL AND COMPUTING SYSTEMS –ICDASDC –2014.',
//     },
//     {
//       id: '6',
//       title: 'Smart E-Agriculture Monitoring Using Internet Of Things',
//       category:'National',
//       description: 'Presented in Sixth International Conference on Emerging trends in Engineering and Technology (ICETET\'16) Cape Institute of Technology.',
//     },
//     {
//       id: '7',
//       title: 'Secured and Authenticated Communication in Cloud using Dynamic Key Exchange Protocol',
//       category:'National',
//       description: 'Published in International Journal of Engineering and Innovative Technology Volume 2 Issue 4 October 2012.',
//     },
//     {
//       id: '8',
//       title: 'Data Mining Patterns in Grid Computing',
//       category:'National',
//       description: 'Published in International Journal of Scientific research Volume 2 Issue 3 March 2013 ISSN No 2277-8179.',
//     },
//     {
//       id: '9',
//       title: 'Survey on Street lighting System Based on Vehicle Movements',
//       category:'National',
//       description: 'Published in International journal of Innovative Research in Science engineering and technology Vol 3 Issue2 February 2014 ISSN 2319-8753.',
//     },
//   ];
  return (
    <div className="App">
      <h1>Publications</h1>
      <div className="publications">
        {publications.map((pub) => (
          <div className="publication" key={pub._id} >
            <div className="image" id={`image${pub.fileId}`}>
                <img src={`http://localhost:5000/uploads/${pub.fileId}`} alt={pub.title} />
            </div>
            <div className="description">
              <p><strong>{pub.title}</strong></p>
              <p><strong>{pub.category}</strong></p>
              <p><strong>{pub.type}</strong></p>
              <p>{pub.date}</p>
              <p>{pub.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='forbt'>
        <button className="bt1" onClick={()=> navigate('/addPublicationForm')}>Add New Project</button>
      </div>
      </div>

);
}
export default Publications;
