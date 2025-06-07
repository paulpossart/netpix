import { useLocation } from 'react-router-dom';

function UpdateUsername() {
    const path = useLocation().pathname;
    console.log(path)
    return <p>UpdateName</p>
};

export default UpdateUsername;
