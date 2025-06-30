type Props = {
    input: string,
    setInput: (val: string) => void,
    onSend: () => void,
};

export default function ChatInput({ input, setInput, onSend }: Props) {
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSend()}
                placeholder="Type your message..."
                style={{ width: "75%", padding: 10 }}
            />
            <button
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={onSend} style={{ padding: 10, marginLeft: 10 }}>
                Send
            </button>
        </div>
    )
}