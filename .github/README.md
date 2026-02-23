# Jéssica Vieira — Site Oficial
### `#DoZeroAoShape`

> Site pessoal estilo Linktree com design premium, paleta azul escuro + violeta, animações profissionais e galeria de fotografias fitness.

---

## Visão Geral

Site de página única (single-page) desenvolvido em HTML/CSS/JS puro — sem frameworks, sem dependências externas. Funciona diretamente no browser, é leve e fácil de personalizar.

**Secções incluídas:**
- Hero com fotografia de fundo e nome em destaque
- Bio e hashtag `#DoZeroAoShape`
- Stats animados (Anos Gym, Comunidade, Dedicação)
- Links para redes sociais com logos SVG oficiais
- Galeria de fotografias fitness
- CTA para a comunidade Discord

---

## Animações

| Animação | Descrição |
|----------|-----------|
| Loading screen | Barra de progresso ao carregar |
| Hero zoom | A fotografia do hero faz slow zoom na entrada |
| Shimmer sweep | Reflexo de luz que percorre o hero em loop |
| Partículas | Canvas com partículas flutuantes e linhas de conexão |
| Grelha deslizante | Grid de fundo com movimento contínuo |
| Scroll reveal | Cada secção entra ao fazer scroll |
| Stagger cards | Links e fotos entram em sequência escalonada |
| Counter animado | Stats contam de 0 até ao valor final |
| Tilt 3D | Cards inclinam ao mover o rato |
| Magnetic CTA | Botão segue o cursor |
| Pulse ring | Anel pulsante no botão principal |

---

## Personalizar Conteúdo

### Nome e título
```html
<div class="hero-eyebrow">Estudante de Desporto · Portugal</div>
<div class="hero-name">Jéssica Vieira</div>
```

### Bio
```html
<p class="bio">
  Ajudo a <strong>construir físico e império fitness</strong> do zero.<br/>
  ...
</p>
```

### Stats
```html
<div class="stat-num" data-target="5" data-suffix="+">0</div>
```
Altera `data-target` para o número e `data-suffix` para o sufixo (ex: `k+`, `%`, `+`).

---

## Paleta de Cores

| Variável | Cor | Uso |
|----------|-----|-----|
| `--navy` | `#080b18` | Fundo principal |
| `--deep` | `#0e1228` | Fundo secundário |
| `--violet` | `#5c2d9e` | Violeta base |
| `--violet-mid` | `#7b45c1` | Violeta médio |
| `--violet-lt` | `#a070e0` | Violeta claro |
| `--glow` | `#c49eff` | Brilho / destaque |
| `--lavender` | `#e8d8ff` | Texto em destaque |

Para alterar a paleta, edita as variáveis no bloco `:root { }` no início do `<style>`.

---

## Fontes

- **Cormorant Garamond** — títulos e números (Google Fonts)
- **Outfit** — corpo de texto, labels, botões (Google Fonts)

Carregadas via CDN no `<head>`. Para uso offline, faz download em [fonts.google.com](https://fonts.google.com).

---

## Estrutura do Ficheiro

```
index.html
│
├── <head>
│   ├── Meta tags + viewport
│   ├── Google Fonts
│   └── <style> — todo o CSS + variáveis + animações
│
├── <body>
│   ├── #loader         — ecrã de carregamento
│   ├── #particles      — canvas das partículas
│   ├── .bg / .bg-grid  — fundo animado
│   └── .wrap           — conteúdo principal
│       ├── .hero
│       ├── .bio + .hashtag
│       ├── .stats
│       ├── .links (5 cards)
│       ├── .photo-grid (5 células)
│       └── .cta-block
│
└── <script>
    ├── Loader (hide após 1.6s)
    ├── Particles (canvas 2D)
    ├── Scroll Reveal (IntersectionObserver)
    ├── Counter Animation
    ├── Magnetic CTA
    └── Tilt 3D nos cards
```

---

## Deploy

O site é um único ficheiro `.html` — sem build, sem dependências locais.

**Hospedado por:**
- [GitHub Pages](https://pages.github.com) — faz push para um repositório público

---

## Desenvolvido por

Site criado para **Jéssica Vieira** — Estudante de Desporto, Fitness Coach e fundadora da comunidade **#DoZeroAoShape**.

---

*Copyright © Makyneta Unipessoal, Lda · Todos os direitos reservados*