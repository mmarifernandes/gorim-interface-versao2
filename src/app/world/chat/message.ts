export interface Message {
    chatId: string;
    senderId: string;
    recipientId: string;
    content: string;
    senderName: string;
    recipientName: string;
    timestamp: Date;
    status: MessageStatus;
}

export enum MessageStatus {
    'RECEIVED', 'DELIVERED'
}