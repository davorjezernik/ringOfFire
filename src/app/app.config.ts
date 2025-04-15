import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "card-game-43315", appId: "1:232211663071:web:45af4c7121a7979172016a", storageBucket: "card-game-43315.firebasestorage.app", apiKey: "AIzaSyCfIzESW29T6MgeQNa-DGTbYnr2jq-S4S8", authDomain: "card-game-43315.firebaseapp.com", messagingSenderId: "232211663071" })), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
