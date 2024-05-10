import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss',
})
export class ListeComponent {
  categories: {
    nom: string;
    elements: string[];
  }[] = [];

  urlSaisie: string = '';

  ngOnInit() {
    const categoriesEnregistre = localStorage.getItem('categories');

    //si il n'y a pas de catégories enregistré : on les initialises
    if (categoriesEnregistre == null) {
      this.categories = [
        { nom: 'Top', elements: [] },
        { nom: 'Bien', elements: [] },
        { nom: 'Bof', elements: [] },
        { nom: 'Nul', elements: [] },
        { nom: 'Horrible', elements: [] },
      ];
    } else {
      this.categories = JSON.parse(categoriesEnregistre);
    }
  }

  onAjoutElement() {
    if (this.urlSaisie != '') {
      //on ajoute l'element à la liste d'élément de la première des catégories
      this.categories[0].elements.push(this.urlSaisie);

      this.urlSaisie = '';

      //on enregistre dans le localstorage
      localStorage.setItem('categories', JSON.stringify(this.categories));
    }
  }

  onSupprimeElement(
    categorieElementSupprime: { nom: string; elements: string[] },
    indexElementSupprime: number
  ) {
    //on supprime l'element de la categorie
    categorieElementSupprime.elements.splice(indexElementSupprime, 1);

    //on enregistre dans le localstorage
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  onChangeCategorie(
    indexCategorie: number,
    indexElement: number,
    monte: boolean
  ) {
    //on recupere l'element avant de le supprimer
    const element = this.categories[indexCategorie].elements[indexElement];

    //on suppriùe l'élémént de sa catégorie actuelle
    this.categories[indexCategorie].elements.splice(indexElement, 1);

    //on l'ajoute à sa nouvelle catégorie
    this.categories[indexCategorie + (monte ? -1 : 1)].elements.push(element);

    //on enregistre dans le localstorage
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }
}
