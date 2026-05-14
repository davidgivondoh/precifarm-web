# Neura Pod — internal technical reference

The Neura Pod is Precifarm's flagship hardware: a single-enclosure battery + inverter + BMS + telemetry unit, modelled on the Tesla Powerwall concept but engineered for Kenyan grid conditions, climate, and price points. Every Precifarm package is built around it.

This document is the canonical internal reference for the team — engineering, sales, support, and content. There is no public marketing page; the Pod is referenced by name inside product specs only.

## Why it exists

Imported solar storage (Tesla Powerwall, sonnenBatterie, etc.) is excellent hardware. It is not, however, engineered for:

- The grid conditions Kenyan customers actually face — frequent outages, voltage swings, brownouts during cloudy weeks
- Tropical and coastal climates — high ambient temperatures, dust ingress, humidity
- Price points that make economic sense for off-grid households and SMEs in Kenya
- Local serviceability — spare parts and BMS firmware need to be supportable from Nairobi, not shipped from Fremont

The Neura Pod is built bottom-up around LiFePO4 chemistry (cell suppliers: Dyness, MUST, or equivalent) with locally-supportable BMS firmware and a single warranty interface — Precifarm.

## What's inside the enclosure

| Assembly | Notes |
|---|---|
| **LiFePO4 battery cells** | Production-tier lithium iron phosphate. 6,000+ cycle life at 80% DoD, 10-year design horizon. No thermal runaway risk vs NMC. |
| **Battery management system (BMS)** | Per-cell voltage and temperature monitoring, balancing, overcurrent / over-temp / undervoltage protection. Exposes data to the telemetry board. |
| **Hybrid inverter** | Pure sine wave output with built-in MPPT solar charger. See sizing table below. |
| **Edge telemetry board (the data layer)** | On-device sensor that reports voltage, current, temperature, and state of charge to the Neura platform every minute. Internally still referred to as the PreciSense board in firmware; externally branded as the data layer per Master Brief v0.9. |
| **Single-enclosure housing** | Wall-mounted, indoor-safe. The 8% integration premium pays for the assembly. |

## The Pod family

| Pod | Capacity | Inverter | Used in | Daily PV | Daily load | Recharge time |
|---|---|---|---|---|---|---|
| **Neura Pod 1** | 1.5 kWh LiFePO4 | 1.5 kW hybrid (built-in MPPT + charger) | Precifarm Starter | 1.86 kWh (1 × 550W panel) | ~0.6 kWh/day | ~1.0 day |
| **Neura Pod 5** | 5 kWh LiFePO4 (Dyness / MUST) | 5 kW hybrid | Precifarm Family | 3.04 kWh (2 × 450W panels, expandable) | ~3 kWh/day | ~1.6 days |
| **Neura Pod 15** | 15 kWh LiFePO4 (3 × 5 kWh stack) | Scalable: 10 kVA (entry) up to 12 kW Deye (full irrigation) | Precifarm Commercial | Up to 44.6 kWh (24 × 550W panels at full config; entry config is 5 panels / 9.3 kWh/day) | Up to ~28 kWh/day | ~0.7 days (full config) |
| **Neura Pod 25** | +10 kWh upgrade (2 × 5 kWh modules added to a Pod 15) | On the Pod 15's 12 kW inverter | Precifarm Commercial — evening processing | Same as Pod 15 | Up to ~45 kWh/day | Sized per customer |

Sizing assumptions: 4.5 peak sun hours per day (worst-case Nairobi/Mwingi rainy season) × 0.75 derate (temperature, wiring, inverter losses, dust). One 550 W panel produces 1.86 kWh per day in worst-case conditions.

## Pricing rationale

Each Pod is built bottom-up at component cost (verified Kenyan market data, refreshed at each pricing review):

| Component | Spec | Cost (KES) |
|---|---|---|
| 550 W mono panel | Jinko / JA Solar / Canadian Solar tier | 22,000 |
| 1.5 kW hybrid inverter | MPPT + battery charger built in | 32,000 |
| 3 kW hybrid inverter | Growatt or similar | 58,000 |
| 12 kW hybrid inverter | Deye, commercial grade | 210,000 |
| 1.5 kWh LiFePO4 module | with BMS | 32,000 |
| 5 kWh LiFePO4 module | Dyness / MUST tier | 98,000 |
| 15 kWh storage | 3 × 5 kWh LiFePO4 stack | 290,000 |

Build-up: `panels + inverter + battery + mounting/BoS + installation = subtotal`. Apply **8% integration premium** (covers single-enclosure assembly, faster install, fewer warranty interfaces). Apply **20% markup** to landed cost to arrive at the customer-facing selling price.

Customer-facing example (Family / Pod 5): the live website price is KSh 290,000 per Master Brief v0.9. The bottom-up cost build-up sits inside that envelope — exact margins are reviewed quarterly against current Kenyan supplier data. Note: the Neura Pod Master Document and Technical White Paper use a higher-spec Family configuration (4 × 550W / 7.43 kWh/day) at KSh 373,000; the live site uses the smaller 2 × 450W (900 W expandable) configuration at KSh 290,000.

## The Neura platform — three layers

The Pod is the hardware. Neura is the software brain.

1. **Data layer (edge telemetry board)** — on-device sensor on every charge controller. Reports voltage, current, temperature, and state of charge every minute over a low-bandwidth uplink. Internally still referred to as PreciSense in firmware repos; externally rebranded to "data layer" per Master Brief v0.9.
2. **Neura AI** — the platform that ingests data-layer telemetry, runs predictive fault detection, and routes alerts to the right field engineer with the right part already in hand.
3. **Customer surfaces** —
   - **Neura AI alerts** (Starter): smart alerts when battery is low or panel under-producing
   - **Neura Smart Energy Manager** (Family): prioritises essential loads when battery is low
   - **Neura Business Dashboard** (Commercial): tariff-aware switching, multi-site visibility, lender-ready reports

Same platform, three customer surfaces. A homeowner upgrading from Starter to Family, or a Family customer growing into Commercial, doesn't change monitoring layers — only the size of the wall-mounted unit.

## Operational notes (for the team)

- **Install time**: Pod 1 is a one-day install with a single technician. Pod 5 is one day with a small crew. Pod 15 is one day for the assembly plus a separate session for the 12 kW inverter and commercial mounting / structural certification.
- **Warranty**: 1-year workmanship warranty on the install (Precifarm). Manufacturer warranties on the battery (10 yr), inverter (5–10 yr depending on brand), and panels (12 yr workmanship / 25 yr performance).
- **Spare parts**: Stocked in Nairobi for all four Pod sizes. Field engineers carry diagnostic-driven spares to faults; the system tells dispatch what failed before the van leaves.
- **BMS firmware**: Updateable over-the-air for Pod 5 and Pod 15. Pod 1 receives firmware on technician visit only (no BLE/Wi-Fi to keep the Starter price point).
- **Indoor placement**: All Pods are indoor-safe. Recommended placement is a cool, shaded utility wall with at least 50 cm clearance for ventilation.

## Open questions / known limits

- Pod 25 is currently a field upgrade of a Pod 15. If demand grows we may pre-assemble a Pod 25 SKU rather than upgrading on-site.
- Pod 1 has no native expansion path. Customers outgrowing it are upgraded to Pod 5 (Family).
- Off-grid hybrid behaviour: Pod 15 with the Deye inverter supports tariff-aware grid switching. Pod 1 and Pod 5 are battery-first by default; grid-tie behaviour is configurable per install.
- BMS firmware is locally maintainable but the cell chemistry is upstream — a supply disruption in LiFePO4 cells (e.g. tariff or shipping shock) is the largest single business risk.

## Where to find more

- Sizing methodology (public): [`/how-we-size`](../src/app/how-we-size/page.tsx)
- Canonical positioning + pricing: **Precifarm Master Brief v0.9** (May 2026) — source of truth for website content
- Engineering reference: **Neura Pod Master Document** + **Technical White Paper** (May 2026) — derate model, loss budget, lifetime cost analysis, field deployment data
- Per-product spec sheets: `/products/{starter,family,business}/spec/`
