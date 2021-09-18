import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { tap } from 'rxjs/operators';
import { Book } from 'src/app/interfaces/books.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['title', 'subtitle', 'isbn13', 'price', 'url'];
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  books!: any;

  constructor(
    private booksSvc: BooksService,
    public dialog: MatDialog
    ) {
    this.getBooks();
  }

  ngOnInit(): void {
  }

  getBooks() {
    this.booksSvc
    .getBooks()
    .pipe(
      tap((respBook: any) => {
        this.books = respBook.books
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.books);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    )
    .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, {
      restoreFocus: false,
      width: '350px',
      data: {title: data.title, url_img: data.image}
    });

    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  download(): void {
    this.booksSvc.exportToExcel(this.dataSource.data, 'books');
  }

}

@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'dialog-from-menu-example-dialog.html',
  styleUrls: ['./books.component.scss']
})
export class DialogFromMenuExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogFromMenuExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
