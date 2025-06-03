import { useState } from 'react';
import { callSignIn } from '../../apiCalls/authCalls';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div>signIn</div>
    );
}

export default SignIn;
