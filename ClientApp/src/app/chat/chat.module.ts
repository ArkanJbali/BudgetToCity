import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [
    ChatDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [ChatDialogComponent ],
  providers: [ChatService]
})
export class ChatModule { }
