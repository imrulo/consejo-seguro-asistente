import 'package:flutter/material.dart';
import '../services/health_service.dart';

class HealthScreen extends StatefulWidget {
  const HealthScreen({Key? key}) : super(key: key);

  @override
  State<HealthScreen> createState() => _HealthScreenState();
}

class _HealthScreenState extends State<HealthScreen> {
  final TextEditingController _controller = TextEditingController();
  String? _response;
  bool _loading = false;

  Future<void> _sendMessage() async {
    setState(() { _loading = true; _response = null; });
    final res = await HealthService().getSupport(_controller.text);
    setState(() { _response = res; _loading = false; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Salud y emergencia')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: const InputDecoration(labelText: 'Describe tu situación o emergencia'),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _loading ? null : _sendMessage,
              child: _loading ? const CircularProgressIndicator() : const Text('Enviar'),
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
