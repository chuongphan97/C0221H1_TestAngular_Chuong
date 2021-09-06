import { BookService } from './../services/product.service';
import { BookDto } from './../dtos/book.dto';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  title = 'Book list';

  books: BookDto[] = [];

  constructor(
    private bookService: BookService,
    private toastrService: ToastrService
    ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks():void {
    this.bookService.getList().subscribe(
      res => this.books = res
    )
  }

  deleteBook(bookDto: BookDto): void {
    confirm("Bạn muốn xóa cuốn sách này?") &&   this.bookService.delete(bookDto.id).subscribe(
      res => {
        this.books = this.books.filter(d => d != bookDto);
        this.toastrService.success("Delete product successfully")
      },
      error => this.toastrService.error("Something went wrong!")
    )
  }

}
