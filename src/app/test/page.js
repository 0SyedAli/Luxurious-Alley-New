'use client'
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TestFirebase() {
    const [status, setStatus] = useState('Testing...');
    const [chats, setChats] = useState([]);

    useEffect(() => {
        testFirebaseConnection();
    }, []);

    const testFirebaseConnection = async () => {
        try {
            // Test reading from Firestore
            const querySnapshot = await getDocs(collection(db, 'chats'));
            const chatsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setChats(chatsData);
            setStatus(`✅ Firebase connected! Found ${chatsData.length} chats`);

        } catch (error) {
            console.error('Firebase connection error:', error);
            setStatus('❌ Firebase connection failed: ' + error.message);
        }
    };

    const addTestChat = async () => {
        try {
            await addDoc(collection(db, 'chats'), {
                salonId: 'test-salon',
                vendorId: 'test-vendor',
                userId: 'test-user',
                salonName: 'Test Salon',
                lastMessage: 'What is your name',
                lastMessageAt: new Date(),
                participants: {
                    vendor: 'test-vendor',
                    user: 'test-user'
                },
                status: 'active'
            });
            alert('Test chat added successfully!');
            testFirebaseConnection(); // Refresh the list
        } catch (error) {
            alert('Error adding test chat: ' + error.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Firebase Connection Test</h1>
            <p>{status}</p>

            <button onClick={addTestChat} style={{ margin: '10px 0', padding: '10px' }}>
                Add Test Chat
            </button>

            <h2>Existing Chats:</h2>
            <ul>
                {chats.map(chat => (
                    <li key={chat.id}>{chat.salonName} - {chat.lastMessage}</li>
                ))}
            </ul>
        </div>
    );
}