import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  name: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(); 
  }

  onOkClick(): void {
    this.dialogRef.close(this.name); 
  }
}
