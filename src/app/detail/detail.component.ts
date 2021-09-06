import { BookService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { BookDto } from '../dtos/book.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id!: string;
  book!: BookDto;
  constructor(private bookService: BookService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.bookService.getById(this.id).subscribe(
      res => this.book = res
    )
  }

}
