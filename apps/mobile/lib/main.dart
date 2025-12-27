import 'screens/community_screen.dart';
import 'screens/transport_screen.dart';
import 'screens/health_screen.dart';
import 'screens/psychology_screen.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'l10n/l10n.dart';
import 'screens/onboarding_screen.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const ConsejoSeguroApp());
}

class ConsejoSeguroApp extends StatelessWidget {
  const ConsejoSeguroApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ConsejoSeguro',
      theme: ThemeData(primarySwatch: Colors.blue),
      localizationsDelegates: L10n.localizationsDelegates,
      supportedLocales: L10n.supportedLocales,
      initialRoute: '/',
      routes: {
        '/': (context) => const OnboardingScreen(),
        '/login': (context) => const LoginScreen(),
        '/home': (context) => const HomeScreen(),
        '/psychology': (context) => const PsychologyScreen(),
        '/health': (context) => const HealthScreen(),
        '/transport': (context) => const TransportScreen(),
        '/community': (context) => const CommunityScreen(),
      },
    );
  }
}
