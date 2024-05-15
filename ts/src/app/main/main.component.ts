import { Component, OnInit } from '@angular/core';

interface Assunto {
  titulo: string;
  autor: string;
  conteudo: string;
  mostrarExcluir: boolean;
  showComments: boolean;
  respondido: boolean;
  numRespostas: number; // Adicionando a propriedade numRespostas

}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // Variáveis para controlar a exibição dos campos de discussão
  mostrarCampos: boolean = false;
  topicCriado: boolean = false;
  mostrarMensagem = false;
  
  //variaveis para mostrar nos topicos
  assunto: string = '';
  conteudo: string = '';

  

 // Variáveis para controlar a criação de novos tópicos
  novoTopicoCriado: boolean = false;
  assuntos: Assunto[] = [];
  
  // Variáveis para o novo tópico a ser criado
  novoAssunto: string = '';
  novoConteudo: string = '';
  autor: string = 'Carlos Henrique Santos';
    
  // Implemente a função toggleExcluir
  toggleExcluir(topico: Assunto) {
    topico.mostrarExcluir = !topico.mostrarExcluir;
  }

  deleteTopic(topico: Assunto) {
    // Encontre o índice do tópico no array de assuntos
    const index = this.assuntos.indexOf(topico);
    // Remova o tópico do array de assuntos
    if (index !== -1) {
        this.assuntos.splice(index, 1);
        // Salve os tópicos atualizados no armazenamento local
        localStorage.setItem('assuntos', JSON.stringify(this.assuntos));
    }
}

  criarTopico() {
    const novoAssunto: Assunto = {
      titulo: this.assunto,
      autor: 'Carlos Henrique Santos', // ou qualquer outra fonte de autor que você tenha
      conteudo: this.conteudo,
      mostrarExcluir: false,
      showComments: false,
      respondido: false,
      numRespostas: 0, 

    };

    // Adicionar o novo tópico ao array de tópicos
    this.assuntos.push(novoAssunto);

    this.topicCriado = true;


    // Salvar os tópicos atualizados no localStorage
    localStorage.setItem('assuntos', JSON.stringify(this.assuntos));

    // Limpar os campos de entrada após a criação do tópico
    this.assunto = '';
    this.conteudo = '';
    this.mostrarCampos = false;
  }

  resetar() {
    // Ao clicar no botão para criar um novo tópico, resetamos os valores e escondemos a mensagem de sucesso
    this.mostrarCampos = false;
    this.assunto = '';
    this.conteudo = '';
    this.topicCriado = false;
}

  criarNovoTopico() {
    this.mostrarCampos = true;
  }


  //RESUMOS
  textoCompleto: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae turpis auctor, mollis felis ut, commodo turpis. Phasellus felis mauris, egestas eget cursus et, iaculis quis lacus. Fusce auctor eros sed magna ultricies gravida. Etiam aliquam dictum nisl, vel aliquet enim accumsan sit amet. Donec finibus nisi tellus, ut viverra lorem vestibulum ut. Phasellus condimentum orci id leo condimentum lobortis et non lorem. Sed id nisl metus. Quisque sollicitudin ligula in sapien scelerisque, ac gravida eros vestibulum Phasellus condimentum orci id leo condimentum lobortis et non lorem. Sed id nisl metus. Quisque sollicitudin ligula in sapien scelerisque, ac gravida eros vestibulum. Etiam aliquam dictum nisl, vel aliquet enim accumsan sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae turpis auctor, mollis felis ut, commodo turpis. Phasellus felis mauris, egestas eget cursus et, iaculis quis lacus. Fusce auctor eros sed magna ultricies gravida. Etiam aliquam dictum nisl, vel aliquet enim accumsan sit amet. Donec finibus nisi tellus, ut viverra lorem vestibulum ut. Phasellus condimentum orci id leo condimentum lobortis et non lorem. Sed id nisl metus. Quisque sollicitudin ligula in sapien scelerisque, ac gravida eros vestibulum Phasellus condimentum orci id leo condimentum lobortis et non lorem. Sed id nisl metus. Quisque sollicitudin ligula in sapien scelerisque, ac gravida eros vestibulum. Etiam aliquam dictum nisl, vel aliquet enim accumsan sit amet.";
  textoResumido: string = this.textoCompleto.slice(0, 200) + "...";
  mostrarMais: boolean = false;
  
    toggleMostrarMais() {
      this.mostrarMais = !this.mostrarMais;
    }

    // COMENTARIOS
    showComments: boolean = false;
    commentCount: number = 1; // Inicialmente, temos um comentário
    

    toggleComments(topico: Assunto) {
      topico.showComments = !topico.showComments;
      topico.respondido = true;

  }

  



  constructor() {
     // Recuperar os tópicos salvos no localStorage ao iniciar o componente
     const assuntosSalvos = localStorage.getItem('assuntos');
     if (assuntosSalvos) {
         this.assuntos = JSON.parse(assuntosSalvos);
     }
   }

  ngOnInit(): void {
    const ultimoAssunto = localStorage.getItem('ultimoAssunto');
    if (ultimoAssunto) {
      this.assunto = ultimoAssunto;
    }

    // Verifique se há tópicos salvos no armazenamento local
    const storedAssuntos = localStorage.getItem('assuntos');
    if (storedAssuntos) {
        this.assuntos = JSON.parse(storedAssuntos);
    }
  }

}
