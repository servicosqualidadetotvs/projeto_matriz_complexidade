# Guia de Implementação Web: Matriz de Complexidade MIT e Service Flow

Este documento descreve detalhadamente as regras de negócio, entradas, processamento e saídas do serviço de "Matriz de Complexidade MIT e Service Flow". O objetivo é servir como especificação técnica para que um desenvolvedor ou agente reproduza as mesmas funcionalidades em uma aplicação web moderna.

---

## 1. Visão Geral do Sistema
O sistema funciona como um motor de regras que, com base nas características de um projeto ou serviço vendido (entradas), filtra e retorna uma lista de **Artefatos/Templates obrigatórios ou recomendados** que devem ser gerados durante o ciclo de vida do serviço.

---

## 2. Interface de Entrada (Inputs)
A interface web deve conter um formulário para coletar os dados do projeto. Com base no script original, temos os seguintes campos:

### 2.1. Campos Principais
* **Tipo de Serviço** `(tipoServico)`: Menu suspenso (Dropdown/Select).
  * *Opções:* "Implantação Tradicional", "Rollout", "Upgrade de Release", "Customização", "Serviços Recorrente".
* **Possui Gestão?** `(possuiGestao)`: Checkbox ou Radio Button (Sim / Não).
* **Quantidade de Horas** `(horas)`: Menu suspenso (Dropdown/Select). *Geralmente habilitado/visível apenas se o Tipo de Serviço for "Implantação Tradicional".*
  * *Opções:* "Mais de 1000", "De 200 a 1000", "Menos de 200".

### 2.2. Modificadores (Flags de Complexidade)
* **Possui Integração?** `(possuiIntegracao)`: Checkbox (Sim / Não).
* **Possui Sistema Legado?** `(possuiLegado)`: Checkbox (Sim / Não).
* **Possui Customização?** `(possuiCustomizacao)`: Checkbox (Sim / Não).

---

## 3. Banco de Dados (Estrutura de Templates)
O sistema deve ter acesso a uma base de dados (que pode ser um array de objetos JSON, um banco de dados real ou a própria leitura de uma API/Planilha) contendo todos os templates possíveis.

Cada template (linha do banco de dados) possui as seguintes propriedades de exibição:
* **Fase:** A fase do projeto (Ex: Preparação, Realização, Monitoramento e controle).
* **Código:** Código único do documento (Ex: MIT021, MIT032, MSF001).
* **Nome do Template:** Título do documento.
* **Forma de Aceite:** Como o documento é aprovado (Ex: Assinatura, Envio por e-mail).
* **Obrigatório?:** Flag visual indicando a obrigatoriedade (Sim, Não).
* **Observação:** Detalhes adicionais ou "Melhor Prática".

Além das propriedades de exibição, cada template possui **Flags de Mapeamento** (indicando com um "X" se ele pertence a uma determinada categoria).

---

## 4. Lógica de Negócio (Processamento)

A lógica central consiste em varrer o banco de dados de templates e selecionar quais devem aparecer para o usuário, com base nas respostas do formulário.

### Passo 4.1: Determinar o "Perfil" (Coluna de Filtro)
A primeira etapa é mapear a combinação dos inputs em um "Perfil" específico. Na lógica do AppScript, isso é feito mapeando para o índice de uma coluna:

1. **Se `Tipo de Serviço` == "Implantação Tradicional":**
   * Se `horas` == "Mais de 1000" → **Perfil A** (Implantação Tradicional >= 1000h)
   * Se `horas` == "De 200 a 1000" → **Perfil B** (Implantação Tradicional >= 200h)
   * Se `horas` == "Menos de 200" → **Perfil C** (Implantação Reduzida < 200h)
2. **Se `Tipo de Serviço` == "Rollout"** → **Perfil D** (Rollout)
3. **Se `Tipo de Serviço` == "Upgrade de Release"** → **Perfil E** (Upgrade de Release)
4. **Se `Tipo de Serviço` == "Customização"** → **Perfil F** (Customização)
5. **Se `Tipo de Serviço` == "Serviços Recorrente":**
   * Se `possuiGestao` == Sim → **Perfil G** (Serv. Recorrentes com gestão)
   * Se `possuiGestao` == Não → **Perfil H** (Serv. recorrentes sem gestão)

*Atenção de Erro:* Se o sistema não conseguir mapear para nenhum perfil, deve disparar um alerta ("Não foi possível identificar o tipo de serviço.").

### Passo 4.2: Filtro Principal (Regra Padrão)
Para cada template no banco de dados, verifique se ele possui a marcação ("X") correspondente ao **Perfil** identificado no Passo 4.1. Se tiver, ele **deve ser incluído** na lista de resultados.

### Passo 4.3: Regras Especiais (Inclusões Extras)
Existem templates que são adicionados independentemente da regra padrão, baseados nos sinalizadores (modificadores) de complexidade. 
**Importante:** Estas regras especiais **NÃO SE APLICAM** caso o Tipo de Serviço seja `"Serviços Recorrente"`.

* **Regra Extra 1 (Integração):** Se `possuiIntegracao` for verdadeiro, inclua o template correspondente à "Integração" (No script original mapeado como a linha 17 da aba de templates, que cruza com a informação de Código **MIT055** - Roteiro de Interface).
* **Regra Extra 2 (Legado):** Se `possuiLegado` for verdadeiro, inclua o template correspondente a "Sistema Legado" (No script original, linha 16, código **MIT053** - Plano de Migração de Dados).
* **Regra Extra 3 (Customização):** Se `possuiCustomizacao` for verdadeiro, inclua o template correspondente a "Customização" (No script original, linha 9, código **MIT044** - Especificação Técnica/Funcional).

*(Nota para o desenvolvedor: Na aplicação web, em vez de depender de "números de linha fixa" como 9, 16 ou 17, mapeie essas regras por `código` do template. Ex: `if(possuiIntegracao) incluir_template('MIT055')`)*

---

## 5. Interface de Saída (Output)
A saída do sistema é uma Tabela HTML (ou DataGrid) que exibe apenas os templates que passaram pelos filtros das regras do Passo 4.

**Estrutura da Tabela:**
| Fase | Código | Nome do Template | Forma de Aceite | Obrigatório? | Observação |
| :--- | :--- | :--- | :--- | :--- | :--- |
| (Ex: Preparação) | (Ex: MIT032) | (Ex: Cronograma) | (Ex: Elaborado) | (Ex: Sim) | (Ex: Melhor Prática) |

**Comportamentos de UI esperados:**
1. A tabela de resultados deve ser reativa (limpar a lista antiga e renderizar a nova sempre que o usuário clicar no botão "Gerar Matriz" ou alterar os filtros, caso decida por uma abordagem live-reload).
2. Se nenhum documento passar nas regras (o array de resultados for vazio), a interface deve exibir uma mensagem amigável: *"Nenhum documento aplicável."*

---

## 6. Arquitetura Sugerida para o Frontend
* **Estado (State):** Utilize um framework reativo (React, Vue, Angular) ou Vanilla JS armazenando o estado do formulário (`tipoServico`, `horas`, `flags`).
* **Dados Estáticos (JSON):** Exporte a aba "Templates padrão MIT e Service Flow" como um arquivo JSON contendo a matriz de cruzamento para ser lida facilmente no frontend sem precisar de backend (Client-side rendering).
* **Botão de Ação:** O cálculo só deve ser feito após a submissão para evitar reflows constantes e replicar o comportamento atual do script do Google Sheets, ou pode ser "Real-time" dependendo dos requisitos de UX do novo sistema.
