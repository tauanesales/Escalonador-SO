# Escalonador-SO

## Table of Contents

- [About](#about)
- [Versions](#versions)
- [Authors](#authors)
- [Languages](#languages)

## About 

Atividade relacionada sobre a matéria de Sistemas Operacionais.

## Versions

### v1.0.0

Static HTML/CSS website.


## Authors 

 Tauane Sales,
 Gustavo Jorge,
 Enzo Magalhães,
 Danilo Santiago e
 Cláudio de Farias.
 
 ## Languages
 
 TypeScript

# Trabalho de Escalonamento

Considere um sistemas operacional que implementa escalonamento de processos. O
funcionamento esperado é que esse ambiente tenha N processos que podem chegar em
tempos distintos para execução. Para cada processo, deve ser informado manualmente:

- Tempo de chegada
- Tempo de execução
- Deadline
- Prioridade
- Quantum do sistema
- Sobrecarga do sistema

Esse sistema deve implementar os algoritmos de escalonamento:

- FIFO
- SJF
- Round Robin
- EDF

Esse sistema deve implementar os algoritmos de substituição de páginas:

- FIFO
- Menos Recentemente Utilizado

## Requisitos:

- Cada processo deve ter até 10 páginas (entrada do usuário). Cada página tem 4K de tamanho. A RAM tem 200 K de memória.

- Crie a abstração de DISCO para utilização da memória virtual. Caso ocorra falta de página, utilize N u.t.
  para o uso do Disco (O grupo está livre para a criação de qualquer abstração extra que se mostrar necessária.).

- Os processos só executam se todas as suas páginas estiverem na RAM.

- Deve-se criar o gráfico de Gantt para mostrar as execuções dos processos, visualização da CPU e da RAM

- Deve-se criar o gráfico de uso da RAM e do Disco, mostrando as página presentes em tempo-real.

- A resposta deve ser dada em função do turnaround médio (tempo de espera + tempo de execução)

- Colocar delay para verificar a execução

- A linguagem de programação é de escolha do grupo.
