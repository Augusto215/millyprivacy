<!-- GUIA VISUAL DO SISTEMA DE LIVE -->

# 🎥 Guia Visual - Sistema de Live com Stories

## Interface Visual

### 1. Homepage com Live Stories
```
┌─────────────────────────────────┐
│         MILLYPRIVACY HEADER      │
├─────────────────────────────────┤
│                                 │
│  ┌──────────────────────────┐   │
│  │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │   │
│  │   ▓                    ▓   │   │ ← Borda animada (gradiente)
│  │   ▓   [FOTO PERFIL]  ▓   │   │   
│  │   ▓                    ▓   │   │
│  │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │   │
│  │         🔴 AO VIVO    │   │   ← Badge com pulsação
│  │                          │   │
│  │  Emilly Faria           │   │
│  │  @millyfaria4           │   │
│  │                          │   │
│  │  📷 159  ▶️ 626 ✓ 53 ❤️ 364K │
│  │                          │   │
│  │  "Só fica quem tem..."   │   │
│  └──────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

### 2. Página de Live
```
┌─────────────────────────────────────────┐
│  [VÍDEO DE FUNDO COM BLUR]              │
│  ████████████████████████████████       │
│  ████    OVERLAY SEMI-TRANSPARENTE ████ │
│  ████████████████████████████████       │
├─────────────────────────────────────────┤
│                                         │
│  [FOTO] Emilly Faria        🔴 AO VIVO  │
│  @millyfaria4               🔌 846       │
│                                         │
│  ┌─────────────────────────────────────┤
│  │                                     │
│  │  📍 joao_p                          │
│  │  ┌──────────────────────────────┐  │
│  │  │ Valeu demais o acesso 👀    │  │
│  │  └──────────────────────────────┘  │
│  │                                     │
│  │  📍 maria_silva                     │
│  │  ┌──────────────────────────────┐  │
│  │  │ Que onda hein! 😍           │  │
│  │  └──────────────────────────────┘  │
│  │                                     │
│  │  📍 carlos.dev                      │
│  │  ┌──────────────────────────────┐  │
│  │  │ Que legal mesmo             │  │
│  │  └──────────────────────────────┘  │
│  │                                     │
│  └─────────────────────────────────────┤
│                                         │
│  ❤️  💬   [─────────────────] ➤         │
│                                         │
└─────────────────────────────────────────┘
```

### 3. Página de Conteúdo do Creator
```
┌──────────────────────────────────────┐
│         MILLYPRIVACY HEADER          │
├──────────────────────────────────────┤
│ [FOTO] ÁREA VIP               │      │
│        Emilly Faria    🔴 [ASSISTIR]   │
│ @millyfaria4           [CHAMADA]  [SAI] │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │   [IMAGEM OU VÍDEO EXCLUSIVE]  │ │
│  │                                │ │
│  │  Título do Conteúdo       ❤️  │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │   [IMAGEM OU VÍDEO EXCLUSIVE]  │ │
│  │                                │ │
│  │  Outro Título            ❤️ 2  │ │
│  └────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

---

## 🎬 Fluxo de Interação

```
USUÁRIO ACESSA HOMEPAGE
        ↓
    VÊ O PROFILECARD
    COM:
    - Borda animada (stories)
    - Badge "AO VIVO" pulsando
        ↓
   CLICA NA FOTO OU BADGE
        ↓
  REDIRECIONADO PARA /live
        ↓
    ASSISTE AO VÍDEO
    COM BLUR DE FUNDO
        ↓
    VÊ COMENTÁRIOS
    EM TEMPO REAL
        ↓
   ENVIA MENSAGENS
        ↓
    REAGE COM HEART
    (animação de pulsação)
        ↓
   FECHA O LIVE
   (volta à página anterior)
```

---

## 🎨 Especificações de Cores

### Paleta de Cores
| Elemento | Cor | Código |
|----------|-----|--------|
| Borda Animada (Start) | Laranja | `#ff6b35` |
| Borda Animada (Mid) | Laranja Claro | `#ff8c42` |
| Borda Animada (End) | Amarelo | `#ffa500` |
| Badge Background | Vermelho | `rgb(239, 68, 68)` |
| Badge Pulse | Branco | `#ffffff` |
| Overlay Vídeo | Preto Semi | `rgba(0, 0, 0, 0.4)` |
| Input Background | Branco Semi | `rgba(255, 255, 255, 0.2)` |
| Hover Button | Vermelho Escuro | `rgb(220, 38, 38)` |

---

## ⚡ Animações CSS

### Borda em Movimento
```css
@keyframes liveGradient {
  0%   { background: linear-gradient(45deg, #ff6b35, #ff8c42, #ff6b35); }
  50%  { background: linear-gradient(45deg, #ff8c42, #ffa500, #ff8c42); }
  100% { background: linear-gradient(45deg, #ff6b35, #ff8c42, #ff6b35); }
}
animation: liveGradient 3s ease infinite;
```

### Pulsação do Indicador
```css
animate-pulse (Tailwind built-in)
<!-- Faz o ponto branco piscar -->
```

### Heart Animation
```css
@keyframes pulse-heart {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50%      { transform: scale(1.2); opacity: 1; }
}
animation: pulse-heart 2s ease-in-out infinite;
```

---

## 📱 Responsividade

### Mobile (< 480px)
- Profile card full width
- Live modal full screen
- Botões ajustados para toque
- Vídeo responsivo com aspect-ratio

### Tablet (480px - 768px)
- Layout mantido
- Espaçamentos aumentados
- Interações otimizadas

### Desktop (> 768px)
- Max-width aplicado
- Mais espaço para conteúdo
- Hover effects expandidos

---

## 🔐 Componentes Reutilizáveis

### ProfileCard
Componente principal com borda animada
```tsx
<ProfileCard />
```

### ProfileWithLive
Versão compacta para outras páginas
```tsx
<ProfileWithLive 
  name="Nome"
  profileImg="/img.png"
/>
```

### LiveViewer
Modal independente de live
```tsx
<LiveViewer 
  creatorName="Nome"
  onClose={() => setOpen(false)}
/>
```

---

## 🧪 Testes Visuais

- [ ] Borda anima ao carregar a página
- [ ] Badge pisca constantemente
- [ ] Clique na foto abre o live
- [ ] Clique no badge abre o live
- [ ] Vídeo carrega com blur
- [ ] Comentários aparecem
- [ ] Pode enviar mensagens
- [ ] Heart anima ao clicar
- [ ] Botão X fecha o live
- [ ] Scroll de comentários funciona

---

**Última atualização**: 29 de abril de 2026
