# Registro de Acidente de Trânsito - Mobile

## Pre-requisitos
 - Android SDK
 - XCode (para build iOS) *build para iOS deve ser feita de um sistema com o oSX
 - Npm e Node v7+
 - Bibliotecas para node: cordova

## Instalacao
```
npm install
ionic platform add android
ionic platform add ios (se estiver rodando em um mac)
ionic cordova build android --prod
ionic cordova build ios --prod
```

Desta forma a build do projeto vai estar na pasta: platforms/android(ou ios)/build/output

Estas builds não são assinadas (para deploy nas stores), para fazer isto da forma mais fácil é abrir a pasta platforms/android no ANDROID STUDIO e de lá seguir com o processo de assinatura das builds (o mesmo funciona para o iOS onde o mesmo é feito do XCode).
