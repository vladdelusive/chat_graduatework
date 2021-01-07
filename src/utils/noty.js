import { notification } from 'antd';

export const noty = (type = 'info', message, description, config) => {
    if (type === 'icon') {
        notification.open({
            message: message,
            description: description,
            ...config
        });
    } else if(typeof message === 'string') {
        notification[type]({
            message: message,
            description: description,
            ...config
        });
    }
};
