type Props = {
    sender: string,
    text: string,
};

export default function MessageBubble({ sender, text }: Props) {
    const isUser = sender === 'user';

    return (
        <div style={{
            textAlign: isUser ? "right" : "left",
            margin: "10px 0",
        }}>
            <b>{isUser ? "You" : "Bot"}:</b> {text}
        </div>
    )
}