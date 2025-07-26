import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LivroService } from '../../services/livro.service';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: LivroService;

  const mockLivroValida = {
    titulo: 'Novo Livro',
    autoria: 'Autoria Desconhecida',
    imagem: 'http://example.com/cover.jpg',
    genero: 'romance',
    dataLeitura: '2024-04-19',
    classificacao: 5,
  };

  const mockLivroInvalida = {
    titulo: '',
    autoria: '',
    imagem: '',
    genero: '',
    dataLeitura: '',
    classificacao: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormularioComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [LivroService, FormBuilder],
    });

    service = TestBed.inject(LivroService);
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria inicializar o formulário com valores vazios', () => {
    expect(component.formulario.value).toEqual({
      titulo: '',
      autoria: '',
      imagem: '',
      genero: '',
      dataLeitura: '',
      classificacao: null,
    });
  });

  it('deveria adicionar um novo livro ao preencher com dados válidos', () => {
    const adicionarLivroSpy = jest.spyOn(service, 'adicionarLivro');
    const routerSpy = jest.spyOn(component['router'], 'navigate');

    // Muda os valores do formulário para simular a entrada do usuário
    component.formulario.setValue(mockLivroValida);

    // Verifica se o formulário está válido com os dados de mock
    expect(component.formulario.valid).toBeTruthy();

    // Chama o método para adicionar o livro
    component.adicionarLivro();

    // Verifica se os parâmetros enviados para o serviço estão corretos
    expect(adicionarLivroSpy).toHaveBeenCalledWith({
      ...mockLivroValida,
      genero: component.generos.find((g) => g.id === mockLivroValida.genero),
    });

    expect(component.formulario.value).toEqual({
      titulo: null,
      autoria: null,
      imagem: null,
      genero: null,
      dataLeitura: null,
      classificacao: null,
    });

    expect(routerSpy).toHaveBeenCalledWith(['lista-livros']);
  });

  it('Não deveria validar o formulário com dados inválidos', () => {
    const adicionarLivroSpy = jest.spyOn(service, 'adicionarLivro');
    const routerSpy = jest.spyOn(component['router'], 'navigate');

    // Muda os valores do formulário para simular a entrada do usuário
    component.formulario.setValue(mockLivroInvalida);

    // Verifica se o formulário está INVÁLIDO com os dados de mock
    expect(component.formulario.invalid).toBeTruthy();

    // Chama o método para adicionar o livro
    component.adicionarLivro();

    // Verifica se a função que registra o livro NÃO foi chamada
    expect(adicionarLivroSpy).not.toHaveBeenCalled();
    // Verifica se o router NÃO foi chamado para mudar de página
    expect(routerSpy).not.toHaveBeenCalledWith(['lista-livros']);
  });
});
