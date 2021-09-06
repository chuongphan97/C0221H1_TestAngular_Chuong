import { BookService } from './../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookDto } from '../dtos/book.dto';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["",[Validators.required]],
      author: ["", [Validators.required]],
      description: ["",Validators.required],
    })

  }

  submit(){
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsDirty());

    if (this.form.invalid) return;

    const { name, author, description } = this.form.value;

    const bookDto: BookDto = {
      name: name,
      author: author,
      description: description
    } as BookDto;

    this.bookService.add(bookDto).subscribe(
      res => {
        this.toastrService.success("Create new product successfully!", res.name);
        this.form.reset();
        this.form.patchValue({
          name: "",
          author: "",
          description: ""
        })
      },
      error => this.toastrService.error(error.message)
    )







  }
}
