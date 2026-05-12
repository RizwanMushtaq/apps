import React from 'react';

interface StatusMessageProps {
    message: string;
    type: 'error' | 'success';
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message, type }) => (
    <p className={`status ${type}`}>{message}</p>
);

export default StatusMessage;
