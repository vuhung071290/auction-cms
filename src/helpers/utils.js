import { notification } from 'antd';
export const noti = {
    success: (message, title = "Successfully") => { notification['success']({ message: title, description: message }); },
    error: (message, title = "Error") => { notification['error']({ message: title, description: message }); }
}

export const sequence = (from, to) => {
    let seq = [];
    for (let i = from; i <= to; i++) {
        seq.push(i);
    }
    return seq;
}