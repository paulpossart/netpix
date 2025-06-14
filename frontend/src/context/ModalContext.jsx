import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

function ModalProvider({ children }) {
    const [textModal, setTextModal] = useState(null);
    const [trailerModal, setTrailerModal] = useState(null);
    const [infoModal, setInfoModal] = useState(null);

    return (
        <ModalContext.Provider value={{
            textModal, setTextModal,
            trailerModal, setTrailerModal,
            infoModal, setInfoModal
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export { useModal, ModalProvider };