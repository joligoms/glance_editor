# Glance Editor

![Glance Editor Logo](/docs/img/glance_editor_logo_banner.png)

*Read it in [English](README.md) 🇬🇧*

Glance Editor é um software livre e de código aberto projetado para utilizadores de rastreamento ocular. As pessoas que possui apenas a condição de utilizar um rato para controlar seu sistema operativo poderão ter as funcionalidades mais importantes para editar textos apenas com o simples clique nos botões de ação disponíveis pelo programa, sem ter a necessidade de utilizar os comandos no teclado virtual.

![Modo Escuro](/docs/img/dark_mode.png)

## Botões de ação

Os botões de ação mostrados abaixo representam respetivamente:

1. Desfazer
2. Refazer
3. Copiar
4. Cortar
5. Colar
6. Selecionar uma palavra
7. Selecionar tudo
8. Selecionar uma linha inteira
9. Ajuda

![Demostração dos botões de ação](/docs/img/img_action_buttons.png)

Se clicar no botão de ajuda, e em seguida clicar em outro botão do programa, aparecerá uma descrição do botão clicado.

![Demostração do botão de ajuda](/docs/img/help_button_demostration.gif)


## Rolagem de texto

Para rolar para cima e para baixo, pode ser utilizada a barra de rolagem da forma tradicional.

No entanto, existe um **campo de rolagem** onde, quando é passado o rato por cima deste campo, é efetuada a rolagem para cima ou para baixo sem necessitar de fazer um gesto de rolagem com o rato, como mostrado abaixo.

![Demostração de rolagem](/docs/img/scroll_demonstration.gif)

## Temas

O Glance Editor possui dois temas: o Modo Escuro e o Modo Claro.
É possível alterar os temas a partir do botão de configuração que se encontra no canto superior direito.

![Modo Escuro](/docs/img/dark_mode.png)
![Modo Claro](/docs/img/light_mode.png)

## Estado atual do projeto

O que é preciso ser feito ainda? Efetivamente, muitas coisas...
Mesmo que possa-se utilizar o Glance Editor neste momento, existem ainda alguns problemas que devo considerar a serem resolvidos para que este programa torne-se mais útil. Uma vez que ainda sou bastante novo na área de desenvolvimento Web, eu ainda estou - e planeio - em trabalhar nestes problemas para que as pessoas que o necessitam possam usufruí-lo.

- [ ] Repensar na estrutura do código e escrever *clean code* (e provavelmente utilizar uma framework em javascript, como o VueJS). **Muito importante.**
- [ ] Implementar um painel de explorador de ficheiros
- [ ] Implementar abas
- [ ] Implementar excertos de código e excertos customizáveis, também como outras utilizades.
- [ ] Utilizar as novas filosofias de segurança do Electron (mesmo que o Glance Editor não utilize nenhuma fonte externa para funcionar, portanto provavelmente não é algo muito importante...)
- [ ] Implementar uma melhor integração de temas e fontes (e também melhorar a a parência dos temas incluídos)
- [ ] Criar uma janela de boas-vindas, onde o utilizador possa fazer algumas configurações logo na primeira utilização do programa.
- [ ] Criar um sistema de configurações melhor e com mais funcionalidades
