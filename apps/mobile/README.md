# ConsejoSeguro Frontend (Flutter)

Este proyecto Flutter implementará la app móvil y PWA de ConsejoSeguro, conectando con el backend y ofreciendo:
- Onboarding interactivo
- Módulos: Salud, Psicología Escolar, Transporte, Comunidad
- Multilenguaje y traducción automática
- UI empática, accesible y offline-first

## Primeros pasos

1. Instala Flutter: https://docs.flutter.dev/get-started/install
2. Ejecuta:
   flutter create .
   flutter pub add http provider intl
3. Configura la conexión con el backend en lib/services/api_service.dart
4. Implementa navegación por pestañas y pantallas base en lib/

---

## Estructura recomendada
- lib/
  - main.dart
  - screens/
  - widgets/
  - services/
  - models/
  - l10n/
- assets/
- test/

---

## Próximos pasos
- Scaffold de pantallas: Onboarding, Home, Módulos, Perfil
- Integración de internacionalización (i18n)
- Consumo de API REST
- Soporte offline y sincronización
