import React, { useState, useRef, useEffect } from 'react';
import { useChatgptMutation } from '../../api/api';

const ChatComponent = () => {
    const [isChatboxOpen, setIsChatboxOpen] = useState(false);
    const [chatgpt, { isLoading }] = useChatgptMutation()
    const [messages, setMessages] = useState([]);
    const userInputRef = useRef(null);
    const chatboxRef = useRef(null);

    const toggleChatbox = () => {
        setIsChatboxOpen((prevIsChatboxOpen) => !prevIsChatboxOpen);
    };


    const addUserMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, { content: message, type: 'user' }]);
    };

    const addBotMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, { content: message, type: 'bot' }]);
    };

    const respondToUser = async (userMessage) => {
        // Simulate an API call to get a response from the chatbot
        try {
            const response = await chatgpt({ textChat: userMessage });
            addBotMessage(response.data.text);
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
            // Handle error
        }
    };


    const handleSendButtonClick = () => {
        const userMessage = userInputRef.current.value;
        if (userMessage.trim() !== '') {
            addUserMessage(userMessage);
            respondToUser(userMessage);
            userInputRef.current.value = '';
        }
    };

    const handleUserInputKeyUp = (event) => {
        if (event.key === 'Enter') {
            const userMessage = userInputRef.current.value;
            addUserMessage(userMessage);
            respondToUser(userMessage);
            userInputRef.current.value = '';
        }
    };



    useEffect(() => {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }, [messages]);

    return (
        <div>
            <div className={`fixed bottom-0 right-0 mb-4 mr-4 `}>
                {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center" onClick={toggleChatbox}>
                    Chatbot
                </button> */}
                <img src="https://png.pngtree.com/template/20191120/ourlarge/pngtree-chatbot-concept-background-with-a-robot-operating-a-laptop-image_334235.jpg" className='rounded-[50%] shadow-2xl mb-[70px] cursor-pointer w-[70px] shadow-light-blue-900 animate-bounce' onClick={toggleChatbox}/>
            </div>
            <div ref={chatboxRef} className={`fixed bottom-16 right-4 w-96 ${isChatboxOpen ? '' : 'hidden'}`}>
                <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                    <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                        <p className="text-lg font-semibold">Bot</p>
                        <button className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400" onClick={toggleChatbox}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                                <p className={`rounded-lg py-2 px-4 inline-block ${message.type === 'user' ? 'bg-blue-500 text-white rounded-r-md' : 'bg-gray-200 text-gray-700 rounded-l-md'}`}>
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t flex">
                        <input
                            ref={userInputRef}
                            type="text"
                            placeholder="Type a message"
                            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyUp={handleUserInputKeyUp}
                        />
                        <button
                            id="send-button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                            onClick={handleSendButtonClick}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
