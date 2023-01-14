import React from 'react';
import { useState } from 'react';

const ErrorModel = (props) => {
    const [error, setError] = useState(true);

    if (!error) {
        return;
    }
    return (
        <div id="error-model" className='bg-red-500 text-white p-2 flex justify-between'>
            <div>
                <h2 className='text-lg font-medium'>{props.title}</h2>
                <p className='text-sm'>{props.description}</p>
            </div>
            <button onClick={() => {
                setError(false);
                window.location.href = '/';

            }} className='bg-red-900 py-2 px-5 rounded'>Close</button>
        </div>
    );
}

export default ErrorModel;
