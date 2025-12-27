import 'package:flutter/material.dart';
import '../services/community_service.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({Key? key}) : super(key: key);

  @override
  State<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen> {
  final TextEditingController _controller = TextEditingController();
  bool _loading = false;
  String? _error;
  List<String> _posts = [];

  @override
  void initState() {
    super.initState();
    _fetchPosts();
  }

  Future<void> _fetchPosts() async {
    setState(() { _loading = true; });
    final posts = await CommunityService().fetchPosts();
    setState(() {
      _posts = posts;
      _loading = false;
    });
  }

  Future<void> _createPost() async {
    setState(() { _loading = true; _error = null; });
    final success = await CommunityService().createPost(_controller.text);
    if (success) {
      _controller.clear();
      await _fetchPosts();
    } else {
      setState(() { _error = 'Error al crear publicación.'; });
    }
    setState(() { _loading = false; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Comunidad')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: const InputDecoration(labelText: '¿Qué quieres compartir?'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _loading ? null : _createPost,
              child: _loading ? const CircularProgressIndicator() : const Text('Publicar'),
            ),
            if (_error != null) ...[
              const SizedBox(height: 8),
              Text(_error!, style: const TextStyle(color: Colors.red)),
            ],
            const SizedBox(height: 24),
            Expanded(
              child: _loading
                  ? const Center(child: CircularProgressIndicator())
                  : ListView.builder(
                      itemCount: _posts.length,
                      itemBuilder: (context, index) => Card(
                        child: Padding(
                          padding: const EdgeInsets.all(12.0),
                          child: Text(_posts[index]),
                        ),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
