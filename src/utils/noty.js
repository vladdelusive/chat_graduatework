import { notification } from 'antd';

export const noty = (type = 'info', message, description, config) => {
    if (typeof message === 'string') {
        notification[type]({
            message: message,
            description: description,
            ...config
        });
    }
};
