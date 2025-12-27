import 'package:flutter/material.dart';
import '../services/transport_service.dart';

class TransportScreen extends StatefulWidget {
  const TransportScreen({Key? key}) : super(key: key);

  @override
  State<TransportScreen> createState() => _TransportScreenState();
}

class _TransportScreenState extends State<TransportScreen> {
  final TextEditingController _controller = TextEditingController();
  String? _response;
  bool _loading = false;

  Future<void> _sendMessage() async {
    setState(() { _loading = true; _response = null; });
    final res = await TransportService().getGuide(_controller.text);
    setState(() { _response = res; _loading = false; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Guía de transporte')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: const InputDecoration(labelText: '¿A dónde quieres ir?'),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _loading ? null : _sendMessage,
              child: _loading ? const CircularProgressIndicator() : const Text('Buscar'),
            ),
            const SizedBox(height: 24),
            if (_response != null) ...[
              Text('Respuesta:', style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(_response!),
            ]
          ],
        ),
      ),
    );
  }
}
