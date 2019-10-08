import React from 'react';
import * as IconIo from 'react-icons/io';
import * as IconMd from 'react-icons/md';
import Calculator from './apps/Calculator';
import Fly from './apps/Fly/Fly';

export const Colors = {
    white: '#fff',
    black: '#000',
    grayLight: 'rgb(204, 204, 204)'
}

export const Size = {
    exstraSmall: '17px',
    small: '30px',
    medium: '40px',
    big: '60px'
}


export const Icons = {
    keypad: 'keypad',
    circlePlus: 'circlePlus',
    circleMinus: 'circleMinus',
    fileUpload: 'fileUpload',
    close: 'close',
    arrowDown: 'arrowDown'
}


export function GetIcon({ type, size, color }) {
    if (type === 'keypad') {
        return <IconIo.IoIosKeypad color={color} size={size} />;
    } else if (type === 'circlePlus') {
        return <IconIo.IoIosAddCircleOutline color={color} size={size} />;
    } else if (type === 'circleMinus') {
        return <IconIo.IoIosRemoveCircleOutline color={color} size={size} />;
    } else if (type === 'fileUpload') {
        return <IconMd.MdFileUpload color={color} size={size} />;
    } else if (type === 'close') {
        return <IconIo.IoIosCloseCircleOutline color={color} size={size} />;
    } else if (type === 'arrowDown') {
        return <IconIo.IoIosArrowDown color={color} size={size} />;
    }
}

export function GetApp({ app }) {
    if (app === 'Calculator') {
        return <Calculator />;
    } else if (app === 'Fly') {
        return <Fly />;
    }
}