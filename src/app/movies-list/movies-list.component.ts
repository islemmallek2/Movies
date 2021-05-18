import { Component, OnInit } from '@angular/core';
import { Movies } from '../models/movies';
import { MoviesService } from '../services/movies-service.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  providers: [MessageService, DatePipe,ConfirmationService],
})
export class MoviesListComponent implements OnInit {

  movies: Movies[] = [];
  loading: boolean = true;
  add: boolean = false;
  cols: any[] = [];
  displayDialog: boolean = false;
  formAjout: any;
  movie: Movies = new Movies(1,'','','','');
  msg: any;
  lastLazyLoadEvent!: LazyLoadEvent;
  totalRecords:any;
  items: MenuItem[] = [];

  constructor(private moviesService: MoviesService,private formBuilder: FormBuilder,private confirmationService: ConfirmationService,private messageService :MessageService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:"/"},
      {label: 'list of movies', icon: 'pi pi-fw pi-file' , routerLink:"/movies"}
    ];

    this.cols = [
      {field: 'title ', header: 'Title ', width: '100%'},
      {field: 'release_date', header: 'Release_date', width: '100%'},
      {field: 'type', header: 'Type', width: '100%'},
      {field: 'Director', header: 'Director', width: '100%'},
      {field: 'Action', header: 'Action', width: '100%'},
    ]

    this.formAjout = this.formBuilder.group({
      Title: new FormControl('',Validators.required),
      Type:new FormControl('',Validators.required),
      Director:new FormControl('',Validators.required)
    });

  }

  LoadLazyMovies(event: LazyLoadEvent) {
    this.lastLazyLoadEvent = event; 
    if(event.globalFilter!=null){
    this.moviesService.getMoviesList(event.globalFilter.value, event.first! / event.rows ! , event.rows).toPromise().then(
      (res) => {
        this.movies=res.content;
        this.totalRecords=res.totalElements;
        this.loading=false;
        this.add=false;
      })
    }
    else{
    this.moviesService.getMoviesList('null', event.first! / event.rows ! , event.rows).toPromise().then(
      (res) => {
        this.movies=res.content;
        this.totalRecords=res.totalElements;
        this.loading=false;
        this.add=false;
      })
    }
  }

  showDialogToAddMovies() {
    this.add=true;
    this.movie= new Movies(1,'','','','');
    this.displayDialog = true;
  }

  save(){
    if(this.add==true){
    this.movie.releaseDate=this.datePipe.transform(this.movie.releaseDate,"dd/MM/yyyy") || ''; 
    this.moviesService.postMovies(this.movie).subscribe(async data => {
     this.displayDialog=false
     this.loading=true;
     this.lastLazyLoadEvent.first = 0;
     this.LoadLazyMovies(this.lastLazyLoadEvent);
    })}
    else {
      console.log(this.movie.releaseDate)
      if(this.movie.releaseDate !== null){
        this.movie.releaseDate=this.datePipe.transform(this.movie.releaseDate,"dd/MM/yyyy") || ''; 
      }
      this.moviesService.updateMovies(this.movie.idM, this.movie).subscribe(async data => {
        this.displayDialog=false
        this.loading=true;
        this.lastLazyLoadEvent.first = 0;
        this.LoadLazyMovies(this.lastLazyLoadEvent);
      })

    }
  }

  delete(data: Movies) {
    this.confirmationService.confirm({
      message: 'veuillez vous supprimer ce film?',
      header: 'Supprimer le film',
      acceptLabel:'oui',
      rejectLabel:'non',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.movie=data;
        this.moviesService.deleteMovies(this.movie.idM).subscribe(data => {
          this.messageService.add({severity: 'success', summary: 'Succès : ', detail:'mise à jour effectué  avec succés'});
        })
        this.loading=true;
        this.lastLazyLoadEvent.first = 0;
        this.LoadLazyMovies(this.lastLazyLoadEvent);
       
      },
      reject: () => {
          this.msg = [{severity:'info', summary:'Rejected', detail:'Vous avez rejeté'}];
      }
  });
  }

  onRowSelect(movie:Movies) {
    this.moviesService.getMovie(movie.idM).toPromise().then(
      (res) => {
        this.movie=res;
        this.displayDialog = true;
      })

  }
}
