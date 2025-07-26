import { livros as livrosMock } from './../mock-livros';
import { Injectable } from '@angular/core';
import { GeneroLiterario, Livro } from '../componentes/livro/livro';

export class ErroGeneroLiterario extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'ErroGeneroLiterario';
  }
}
@Injectable({
  providedIn: 'root',
})
export class LivroService {
  public generos: GeneroLiterario[] = [
    {
      id: 'romance',
      value: 'Romance',
    },
    {
      id: 'misterio',
      value: 'Mistério',
    },
    {
      id: 'fantasia',
      value: 'Fantasia',
    },
    {
      id: 'ficcao-cientifica',
      value: 'Ficção Científica',
    },
    {
      id: 'tecnicos',
      value: 'Técnicos',
    },
  ];

  public livros = livrosMock;

  get livrosPorGenero(): Map<string, Livro[]> {
    const map = new Map<string, Livro[]>();

    // Inicializa o map com todos os gêneros
    this.generos.forEach((genero) => {
      map.set(genero.id, []);
    });

    // Adiciona os livros aos gêneros correspondentes
    this.livros.forEach((livro) => {
      map.get(livro.genero.id)?.push(livro);
    });

    return map;
  }

  constructor() {}

  adicionarLivro(novoLivro: Livro) {
    if (!this.generos.some((g) => g.id === novoLivro.genero.id)) {
      this.generos.push(novoLivro.genero);
    }
    this.livros.push(novoLivro);
  }

  obterLivrosPorGenero(genero: string): Livro[] {
    return this.livrosPorGenero.get(genero) || [];
  }
}
