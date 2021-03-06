import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from '../../modules/posts/posts.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from '../../modules/dashboard.service';
import { FormsModule } from '@angular/forms';
import { UsersManagementComponent } from '../../modules/users-management/users-management.component';
import { DashboardHotelComponent } from '../../modules/dashboard-hotel/dashboard-hotel.component';
import { NotfoundComponent } from '../../modules/notfound/notfound.component';
import { ManagerProfileComponent } from '../../modules/manager-profile/manager-profile.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    UsersManagementComponent,
    DashboardHotelComponent,
    NotfoundComponent,
    ManagerProfileComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [DashboardService]
})
export class DefaultModule { }
