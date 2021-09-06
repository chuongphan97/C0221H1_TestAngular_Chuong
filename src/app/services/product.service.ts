import { BookDto } from './../dtos/book.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const endpoint = 'books/';

@Injectable({ providedIn: "root" })
export class BookService {
  constructor(private httpClient: HttpClient){}

  getList(): Observable<BookDto[]> {
    return this.httpClient.get<BookDto[]>(endpoint)
  }

  getById(id: string): Observable<BookDto>{
    return this.httpClient.get<BookDto>(endpoint + id);
  }

  add(bookDto: BookDto): Observable<BookDto>{
    return this.httpClient.post<BookDto>(endpoint, bookDto);
  }

  update(id: string, dto: BookDto): Observable<BookDto>{
    return this.httpClient.put<BookDto>(endpoint + id, dto);
  }

  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(endpoint + id);
  }
}
