function livrosAdd(nome, autor, editora, preco, capa) {
    this.nome = nome
    this.autor = autor
    this.editora = editora
    this.preco = preco
    this.capa = capa
}


class Livraria {
    constructor() {
        this.cadastroDeLivro = []
    }
    adicionarLivro() {
        let nome = document.querySelector("#cadastroNome").value
        let autor = document.querySelector("#cadastroAutor").value
        let editora = document.querySelector("#cadastroEditora").value
        let preco = document.querySelector("#cadastroPreco").value
        let capa = document.querySelector("#cadastroCapa").value
        const novoLivro = new livrosAdd(nome, autor, editora, preco, capa)
        
        this.pushLivronoArray(novoLivro)
        console.log(this.cadastroDeLivro)

        // Salvar em Local Storage o livro do usuário
        const livrosAdicionados = JSON.parse(localStorage.getItem("livrosdoUsuario"))
        console.log(livrosAdicionados)
        if (livrosAdicionados && livrosAdicionados.length > 0 ){
            livrosAdicionados.push(novoLivro)
            localStorage.setItem("livrosdoUsuario", JSON.stringify(livrosAdicionados))
        }else{
            localStorage.setItem("livrosdoUsuario", JSON.stringify([novoLivro]))
        }
        this.exibirLivros(novoLivro)
        this.limparForm()
        swal("Sucesso", "Livro Cadastrado com Sucesso", "success");
    }

    pushLivronoArray(item){
        this.cadastroDeLivro.push(item)
    }

    dispararButton() {
        let button = document.getElementById("buttonSubmit")
        button.onclick = () => {
            this.adicionarLivro();
            fecharModal();
        }
      
    }

    buscarLivros(chaveBusca) {
        let livroEcontrado = this.cadastroDeLivro.find(element => element?.nome.toLowerCase().includes(chaveBusca.toLowerCase()))
        console.log(this.cadastroDeLivro)
        console.log(livroEcontrado)
        livroEcontrado ? swal({title: "Livro Cadastrado", text: "O livro " + livroEcontrado.nome + " está disponível", icon: livroEcontrado.capa, button: "OK",}) : swal({text: "Nenhum livro encontrado com o título " + chaveBusca, icon: "error", button: "OK",})
            chaveBusca = " "
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
const livraria = new Livraria()
livraria.dispararButton()


function novaBusca(){
    let chaveBusca = document.querySelector("#searchInput").value
    livraria.buscarLivros(chaveBusca)
}




//Adicionar Livros para carregamento inicial da página
const livrosIniciais = [{ nome: "Pequeno manual antirracista",  autor: "Djamila Ribeiro", editora: "Companhia das Letras", preco: 34.99 , capa: "./images/anti.jpeg"},
                    { nome: "O passeador de livros",  autor: "Carsten Henn", editora: "Intrinseca", preco: 50.99 , capa: "./images/passeador.jpeg"},
                    { nome: "A Promessa / A Pane",  autor: "Friedrich Durrenmatt", editora: "Estação Liberdade", preco: 94.99 , capa: "./images/promessa.jpeg"}];

    livrosIniciais.forEach(item =>{
        livraria.exibirLivros(item)
        livraria.pushLivronoArray(item)
    });


// Armazenar livros iniciais em JSON no Local Storage
const saveBooksLS = (chave, valor) => { localStorage.setItem(chave, valor) };
saveBooksLS("listaLivrosIniciais", JSON.stringify(livrosIniciais))


        
// Adicionar ao array, os livros do usuário que estão em local storage, se houver, e exibi-los
const userSavedBooks = (JSON.parse(localStorage.getItem("livrosdoUsuario")));
console.log(userSavedBooks)
    if(userSavedBooks.length > 0){
        userSavedBooks.forEach(item =>{            
            livraria.pushLivronoArray(item)
            livraria.exibirLivros(item)
            });
        }

// Exibir modal de cadastro de livro
function abrirModal() {
    const modal = document.getElementById("cadastro-modal");
    modal.style.display = 'flex';
}

// Fechar modal
function fecharModal() {
    document.getElementById("cadastro-modal").style.display = 'none';

}

// Exibir modal de compra
function openCompraModal(nomeLivro) {
    const comprar = document.querySelector(".comprarModal");
    comprar.style.display = "flex";
    const livroFind = livraria.cadastroDeLivro.find(livro =>{return nomeLivro==livro.nome});
    const modalBookTitle = document.querySelector('#bookTitle')
    modalBookTitle.innerText = `${livroFind.nome}`
    const precoUnitario  = document.querySelector('#bookPrecoUnitario')
    precoUnitario.innerText = `${livroFind.preco}`
    const modalBookCover = document.querySelector('#bookCover')
    modalBookCover.innerHTML = `<img class="cardImgModal" src="${livroFind.capa}">`
    const modalBookPrice = document.querySelector('#bookPrice')
    modalBookPrice.innerText = `${livroFind.preco}`
    const modalBookPublisher = document.querySelector('#bookPublisher')
    modalBookPublisher.innerText = `${livroFind.editora}`
    const modalBookAuthor = document.querySelector('#bookAuthor')
    modalBookAuthor.innerText = `${livroFind.autor}`
    document.querySelector(".inputNumber").value = 1    
}
// fechar modal compra

function closeCompraModal() {
    document.querySelector(".comprarModal").style.display = "none";
    limparCadastro()
}

let = document.querySelector(".inputNumber").value = 1

class ComprarItens {
    constructor() {
            
    }
    
    plus() {
        const quantidade = document.querySelector(".inputNumber").value
        const precoUnitario  = parseFloat(document.querySelector("#bookPrecoUnitario").innerHTML)
        const novaQuantidade = parseInt(quantidade) + 1
        document.querySelector(".inputNumber").value = novaQuantidade   
        const valorTotal = document.querySelector(".preco")
        valorTotal.innerHTML = (novaQuantidade*precoUnitario).toFixed(2)
    }
    menos() {
        const quantidade = document.querySelector(".inputNumber").value   
        if(quantidade>0){
            const precoUnitario  = parseFloat(document.querySelector("#bookPrecoUnitario").innerHTML)
            const novaQuantidade = parseInt(quantidade) - 1
            document.querySelector(".inputNumber").value = novaQuantidade   
            const valorTotal = document.querySelector(".preco")
            valorTotal.innerHTML = (novaQuantidade*precoUnitario).toFixed(2) 
        }
       
    }
}
let compraSetItens = new ComprarItens()

compraSetItens.plus()
compraSetItens.menos()

// Buscar e exibir valor de frete

const cep=document.querySelector("#cep")

const mostrarDados=(result)=>{
    for (const campo in result){
        console.log(campo)
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value=result[campo]
           
            }
        }  
        if(result.uf=="RJ" || result.uf=="SP"){
            swal("frete grátis!" );
    
           }else{
           document.querySelector("#compraComFrete").style.display="flex" // swal("Frete Pago!" + valorNovo);
           }
        
}

cep.addEventListener("blur",(e)=>{
    
    console.log(cep.value)
    const options = {
        method: `GET`,
        mode:`cors`,
        cache: `defalut`
    }
    fetch(`http://viacep.com.br/ws/${cep.value}/json/`)
    .then(resposta=> {resposta.json()
        .then( dados =>{ mostrarDados(dados)} )
        })
        .catch( e=>console.log(`Deu erro` + e))
    
})
  
function limparCadastro(){
    document.querySelector("#cep").value = ""
    document.querySelector("#compraComFrete").style.display="none"
    document.querySelector("#logradouro").value = ""
    document.querySelector("#uf").value = ""
    document.querySelector("#bairro").value = ""
    document.querySelector("#localidade").value = ""

}



