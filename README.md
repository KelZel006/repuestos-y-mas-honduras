# Repuestos y Más Honduras — Landing Page

Landing page moderna con chat de agente de ventas integrado.

## Características

- Diseño oscuro profesional y responsive
- Chat flotante de agente de ventas (reglas inteligentes para cotizaciones de repuestos)
- Secciones: Hero, estadísticas, categorías, CTA y footer
- Listo para Vercel (estático)

## Desplegar en Vercel

### Opción 1: Dashboard (más fácil)
1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. New Project → Import → Upload the folder `repuestos-landing`
3. Deploy

### Opción 2: CLI
```bash
cd repuestos-landing
npx vercel
# sigue las instrucciones (login, project name, etc.)
npx vercel --prod
```

## Personalizar

- Datos de contacto (WhatsApp, email, direcciones) en el footer del `index.html`
- Lógica del agente: función `generateReply()` en el `<script>`
- Para conectar con Grok / xAI API real: reemplaza la simulación por una llamada a `https://api.x.ai/v1/chat/completions` con tu API key (mejor desde un backend o serverless function)

## Nota sobre el agente de ventas

El chat actual usa respuestas inteligentes basadas en reglas que imitan el comportamiento de un agente de ventas especializado en repuestos automotrices (este mismo estilo de Grok). Funciona offline y sin costos de API. Para respuestas completamente generativas con Grok, se necesita integrar la API de xAI.
