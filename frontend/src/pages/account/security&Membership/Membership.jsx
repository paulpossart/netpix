import { useModal } from '../../../context/ModalContext';

function Membership() {
    const { setModal } = useModal();

    const renderModal = () => {
        setModal({
            type: 'test',
            data: <p>Hello World!</p>
        });
    };

    return (
        <>
            <p>Membership</p>
            <button onClick={renderModal}>
                open modal
            </button>
        </>
    );
}

export default Membership;

