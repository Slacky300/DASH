import { createContext, useContext, useState } from 'react';

const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [sideBarOptions, setSideBarOptions] = useState([
    {
      name: 'Sample Projects',
      icon: 'Sample',
      link: '/sample-project',
      isActive: false
    },
    {
      name: 'Apps',
      icon: 'Apps',
      link: '/apps',
      isActive: false
    },
    {
      name: 'Intro',
      icon: 'Intro',
      link: '/intro',
      isActive: false
    },
    {
      name: 'My Projects',
      icon: 'MyProjects',
      link: '/my-projects',
      isActive: true
    },
    {
      name: 'Help',
      icon: 'Help',
      link: '/help',
      isActive: false
    },
    {
      name: 'Feedback',
      icon: 'Feedback',
      link: '/feedback',
      isActive: false
    }
  ]);

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const triggerUpdate = () => {
    console.log('triggered');
    setShouldUpdate(prev => !prev);
  };


  return (
    <UpdateContext.Provider value={{ shouldUpdate, triggerUpdate, loading, setLoading, isOffcanvasOpen, toggleOffcanvas,sideBarOptions, setSideBarOptions}}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => useContext(UpdateContext);