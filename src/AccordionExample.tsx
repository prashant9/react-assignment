import React, { useEffect, useReducer, useRef,useState, } from "react";
import { Link,useLocation } from 'react-router-dom';
export declare interface AccordionProps {
  title?: string;
  show?: boolean;
  children?: React.ReactNode;
  onToggle: () => void;
}

type State = {
  collapse: boolean;
};

type Action = { type: "collapse" } | { type: "show" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "collapse":
      return {
        collapse: !state.collapse
      };
    case "show":
      return {
        collapse: true
      };
  }
}

export function Accordion({
  title,
  show = false,
  children,
  onToggle 
}: AccordionProps) {
  const accordionBodyRef = useRef<HTMLDivElement>(null);
  const [apiDetails,setAPIList] = useState({});
  const [{ collapse }, dispatch] = useReducer(reducer, {
    collapse: show
  });

 

  const randomId = useRef(
    window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
  );

  useEffect(() => {
    if (show) dispatch({ type: "show" });
  }, [show]);

  const showAPIList = (param) =>{
    let provider = param.title;
    let apiURL = "https://api.apis.guru/v2/"+param.title+".json"
    
    
          const response = fetch(apiURL).then((res)=>{ return res.json()}).then((data)=>{
                     
            const jsonData = data;
            const logoUrl = Object.values(jsonData.apis).map(api => api.info['x-logo'].url);
            const apiTitle = Object.values(jsonData.apis).map(api => api.info.title);
            const description = Object.values(jsonData.apis).map(api => api.info.description);
            const contact = Object.values(jsonData.apis).map(api => api.info['contact']);
            const swagger = Object.values(jsonData.apis).map(api => api.swaggerUrl);
           
            setAPIList({logo:logoUrl,title:apiTitle,description:description,contact:contact,swagger:swagger})
          });
          
    
  }

  return (
    <div className="accordion-item mb-2" onClick={() => showAPIList({title})}>
      <h2 className="accordion-header" id={`heading-${randomId.current}`}>
        <button
          className={`accordion-button${collapse ? "" : " collapsed"}`}
          type="button"
          aria-expanded={collapse}
          aria-controls={`collapse-${randomId.current}`}
          onClick={() => dispatch({ type: "collapse" })}
        >
          {title}
        </button>
      </h2>

      <div
        id={`collapse-${randomId.current}`}
        aria-labelledby={`heading-${randomId.current}`}
        className={`accordion-collapse`}
        style={
          collapse
            ? {
                height: 'auto',
                transition: "height 0.2s ease",
                overflow: "hidden"
              }
            : {
                height: 0,
                transition: "height 0.2s ease",
                overflow: "hidden"
              }
        }
      >
        <div className="accordion-body py-2 px-2" ref={accordionBodyRef}>
          <Link to="/about" state={apiDetails} className="d-flex">
          <div><img src={apiDetails.logo}/></div>
          <div className="marginl2">{apiDetails.title}</div>
          </Link>
        </div>

      </div>
    </div>
  );
}
