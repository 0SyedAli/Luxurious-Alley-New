// "use client";
// import React, { createContext, useContext, useEffect } from 'react';
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
//   setDoc, doc, updateDoc, serverTimestamp, getDoc
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

//   // Fetch user's conversations - manual filtering
//   useEffect(() => {
//     if (!currentUser?.id || currentUser.role !== 'user') return;

//     // Simple query without composite index requirements
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
//           // Check if chat ID starts with user ID (userId_vendorId format)
//           return chat.id.startsWith(currentUser.id);
//         });

//         // Transform to match your UI structure
//         const transformedConversations = userConversations.map(chat => {
//           // Extract vendor ID from chat ID (userId_vendorId)
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

//         // Manual sorting by last message
//         transformedConversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt);

//         dispatch(setConversations(transformedConversations));
//       },
//       (error) => {
//         console.error('Error fetching user conversations:', error);
//       }
//     );

//     return () => unsubscribe();
//   }, [currentUser, dispatch]);

//   // Auto-start chat when vendorId is set in Redux
//   useEffect(() => {
//     if (activeVendorId && shouldOpenChat && currentUser) {
//       startChatWithVendor(activeVendorId);
//     }
//   }, [activeVendorId, shouldOpenChat, currentUser]);

//   // Generate chat document ID in userId_vendorId format
//   const generateChatId = (userId, vendorId) => {
//     return `${userId}_${vendorId}`;
//   };

//   // Start chat with vendor using manual document ID
//   const startChatWithVendor = async (vendorId) => {
//     if (!currentUser) return;

//     dispatch(setLoading(true));

//     try {
//       // Get vendor data (you'll need to fetch this from your API)
//       const vendorData = await getVendorData(vendorId);

//       // Generate manual document ID
//       const chatId = generateChatId(currentUser.id, vendorId);

//       // Check if chat already exists
//       const existingChat = await findExistingChat(chatId);

//       if (existingChat) {
//         // Set existing chat as active
//         dispatch(setActiveChat(existingChat));
//         dispatch(clearActiveVendor());
//         loadChatMessages(chatId);
//       } else {
//         // Create new chat using manual document ID
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

//         // Use setDoc with manual ID instead of addDoc
//         await setDoc(doc(db, 'chats', chatId), newChat);
        
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

//         // Add welcome message using your message structure
//         await setDoc(doc(db, 'chats', chatId, 'messages', generateMessageId()), {
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
//       dispatch(setLoading(false));
//     }
//   };

//   // Generate unique message ID (you can use auto-generated or manual)
//   const generateMessageId = () => {
//     return Date.now().toString() + Math.random().toString(36).substr(2, 9);
//   };

//   // Get vendor data (replace with your API call)
//   const getVendorData = async (vendorId) => {
//     // Mock data - replace with actual API call to get vendor details
//     const vendorDatabase = {
//       "68efdfa53cb294e3c05e1f9d": {
//         id: "68efdfa53cb294e3c05e1f9d",
//         name: "HairCraft Lounge",
//         salonName: "HairCraft Lounge",
//         avatar: "1760552476408-salon.png"
//       }
//       // Add more vendors as needed
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
//             id: doc.id,
//             // Transform to match your MessageBubble component
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

//   // Send message
//   const sendMessage = async (content, messageType = 'text') => {
//     if (!activeChat || !content.trim() || !currentUser) {
//       throw new Error('Cannot send message: Missing required data');
//     }

//     try {
//       // Get vendor data
//       const vendorData = await getVendorData(activeChat.vendorId);

//       // Create message using your DB structure
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

//       // Add message to Firestore with manual ID
//       await setDoc(doc(db, 'chats', activeChat.id, 'messages', generateMessageId()), messageData);

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
  clearActiveVendor
} from '@/redux/features/chat/chatSlice';
import {
  collection, query, orderBy, onSnapshot,
  setDoc, doc, updateDoc, serverTimestamp, getDoc, addDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

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
  const { activeVendorId, currentUser, shouldOpenChat, activeChat } = useSelector(state => state.chat);
  
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
            salonName: chat.participantNames?.[vendorId] || 'Salon',
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
        // Create new chat
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
          lastMessage: 'Chat started',
          lastMessageTime: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Create chat document with manual ID
        await setDoc(doc(db, 'chats', chatId), newChat);
        
        // Mark as created to prevent duplicates
        createdChatIdsRef.current.add(chatId);

        // Transform for UI
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

        // Add ONLY ONE welcome message with auto-generated ID
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

  // Get vendor data
  const getVendorData = async (vendorId) => {
    const vendorDatabase = {
      "68efdfa53cb294e3c05e1f9d": {
        id: "68efdfa53cb294e3c05e1f9d",
        name: "HairCraft Lounge",
        salonName: "HairCraft Lounge",
        avatar: "1760552476408-salon.png"
      }
    };

    return vendorDatabase[vendorId] || {
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
          salonName: chatData.participantNames?.[vendorId] || 'Salon',
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

  const value = {
    sendMessage,
    setActiveChat: setActiveChatDirectly,
    startChatWithVendor
  };

  return (
    <FirebaseChatContext.Provider value={value}>
      {children}
    </FirebaseChatContext.Provider>
  );
}