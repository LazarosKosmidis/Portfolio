import React from 'react';

const NonClickable = () => {
    return (
        <div
            style={{
                opacity: 0,
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
            }}
        ></div>
    );
};

export default NonClickable;
