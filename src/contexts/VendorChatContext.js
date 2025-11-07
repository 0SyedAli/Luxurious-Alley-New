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
  addDoc, doc, updateDoc, serverTimestamp,
  where, or, and
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
  const { chat, auth } = useSelector(state => state);

  const activeChat = chat.activeChat
  const vendor = auth?.user || ''

  // Set vendor as current user
  useEffect(() => {
    const vendorUser = {
      id: vendorId,
      name: vendor.ownerName,
      email: vendor.email,
      role: "vendor",
      avatar: vendor?.image
    };
    dispatch(setCurrentUser(vendorUser));
  }, [vendorId, dispatch, vendor]);

  // Fetch vendor's conversations - FIXED VERSION
  useEffect(() => {
    if (!vendorId) return;

    console.log('Fetching conversations for vendor:', vendorId);

    // Better approach: Use Firestore query with arrayContains
    const chatsQuery = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', vendorId)
    );

    const unsubscribe = onSnapshot(chatsQuery,
      (snapshot) => {
        console.log('Raw chats snapshot:', snapshot.docs.length, 'chats found');
        
        const vendorConversations = snapshot.docs.map(doc => {
          const chatData = doc.data();
          console.log('Processing chat:', doc.id, chatData);
          
          // Find the other participant (not the vendor)
          const otherParticipants = chatData.participants?.filter(participantId => participantId !== vendorId) || [];
          const userId = otherParticipants[0] || 'unknown';
          
          return {
            id: doc.id,
            userName: chatData.participantNames?.[userId] || 'Customer',
            salonName: chatData.participantNames?.[vendorId] || 'Salon',
            lastMessage: chatData.lastMessage || 'No messages yet',
            lastMessageAt: chatData.lastMessageTime?.toDate() || chatData.updatedAt?.toDate() || new Date(0),
            avatar: chatData.participantImages?.[userId] || '',
            vendorId: vendorId,
            userId: userId,
            // Include all participants for debugging
            participants: chatData.participants || [],
            participantNames: chatData.participantNames || {}
          };
        });

        console.log('Transformed conversations:', vendorConversations);
        
        // Sort by last message time
        vendorConversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt);
        
        dispatch(setConversations(vendorConversations));
      },
      (error) => {
        console.error('Error fetching vendor conversations:', error);
      }
    );

    return () => unsubscribe();
  }, [vendorId, dispatch]);

  // Alternative approach if above doesn't work - using multiple where clauses
  useEffect(() => {
    if (!vendorId) return;

    // If the first approach doesn't work, try this alternative
    const fetchAllChatsAndFilter = () => {
      const chatsQuery = query(collection(db, 'chats'));

      const unsubscribe = onSnapshot(chatsQuery,
        (snapshot) => {
          const allChats = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          console.log('All chats:', allChats);

          // Multiple ways a vendor could be part of a chat
          const vendorConversations = allChats.filter(chat => {
            // Method 1: Check participants array
            if (chat.participants?.includes(vendorId)) {
              return true;
            }
            
            // Method 2: Check participantNames keys
            if (chat.participantNames && chat.participantNames[vendorId]) {
              return true;
            }
            
            // Method 3: Check if vendorId appears in chat ID
            if (chat.id.includes(vendorId)) {
              return true;
            }
            
            return false;
          });

          console.log('Filtered vendor conversations:', vendorConversations);

          const transformedConversations = vendorConversations.map(chat => {
            // Find the user ID (not vendor)
            const participants = chat.participants || Object.keys(chat.participantNames || {});
            const userId = participants.find(id => id !== vendorId) || 'unknown';
            
            return {
              id: chat.id,
              userName: chat.participantNames?.[userId] || 'Customer',
              salonName: chat.participantNames?.[vendorId] || 'Salon',
              lastMessage: chat.lastMessage || 'No messages yet',
              lastMessageAt: chat.lastMessageTime?.toDate() || chat.updatedAt?.toDate() || new Date(0),
              avatar: chat.participantImages?.[userId] || '',
              vendorId: vendorId,
              userId: userId,
              // Debug info
              rawData: chat
            };
          });

          transformedConversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt);
          dispatch(setConversations(transformedConversations));
        },
        (error) => {
          console.error('Error fetching all chats:', error);
        }
      );

      return unsubscribe;
    };

    // Uncomment this if the first approach doesn't work
    // return fetchAllChatsAndFilter();
  }, [vendorId, dispatch]);

  // Load messages for active chat
  useEffect(() => {
    if (!activeChat?.id) return;

    console.log('Loading messages for chat:', activeChat.id);

    const messagesQuery = query(
      collection(db, 'chats', activeChat.id, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery,
      (snapshot) => {
        const messagesData = snapshot.docs.map(doc => {
          const messageData = doc.data();
          return {
            id: doc.id,
            content: messageData.text,
            senderId: messageData.senderId,
            senderRole: messageData.senderId === vendorId ? 'vendor' : 'user',
            senderName: messageData.senderName,
            timestamp: messageData.createdAt?.toDate() || new Date(),
            read: messageData.seen
          };
        });
        console.log('Loaded messages:', messagesData.length);
        dispatch(setMessages(messagesData));
      },
      (error) => {
        console.error('Error loading vendor messages:', error);
      }
    );

    return () => unsubscribe();
  }, [activeChat, vendorId, dispatch]);

  // Send message as vendor
  const sendMessage = async (content, messageType = 'text') => {
    if (!activeChat || !content.trim() || !vendorId) {
      throw new Error('Cannot send message: Missing required data');
    }

    try {
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

      await addDoc(collection(db, 'chats', activeChat.id, 'messages'), messageData);

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

  // Get vendor data
  const getVendorData = async (vendorId) => {
    return {
      id: vendorId,
      name: vendor?.ownerName,
      avatar: vendor?.image
    };
  };

  // Set active chat
  const setActiveChatDirectly = (chat) => {
    console.log('Setting active chat:', chat);
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