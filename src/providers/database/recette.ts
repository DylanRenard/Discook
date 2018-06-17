export class Recette {
    id : string;
    nom : string;
    presentation : string;
    image : string;
    
    difficulte : number;
    nombreDePersonne : number;    
    tempsPreparation : string;
    tempsCuisson : string;

    etapes : Etape[];
    ingredients : Ingredient[];
    
    motsCles : string[];
}

export class Etape {
    id : string;

    numero : number;
    texte : string;
    annotation : string;
}

export class Ingredient{
    id : string;

    nom : string;
    quantite : number;
    unite : string;

    image : string;
}