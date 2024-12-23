import React from 'react'
import { useNavigate  } from 'react-router-dom'

export default function APIProviderDetails({apidata}) {
    const navigate = useNavigate();
    const handleRedirect = () => {
       
          navigate('/');
    }
  return (
    <div className='api-detail'>
    <div className='mt-5'>
        
            <div className='d-flex justify-content-center align-items-center '>
                <span className='mr-5'><img src={apidata.logo[0]} style={{width:'100px'}}/></span>
                <span style={{marginLeft:'20px'}}><h3>{apidata.title[0]}</h3></span>
            </div>
        
    </div>
    <div className='row py-3 px-5'>
            <div className='col-md-12'>
                <h5>Description</h5>
                <p>{apidata.description[0]}</p>
            </div>
    </div>
    <div className='row py-3 px-5'>
            <div className='col-md-12'>
            <h5>Swagger</h5>
            <p>{apidata.swagger[0]}</p>
            </div>
    </div>
    <div className='row py-3 px-5'>
            <div className='col-md-12'>
            <h5>Contact</h5>
            <table>
                <tbody>
            <tr>
                <td style={{width:'30%'}}>Email</td>
                <td>{apidata.contact[0].email}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{apidata.contact[0].name}</td>
            </tr>
            <tr>
                <td>Url</td>
                <td>{apidata.contact[0].url}</td>
            </tr>
            </tbody>
            </table>
            
            </div>
    </div>

    <div className='d-flex justify-content-center align-items-center '>
               <button className='btn btn-api' onClick={handleRedirect}>Explore more APIs</button>
            </div>
    </div>
  )
}
