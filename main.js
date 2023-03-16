function livrosAdd(nome, autor, editora, preco){
    this.nome = nome
    this.autor = autor
    this.editora =editora
    this.preco=preco
}
class Adicionar{
    constructor(){
        this.cadastroDeLivro = []

    }
    adicionarLivro(){
    
        let nome = document.querySelector("#cadastroNome").value     
        let autor = document.querySelector("#cadastroAutor").value
        let editora = document.querySelector("#cadastroEditora").value
        let preco = document.querySelector("#cadastroPreco").value
        const novoLivro = new livrosAdd (nome,autor, editora, preco)

            this.cadastroDeLivro.push(novoLivro)
            console.log(this.cadastroDelivro, novoLivro)

            add.listarLivros()
        }
        dispararButton(){
            let button = document.getElementById("buttonSubmit")
            button.onclick = ()=>{
                this.adicionarLivro();
                fecharModal();
            }
           }
    
        buscarLivros(busca){
            let livroNaoEncontrado = true
            this.cadastroDeLivro.forEach(element => {
                if(element.nome == busca){
                    livroNaoEncontrado = false
                    alert("Livros encontrados:" +"\n" + element.nome +"\n" + "R$" +" "+ element.preco)
                } 
                
            });
            if (livroNaoEncontrado == true){
                alert("Nenhum livro encontrado com o título " + busca) 
            }
        }
    
        listarLivros(){
           
            // let titulosLivros = ""
            // this.cadastroDeLivro.forEach(element => {
                for (const titulosLivros of this.cadastroDeLivro){
                let pai = document.getElementById("texto")
                let li = document.createElement("li")
                li.innerHTML = titulosLivros.nome
                pai.appendChild(li)
                  // titulosLivros += element.nome + "\n"
                  
            };
            
        }
    
        removerlivro(indice){
            this.cadastroDeLivro.splice(indice,1)
    
        }
    }
    const add = new Adicionar()
    // add.adicionarLivro()
    add.dispararButton()
    add.listarLivros()
    
    const sair = 0
    const cadastrar = 1
    const buscar = 2
    const remover = 3
    const listar = 4
    
    const escolha = () =>{
        return `
       0 - Sair
       1 - Adicionar Livro
       2 - Buscar Livros
       3 - remover Livro
       4 - Listar Livros`
    }
    
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
  }

// Exibir modal de compra

function openCompraModal (){
 
    const comprar = document.querySelector(".comprarModal");
    comprar.style.display = "flex";
}
// fechar modal compra

function closeCompraModal (){
    document.querySelector(".comprarModal").style.display="none";
}



  livraria()

