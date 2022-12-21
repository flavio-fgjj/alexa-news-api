# alexa-news-api
API -> Web scraping para consumir notícias de portais como UOL, G1 e CNN.

## API hgbrasil

Para consumir essas APIs é necessário fazer um cadastrado no [site](https://hgbrasil.com/)

Para algumas requisições será necessário enviar uma key, para obter acesso completo.
### Clima
    https://hgbrasil.com/status/weather

### Mercado financeiro
    https://api.hgbrasil.com/finance

### Cripto
    https://api.hgbrasil.com/finance?fields=bitcoin

### Sugestão de intenções
```
    Fiap news
    ├── Quer ouvir sobre noticias em geral, diga o portal que voce gosta sem, cnn, g1 ou uol
    │    └── segue com o modelo que o Flavio fez
    ├── Quer saber o mercado financeiro, diga mercado financeiro
    │    └── file2
    ├── Quer saber o mercado cripto moedas, diga cripto
    │    └── file2
    └── Ou se preferir posso falar a previsão do tempo
         └── file2
```