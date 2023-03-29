function livrosAdd(nome, autor, editora, preco, capa) {
    this.nome = nome
    this.autor = autor
    this.editora = editora
    this.preco = preco
    this.capa = capa
}

class Adicionar {
    constructor() {
        this.cadastroDeLivro = []
        this.cadastroDeLivro = JSON.parse(localStorage.getItem("listaLivrosIniciais")) 
        this.cadastroDeLivro.push(JSON.parse(localStorage.getItem("livrosdoUsuario")))
    }
    adicionarLivro() {
        let nome = document.querySelector("#cadastroNome").value
        let autor = document.querySelector("#cadastroAutor").value
        let editora = document.querySelector("#cadastroEditora").value
        let preco = document.querySelector("#cadastroPreco").value
        let capa = document.querySelector("#cadastroCapa").value
        const novoLivro = new livrosAdd(nome, autor, editora, preco, capa)
        
        this.cadastroDeLivro.push(novoLivro)
        console.log(this.cadastroDeLivro)

        add.exibirLivros(novoLivro)
        add.limparForm()
        localStorage.setItem("livrosdoUsuario", JSON.stringify(this.cadastroDeLivro))
    }

    dispararButton() {
        let button = document.getElementById("buttonSubmit")
        button.onclick = () => {
            this.adicionarLivro();
            fecharModal();

            
        }
    }

    buscarLivros(chaveBusca) {
        let livroEcontrado = this.cadastroDeLivro.find(element => element?.nome.includes(chaveBusca))
        console.log(this.cadastroDeLivro)
        livroEcontrado ? alert("Livro encontrado: " + chaveBusca) : alert("Nenhum livro encontrado com o título " + chaveBusca)
    }
        
        // Busca no formato antigo
        // let livroNaoEncontrado = true
        // this.cadastroDeLivro.forEach(element => {
        //     if (element.nome == busca) {
        //         livroNaoEncontrado = false
        //         alert("Livros encontrados:" + "\n" + element.nome + "\n" + "R$" + " " + element.preco)
        //     }
        // });
        // if (livroNaoEncontrado == true) {
        //     alert("Nenhum livro encontrado com o título " + busca)
        // }
    

    exibirLivros(livro){
        const container = document.getElementById('book-list')
            const card = document.createElement('li')

            // Construct card content
            const content = `
            <div class= 'book_container'>
            <div class="cardImgcontainer">
            <img class='cardImg' src='${livro.capa}'>
            </div>
            <h3 class='cardTitle'>${livro.nome}</h3>
            <h4 class='cardPrice'>R$ ${livro.preco}</h4>
            <p class=cardDetails'>${livro.autor}</p>
            <p class='cardDetails'>${livro.editora}</p>
            <button class='buyButton' onClick="openCompraModal('${livro.nome}')">Comprar</button>
            </div>
            `;

            // Append newyly created card element to the container
            container.innerHTML += content
        
    }

    removerlivro(indice) {
        this.cadastroDeLivro.splice(indice, 1)
    }

    limparForm(){
        document.querySelector("#cadastroNome").value = ""
        document.querySelector("#cadastroAutor").value = ""
        document.querySelector("#cadastroEditora").value = ""
        document.querySelector("#cadastroPreco").value = ""
        document.querySelector("#cadastroCapa").value = ""
    }
    
}
const add = new Adicionar()
add.dispararButton()

function novaBusca(){
    let chaveBusca = document.querySelector("#searchInput").value
    add.buscarLivros(chaveBusca)
}



//Adicionar Livros para carregamento inicial da página
const livrosIniciais = [{ nome: "Pequeno manual antirracista",  autor: "Djamila Ribeiro", editora: "Companhia das Letras", preco: 34.99 , capa: "./images/anti.jpeg"},
                    { nome: "O passeador de livros",  autor: "Carsten Henn", editora: "Intrinseca", preco: 50.99 , capa: "./images/passeador.jpeg"},
                    { nome: "A Promessa / A Pane",  autor: "Friedrich Durrenmatt", editora: "Estação Liberdade", preco: 94.99 , capa: "./images/promessa.jpeg"}];

    livrosIniciais.forEach(item =>{
        add.exibirLivros(item)
    });


// Armazenar livros em JSON no Local Storage
const saveBooksLS = (chave, valor) => { localStorage.setItem(chave, valor) };
saveBooksLS("listaLivrosIniciais", JSON.stringify(livrosIniciais))


//Exibir livros salvos no local storage
const livrosUsuario = JSON.parse(localStorage.getItem("livrosdoUsuario"))
    livrosUsuario.forEach(item =>{
        add.exibirLivros(item)
    });

// const sair = 0
// const cadastrar = 1
// const buscar = 2
// const remover = 3
// const listar = 4

// const escolha = () => {
//     return `
//        0 - Sair
//        1 - Adicionar Livro
//        2 - Buscar Livros
//        3 - remover Livro
//        4 - Listar Livros`
// }

// function livraria(){
// const add = new Adicionar()
//    let menu
//     do{
//          menu =parseInt( prompt ("Escolha: "+ escolha()))

//          switch(menu){

//             case cadastrar:
//               add.adicionarLivro()
//                 break

//             case buscar:
//                 let busca = prompt("Digite o livro que deseja buscar")
//                 add.buscarLivros(busca)
//                 break

//             case remover:
//                 let indice = parseInt( prompt ("Escolha o índice que deseja remover:"))
//                 add.removerlivro(indice)
//                 break

//             case listar:
//                 add.listarLivros()
//                 break

//             case sair:
//                 alert ("até logo")
//                 break

//                 default:
//                     alert(
//                         "Opção inválida! Escolha uma das opções abaixo:" + escolha())
//          }

//     }while (menu != sair)


//     }
// livraria()

// Exibir modal de cadastro de livro
function abrirModal() {
    const modal = document.getElementById("cadastro-modal");
    modal.style.display = 'flex';
}

// Fechar modal
function fecharModal() {
    document.getElementById("cadastro-modal").style.display = 'none';
      swal("Sucesso", "Livro Cadastrado com Sucesso", "success");

}

// Exibir modal de compra
function openCompraModal(nomeLivro) {
    const comprar = document.querySelector(".comprarModal");
    comprar.style.display = "flex";
    const livroFind = add.cadastroDeLivro.find(livro =>{return nomeLivro==livro.nome});
    const modalBookTitle = document.querySelector('#bookTitle')
    modalBookTitle.innerText = `${livroFind.nome}`
    const modalBookCover = document.querySelector('#bookCover')
    modalBookCover.innerHTML = `<img class="cardImgModal" src="${livroFind.capa}">`
    const modalBookPrice = document.querySelector('#bookPrice')
    modalBookPrice.innerText = `${livroFind.preco}`
    const modalBookPublisher = document.querySelector('#bookPublisher')
    modalBookPublisher.innerText = `${livroFind.editora}`
    const modalBookAuthor = document.querySelector('#bookAuthor')
    modalBookAuthor.innerText = `${livroFind.autor}`    
}
// fechar modal compra

function closeCompraModal() {
    document.querySelector(".comprarModal").style.display = "none";
}
let = document.querySelector(".inputNumber").value = 1

class ComprarItens {
    constructor() {
            
    }
    
    plus() {
        let atual=document.querySelector(".inputNumber").value
        let novo = atual -(-1)
        document.querySelector(".inputNumber").value = novo    
        let changeValor = document.querySelector(".preco")
        let valorAtual = 34.90
        let quant = novo
        let valorNovo = quant*valorAtual
        changeValor.innerHTML = valorNovo
    }
    menos() {
        let atual=document.querySelector(".inputNumber").value    
        if(atual>0){
            let novo = atual -1
            document.querySelector(".inputNumber").value = novo
            let changeValor = document.querySelector(".preco")
            let valorAtual = 34.90
            let quant = novo
            let valorNovo = quant*valorAtual
            changeValor.innerHTML = valorNovo
           
        }
       
    }
}



let compraSetItens = new ComprarItens()
livraria()
compraSetItens.plus()
compraSetItens.menos()

