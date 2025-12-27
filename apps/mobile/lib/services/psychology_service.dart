import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:firebase_auth/firebase_auth.dart';
import '../utils/constants.dart';

class PsychologyService {
  Future<String?> getSupport(String message) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return null;
    final idToken = await user.getIdToken();
    final response = await http.post(
      Uri.parse('$apiBaseUrl/school-support/support'),
      headers: {
        'Authorization': 'Bearer $idToken',
        'Content-Type': 'application/json',
      },
      body: json.encode({'message': message}),
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['response'] ?? 'Sin respuesta.';
    }
    return 'Error al obtener respuesta.';
  }
}
