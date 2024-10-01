# Cash Flow GFT

Olá! Meu nome é Érico e este é um desafio que desenvolvi para uma vaga de Front-end na GFT.

## Comandos

- **Para rodar o projeto:** `npm start`
- **Para rodar os testes unitários:** `npm run test`

## Detalhes do Projeto

O objetivo deste projeto foi criar todos os componentes sem utilizar bibliotecas de CSS, como Angular Material, para demonstrar meu domínio na construção de layouts com HTML e CSS puro. Para isso, utilizei a API de moedas para calcular a cotação de cada item adicionado à tabela (documentação disponível em [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas)), implementando toda a lógica com TypeScript e realizando as requisições nos serviços correspondentes.

### Estrutura do Projeto

- **Componentização:** Organizei as responsabilidades de forma clara, separando interfaces, enums, serviços e componentes.
- **Testes Unitários:** Utilize o Karma, padrão do Angular, mas também tenho experiência com Jest.
- **Nomenclatura do CSS:** Adotei a metodologia BEM (Bloco, Elemento e Modificador) para garantir uma leitura clara e concisa dos elementos, facilitando a manutenção do código.

### Funcionalidades do Projeto

- **Adicionar Fluxo de Caixa:** Registro de data, descrição, valor e tipo da transação.
- **Editar Itens:** Modificação dos itens já adicionados.
- **Excluir Itens:** Remoção individual ou em lote dos itens da tabela.
- **Atualizar Cotação:** Alteração das cotações dos itens de acordo com a moeda selecionada.
- **Filtrar Tabela:** Filtros baseados no mês e ano selecionados.
- **Paginação:** Controle da quantidade de itens por página.
- **Responsividade:** Design adaptável a diversos dispositivos (desktop, tablet e mobile), utilizando boas práticas de Flexbox e media queries.

### Itens em Backlog

Estes itens estavam no backlog de desenvolvimento, mas não foram implementados devido ao prazo:

- **Ordenação de Colunas:** Ordenação ao clicar no cabeçalho da tabela, utilizando o método `sort` do JavaScript.
- **Seleção Dinâmica de Itens por Página:** Atualização em tempo real da quantidade de itens exibidos por página.

Espero que você aprecie o meu trabalho!
