"use client";
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveChat,
  setConversations,
  setMessages,
  setLoading,
  setCurrentUser
} from '@/redux/features/chat/chatSlice';
import {
  collection, query, orderBy, onSnapshot,
  addDoc, doc, updateDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const VendorChatContext = createContext();

export function useVendorChat() {
  const context = useContext(VendorChatContext);
  if (!context) {
    throw new Error('useVendorChat must be used within VendorChatProvider');
  }
  return context;
}

export function VendorChatProvider({ children, vendorId }) {
  const dispatch = useDispatch();
  const { activeChat } = useSelector(state => state.chat);

  // Set vendor as current user
  useEffect(() => {
    const vendorUser = {
      id: vendorId,
      name: "Salon Owner", // This should come from your auth system
      email: "vendor@salon.com",
      role: "vendor",
      avatar: "" // Add vendor avatar if available
    };
    dispatch(setCurrentUser(vendorUser));
  }, [vendorId, dispatch]);

  // Fetch vendor's conversations - manual filtering
  useEffect(() => {
    if (!vendorId) return;

    // Simple query without composite index requirements
    const chatsQuery = query(collection(db, 'chats'));

    const unsubscribe = onSnapshot(chatsQuery,
      (snapshot) => {
        const allChats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          lastMessageTime: doc.data().lastMessageTime?.toDate() || new Date()
        }));

        // Manual filtering for vendor conversations
        const vendorConversations = allChats.filter(chat => {
          // Check if chat ID ends with vendor ID (userId_vendorId format)
          return chat.id.endsWith(vendorId);
        });

        // Transform to match your UI structure
        const transformedConversations = vendorConversations.map(chat => {
          // Extract user ID from chat ID (userId_vendorId)
          const userId = chat.id.split('_')[0];
          
          return {
            id: chat.id,
            userName: chat.participantNames?.[userId] || 'Customer',
            salonName: chat.participantNames?.[vendorId] || 'Salon',
            lastMessage: chat.lastMessage || 'No messages yet',
            lastMessageAt: chat.lastMessageTime,
            avatar: chat.participantImages?.[userId] || '',
            vendorId: vendorId,
            userId: userId
          };
        });

        // Manual sorting by last message
        transformedConversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt);

        dispatch(setConversations(transformedConversations));
      },
      (error) => {
        console.error('Error fetching vendor conversations:', error);
      }
    );

    return () => unsubscribe();
  }, [vendorId, dispatch]);

  // Load messages for active chat
  useEffect(() => {
    if (!activeChat?.id) return;

    const messagesQuery = query(
      collection(db, 'chats', activeChat.id, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery,
      (snapshot) => {
        const messagesData = snapshot.docs.map(doc => {
          const messageData = doc.data();
          return {
            id: doc.id, // Auto-generated Firebase ID
            content: messageData.text,
            senderId: messageData.senderId,
            senderRole: messageData.senderId === vendorId ? 'vendor' : 'user',
            senderName: messageData.senderName,
            timestamp: messageData.createdAt?.toDate() || new Date(),
            read: messageData.seen
          };
        });
        dispatch(setMessages(messagesData));
      },
      (error) => {
        console.error('Error loading vendor messages:', error);
      }
    );

    return () => unsubscribe();
  }, [activeChat, vendorId, dispatch]);

  // Send message as vendor with auto-generated ID
  const sendMessage = async (content, messageType = 'text') => {
    if (!activeChat || !content.trim() || !vendorId) {
      throw new Error('Cannot send message: Missing required data');
    }

    try {
      // Get vendor data
      const vendorData = await getVendorData(vendorId);

      const messageData = {
        senderId: vendorId,
        senderName: vendorData.name,
        senderImage: vendorData.avatar || '',
        receiverId: activeChat.userId,
        receiverName: activeChat.userName,
        receiverImage: activeChat.avatar || '',
        text: content.trim(),
        seen: false,
        createdAt: serverTimestamp()
      };

      // Use addDoc for auto-generated message ID
      await addDoc(collection(db, 'chats', activeChat.id, 'messages'), messageData);

      // Update chat last message
      await updateDoc(doc(db, 'chats', activeChat.id), {
        lastMessage: content,
        lastMessageTime: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

    } catch (error) {
      console.error('Error sending vendor message:', error);
      throw error;
    }
  };

  // Get vendor data (replace with your API call)
  const getVendorData = async (vendorId) => {
    // Mock data - replace with actual API call
    return {
      id: vendorId,
      name: "HairCraft Lounge",
      avatar: "1760552476408-salon.png"
    };
  };

  // Set active chat
  const setActiveChatDirectly = (chat) => {
    dispatch(setActiveChat(chat));
  };

  const value = {
    sendMessage,
    setActiveChat: setActiveChatDirectly
  };

  return (
    <VendorChatContext.Provider value={value}>
      {children}
    </VendorChatContext.Provider>
  );
}