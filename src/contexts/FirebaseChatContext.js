// "use client";
// import React, { createContext, useContext, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setActiveChat,
//   setConversations,
//   setMessages,
//   setLoading,
//   clearActiveVendor
// } from '@/redux/features/chat/chatSlice';
// import {
//   collection, query, orderBy, onSnapshot,
//   setDoc, doc, updateDoc, serverTimestamp, getDoc, addDoc
// } from 'firebase/firestore';
// import { db } from '../lib/firebase';

// const FirebaseChatContext = createContext();

// export function useFirebaseChat() {
//   const context = useContext(FirebaseChatContext);
//   if (!context) {
//     throw new Error('useFirebaseChat must be used within FirebaseChatProvider');
//   }
//   return context;
// }

// export function FirebaseChatProvider({ children }) {
//   const dispatch = useDispatch();
//   const { activeVendorId, currentUser, shouldOpenChat, activeChat } = useSelector(state => state.chat);
  
//   // Use refs to track chat creation state
//   const isCreatingChatRef = useRef(false);
//   const createdChatIdsRef = useRef(new Set());

//   // Fetch user's conversations - manual filtering
//   useEffect(() => {
//     if (!currentUser?.id || currentUser.role !== 'user') return;

//     const chatsQuery = query(collection(db, 'chats'));

//     const unsubscribe = onSnapshot(chatsQuery,
//       (snapshot) => {
//         const allChats = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           lastMessageTime: doc.data().lastMessageTime?.toDate() || new Date()
//         }));

//         // Manual filtering for user conversations
//         const userConversations = allChats.filter(chat => {
//           return chat.id.startsWith(currentUser.id);
//         });

//         // Transform to match your UI structure
//         const transformedConversations = userConversations.map(chat => {
//           const vendorId = chat.id.split('_')[1];
          
//           return {
//             id: chat.id,
//             salonName: chat.participantNames?.[vendorId] || 'Salon',
//             vendorName: chat.participantNames?.[vendorId] || 'Vendor',
//             lastMessage: chat.lastMessage || 'No messages yet',
//             lastMessageAt: chat.lastMessageTime,
//             avatar: chat.participantImages?.[vendorId] || '',
//             vendorId: vendorId,
//             userId: currentUser.id
//           };
//         });

//         transformedConversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt);
//         dispatch(setConversations(transformedConversations));
//       },
//       (error) => {
//         console.error('Error fetching user conversations:', error);
//       }
//     );

//     return () => unsubscribe();
//   }, [currentUser, dispatch]);

//   // Auto-start chat when vendorId is set in Redux - with duplicate prevention
//   useEffect(() => {
//     if (activeVendorId && shouldOpenChat && currentUser && !isCreatingChatRef.current) {
//       startChatWithVendor(activeVendorId);
//     }
//   }, [activeVendorId, shouldOpenChat, currentUser]);

//   // Generate chat document ID in userId_vendorId format
//   const generateChatId = (userId, vendorId) => {
//     return `${userId}_${vendorId}`;
//   };

//   // Start chat with vendor with duplicate prevention
//   const startChatWithVendor = async (vendorId) => {
//     if (!currentUser || isCreatingChatRef.current) return;

//     // Set creating flag to prevent duplicates
//     isCreatingChatRef.current = true;
//     dispatch(setLoading(true));

//     try {
//       const vendorData = await getVendorData(vendorId);
//       const chatId = generateChatId(currentUser.id, vendorId);

//       // Check if we've already created this chat in this session
//       if (createdChatIdsRef.current.has(chatId)) {
//         console.log('Chat already created in this session, skipping duplicate creation');
//         const existingChat = await findExistingChat(chatId);
//         if (existingChat) {
//           dispatch(setActiveChat(existingChat));
//           dispatch(clearActiveVendor());
//           loadChatMessages(chatId);
//         }
//         return;
//       }

//       // Check if chat already exists in Firestore
//       const existingChat = await findExistingChat(chatId);

//       if (existingChat) {
//         // Chat exists, just load it
//         dispatch(setActiveChat(existingChat));
//         dispatch(clearActiveVendor());
//         loadChatMessages(chatId);
//         createdChatIdsRef.current.add(chatId);
//       } else {
//         // Create new chat
//         const newChat = {
//           participants: [currentUser.id, vendorId],
//           participantNames: {
//             [currentUser.id]: currentUser.name,
//             [vendorId]: vendorData.name
//           },
//           participantImages: {
//             [currentUser.id]: currentUser.avatar || '',
//             [vendorId]: vendorData.avatar || ''
//           },
//           lastMessage: 'Chat started',
//           lastMessageTime: serverTimestamp(),
//           createdAt: serverTimestamp(),
//           updatedAt: serverTimestamp()
//         };

//         // Create chat document with manual ID
//         await setDoc(doc(db, 'chats', chatId), newChat);
        
//         // Mark as created to prevent duplicates
//         createdChatIdsRef.current.add(chatId);

//         // Transform for UI
//         const chatWithId = {
//           id: chatId,
//           salonName: vendorData.salonName,
//           vendorName: vendorData.name,
//           lastMessage: 'Chat started',
//           lastMessageAt: new Date(),
//           avatar: vendorData.avatar,
//           vendorId: vendorId,
//           userId: currentUser.id
//         };

//         // Add ONLY ONE welcome message with auto-generated ID
//         await addDoc(collection(db, 'chats', chatId, 'messages'), {
//           senderId: currentUser.id,
//           senderName: currentUser.name,
//           senderImage: currentUser.avatar || '',
//           receiverId: vendorId,
//           receiverName: vendorData.name,
//           receiverImage: vendorData.avatar || '',
//           text: `Hello! I'm interested in your services at ${vendorData.salonName}.`,
//           seen: false,
//           createdAt: serverTimestamp()
//         });

//         dispatch(setActiveChat(chatWithId));
//         dispatch(clearActiveVendor());
//         loadChatMessages(chatId);
//       }
//     } catch (error) {
//       console.error('Error starting chat:', error);
//     } finally {
//       // Reset creating flag
//       isCreatingChatRef.current = false;
//       dispatch(setLoading(false));
//     }
//   };

//   // Get vendor data
//   const getVendorData = async (vendorId) => {
//     const vendorDatabase = {
//       "68efdfa53cb294e3c05e1f9d": {
//         id: "68efdfa53cb294e3c05e1f9d",
//         name: "HairCraft Lounge",
//         salonName: "HairCraft Lounge",
//         avatar: "1760552476408-salon.png"
//       }
//     };

//     return vendorDatabase[vendorId] || {
//       id: vendorId,
//       name: "Salon Owner",
//       salonName: "Beauty Salon",
//       avatar: "/images/default-avatar.jpg"
//     };
//   };

//   // Find existing chat by manual ID
//   const findExistingChat = async (chatId) => {
//     try {
//       const chatDoc = await getDoc(doc(db, 'chats', chatId));
      
//       if (chatDoc.exists()) {
//         const chatData = chatDoc.data();
//         const vendorId = chatId.split('_')[1];
        
//         return {
//           id: chatId,
//           salonName: chatData.participantNames?.[vendorId] || 'Salon',
//           vendorName: chatData.participantNames?.[vendorId] || 'Vendor',
//           lastMessage: chatData.lastMessage || 'No messages yet',
//           lastMessageAt: chatData.lastMessageTime?.toDate() || new Date(),
//           avatar: chatData.participantImages?.[vendorId] || '',
//           vendorId: vendorId,
//           userId: chatId.split('_')[0]
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error finding existing chat:', error);
//       return null;
//     }
//   };

//   // Load chat messages
//   const loadChatMessages = (chatId) => {
//     const messagesQuery = query(
//       collection(db, 'chats', chatId, 'messages'),
//       orderBy('createdAt', 'asc')
//     );

//     const unsubscribe = onSnapshot(messagesQuery,
//       (snapshot) => {
//         const messagesData = snapshot.docs.map(doc => {
//           const messageData = doc.data();
//           return {
//             id: doc.id, // Auto-generated Firebase ID
//             content: messageData.text,
//             senderId: messageData.senderId,
//             senderRole: messageData.senderId === currentUser?.id ? 'user' : 'vendor',
//             senderName: messageData.senderName,
//             timestamp: messageData.createdAt?.toDate() || new Date(),
//             read: messageData.seen
//           };
//         });
//         dispatch(setMessages(messagesData));
//       },
//       (error) => {
//         console.error('Error loading messages:', error);
//       }
//     );

//     return unsubscribe;
//   };

//   // Send message with auto-generated ID
//   const sendMessage = async (content, messageType = 'text') => {
//     if (!activeChat || !content.trim() || !currentUser) {
//       throw new Error('Cannot send message: Missing required data');
//     }

//     try {
//       const vendorData = await getVendorData(activeChat.vendorId);

//       const messageData = {
//         senderId: currentUser.id,
//         senderName: currentUser.name,
//         senderImage: currentUser.avatar || '',
//         receiverId: activeChat.vendorId,
//         receiverName: vendorData.name,
//         receiverImage: vendorData.avatar || '',
//         text: content.trim(),
//         seen: false,
//         createdAt: serverTimestamp()
//       };

//       // Use addDoc for auto-generated message ID
//       await addDoc(collection(db, 'chats', activeChat.id, 'messages'), messageData);

//       // Update chat last message
//       await updateDoc(doc(db, 'chats', activeChat.id), {
//         lastMessage: content,
//         lastMessageTime: serverTimestamp(),
//         updatedAt: serverTimestamp()
//       });

//     } catch (error) {
//       console.error('Error sending message:', error);
//       throw error;
//     }
//   };

//   // Set active chat manually
//   const setActiveChatDirectly = (chat) => {
//     dispatch(setActiveChat(chat));
//     loadChatMessages(chat.id);
//   };

//   const value = {
//     sendMessage,
//     setActiveChat: setActiveChatDirectly,
//     startChatWithVendor
//   };

//   return (
//     <FirebaseChatContext.Provider value={value}>
//       {children}
//     </FirebaseChatContext.Provider>
//   );
// }


"use client";
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveChat,
  setConversations,
  setMessages,
  setLoading,
  clearActiveVendor,
  setActiveVendorData
} from '@/redux/features/chat/chatSlice';
import {
  collection, query, orderBy, onSnapshot,
  setDoc, doc, updateDoc, serverTimestamp, getDoc, addDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import api from '@/lib/api';

const FirebaseChatContext = createContext();

export function useFirebaseChat() {
  const context = useContext(FirebaseChatContext);
  if (!context) {
    throw new Error('useFirebaseChat must be used within FirebaseChatProvider');
  }
  return context;
}

export function FirebaseChatProvider({ children }) {
  const dispatch = useDispatch();
  const { 
    activeVendorId, 
    activeVendorData,
    currentUser, 
    shouldOpenChat, 
    activeChat 
  } = useSelector(state => state.chat);
  
  // Use refs to track chat creation state
  const isCreatingChatRef = useRef(false);
  const createdChatIdsRef = useRef(new Set());

  // Fetch user's conversations - manual filtering
  useEffect(() => {
    if (!currentUser?.id || currentUser.role !== 'user') return;

    const chatsQuery = query(collection(db, 'chats'));

    const unsubscribe = onSnapshot(chatsQuery,
      (snapshot) => {
        const allChats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          lastMessageTime: doc.data().lastMessageTime?.toDate() || new Date()
        }));

        // Manual filtering for user conversations
        const userConversations = allChats.filter(chat => {
          return chat.id.startsWith(currentUser.id);
        });

        // Transform to match your UI structure
        const transformedConversations = userConversations.map(chat => {
          const vendorId = chat.id.split('_')[1];
          
          return {
            id: chat.id,
            salonName: chat.salonName || chat.participantNames?.[vendorId] || 'Salon',
            vendorName: chat.participantNames?.[vendorId] || 'Vendor',
            lastMessage: chat.lastMessage || 'No messages yet',
            lastMessageAt: chat.lastMessageTime,
            avatar: chat.participantImages?.[vendorId] || '',
            vendorId: vendorId,
            userId: currentUser.id
          };
        });

        transformedConversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt);
        dispatch(setConversations(transformedConversations));
      },
      (error) => {
        console.error('Error fetching user conversations:', error);
      }
    );

    return () => unsubscribe();
  }, [currentUser, dispatch]);

  // Auto-start chat when vendorId is set in Redux - with duplicate prevention
  useEffect(() => {
    if (activeVendorId && shouldOpenChat && currentUser && !isCreatingChatRef.current) {
      startChatWithVendor(activeVendorId);
    }
  }, [activeVendorId, shouldOpenChat, currentUser]);

  // Generate chat document ID in userId_vendorId format
  const generateChatId = (userId, vendorId) => {
    return `${userId}_${vendorId}`;
  };

  // Get vendor data from Redux or API
  const getVendorData = async (vendorId) => {
    // If we have vendor data in Redux, use it
    if (activeVendorData && activeVendorData.id === vendorId) {
      return activeVendorData;
    }

    // Fallback: Try to fetch from your API
    try {
      const response = await api.get(`/getAdminById?salonId=${vendorId}`);
      if (response.data.success) {
        const salon = response.data.data?.salon;
        const vendorData = {
          id: vendorId,
          name: salon?.bName || "Salon Owner",
          salonName: salon?.bName || "Beauty Salon",
          avatar: salon?.bImage || "/images/default-avatar.jpg",
          location: salon?.bLocationName || "",
          details: salon?.bDetails || ""
        };
        
        // Store in Redux for future use
        dispatch(setActiveVendorData(vendorData));
        return vendorData;
      }
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }

    // Final fallback
    return {
      id: vendorId,
      name: "Salon Owner",
      salonName: "Beauty Salon",
      avatar: "/images/default-avatar.jpg"
    };
  };

  // Find existing chat by manual ID
  const findExistingChat = async (chatId) => {
    try {
      const chatDoc = await getDoc(doc(db, 'chats', chatId));
      
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        const vendorId = chatId.split('_')[1];
        
        return {
          id: chatId,
          salonName: chatData.salonName || chatData.participantNames?.[vendorId] || 'Salon',
          vendorName: chatData.participantNames?.[vendorId] || 'Vendor',
          lastMessage: chatData.lastMessage || 'No messages yet',
          lastMessageAt: chatData.lastMessageTime?.toDate() || new Date(),
          avatar: chatData.participantImages?.[vendorId] || '',
          vendorId: vendorId,
          userId: chatId.split('_')[0]
        };
      }
      return null;
    } catch (error) {
      console.error('Error finding existing chat:', error);
      return null;
    }
  };

  // Start chat with vendor with duplicate prevention
  const startChatWithVendor = async (vendorId) => {
    if (!currentUser || isCreatingChatRef.current) return;

    // Set creating flag to prevent duplicates
    isCreatingChatRef.current = true;
    dispatch(setLoading(true));

    try {
      const vendorData = await getVendorData(vendorId);
      const chatId = generateChatId(currentUser.id, vendorId);

      // Check if we've already created this chat in this session
      if (createdChatIdsRef.current.has(chatId)) {
        console.log('Chat already created in this session, skipping duplicate creation');
        const existingChat = await findExistingChat(chatId);
        if (existingChat) {
          dispatch(setActiveChat(existingChat));
          dispatch(clearActiveVendor());
          loadChatMessages(chatId);
        }
        return;
      }

      // Check if chat already exists in Firestore
      const existingChat = await findExistingChat(chatId);

      if (existingChat) {
        // Chat exists, just load it
        dispatch(setActiveChat(existingChat));
        dispatch(clearActiveVendor());
        loadChatMessages(chatId);
        createdChatIdsRef.current.add(chatId);
      } else {
        // Create new chat with complete vendor data
        const newChat = {
          participants: [currentUser.id, vendorId],
          participantNames: {
            [currentUser.id]: currentUser.name,
            [vendorId]: vendorData.name
          },
          participantImages: {
            [currentUser.id]: currentUser.avatar || '',
            [vendorId]: vendorData.avatar || ''
          },
          salonName: vendorData.salonName, // Store salon name separately
          lastMessage: 'Chat started',
          lastMessageTime: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Create chat document with manual ID
        await setDoc(doc(db, 'chats', chatId), newChat);
        
        // Mark as created to prevent duplicates
        createdChatIdsRef.current.add(chatId);

        // Transform for UI with complete data
        const chatWithId = {
          id: chatId,
          salonName: vendorData.salonName,
          vendorName: vendorData.name,
          lastMessage: 'Chat started',
          lastMessageAt: new Date(),
          avatar: vendorData.avatar,
          vendorId: vendorId,
          userId: currentUser.id
        };

        // Add welcome message with proper salon name
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderImage: currentUser.avatar || '',
          receiverId: vendorId,
          receiverName: vendorData.name,
          receiverImage: vendorData.avatar || '',
          text: `Hello! I'm interested in your services at ${vendorData.salonName}.`,
          seen: false,
          createdAt: serverTimestamp()
        });

        dispatch(setActiveChat(chatWithId));
        dispatch(clearActiveVendor());
        loadChatMessages(chatId);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
    } finally {
      // Reset creating flag
      isCreatingChatRef.current = false;
      dispatch(setLoading(false));
    }
  };

  // Load chat messages
  const loadChatMessages = (chatId) => {
    const messagesQuery = query(
      collection(db, 'chats', chatId, 'messages'),
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
            senderRole: messageData.senderId === currentUser?.id ? 'user' : 'vendor',
            senderName: messageData.senderName,
            timestamp: messageData.createdAt?.toDate() || new Date(),
            read: messageData.seen
          };
        });
        dispatch(setMessages(messagesData));
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );

    return unsubscribe;
  };

  // Send message with auto-generated ID
  const sendMessage = async (content, messageType = 'text') => {
    if (!activeChat || !content.trim() || !currentUser) {
      throw new Error('Cannot send message: Missing required data');
    }

    try {
      const vendorData = await getVendorData(activeChat.vendorId);

      const messageData = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderImage: currentUser.avatar || '',
        receiverId: activeChat.vendorId,
        receiverName: vendorData.name,
        receiverImage: vendorData.avatar || '',
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
      console.error('Error sending message:', error);
      throw error;
    }
  };

  // Set active chat manually
  const setActiveChatDirectly = (chat) => {
    dispatch(setActiveChat(chat));
    loadChatMessages(chat.id);
  };

  // Mark messages as read
  const markMessagesAsRead = async (chatId, messageIds = []) => {
    if (!chatId || !currentUser) return;

    try {
      // If specific message IDs are provided, mark them as read
      if (messageIds.length > 0) {
        const updatePromises = messageIds.map(async (messageId) => {
          const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
          await updateDoc(messageRef, { seen: true });
        });
        await Promise.all(updatePromises);
      } else {
        // Mark all unread messages from vendor as read
        const messagesQuery = query(
          collection(db, 'chats', chatId, 'messages'),
          orderBy('createdAt', 'asc')
        );
        
        const snapshot = await getDoc(messagesQuery);
        const updatePromises = [];
        
        snapshot.docs.forEach(doc => {
          const messageData = doc.data();
          if (messageData.senderId !== currentUser.id && !messageData.seen) {
            const messageRef = doc(db, 'chats', chatId, 'messages', doc.id);
            updatePromises.push(updateDoc(messageRef, { seen: true }));
          }
        });
        
        if (updatePromises.length > 0) {
          await Promise.all(updatePromises);
        }
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Clear chat state
  const clearChat = () => {
    dispatch(setActiveChat(null));
    dispatch(setMessages([]));
  };

  const value = {
    sendMessage,
    setActiveChat: setActiveChatDirectly,
    startChatWithVendor,
    markMessagesAsRead,
    clearChat,
    loadChatMessages: (chatId) => loadChatMessages(chatId)
  };

  return (
    <FirebaseChatContext.Provider value={value}>
      {children}
    </FirebaseChatContext.Provider>
  );
}