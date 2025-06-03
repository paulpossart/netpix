import { useState } from 'react';
import { callCreateUser } from '../../apiCalls/usersCalls';

function CreateUser() {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return(
        <div>CreateUser</div>
    );
}

export default CreateUser;
