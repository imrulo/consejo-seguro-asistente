import 'package:flutter/material.dart';
import '../services/psychology_service.dart';

class PsychologyScreen extends StatefulWidget {
  const PsychologyScreen({Key? key}) : super(key: key);

  @override
  State<PsychologyScreen> createState() => _PsychologyScreenState();
}

class _PsychologyScreenState extends State<PsychologyScreen> {
  final TextEditingController _controller = TextEditingController();
  String? _response;
  bool _loading = false;

  Future<void> _sendMessage() async {
    setState(() { _loading = true; _response = null; });
    final res = await PsychologyService().getSupport(_controller.text);
    setState(() { _response = res; _loading = false; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Apoyo psicológico')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: const InputDecoration(labelText: '¿Cómo te sientes hoy?'),
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
