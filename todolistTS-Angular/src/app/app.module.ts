import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { TodolistComponent } from 'app/components/todolist/todolist.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from 'app/components/task/task.component';
import { HomeComponent } from './pages/home/home.component';
import { FormUpdateComponent } from 'app/components/form-update/form-update.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodolistComponent,
    TaskComponent,
    FormUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
