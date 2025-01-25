import React from 'react';

const Container = (props) => {
    return (
        <div className='max-w-[1280px] mx-auto'>
            {props.children}
        </div>
    );
}

export default Container;
