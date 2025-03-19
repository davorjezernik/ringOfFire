import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'game', component: GamePageComponent},
];
