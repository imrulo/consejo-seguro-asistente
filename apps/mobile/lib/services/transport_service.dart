import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:firebase_auth/firebase_auth.dart';
import '../utils/constants.dart';

class TransportService {
  Future<String?> getGuide(String destination) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return null;
    final idToken = await user.getIdToken();
    final response = await http.post(
      Uri.parse('$apiBaseUrl/transport-guide/guide'),
      headers: {
        'Authorization': 'Bearer $idToken',
        'Content-Type': 'application/json',
      },
      body: json.encode({'destination': destination}),
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['response'] ?? 'Sin respuesta.';
    }
    return 'Error al obtener respuesta.';
  }
}
