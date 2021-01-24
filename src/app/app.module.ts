import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MatButtonModule } from '@angular/material/button'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { MatSelectModule } from '@angular/material/select'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { MatInput, MatInputModule } from '@angular/material/input'
import { ChefWaitingListComponent } from './components/chef-waiting-list/chef-waiting-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChefTeamsComponent } from './components/chef-teams/chef-teams.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ChefWaitingListComponent,
    PageNotFoundComponent,
    ChefTeamsComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    MatButtonModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    MatSelectModule,
    NzInputModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NzPaginationModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
