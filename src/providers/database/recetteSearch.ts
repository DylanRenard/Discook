import { Ingredient } from "./recette";

export class RecetteSearch {
    
    id : string;
    nom : string;
    presentation : string;
    image : string;
    
    difficulte : number;
    nombreDePersonne : number;    
    tempsPreparation : string;
    tempsCuisson : string;

    etapes : string[];
    ingredients : Ingredient[];
    
    motsCles : string[];
}