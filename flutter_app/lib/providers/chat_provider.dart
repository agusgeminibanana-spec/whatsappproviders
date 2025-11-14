import 'package:flutter/material.dart';

class Chat {
  final String id;
  final String name;
  final String lastMessage;

  Chat({required this.id, required this.name, required this.lastMessage});
}

class ChatProvider with ChangeNotifier {
  List<Chat> _chats = [
    Chat(id: '1', name: 'John Doe', lastMessage: 'Hello!'),
    Chat(id: '2', name: 'Jane Doe', lastMessage: 'Hi there!'),
  ];

  List<Chat> get chats => _chats;

  void sendMessage(String chatId, String message) {
    print('Sending message to $chatId: $message');
    // Here we will call the WhatsappService to send the message
    notifyListeners();
  }
}
