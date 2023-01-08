
import React from 'react';

function LoginButton() {
    const { loginWithRedirect } = useAuth0();
    
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

export default firstComponent;