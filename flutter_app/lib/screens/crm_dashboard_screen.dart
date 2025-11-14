import 'package:flutter/material.dart';

class CRMDashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              child: Text('Scan QR Code'),
              onPressed: () {
                Navigator.pushNamed(context, '/qr');
              },
            ),
            ElevatedButton(
              child: Text('View Chats'),
              onPressed: () {
                Navigator.pushNamed(context, '/chats');
              },
            ),
          ],
        ),
      ),
    );
  }
}
