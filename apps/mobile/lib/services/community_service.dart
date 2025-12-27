import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:firebase_auth/firebase_auth.dart';
import '../utils/constants.dart';

class CommunityService {
  Future<List<String>> fetchPosts() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return [];
    final idToken = await user.getIdToken();
    final response = await http.get(
      Uri.parse('$apiBaseUrl/community-post'),
      headers: {'Authorization': 'Bearer $idToken'},
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return List<String>.from(data['posts'].map((p) => p['content']));
    }
    return [];
  }

  Future<bool> createPost(String content) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return false;
    final idToken = await user.getIdToken();
    final response = await http.post(
      Uri.parse('$apiBaseUrl/community-post'),
      headers: {
        'Authorization': 'Bearer $idToken',
        'Content-Type': 'application/json',
      },
      body: json.encode({'content': content}),
    );
    return response.statusCode == 201;
  }
}
