import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

import { Livro } from './livro';
import { LivroComponent } from './livro.component';

describe('LivroComponent', () => {
  let component: LivroComponent;
  let fixture: ComponentFixture<LivroComponent>;
  let pipe: DatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LivroComponent],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(LivroComponent);
    component = fixture.componentInstance;
    pipe = TestBed.inject(DatePipe);

    component.livro = {
      titulo: 'Livro Teste',
      autoria: 'Autor Teste',
      imagem: 'http://example.com/cover.jpg',
      genero: { id: 'romance', value: 'Romance' },
      dataLeitura: '2024-04-19',
      classificacao: 5,
    } as Livro;
    fixture.detectChanges();
  });

  it('deveria ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deveria renderizar as informações de título e autoria do livro', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain(
      component.livro.titulo
    );
    expect(compiled.querySelector('h4').textContent).toContain(
      component.livro.autoria
    );
  });

  it('deveria exibir a imagem correta do livro', () => {
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img.src).toContain(component.livro.imagem);
    expect(img.alt).toContain(component.livro.titulo);
  });

  it('deve formatar a data corretamente', () => {
    const data = new Date('2024-04-19T00:00:00');
    const resultado = pipe.transform(data, 'dd/MM/yyyy');
    expect(resultado).toBe('19/04/2024');
  });

  it('deve retornar null para data nula', () => {
    const resultado = pipe.transform(null, 'dd/MM/yyyy');
    expect(resultado).toBeNull();
  });
});
