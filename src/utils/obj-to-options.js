import React from 'react';
import { Select } from 'antd';

export const obj2options = (obj, keyMap = {}) => {
    if (!obj) return null;

    const defaultKeyMap = {
        value: 'value',
        text: 'text'
    };
    const { value, text } = Object.assign(defaultKeyMap, keyMap);

    return Object.keys(obj).map((key) => {
        const option = obj[key];
        let resultValue = key;
        let resultText = option;
        let disabled = false;
        if (typeof option === 'object') {
            resultValue = option[value];
            resultText = option[text];
            disabled = option.disabled;
        }
        return <Select.Option key={key} value={resultValue || key} disabled={disabled}>{resultText}</Select.Option>;
    });
};