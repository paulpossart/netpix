import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

function ModalProvider({ children }) {
    const [modal, setModal] = useState({
        type: null,
        data: null
    });

    const closeModal = () => setModal({ type: null, data: null });

    return (
        <ModalContext.Provider value={{
            modal, setModal, closeModal
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export { useModal, ModalProvider };
