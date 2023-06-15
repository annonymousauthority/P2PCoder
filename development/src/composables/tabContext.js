import { createContext, useContext, useEffect, useState } from 'react';

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const barItems = [{ id: 1, title: 'Welcome', active: true }];
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (items.length == 0) {
      setItems(barItems);
    } else {
      window.localStorage.setItem('barItems', JSON.stringify(items));
    }
  }, [items]);
  useEffect(() => {
    const storedItems = window.localStorage.getItem('barItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems(barItems);
    }
  }, []);

  const handleLanguage = (lang) => {
    if (lang) {
      if (items.length < 5) {
        const oldItems = items.map((item) => ({
          ...item,
          active: false,
        }));
        const collabCheck = items.filter((e) => e.title == 'collab');
        if (!collabCheck.length) {
          const newItems = [
            ...oldItems,
            {
              id: items.length + 1,
              title:
                lang === 'js'
                  ? 'scripts'
                  : lang === 'css'
                  ? 'styles'
                  : lang === 'html'
                  ? 'index'
                  : lang == 'collab'
                  ? 'collab'
                  : 'untitled',
              ext:
                lang === 'js'
                  ? '.js'
                  : lang === 'css'
                  ? '.css'
                  : lang === 'html'
                  ? '.html'
                  : lang == 'collab'
                  ? '.p2p'
                  : '',
              active: true,
              code: '',
            },
          ];
          setItems(newItems);
        } else {
          setErrorMessage('You can only have 1 collab tab');
        }
      } else {
        setErrorMessage('You can only have 5 pages open at once.');
      }
    }
  };

  return (
    <TabContext.Provider
      value={{
        barItems,
        items,
        setItems,
        handleLanguage,
        setErrorMessage,
        errorMessage,
      }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  return useContext(TabContext);
};
