import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare type Categorie = {
  nom: string;
  elements: string[];
  estModifie: boolean;
};

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss',
})
export class ListeComponent {
  categories: Categorie[] = [];

  urlSaisie: string = '';

  nomCategorieSaisie: string = '';

  onAjoutCategorie() {
    if (this.nomCategorieSaisie != '') {
      //on ajoute la catégorie à la liste
      this.categories.push({
        nom: this.nomCategorieSaisie,
        elements: [],
        estModifie: false,
      });

      //on vide le champs de texte du nom de la catégorie
      this.nomCategorieSaisie = '';

      //on enregistre dans le localstorage
      localStorage.setItem('categories', JSON.stringify(this.categories));
    }
  }

  onSupprimeCategorie(categorieAsupprime: Categorie, indexCategorie: number) {
    //on cherche quelle catégorie récupérera les éléments de la catégorie à supprimer
    //si on supprime la premiere catégorie : on prend la catégorie inféieur, sinon la supérieur
    const categorieRemplacement: Categorie =
      indexCategorie == 0
        ? this.categories[indexCategorie + 1]
        : this.categories[indexCategorie - 1];

    //on place dans les éléments de la catégorie de remplacement tous les élements
    // de cette catégorie et ceux de la catégortie à supprimer
    categorieRemplacement.elements = [
      ...categorieRemplacement.elements,
      ...categorieAsupprime.elements,
    ];

    //On supprime la catégorie du tableau
    this.categories.splice(indexCategorie, 1);

    //on enregistre dans le localstorage
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  ngOnInit() {
    const categoriesEnregistre = localStorage.getItem('categories');

    //si il n'y a pas de catégories enregistré : on les initialises
    if (categoriesEnregistre == null) {
      this.initialiseCategories();
    } else {
      this.categories = JSON.parse(categoriesEnregistre);
    }
  }

  initialiseCategories() {
    this.categories = [
      { nom: 'Top', elements: [], estModifie: false },
      { nom: 'Bien', elements: [], estModifie: false },
      { nom: 'Bof', elements: [], estModifie: false },
      { nom: 'Nul', elements: [], estModifie: false },
      { nom: 'Horrible', elements: [], estModifie: false },
    ];
  }

  onDoubleClicCategorie(categorieDoubleClique: Categorie, evenement: any) {
    //on change l'état de toute s les catégories à non modifiées
    this.categories.forEach((categorie) => {
      categorie.estModifie = false;
    });

    //on change l'état de la catégorie double cliquée à modifiée
    categorieDoubleClique.estModifie = true;

    //On recupere du DOM l'elment double cliqué
    const element = evenement.target;

    if (element != null) {
      //si l'éléméent est un enfant de l'entete, on récupère l'entete
      const enTete = element.closest('.entete');

      //on recupere l'input de l'entete double cliqué
      const input = enTete.querySelector('input');

      //Uggly fix pour pouvoir affecter le focus à l'input
      setTimeout(() => input.focus(), 0);
    }
  }

  onBlurInputNomCategorie(categorie: Categorie) {
    categorie.estModifie = false;

    //on enregistre dans le localstorage
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  onKeyUpInputNomCategorie(categorie: Categorie, evenement: KeyboardEvent) {
    if (evenement.code == 'Enter' || evenement.code == 'Escape') {
      this.onBlurInputNomCategorie(categorie);
    }
  }

  reset() {
    //on réinitialise les catégories
    this.initialiseCategories();

    //on enregistre dans le localstorage
    localStorage.setItem('categories', JSON.stringify(this.categories));
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
    categorieElementSupprime: Categorie,
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
