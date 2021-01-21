import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})



export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  page = 1;
  totalPokemons!: number;


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getPokemons(); 
  }

  getPokemons() {
    this.dataService.getPokemons(50, this.page*50-50)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;  // to paginate

        response.results.forEach((result: { name: string; }) => {
          this.dataService.getPokemonDetails(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(uniqResponse);
            }); 
        }); 
      }); 
  }
  
}