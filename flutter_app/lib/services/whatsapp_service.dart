import 'dart:convert';
import 'package:http/http.dart' as http;

class WhatsappService {
  static const String _baseUrl = 'http://localhost:5001/api/whatsapp';

  Future<Map<String, dynamic>> checkStatus() async {
    final response = await http.get(Uri.parse('$_baseUrl/status'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to check status');
    }
  }

  Future<void> sendMessage(String chatId, String text) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/send'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'chatId': chatId,
        'text': text,
      }),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to send message');
    }
  }
}
