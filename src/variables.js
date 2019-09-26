import React from 'react';
import * as IconIo from 'react-icons/io';
import * as IconMd from 'react-icons/md';

export const Colors = {
    white: '#fff',
    grayLight: 'rgb(206, 206, 206)'
}

export const Size = {
    small: '30px',
    medium: '40px',
    big: '60px'
}


export const Icons = {
    keypad: 'keypad',
    circlePlus: 'circlePlus',
    fileUpload: 'fileUpload',
    close: 'close'
}


export function GetIcon({ type, size, color }) {
    if (type === 'keypad') {
        return <IconIo.IoIosKeypad color={color} size={size} />;
    } else if (type === 'circlePlus') {
        return <IconIo.IoIosAddCircleOutline color={color} size={size} />;
    } else if (type === 'fileUpload') {
        return <IconMd.MdFileUpload color={color} size={size} />;
    } else if (type === 'close') {
        return <IconIo.IoIosCloseCircleOutline color={color} size={size} />;
    }
}