import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BooksRoutingModule } from "./books-routing.module";
import { BooksComponent, DialogFromMenuExampleDialog } from "./books.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        BooksComponent,
        DialogFromMenuExampleDialog
    ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatMenuModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ]
})

export class BooksModule {  }
