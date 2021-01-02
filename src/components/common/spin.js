import React from 'react';
import { Spin as SpinAnt } from 'antd';

const Spin = (props) => {
    const { loading, isDataExist, children, spinSize = 'large', style } = props;
    return !isDataExist || loading ? <SpinAnt size={spinSize} style={style} /> : children
};

export { Spin };