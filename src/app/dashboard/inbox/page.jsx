"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useVendorChat,
  VendorChatProvider,
} from "@/contexts/VendorChatContext";
import { setActiveChat, resetChatState } from "@/redux/features/chat/chatSlice";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { RiMessengerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import "./inbox.css";

// Default avatar path
const DEFAULT_AVATAR = "/images/chat_avatar.jpg";

function AvatarImage({ size = 36, src = "", alt = "avatar" }) {
  // Use default avatar if no src provided or if src is empty
  const avatarSrc = src ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`: DEFAULT_AVATAR;

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
      {avatarSrc ? (
        <Image
          src={avatarSrc}
          alt={alt}
          width={size}
          height={size}
          style={{ objectFit: "cover" }}
          priority={true}
          unoptimized={true}
          onError={(e) => {
            // If image fails to load, show default avatar
            e.target.src = DEFAULT_AVATAR;
          }}
        />
      ) : (
        <BsPersonCircle size={24} color="#000000" />
      )}
    </div>
  );
}

function ConversationList({ items, activeId, onSelect, loading }) {
  const [query, setQuery] = useState("");

  const filtered = items.filter(
    (c) =>
      c.userName?.toLowerCase().includes(query.trim().toLowerCase()) ||
      c.lastMessage?.toLowerCase().includes(query.trim().toLowerCase())
  );

  const getLastMessageTime = (timestamp) => {
    if (!timestamp) return "";

    let date;
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (timestamp && typeof timestamp === "object" && timestamp.toDate) {
      date = timestamp.toDate();
    } else if (typeof timestamp === "string" || typeof timestamp === "number") {
      date = new Date(timestamp);
    } else {
      return "";
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="card h-100 d-flex flex-column overflow-hidden rounded-0 bg-transparent border-0">
        <div className="p-3 bg-transparent">
          <p className="conversation_heading">Customer Inbox</p>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 d-flex flex-column overflow-hidden rounded-0 bg-transparent border-0">
      <div className="p-3 bg-transparent">
        <p className="conversation_heading">Customer Inbox</p>
      </div>
      <div className="overflow-auto flex-grow-1 bg-transparent custom-scrollbar">
        <div className="list-group list-group-flush">
          {filtered.map((c, idx) => (
            <div
              key={c.id}
              className="list-group-item p-0 bg-transparent"
              style={{ borderBottom: "1px solid #573D1A" }}
            >
              <button
                onClick={() => onSelect(c)}
                className={`list-group-item list-group-item-action border-0 py-3 px-3 d-flex align-items-start gap-3 w-100 ${
                  c.id === activeId ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    c.id === activeId ? "rgba(18, 12, 49, 0.5)" : "transparent",
                }}
              >
                <div className="position-relative flex-shrink-0">
                  <AvatarImage size={50} src={c.avatar} alt={c.userName} />
                  {/* Show unread badge if there are unread messages from user */}
                  {c.unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge bg-danger border border-white rounded-circle p-1">
                      {c.unreadCount}
                    </span>
                  )}
                </div>
                <div
                  className="flex-grow-1 min-w-0"
                  style={{ width: "calc(100% - 70px)" }}
                >
                  {/* User Name and Time Row */}
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                    <span
                      className="fw-semibold small txt_color"
                      style={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                        minWidth: 0,
                      }}
                      title={c.userName}
                    >
                      {c.userName}
                    </span>
                    <span
                      className="text-xs text-gray-500 flex-shrink-0"
                      style={{
                        minWidth: "fit-content",
                        textAlign: "right",
                        fontSize: "0.75rem",
                      }}
                    >
                      {getLastMessageTime(c.lastMessageAt)}
                    </span>
                  </div>

                  {/* Last Message */}
                  <p
                    className="text-light small mb-1"
                    style={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      lineHeight: "1.3",
                    }}
                    title={c.lastMessage}
                  >
                    {c.lastMessage}
                  </p>
                </div>
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center p-4 text-light">
              <RiMessengerLine size={32} className="mb-2 opacity-50" />
              <p>No customer messages yet</p>
              <small className="text-muted">
                Customer conversations will appear here
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatHeader({ chat, onBack, showBack }) {
  if (!chat) return null;

  return (
    <div
      className="py-3 px-3 d-flex align-items-center gap-3"
      style={{
        backgroundColor: "#120C31",
        borderRadius: "0",
      }}
    >
      {showBack && (
        <button
          onClick={onBack}
          className="btn btn-link p-0 border-0 text-light flex-shrink-0"
          aria-label="Back to conversations"
        >
          <BiArrowBack size={20} />
        </button>
      )}
      <AvatarImage size={45} src={chat?.avatar} alt={chat.userName} />
      <div className="flex-grow-1 min-w-0">
        <h6 className="fw-bold text-truncate mb-0 txt_color">
          {chat.userName}
        </h6>
      </div>
    </div>
  );
}

function MessageBubble({ message, currentUserId }) {
  const isOut =
    message.senderRole === "vendor" || message.senderId === currentUserId;
  const displayText = message.content || message.text;

  const getTime = () => {
    if (!message.timestamp) return "";

    let date;
    if (message.timestamp instanceof Date) {
      date = message.timestamp;
    } else if (
      message.timestamp &&
      typeof message.timestamp === "object" &&
      message.timestamp.toDate
    ) {
      date = message.timestamp.toDate();
    } else if (
      typeof message.timestamp === "string" ||
      typeof message.timestamp === "number"
    ) {
      date = new Date(message.timestamp);
    } else {
      return "";
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <div
      className={`d-flex mb-3 px-2`}
      style={{
        justifyContent: isOut ? "flex-end" : "flex-start",
        maxWidth: "100%",
      }}
    >
      <div
        className="flex-grow-0"
        style={{
          maxWidth: "85%",
          width: "fit-content",
        }}
      >
        <div
          className={`p-3 text-light`}
          style={{
            backgroundColor: isOut ? "#120C31" : "#C78015",
            borderRadius: isOut ? "11px 11px 0 11px" : "11px 11px 11px 0",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          <p
            className="mb-0 small lh-sm"
            style={{
              wordBreak: "break-word",
              maxWidth: "100%",
            }}
          >
            {displayText}
          </p>
        </div>
        <small
          className={`text-light d-block mt-1 px-1 ${
            isOut ? "text-end" : "text-start"
          }`}
        >
          <span style={{ color: "#F1F1F1" }}>{getTime()} </span>
        </small>
      </div>
    </div>
  );
}

function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };

  return (
    <div
      className="rounded-pill px-3 py-2 mx-2 mb-2"
      style={{
        border: "1px solid #FFFFFF",
        backgroundColor: "#120C31",
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control border-0 flex-grow-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your reply..."
          disabled={disabled}
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
            fontSize: "14px",
          }}
        />
        <button
          className="btn btn-link p-0 border-0 flex-shrink-0"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          style={{ minWidth: "30px" }}
        >
          <IoSend size={20} color={disabled ? "#666666" : "#FFFFFF"} />
        </button>
      </div>
    </div>
  );
}

const VendorInbox = ({ vendorId }) => {
  const [showListOnMobile, setShowListOnMobile] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const { conversations, activeChat, messages, loading } = useSelector(
    (state) => state.chat
  );
  const { sendMessage, setActiveChat } = useVendorChat();

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      // On medium screens and above (≥768px), always show both panels
      if (width >= 768) {
        setShowListOnMobile(true);
      }
      // On small screens and below (<768px), show only conversation list by default
      else {
        // Only reset to conversation list if we're not currently in a chat
        if (!activeChat) {
          setShowListOnMobile(true);
        }
      }
    };

    // Set initial width
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeChat]);

  const handleSelectConversation = (conversation) => {
    setActiveChat(conversation);
    // On small screens (<768px), hide conversation list and show chat
    if (windowWidth < 768) {
      setShowListOnMobile(false);
    }
  };

  const handleBackToList = () => {
    setShowListOnMobile(true);
  };

  const handleSendMessage = async (text) => {
    try {
      await sendMessage(text);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetChatState());
    };
  }, [dispatch]);

  const isSmallScreen = windowWidth < 768;

  return (
    <main className="vh-100 w-100 bg-transparent">
      <div className="container-fluid h-100 p-0 bg-transparent">
        <div className="row g-0 h-100 bg-transparent m-0">
          {/* Conversation List - Always visible on md+, conditionally on sm/xs */}
          {(!isSmallScreen || showListOnMobile) && (
            <div
              className={`h-100 bg-transparent ${
                isSmallScreen ? "col-12" : "col-md-4"
              }`}
              style={!isSmallScreen ? { borderRight: "1px solid #573D1A" } : {}}
            >
              <ConversationList
                items={conversations}
                activeId={activeChat?.id}
                onSelect={handleSelectConversation}
                loading={loading}
              />
            </div>
          )}

          {/* Chat Panel - Always visible on md+, conditionally on sm/xs */}
          {(!isSmallScreen || !showListOnMobile) && (
            <div
              className={`h-100 bg-transparent ${
                isSmallScreen ? "col-12" : "col-md-8"
              }`}
            >
              <div className="card h-100 d-flex flex-column overflow-hidden bg-transparent border-0 rounded-0">
                {activeChat ? (
                  <>
                    <ChatHeader
                      chat={activeChat}
                      onBack={handleBackToList}
                      showBack={isSmallScreen}
                    />

                    {/* Messages Area */}
                    <div
                      ref={messagesEndRef}
                      className="flex-grow-1 overflow-auto p-2 p-md-3 d-flex flex-column bg-transparent custom-scrollbar"
                      style={{ minHeight: 0 }}
                    >
                      <div className="text-center my-2">
                        <span className="badge bg-light text-dark border rounded-pill px-3 py-2 small">
                          Chat with {activeChat.userName}
                        </span>
                      </div>

                      {messages.map((m) => (
                        <MessageBubble
                          key={m.id}
                          message={m}
                          currentUserId={vendorId}
                        />
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="bg-transparent pt-2">
                      <ChatInput
                        onSend={handleSendMessage}
                        disabled={loading}
                      />
                    </div>
                  </>
                ) : (
                  // Empty state when no chat is selected (only visible on md+ screens)
                  !isSmallScreen && (
                    <div className="d-flex justify-content-center align-items-center h-100 p-3">
                      <div className="text-center text-light">
                        <RiMessengerLine
                          size={48}
                          className="mb-3 opacity-50"
                        />
                        <h5 className="mb-2">Vendor Messages</h5>
                        <p className="mb-2 small">
                          Select a customer conversation to start chatting
                        </p>
                        <small className="text-muted">
                          All your customer conversations will appear here
                        </small>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// Wrap with vendor provider
export default function VendorInboxWithProvider() {
  const state = useSelector((state) => state.auth);
  // console.log({ state });
  const vendorId = state?.adminId || "68efdfa53cb294e3c05e1f9d";
  return (
    <VendorChatProvider vendorId={vendorId}>
      <VendorInbox vendorId={vendorId} />
    </VendorChatProvider>
  );
}
