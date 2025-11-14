import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'screens/crm_dashboard_screen.dart';
import 'screens/qr_screen.dart';
import 'screens/chat_list_screen.dart';
import 'screens/chat_detail_screen.dart';
import 'providers/chat_provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => ChatProvider(),
      child: MaterialApp(
        title: 'WhatsApp CRM',
        theme: ThemeData(
          primarySwatch: Colors.teal,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => CRMDashboardScreen(),
          '/qr': (context) => QrScreen(),
          '/chats': (context) => ChatListScreen(),
          '/chat-detail': (context) => ChatDetailScreen(),
        },
      ),
    );
  }
}
