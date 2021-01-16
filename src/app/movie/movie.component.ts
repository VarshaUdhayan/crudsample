import { Component, OnInit } from '@angular/core';

import { NgForm }   from '@angular/forms';


import { MovieService } from '../shared/movie.service';
import { Movie } from '../shared/movie.model';


declare var M: any;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MovieService]
 
})
export class MovieComponent implements OnInit {

  constructor(public movieService: MovieService) { }

  ngOnInit(){
    this.resetForm();
    this.refreshMovieList();
    

  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.movieService.selectedMovie= {
      _id: "",
      movietitle: "",
      movierating: null,
      moviereview: "",
      movierelease: null,
    }
  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.movieService.postMovie(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshMovieList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
  
}
else {
  this.movieService.putMovie(form.value).subscribe((res) => {
    this.resetForm(form);
    this.refreshMovieList();
    M.toast({ html: 'Updated successfully', classes: 'rounded' });
  });
}

}
refreshMovieList() {
  this.movieService.getMovieList().subscribe((res) => {
    this.movieService.movies = res as Movie[];
  });
}
onEdit(mov: Movie) {
  this.movieService.selectedMovie = mov;
}

onDelete(_id: string, form: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.movieService.deleteMovie(_id).subscribe((res) => {
      this.refreshMovieList();
      this.resetForm(form);
      M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }
}
}



