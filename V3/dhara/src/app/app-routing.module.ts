import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'weather', loadChildren: './weather/weather.module#WeatherPageModule' },
  { path: 'water-level', loadChildren: './water-level/water-level.module#WaterLevelPageModule' },
  { path: 'past-flood', loadChildren: './past-flood/past-flood.module#PastFloodPageModule' },  { path: 'safe-route', loadChildren: './safe-route/safe-route.module#SafeRoutePageModule' },
  { path: 'wforecast', loadChildren: './wforecast/wforecast.module#WforecastPageModule' },
  { path: 'about-us', loadChildren: './about-us/about-us.module#AboutUsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
