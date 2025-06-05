import { useState } from 'react';
import { callCreateUser } from '../../apiCalls/usersCalls';

function CreateUser({ setView }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <>
            <div>CreateUser</div>
            <button onClick={() => setView('sign-in')}>Sign in</button>
        </>
    );
}

export default CreateUser;
