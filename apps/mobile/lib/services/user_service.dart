import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:firebase_auth/firebase_auth.dart';
import '../models/user_profile.dart';
import '../utils/constants.dart';

class UserService {
  Future<UserProfile?> fetchUserProfile() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return null;
    final idToken = await user.getIdToken();
    final response = await http.get(
      Uri.parse('$apiBaseUrl/user/profile'),
      headers: {'Authorization': 'Bearer $idToken'},
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return UserProfile(
        id: data['id'].toString(),
        name: data['name'] ?? '',
        email: data['email'] ?? '',
        language: data['language'] ?? 'es',
      );
    }
    return null;
  }
}
