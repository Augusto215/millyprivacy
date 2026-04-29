# Sistema de Live com Stories

## Recursos Implementados

### 1. **Borda Animada em Movement** (Stories Style)
- Borda colorida (gradiente laranja) em movimento contínuo
- Animação "liveGradient" de 3 segundos
- Indicador visual que há conteúdo ao vivo

### 2. **Badge "AO VIVO"**
- Badge vermelho com pulsação no canto superior direito da foto
- Indica que há um live acontecendo
- Clicável para assistir

### 3. **Página de Live Completa**
- Acesso em `/live`
- Vídeo de fundo com blur aplicado
- Overlay semi-transparente para melhor legibilidade

### 4. **Sistema de Comentários em Tempo Real**
- Comentários com foto de perfil do usuário
- Timestamp automático
- Campo de entrada para novas mensagens
- Scroll automático para novos comentários

### 5. **Controles de Interação**
- Botão de heart (coração) com animação de pulsação
- Contador de visualizadores
- Botão para fechar o live

## Como Usar

### Na Página Principal (`app/page.tsx`)
O `ProfileCard` já está configurado para abrir o live ao clicar:

```tsx
<ProfileCard />
```

Clique na foto de perfil ou no badge "AO VIVO" para abrir o live.

### Em Páginas de Conteúdo do Creator (`app/content/[creator]/page.tsx`)
Um botão "Assistir AO VIVO" foi adicionado automaticamente na barra superior.

### Componentes Disponíveis

#### `ProfileCard` (Principal)
```tsx
<ProfileCard 
  name="Emilly Faria"
  profileImg="/img/profile-img.png"
  onLiveClick={() => router.push("/live")}
/>
```

#### `ProfileWithLive` (Versão Compacta)
```tsx
import ProfileWithLive from "@/components/ProfileWithLive";

<ProfileWithLive
  name="Emilly Faria"
  profileImg="/img/profile-img.png"
/>
```

#### `LiveViewer` (Modal Completo)
```tsx
import LiveViewer from "@/components/LiveViewer";

<LiveViewer 
  onClose={() => setIsLiveOpen(false)}
  creatorName="Emilly Faria"
  creatorImg="/img/profile-img.png"
  videoUrl="https://slixymwrmifwomrjqsbk.supabase.co/storage/v1/object/public/content/emilly/1776196053094.MP4"
  viewerCount={846}
/>
```

## Personalização

### Alterar Cores da Borda
No componente `ProfileCard.tsx` ou `ProfileWithLive.tsx`, modifique a animação:

```css
@keyframes liveGradient {
  0% { 
    background: linear-gradient(45deg, #SEU_COR, #OUTRA_COR, #SEU_COR);
  }
}
```

### Alterar URL do Vídeo
No componente `LiveViewer.tsx`:

```tsx
<video
  autoPlay
  muted
  loop
  src="https://seu-video-aqui.mp4"
/>
```

### Adicionar Integração com Backend
Para comentários reais, modifique a função `handleSendComment()` em `LiveViewer.tsx`:

```tsx
const handleSendComment = async () => {
  if (newComment.trim()) {
    // Envie para seu backend
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        text: newComment,
        creator: creatorSlug,
      }),
    });
    
    setNewComment("");
  }
};
```

## Estrutura de Arquivos Criados

```
components/
  ├── LiveViewer.tsx          # Modal com live, vídeo e comentários
  └── ProfileWithLive.tsx     # Componente compacto com live button

app/
  └── live/
      └── page.tsx            # Página standalone do live
```

## Customizações Futuras

- [ ] Integração com Supabase para comentários em BD
- [ ] Sistema de reações em tempo real
- [ ] Contador de viewers sincronizado
- [ ] Histórico de lives
- [ ] Notificações de novo live
- [ ] Compartilhamento do live

