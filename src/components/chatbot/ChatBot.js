import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your wellness companion. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickReplies = [
    'I feel anxious',
    'I need motivation',
    'Tips for better sleep',
    'Feeling stressed',
  ];

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('anxious') || input.includes('anxiety')) {
      return "I understand anxiety can be tough. Try taking some deep breaths. Would you like me to guide you through a breathing exercise?";
    } else if (input.includes('stress')) {
      return "Stress is common, but manageable. Have you tried journaling or taking a short walk? I'm here to help you find what works best.";
    } else if (input.includes('sleep')) {
      return "Good sleep is crucial for mental health. Try maintaining a consistent schedule and avoiding screens before bed. Check out our sleep tips section!";
    } else if (input.includes('motivation') || input.includes('motivate')) {
      return "Remember: progress, not perfection. Every small step counts. You're doing better than you think!";
    } else {
      return "Thank you for sharing. I'm here to support you. Would you like some wellness tips or exercises that might help?";
    }
  };

  const handleQuickReply = (reply) => {
    setInputText(reply);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsOpen(true)}
      >
        <Ionicons name="chatbubbles" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Chat Modal */}
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsOpen(false)}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.botAvatar}>
                <Ionicons name="happy" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Wellness Bot</Text>
                <View style={styles.onlineIndicator}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Always here for you</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Ionicons name="close" size={28} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.isBot ? styles.botMessageWrapper : styles.userMessageWrapper,
                ]}
              >
                {message.isBot && (
                  <View style={styles.botAvatarSmall}>
                    <Ionicons name="happy" size={16} color="#fff" />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.isBot ? styles.botMessage : styles.userMessage,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.isBot ? styles.botMessageText : styles.userMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <View style={styles.quickRepliesContainer}>
              <Text style={styles.quickRepliesTitle}>Quick replies:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickRepliesContent}
              >
                {quickReplies.map((reply, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickReplyButton}
                    onPress={() => handleQuickReply(reply)}
                  >
                    <Text style={styles.quickReplyText}>{reply}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() === '' && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={inputText.trim() === ''}
            >
              <Ionicons
                name="send"
                size={20}
                color={inputText.trim() === '' ? '#9ca3af' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  onlineText: {
    fontSize: 12,
    color: '#6b7280',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  botMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#6366f1',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botMessageText: {
    color: '#111827',
  },
  userMessageText: {
    color: '#fff',
  },
  quickRepliesContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  quickRepliesTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  quickRepliesContent: {
    gap: 8,
  },
  quickReplyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  quickReplyText: {
    fontSize: 14,
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
});

export default ChatBot;
