import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/chat_provider.dart';

class ChatListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final chatProvider = Provider.of<ChatProvider>(context);
    final chats = chatProvider.chats;

    return Scaffold(
      appBar: AppBar(
        title: Text('Chats'),
      ),
      body: ListView.builder(
        itemCount: chats.length,
        itemBuilder: (context, index) {
          final chat = chats[index];
          return ListTile(
            leading: CircleAvatar(
              child: Text(chat.name[0]),
            ),
            title: Text(chat.name),
            subtitle: Text(chat.lastMessage),
            onTap: () {
              Navigator.pushNamed(context, '/chat-detail');
            },
          );
        },
      ),
    );
  }
}
