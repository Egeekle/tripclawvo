# TripClaw

**Product focus.** TripClaw centers on **guides and local operators listing and selling access to curated destinations** (experiences, slots, itineraries), while **residents and visitors create city check-ins**—verifiable stops that feed the swarm—with enough signal to **unlock new destinations on the map** (progressive discovery instead of dumping every POI at once).

Many people lack **bank access**, a **portable identity trust layer**, collateral, or **confidence in strangers**. TripClaw adds **swarm-style coordination** (agents, workflows, real-time intel) plus **settlement on Stellar** so commerce and unlocking stay fair and attributable.

---

## Product loop (guides + check-ins unlock)

| Quién | Qué hace | Por qué importa |
| ----- | --------- | ---------------- |
| **Guía / operador** | Ofrece y cobra rutas y destinos (reservas, depósitos, splits) sin depender sólo de efectivo o chats sueltos. | Comercio turístico con **traza** y pagos reproducibles en Latam. |
| **Persona en la ciudad** | Registra **check-ins** en puntos válidos (taller, mirador, mercado…) — con reglas anti-spam desde TripClaw. | Aporta **prueba de presencia/contexto** sin ser “dueño del mapa”; alimenta el enjambre. |
| **Sistema** | Agrega check-ins + señales; **desbloquea** nuevos destinos o capas cuando se cumplen umbrales / confianza. | Exploración tipo juego-serio: ciudad viva **y** antifraud scaffolding. |

**Stellar** encaja donde hay **cobra / deposita / reparte fondos al completar checklist o tour**; TripClaw encaja donde hay **órdenes**, **agents** y reglas de desbloqueo.

---

## Personas who cannot act today (and why)

Use these as product and story anchors—not edge cases.

| Persona | What they want | Barriers |
| -------- | ---------------- | -------- |
| **Sofia — gig guide, no formal bank** | Get paid same day after a walking tour | No card acceptance, payout minimums, high FX, delayed settlement |
| **Jamal — refugee ID in limbo** | Book hostel + local transit without “full KYC” everywhere | Fragmented proofs, reused PII risk, merchants reject partial identity |
| **Elena — renter, no property deed** | Access a tourism micro-loan for a scooter | Nothing to pledge; credit invisible; reputations not portable |
| **Ken — skeptic tourist** | Pay a stranger for a boat share | No receipt, chargebacks don’t apply, scams are cheap |
| **Mira — small operator** | Prove she fulfilled 200 trips | Verbal agreements, split payments across apps—no single audit trail |

**Pattern:** exclusion is rarely one missing document—it is missing **finance rails**, **identity that travels safely**, **portable reputation**, **property-like guarantees without owning property**, and **traceability** that strangers will believe.

---

## One concrete PERSON: who they are and what fails

### **Layla**, 34, Lisbon → works seasonally in hospitality

Layla organizes **small-group food walks** for tourists via Instagram and WhatsApp. She is trustworthy in person; online she looks like anyone else.

**She cannot reliably:**

- Receive **Euro** without a merchant account suited to tiny, irregular payouts.
- **Prove** past successful tours across platforms (reviews are scattered; she has no issuer-grade credential).
- **Escrow** a deposit so a newcomer tourist pays without fear—“I’ll Venmo later” collapses cross-border.

**Barrier → blocked action:** a tourist wants to prepay €25 to hold a slot. Layla refuses card links she does not trust; tourist will not wire to a stranger. **Deal dies.**

Layla’s problem is not “no ambition”—it is **no shared settlement + no portable proof + no workflow that lowers counterparty fear**.

---

## How Stellar helps (what changes on-chain / on-network)

Stellar fits **thin-margin, cross-border, need-to-settle-fast** contexts:

- **Low-cost transfers and asset paths** reduce the tax of small tourism payments vs. traditional rails.
- **Issued assets and anchors** map local compliance and liquidity layers without every guide running a legacy merchant stack.
- **Transparent ledger history** supplies a verifiable backbone for receipts, escrow release conditions, or dispute-oriented proofs (paired with careful privacy design off-ledger).

Stellar removes “I literally cannot receive or settle” more than “I need a prettier app.”

---

## How TripClaw helps (what changes in product and orchestration)

TripClaw stacks **agents, workflows, and UI** around the dual loop above:

- **Marketplace-lite for guides**: list destinations, precios/simbolos off-chain; **liquidación en Stellar** cuando el checkout o el escrow están listos para producción/demo.
- **Check-ins ciudadanos**: ingestión normalizada → scoring / moderación swarm → **condiciones para desbloquear** rutas nuevas en el cliente (ej. `/map`).
- **Swarm intel** mezcla señales (muchas personas en un corredor nuevo, anomalies, seguridad percibida) para que tanto guías como jugadores casual vean **por qué** un destino se abrió—no sólo “nuevo ícono en el mapa”.
- **Workflows** encadenan: reserva → pago/atado en libro → ejecución de tour o hitos de check-in → recap y liberación/reembolso.

Together: **Stellar** cobra cuando hay compromiso económico; **TripClaw** gobierna **quién puede vender**, **qué ciudad desbloquea qué**, y **con qué evidencia**.

---

## Dev quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `/dashboard`, `/map`, and `/console` for the TripClaw-style flows.

Configure environment variables in `.env.local` as needed for external services (Maritime/API, Telegram, workflows).

---

## More idea seeds (for pitches or roadmaps)

- **Unlock tiers:** barrios enteros aparecen después de **N** check-ins verificados de distintos usuarios (con ventana temporal) para frenar bots.
- **Guía stakes destination:** primer listado en un nuevo destino requiere escrow mínimo o reputación swarm; otros guías pagan **split** on-ledger tras “unlock” cooperativo del corredor.
- **Tourism DAO-style pools** on Stellar: micro-grants a operadores cuando KPIs attestables—but TripClaw agents monitor spam/fraud patterns.
- **Escrow keyed to milestones:** payout when workflows mark tour done **or** a geo-fenced sequence of civic check-ins is satisfied—with manual override for disputed edge cases off-chain.

---

## Presentation ideas (buildathon Peru / Latam + Stellar)

Use these blocks in a ~3–5 min demo narrative; subtitles can stay in Spanish for judges.

1. **30 s — Problema concreto**  
   Los **guías** necesitan comercializar destinos cobrando con menos fricción; la **ciudad** no quiere mapas inflados ni spam. Quien está en terreno puede **chequear llegadas** para desbloquear **nuevos destinos** — con reglas entendibles, no solo íconos sin respaldo económico o social.

2. **45 s — Por qué Stellar aquí (no sólo hype)**  
   Micropagos y rutas multicurrency (**path payments**) encajan mejor que arrastrar PIX + tarjetas cross-border solo en el front. Recalca: TripClaw = **órbita de decisión**, Stellar = **liquidación**.

3. **60 s — Live o mock en cadena de prueba**  
   Flujo: usuario hace **check-in** guiado por reglas swarm → aparece nuevo pin / ruta disponible por guías → compra/reserva (**depósito** anchor/mock) → **workflow** marca tour o checklist cumplido → **release** on-ledger si aplica demo.

4. **30 s — Diferencial vs “otra app de viajes”**  
   Prueba de orden: mismo evento visto desde **intel de enjambre** + **comprobante on-ledger**. No clones TripAdvisor; muestra confianza operativa + dinero programmable.

5. **Cierre — Honestidad**  
   Qué sí es real hoy en el repo (UI, workflows, integraciones) vs qué es **próximo paso** (anchor real KYC, límites regulatorios Perú, privacidad off-ledger).

**Tips de slide:** un diagrama de dos capas (TripClaw arriba, Stellar abajo); una tabla “sin Stellar / con Stellar” en una columna cada una.

---

Built with [Next.js](https://nextjs.org). Deploy on [Vercel](https://vercel.com/new).
