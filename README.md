# Currículo Fácil

O Currículo Fácil é um SaaS gratuito e sem cadastro para qualquer pessoa montar um currículo profissional, personalizar o visual e baixar o resultado em PDF.

## Acesse o site

**[Abrir o Currículo Fácil online](https://htmlpreview.github.io/?https://github.com/marcos-scox/curriculo-facil/blob/main/index.html)**

O projeto também está disponível no [repositório do GitHub](https://github.com/marcos-scox/curriculo-facil).

## O que o usuário pode fazer

- Escolher entre 10 modelos profissionais ou começar do zero.
- Editar dados pessoais, resumo, experiências, formação, habilidades e idiomas.
- Personalizar cores, foto e opções de layout.
- Continuar a edição no mesmo navegador, com salvamento local.
- Imprimir ou exportar o currículo em PDF.

## Privacidade

O projeto é client-side: os dados são processados no navegador e o rascunho é salvo apenas no `localStorage` do dispositivo. Não há cadastro ou servidor de dados pessoais.

## Publicação

Este site é estático e pode ser publicado pelo GitHub Pages usando o workflow em `.github/workflows/deploy-pages.yml`. O link acima funciona como uma visualização online do HTML publicado no repositório.

## Organização do projeto

```text
index.html                    Estrutura da aplicação
css/styles.css                Estilos e responsividade
js/app.js                     Editor, modelos, preview e exportação
assets/                       Espaço para imagens e recursos futuros
vendor/                       Bibliotecas locais de captura e geração de PDF
.github/workflows/            Automação de publicação
```
