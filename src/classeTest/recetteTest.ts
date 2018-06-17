import { Recette, Etape } from "../providers/database/recette";

export class RecetteTest extends Recette {

    constructor (){
        super();

        this.nom = "test";
        this.difficulte = 1;
        this.nombreDePersonne = 1;
        this.presentation = "Presentation Test";
        this.tempsCuisson = "2 minutes";
        this.tempsPreparation = "30 secondes";
        this.image = "assets/imgs/unknow.png";

        this.etapes = [];
        EtapeTest.num = 1;
        for(let i = 1 ; i<4 ; i++){
            let etape:Etape = new EtapeTest();
            this.etapes.push(etape);
        }

        this.motsCles = [];
        for(let i = 1 ; i<4 ; i++){
            let motCle:string = "motCle " +i;
            this.motsCles.push(motCle);
        }

        this.ingredients = [];
        //ajout des ingredients dans le code pour les recuperer du NativeStorage
        
        //id est attribue lors de la mise en BDD
    }
}

export class EtapeTest extends Etape {

    static num:number = 1;

    constructor (){
        super();

        this.numero = EtapeTest.num++;
        this.texte = "Etape Test";
        this.annotation = "Etape Annotation";

        //id est attribue lors de la mise en BDD
    }
}