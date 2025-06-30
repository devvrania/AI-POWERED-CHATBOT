import MessageBubble from "./MessageBubble";

type Props = {
    chat: { sender: string, text: string }[];
};

export default function ChatWindow({ chat }: Props) {
    return (
        <div style={{
            border: "1px solid #ddd",
            padding: 15,
            height: 300,
            overflowY: "scroll",
            marginBottom: 10,
        }}>
            {chat.map((msg, idx) => (
                <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
            ))}
        </div>
    )
}