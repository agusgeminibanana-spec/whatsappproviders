import 'package:flutter/material.dart';

class QrScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Scan QR Code'),
      ),
      body: Center(
        child: Text('QR Code will be displayed here'),
      ),
    );
  }
}
