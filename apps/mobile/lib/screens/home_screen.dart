                                                                  const SizedBox(height: 12),
                                                                  ElevatedButton(
                                                                    onPressed: () {
                                                                      Navigator.pushNamed(context, '/community');
                                                                    },
                                                                    child: const Text('Comunidad'),
                                                                  ),
                                            const SizedBox(height: 12),
                                            ElevatedButton(
                                              onPressed: () {
                                                Navigator.pushNamed(context, '/transport');
                                              },
                                              child: const Text('Guía de transporte'),
                                            ),
                      const SizedBox(height: 12),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/health');
                        },
                        child: const Text('Salud y emergencia'),
                      ),
import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import '../services/user_service.dart';
import '../models/user_profile.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  UserProfile? _profile;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadProfile();
  }

  Future<void> _loadProfile() async {
    final profile = await UserService().fetchUserProfile();
    setState(() {
      _profile = profile;
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Builder(
        builder: (context) => Text(AppLocalizationsHelper.of(context).appTitle),
      )),
      body: Center(
        child: _loading
            ? const CircularProgressIndicator()
            : _profile == null
                ? Builder(
                    builder: (context) => Text(AppLocalizationsHelper.of(context).homeWelcome),
                  )
                : Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                          Text('ID: ${_profile!.id}'),
                          Text('Nombre: ${_profile!.name}'),
                          Text('Email: ${_profile!.email}'),
                          Text('Idioma: ${_profile!.language}'),
                          const SizedBox(height: 24),
                          ElevatedButton(
                            onPressed: () {
                              Navigator.pushNamed(context, '/psychology');
                            },
                            child: const Text('Apoyo psicológico'),
                          ),
                    ],
                  ),
      ),
    );
  }
}
