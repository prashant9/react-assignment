import React, { useEffect, useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Accordion} from "./AccordionExample";
let renderCount = 0;
const apiProviderURL = "https://api.apis.guru/v2/providers.json";
const DrawerExample = () => {
  const [show, setShow] = useState(false);
  const [apiProvider,setApiProvider] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, otherwise open the new one.
  };
  renderCount += 1;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiProviderURL);
      
      const data = await response.json();
      
      if (Array.isArray(data.data)) {
        setApiProvider(data.data);
       
      } else {
        console.error('Data is not an array');
      }
        
    }

    fetchData();
  }, []);

  return (
    <div>
        <div className="d-flex justify-content-center align-items-center vh-100">
        <Button className="btn-api" onClick={handleShow}>
        Explore web APIs
      </Button>
  </div>
      

      <Offcanvas show={show} onHide={handleClose} placement="end" >
        <Offcanvas.Header closeButton>          
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="text-center mb-3">Select Provider</div>
        {
        apiProvider && apiProvider.map((item,index) =>( 
            <Accordion key={index} title={item} isOpen={openIndex === {index}}
            onToggle={() => handleToggle({index})}/>
        ))
        }
       
        
        </Offcanvas.Body>
        
      </Offcanvas>
     
    </div>
  );
};

export default DrawerExample;
