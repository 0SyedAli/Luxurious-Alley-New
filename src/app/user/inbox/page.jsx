// "use client";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { BiArrowBack } from "react-icons/bi";
// import { MdOutlineAttachFile } from "react-icons/md";
// import { BsEmojiSmileFill, BsPersonCircle } from "react-icons/bs";
// import { RiMessengerLine } from "react-icons/ri";
// import { IoSend } from "react-icons/io5";
// import "./inbox.css";

// import AVATARUSERONE from "../../../../public/images/chat_avatar.png";
// import AVATARUSERTWO from "../../../../public/images/chat_avatar.png";
// import AVATARUSERTHREE from "../../../../public/images/chat_avatar.png";
// import AVATARUSERFOUR from "../../../../public/images/chat_avatar.png";
// import AVATARUSERFIVE from "../../../../public/images/chat_avatar.png";
// import AVATARUSERSIX from "../../../../public/images/chat_avatar.png";
// import AVATARUSERSEVEN from "../../../../public/images/chat_avatar.png";
// import AVATARUSEREIGHT from "../../../../public/images/chat_avatar.png";
// import AVATARUSERNINE from "../../../../public/images/chat_avatar.png";

// function AvatarImage({ size = 36, src = "", alt = "avatar" }) {
//   return (
//     <div
//       className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden flex-shrink-0"
//       style={{
//         width: size,
//         height: size,
//         backgroundColor: "#eeeeee",
//       }}
//     >
//       {src ? (
//         <Image
//           src={src}
//           alt={alt}
//           width={size}
//           height={size}
//           style={{ objectFit: "cover" }}
//           priority={false}
//         />
//       ) : (
//         <BsPersonCircle size={24} color="#000000" />
//       )}
//     </div>
//   );
// }

// function ConversationList({ items, activeId, onSelect }) {
//   const [query, setQuery] = useState("");

//   const filtered = items.filter(
//     (c) =>
//       c.name.toLowerCase().includes(query.trim().toLowerCase()) ||
//       c.lastMessage.toLowerCase().includes(query.trim().toLowerCase())
//   );

//   return (
//     <div className="card h-100 d-flex flex-column overflow-hidden  shadow-sm rounded-0">
//       <div className="p-3">
//         <p className="conversation_heading">Inbox</p>
//         {/* <input
//           type="text"
//           className="form-control"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search..."
//         /> */}
//       </div>
//       <div className="overflow-auto flex-grow-1">
//         <div className="list-group list-group-flush">
//           {filtered.map((c, idx) => (
//             <div key={c.id} className="list-group-item p-0 border-0">
//               <button
//                 onClick={() => onSelect(c.id)}
//                 className={`list-group-item list-group-item-action border-0 py-3 px-3 d-flex align-items-start gap-3 ${
//                   c.id === activeId ? "active" : ""
//                 }`}
//                 style={{
//                   backgroundColor:
//                     c.id === activeId ? "rgba(169, 64, 7, 0.2)" : "transparent",
//                 }}
//               >
//                 <div className="position-relative">
//                   <AvatarImage size={40} src={c.avatar || ""} alt={c.name} />
//                   <span className="position-absolute bottom-0 end-0 translate-middle badge bg-success border border-white rounded-circle p-1"></span>
//                 </div>
//                 <div className="flex-grow-1 min-w-0">
//                   <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
//                     <span className="fw-semibold text-dark text-truncate small">
//                       {c.name}
//                     </span>
//                   </div>
//                   <p className="text-muted text-truncate small mb-0">
//                     {c.lastMessage}
//                   </p>
//                 </div>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ChatHeader({ name, subtitle, avatar, onBack, showBack }) {
//   return (
//     <div className="border-bottom py-3 px-3 d-flex align-items-center gap-3">
//       {showBack && (
//         <button
//           onClick={onBack}
//           className="btn btn-link p-0 border-0 text-dark"
//           aria-label="Back to conversations"
//         >
//           <BiArrowBack size={20} />
//         </button>
//       )}
//       <AvatarImage size={36} src={avatar || ""} alt={name} />
//       <div className="flex-grow-1 min-w-0">
//         <h6 className="fw-bold text-truncate mb-0">{name}</h6>
//         <small className="text-muted text-truncate">{subtitle}</small>
//       </div>
//     </div>
//   );
// }

// function MessageBubble({ message }) {
//   const isOut = message.direction === "out";

//   return (
//     <div
//       className={`d-flex align-items-center gap-2 mb-3 ${
//         isOut ? "justify-content-end" : "justify-content-start"
//       }`}
//     >
//       {!isOut && (
//         <AvatarImage size={28} src={message.avatar || ""} alt="sender" />
//       )}

//       <div
//         className={isOut ? "d-none" : "d-block"}
//         style={{ width: "28px" }}
//       ></div>

//       <div className="flex-grow-0" style={{ maxWidth: "70%" }}>
//         <div
//           className={`p-3 rounded ${
//             isOut
//               ? "bg-light text-dark rounded-end"
//               : "bg-primary text-white rounded-start"
//           }`}
//           style={{
//             backgroundColor: isOut ? "#f8f9fa" : "#A94007",
//           }}
//         >
//           <p className="mb-0 small lh-sm">{message.text}</p>
//         </div>
//         <small
//           className={`text-muted d-block mt-1 ${
//             isOut ? "text-end" : "text-start"
//           }`}
//         >
//           {message.time}
//         </small>
//       </div>

//       <div
//         className={isOut ? "d-block" : "d-none"}
//         style={{ width: "28px" }}
//       ></div>

//       {isOut && (
//         <AvatarImage
//           size={28}
//           src="/placeholder.svg?height=56&width=56"
//           alt="you"
//         />
//       )}
//     </div>
//   );
// }

// function ChatInput({ onSend }) {
//   const [value, setValue] = useState("");

//   const handleSend = () => {
//     const v = value.trim();
//     if (!v) return;
//     onSend(v);
//     setValue("");
//   };

//   return (
//     <div className="card border rounded-pill px-3 py-2">
//       <div className="d-flex align-items-center gap-2">
//         <button className="btn btn-link p-0 border-0 text-dark">
//           <MdOutlineAttachFile size={20} />
//         </button>
//         <input
//           type="text"
//           className="form-control border-0 flex-grow-1"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           placeholder="Type message..."
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//         />
//         <button className="btn btn-link p-0 border-0 text-dark">
//           <BsEmojiSmileFill size={18} />
//         </button>
//         <button
//           className="btn btn-link p-0 border-0 text-primary"
//           onClick={handleSend}
//         >
//           <IoSend size={22} />
//         </button>
//       </div>
//     </div>
//   );
// }

// const Inbox = () => {
//   const [isRefreshing, setIsRefreshing] = useState(true);
//   const [activeId, setActiveId] = useState("1");
//   const [messages, setMessages] = useState([]);
//   const [showListOnMobile, setShowListOnMobile] = useState(true);
//   const messagesEndRef = useRef(null);

//   const conversations = [
//     {
//       id: "1",
//       name: "Alex Johnson",
//       lastMessage: "Seller will respond as soon as...",
//       time: "4:36 PM",
//       unread: 2,
//       avatar: AVATARUSERONE.src,
//     },
//     {
//       id: "2",
//       name: "Sarah Williams",
//       lastMessage: "Let me check and get back...",
//       time: "3:11 PM",
//       avatar: AVATARUSERTWO.src,
//     },
//     {
//       id: "3",
//       name: "Michael Brown",
//       lastMessage: "Sure, we can ship by next...",
//       time: "Yesterday",
//       avatar: AVATARUSERTHREE.src,
//     },
//     {
//       id: "4",
//       name: "Emily Davis",
//       lastMessage: "Thank you!",
//       time: "Yesterday",
//       avatar: AVATARUSERFOUR.src,
//     },
//     {
//       id: "5",
//       name: "David Wilson",
//       lastMessage: "Sharing the invoice now...",
//       time: "Tue",
//       avatar: AVATARUSERFIVE.src,
//     },
//     {
//       id: "6",
//       name: "Jessica Martinez",
//       lastMessage: "Happy to help.",
//       time: "Mon",
//       avatar: AVATARUSERSIX.src,
//     },
//     {
//       id: "7",
//       name: "Daniel Anderson",
//       lastMessage: "In stock in 2 colors.",
//       time: "Sun",
//       avatar: AVATARUSERSEVEN.src,
//     },
//     {
//       id: "8",
//       name: "Olivia Taylor",
//       lastMessage: "Welcome!",
//       time: "Fri",
//       avatar: AVATARUSEREIGHT.src,
//     },
//     {
//       id: "9",
//       name: "James Thomas",
//       lastMessage: "Your order has shipped!",
//       time: "Thu",
//       avatar: AVATARUSERNINE.src,
//     },
//   ];

//   const initialMessages = [
//     {
//       id: "m1",
//       text: "Hi! I saw your product about the handmade candles. They look amazing! Can I get more details?",
//       time: "4:35 PM",
//       direction: "in",
//       avatar: AVATARUSERONE.src,
//     },
//     {
//       id: "m2",
//       text: "Hello! Thank you for your interest. Our handmade candles are made from 100% soy wax and cotton wicks.",
//       time: "4:36 PM",
//       direction: "out",
//     },
//     {
//       id: "m3",
//       text: "They're poured in reusable glass containers and come with recyclable packaging.",
//       time: "4:36 PM",
//       direction: "out",
//     },
//     {
//       id: "m4",
//       text: "Nice! I love the lavender scent option.",
//       time: "4:39 PM",
//       direction: "in",
//       avatar: AVATARUSERONE.src,
//     },
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsRefreshing(false);
//       setMessages(initialMessages);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   const activeConversation =
//     conversations.find((c) => c.id === activeId) || conversations[0];

//   const handleSend = (text) => {
//     const msg = {
//       id: Math.random().toString(36).slice(2),
//       text,
//       time: new Date().toLocaleTimeString([], {
//         hour: "numeric",
//         minute: "2-digit",
//       }),
//       direction: "out",
//     };
//     setMessages((prev) => [...prev, msg]);

//     setTimeout(() => {
//       scrollToBottom();
//     }, 0);

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Math.random().toString(36).slice(2),
//           text: "Thanks for your message! We will get back to you shortly.",
//           time: new Date().toLocaleTimeString([], {
//             hour: "numeric",
//             minute: "2-digit",
//           }),
//           direction: "in",
//           avatar: activeConversation.avatar,
//         },
//       ]);
//     }, 1000);
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollTo({
//       top: messagesEndRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   };

//   const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

//   return (
//     <main className="vh-100  w-100">
//       {isRefreshing ? (
//         <div className="vh-100 d-flex align-items-center justify-content-center bg-gradient text-white text-center p-4">
//           <div>
//             <RiMessengerLine size={64} className="mb-3" />
//             <h1 className="h3 fw-bold mb-2">Your Messages</h1>
//             <p className="mb-3 opacity-90">Loading your conversations...</p>
//             <div className="spinner-border text-light" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="container-fluid h-100 p-0">
//           <div className="row g-0 h-100">
//             {/* Sidebar */}
//             {isMobile ? (
//               showListOnMobile && (
//                 <div className="col-12 h-100">
//                   <ConversationList
//                     items={conversations}
//                     activeId={activeId}
//                     onSelect={(id) => {
//                       setActiveId(id);
//                       setShowListOnMobile(false);
//                       setMessages([
//                         {
//                           id: "m1",
//                           text: `Hi there! This is a new conversation with ${
//                             conversations.find((c) => c.id === id)?.name
//                           }`,
//                           time: new Date().toLocaleTimeString([], {
//                             hour: "numeric",
//                             minute: "2-digit",
//                           }),
//                           direction: "in",
//                           avatar: conversations.find((c) => c.id === id)
//                             ?.avatar,
//                         },
//                       ]);
//                     }}
//                   />
//                 </div>
//               )
//             ) : (
//               <div className="col-md-4 h-100">
//                 <ConversationList
//                   items={conversations}
//                   activeId={activeId}
//                   onSelect={(id) => {
//                     setActiveId(id);
//                     setMessages([
//                       {
//                         id: "m1",
//                         text: `Hi there! This is a new conversation with ${
//                           conversations.find((c) => c.id === id)?.name
//                         }`,
//                         time: new Date().toLocaleTimeString([], {
//                           hour: "numeric",
//                           minute: "2-digit",
//                         }),
//                         direction: "in",
//                         avatar: conversations.find((c) => c.id === id)?.avatar,
//                       },
//                     ]);
//                   }}
//                 />
//               </div>
//             )}

//             {/* Chat Panel */}
//             {(!isMobile || !showListOnMobile) && (
//               <div className="col-md-8 h-100">
//                 <div className="card h-100 d-flex flex-column overflow-hidden bg-white shadow-sm rounded">
//                   <ChatHeader
//                     name={activeConversation?.name || "Name of Seller"}
//                     subtitle="Active · Online 3 minutes ago"
//                     avatar={activeConversation?.avatar}
//                     onBack={() => setShowListOnMobile(true)}
//                     showBack={isMobile}
//                   />

//                   {/* Messages */}
//                   <div
//                     ref={messagesEndRef}
//                     className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-3 bg-white"
//                   >
//                     <div className="text-center mb-2">
//                       <span className="badge bg-light text-dark border rounded-pill px-3 py-2 small">
//                         Today
//                       </span>
//                     </div>

//                     {messages.map((m) => (
//                       <MessageBubble key={m.id} message={m} />
//                     ))}
//                   </div>

//                   {/* Composer */}
//                   <div className="p-3">
//                     <ChatInput onSend={handleSend} />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .bg-gradient {
//           background: linear-gradient(135deg, #a94007 0%, #ff6b35 100%);
//         }
//         .min-w-0 {
//           min-width: 0;
//         }
//       `}</style>
//     </main>
//   );
// };

// export default Inbox;

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineAttachFile, MdOutlineEmojiEmotions } from "react-icons/md";
import { BsEmojiSmileFill, BsPersonCircle } from "react-icons/bs";
import { RiMessengerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import "./inbox.css";

import AVATARUSERONE from "../../../../public/images/chat_avatar.png";
import AVATARUSERTWO from "../../../../public/images/chat_avatar.png";
import AVATARUSERTHREE from "../../../../public/images/chat_avatar.png";
import AVATARUSERFOUR from "../../../../public/images/chat_avatar.png";
import AVATARUSERFIVE from "../../../../public/images/chat_avatar.png";
import AVATARUSERSIX from "../../../../public/images/chat_avatar.png";
import AVATARUSERSEVEN from "../../../../public/images/chat_avatar.png";
import AVATARUSEREIGHT from "../../../../public/images/chat_avatar.png";
import AVATARUSERNINE from "../../../../public/images/chat_avatar.png";

function AvatarImage({ size = 36, src = "", alt = "avatar" }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: "#eeeeee",
        border: "3px solid #AA822A",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          style={{ objectFit: "cover" }}
          priority={false}
          quality={true}
        />
      ) : (
        <BsPersonCircle size={24} color="#000000" />
      )}
    </div>
  );
}

function ConversationList({ items, activeId, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = items.filter(
    (c) =>
      c.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="card h-100 d-flex flex-column overflow-hidden rounded-0 bg-transparent border-0">
      <div className="p-3 bg-transparent">
        <p className="conversation_heading">Inbox</p>
        {/* <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        /> */}
      </div>
      <div className="overflow-auto flex-grow-1 bg-transparent custom-scrollbar">
        <div className="list-group list-group-flush me-3">
          {filtered.map((c, idx) => (
            <div
              key={c.id}
              className="list-group-item p-0 bg-transparent"
              style={{ borderBottom: "1px solid #573D1A" }}
            >
              <button
                onClick={() => onSelect(c.id)}
                className={`list-group-item list-group-item-action border-0 py-3 px-3 d-flex align-items-start gap-3 ${
                  c.id === activeId ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    c.id === activeId ? "rgba(18, 12, 49, 0.5)" : "transparent",
                }}
              >
                <div className="position-relative">
                  <AvatarImage size={40} src={c.avatar || ""} alt={c.name} />
                  <span className="position-absolute bottom-0 end-0 translate-middle badge bg-success border border-white rounded-circle p-1"></span>
                </div>
                <div className="flex-grow-1 min-w-0">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                    <span className="fw-semibold text-dark text-truncate small txt_color">
                      {c.name}
                    </span>
                  </div>
                  <p className="text-light text-truncate small mb-0">
                    {c.lastMessage}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatHeader({ name, subtitle, avatar, onBack, showBack }) {
  return (
    <div
      className="py-3 px-3 d-flex align-items-center gap-3 mx-3"
      style={{
        backgroundColor: "#120C31",
        borderRadius: "11px 11px 0 0",
      }}
    >
      {showBack && (
        <button
          onClick={onBack}
          className="btn btn-link p-0 border-0 text-dark"
          aria-label="Back to conversations"
        >
          <BiArrowBack size={20} />
        </button>
      )}
      <AvatarImage size={36} src={avatar || ""} alt={name} />
      <div className="flex-grow-1 min-w-0">
        <h6 className="fw-bold text-truncate mb-0 txt_color">{name}</h6>
        <small className="text-light text-truncate">{subtitle}</small>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  const isOut = message.direction === "out";

  return (
    <div
      className={`d-flex align-items-center mb-3 `}
      style={{ justifyContent: isOut ? "flex-end" : "flex-start" }}
    >
      {/* {!isOut && (
        <AvatarImage size={28} src={message.avatar || ""} alt="sender" />
      )} */}

      <div
        className={isOut ? "d-none" : "d-block"}
        style={{ width: "28px" }}
      ></div>

      <div className="flex-grow-0" style={{ maxWidth: "70%" }}>
        <div
          className={`p-3 ${isOut ? "text-light" : "text-light"}`}
          style={{
            backgroundColor: isOut ? "#120C31" : "#C78015",
            borderRadius: isOut ? "11px 11px 0 11px" : "11px 11px 11px 0",
          }}
        >
          <p className="mb-0 small lh-sm">{message.text}</p>
        </div>
        <small
          className={`text-light d-block mt-1 ${
            isOut ? "text-end" : "text-start"
          }`}
        >
          {message.time}
        </small>
      </div>

      <div
        className={isOut ? "d-block" : "d-none"}
        style={{ width: "28px" }}
      ></div>

      {/* {isOut && (
        <AvatarImage
          size={28}
          src="/placeholder.svg?height=56&width=56"
          alt="you"
        />
      )} */}
    </div>
  );
}

function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };

  return (
    <div
      className="card rounded-pill px-3 py-2"
      style={{
        border: "1px solid #FFFFFF",
        backgroundColor: "#120C31",
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-link p-0 border-0">
          <MdOutlineEmojiEmotions size={24} color="#FFFFFF" />
        </button>
        <input
          type="text"
          className="form-control border-0 flex-grow-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{
            backgroundColor: "#120C31",
            color: "#FFFFFF",
            outline: "none",
            boxShadow: "none",
          }}
        />
        <button className="btn btn-link p-0 border-0" onClick={handleSend}>
          <IoSend size={22} color="#FFFFFF" />
        </button>
      </div>

      <style jsx>{`
        .form-control::placeholder {
          color: #ffffff !important;
          opacity: 0.8;
        }

        .form-control:focus {
          border-color: transparent !important;
          outline: none !important;
          box-shadow: none !important;
          background-color: #120c31 !important;
        }
      `}</style>
    </div>
  );
}

const Inbox = () => {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [activeId, setActiveId] = useState("1");
  const [messages, setMessages] = useState([]);
  const [showListOnMobile, setShowListOnMobile] = useState(true);
  const messagesEndRef = useRef(null);

  const conversations = [
    {
      id: "1",
      name: "Alex Johnson",
      lastMessage: "Seller will respond as soon as...",
      time: "4:36 PM",
      unread: 2,
      avatar: AVATARUSERONE.src,
    },
    {
      id: "2",
      name: "Sarah Williams",
      lastMessage: "Let me check and get back...",
      time: "3:11 PM",
      avatar: AVATARUSERTWO.src,
    },
    {
      id: "3",
      name: "Michael Brown",
      lastMessage: "Sure, we can ship by next...",
      time: "Yesterday",
      avatar: AVATARUSERTHREE.src,
    },
    {
      id: "4",
      name: "Emily Davis",
      lastMessage: "Thank you!",
      time: "Yesterday",
      avatar: AVATARUSERFOUR.src,
    },
    {
      id: "5",
      name: "David Wilson",
      lastMessage: "Sharing the invoice now...",
      time: "Tue",
      avatar: AVATARUSERFIVE.src,
    },
    {
      id: "6",
      name: "Jessica Martinez",
      lastMessage: "Happy to help.",
      time: "Mon",
      avatar: AVATARUSERSIX.src,
    },
    {
      id: "7",
      name: "Daniel Anderson",
      lastMessage: "In stock in 2 colors.",
      time: "Sun",
      avatar: AVATARUSERSEVEN.src,
    },
    {
      id: "8",
      name: "Olivia Taylor",
      lastMessage: "Welcome!",
      time: "Fri",
      avatar: AVATARUSEREIGHT.src,
    },
    // {
    //   id: "9",
    //   name: "James Thomas",
    //   lastMessage: "Your order has shipped!",
    //   time: "Thu",
    //   avatar: AVATARUSERNINE.src,
    // },
  ];

  const initialMessages = [
    {
      id: "m1",
      text: "Hi! I saw your product about the handmade candles. They look amazing! Can I get more details?",
      time: "4:35 PM",
      direction: "in",
      avatar: AVATARUSERONE.src,
    },
    {
      id: "m2",
      text: "Hello! Thank you for your interest. Our handmade candles are made from 100% soy wax and cotton wicks.",
      time: "4:36 PM",
      direction: "out",
    },
    {
      id: "m3",
      text: "They're poured in reusable glass containers and come with recyclable packaging.",
      time: "4:36 PM",
      direction: "out",
    },
    {
      id: "m4",
      text: "Nice! I love the lavender scent option.",
      time: "4:39 PM",
      direction: "in",
      avatar: AVATARUSERONE.src,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRefreshing(false);
      setMessages(initialMessages);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const activeConversation =
    conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSend = (text) => {
    const msg = {
      id: Math.random().toString(36).slice(2),
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      direction: "out",
    };
    setMessages((prev) => [...prev, msg]);

    setTimeout(() => {
      scrollToBottom();
    }, 0);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          text: "Thanks for your message! We will get back to you shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
          direction: "in",
          avatar: activeConversation.avatar,
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <main className="vh-100 w-100 bg-transparent">
      {isRefreshing ? (
        <div className="vh-100 d-flex align-items-center justify-content-center  text-center p-4">
          <div>
            <RiMessengerLine size={64} className="mb-3 text-light" />
            <h1 className="h3 fw-bold mb-2 text-light">Your Messages</h1>
            <p className="mb-3 text-light">Loading your conversations...</p>
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid h-100 p-0 bg-transparent">
          <div className="row g-0 h-100 bg-transparent">
            {/* Sidebar */}
            {isMobile ? (
              showListOnMobile && (
                <div className="col-12 h-100 bg-transparent">
                  <ConversationList
                    items={conversations}
                    activeId={activeId}
                    onSelect={(id) => {
                      setActiveId(id);
                      setShowListOnMobile(false);
                      setMessages([
                        {
                          id: "m1",
                          text: `Hi there! This is a new conversation with ${
                            conversations.find((c) => c.id === id)?.name
                          }`,
                          time: new Date().toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          }),
                          direction: "in",
                          avatar: conversations.find((c) => c.id === id)
                            ?.avatar,
                        },
                      ]);
                    }}
                  />
                </div>
              )
            ) : (
              <div
                className="col-md-4 h-100 bg-transparent"
                style={{ borderRight: "1px solid #573D1A" }}
              >
                <ConversationList
                  items={conversations}
                  activeId={activeId}
                  onSelect={(id) => {
                    setActiveId(id);
                    setMessages([
                      {
                        id: "m1",
                        text: `Hi there! This is a new conversation with ${
                          conversations.find((c) => c.id === id)?.name
                        }`,
                        time: new Date().toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        }),
                        direction: "in",
                        avatar: conversations.find((c) => c.id === id)?.avatar,
                      },
                    ]);
                  }}
                />
              </div>
            )}

            {/* Chat Panel */}
            {(!isMobile || !showListOnMobile) && (
              <div className="col-md-8 h-100 bg-transparent">
                <div className="card h-100 d-flex flex-column overflow-hidden bg-transparent border-0 rounded-0">
                  <ChatHeader
                    name={activeConversation?.name || "Name of Seller"}
                    subtitle="Active · Online 3 minutes ago"
                    avatar={activeConversation?.avatar}
                    onBack={() => setShowListOnMobile(true)}
                    showBack={isMobile}
                  />

                  {/* Messages */}
                  <div
                    ref={messagesEndRef}
                    className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-3 bg-transparent custom-scrollbar"
                  >
                    <div className="text-center mb-2">
                      <span className="badge bg-light text-dark border rounded-pill px-3 py-2 small">
                        Today
                      </span>
                    </div>

                    {messages.map((m) => (
                      <MessageBubble key={m.id} message={m} />
                    ))}
                  </div>

                  {/* Composer */}
                  <div className="p-3 bg-transparent">
                    <ChatInput onSend={handleSend} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .min-w-0 {
          min-width: 0;
        }
      `}</style>
    </main>
  );
};

export default Inbox;
