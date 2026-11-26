# Nomad Enterprise landing page

Independent hiring assignment for a proposed enterprise transportation platform. The page introduces fraud review, cross-carrier visibility, and connected fuel and factoring data to fleet finance, operations, and risk leaders. The assignment targets a **20% relative lift in confirmed demo requests**.

## Run locally

From this directory, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [the local preview](http://127.0.0.1:8765/). There is no build or install step.

## Project structure

- `index.html` · Semantic sections, forms, SVG symbols and dashboard chart.
- `css/styles.css` · Design tokens, component layouts, breakpoints and focus styles.
- `js/main.js` · Mobile navigation, form simulation and local analytics events.
- `favicon.svg` · Original concept mark, also used in the masthead and footer.

## Update the existing Netlify project

Open your existing project in Netlify and go to **Deploys**. Drag the `nomad-enterprise-landing` folder, with `index.html` at its root, into that project's deploy dropzone. Then check the current public URL for the trust section update and verify the mobile menu, demo form, and favicon. [Current public URL](https://jocular-tanuki-a29322.netlify.app/) · [Netlify deployment documentation](https://docs.netlify.com/deploy/create-deploys/)

The page intentionally includes `noindex, nofollow` because it is an independent assignment. This lowers the Lighthouse SEO score.

## Design and accessibility

The warm neutral canvas and copper accents distinguish the marketing page from the navy dashboard. The dashboard tells a single story through sample fuel costs, funded invoices, and flagged activity. The capability grid makes the three workflows scannable, and the outcomes section gives each decision-maker a reason to continue. The site uses system fonts, native HTML elements, and inline SVG without loading third-party resources.

The site includes a skip link, visible keyboard focus, a responsive disclosure menu, semantic table headers, a text description of the chart, native form labels and autocomplete, field-level error associations, and focus transfer to the first invalid field or success message. Anchor scrolling respects reduced-motion preferences. The navigation remains available with JavaScript disabled. The form requires JavaScript.

Nomad’s public site pairs navy and golden orange with Mundial and Poppins, and positions Nomad Fuel and Nomad Pay around spend control and invoice funding. This concept uses a custom mark, system fonts, and a deeper copper accent for contrast. The trust section attributes the 1,000+ accepted locations figure to the existing Nomad Fuel product. The dashboard is an original mockup with fictional sample data. Cross-carrier visibility is part of the assignment scope. [Nomad official site](https://www.nomad.io/) · [Nomad Pay announcement](https://www.nomad.io/press/nomad-pay-launch)

## Form and analytics

Only name, work email, and company are required. The form checks for empty or whitespace-only values and uses the browser’s email syntax check. Valid submission clears the fields and shows a simulation message. No details are transmitted or persisted by the site.

The script dispatches a local `nomad:analytics` custom event on `document`. The event detail always contains the event name and placement. It never contains form inputs or identifiers.

| Event | When it fires | Extra detail |
| --- | --- | --- |
| `demo_cta_click` | Header, hero, or benefits link activation | `placement` identifies the link |
| `demo_form_start` | First field focus or submit attempt, once per page load | `placement: "demo"` |
| `demo_form_error` | Invalid submit attempt | Invalid field count |
| `demo_form_submit` | Validation succeeds in the simulated form | `simulated: true` |

In production, a consent-aware adapter can forward approved event fields to GTM’s data layer, GA4 or the existing analytics platform. Replace the simulation with a lead-system integration and emit a deduplicated conversion only after the backend confirms a demo request. CTA clicks and simulated success are diagnostic signals.

## Verification

- I inspected the live Netlify baseline in Chrome at 320, 1024, and 1440 px. Chrome and Playwright then exercised the updated page at 320, 375, 390, 768, 1024, 1440, and 1920 px. Checks covered overflow, masthead and dashboard alignment, internal links and CTAs, smooth scrolling and reduced motion, the skip link, keyboard menu operation, empty and malformed form input, keyboard submission, feedback focus, analytics sequence, console errors, and asset responses. The test flow produced no form network requests or browser storage entries.
- I reviewed desktop and mobile screenshots and verified navigation and form messaging with JavaScript disabled. Axe reported no violations in the default, open-menu, validation error, and success states sampled at 320 and 1440 px. I checked contrast manually where the patterned background prevented an automated result. Screen-reader and cross-browser testing are outstanding.
- Local Lighthouse 12.8 scored 100 desktop and 92 mobile for performance, 100 for accessibility and best practices on both profiles, and 63 for SEO on both. An earlier mobile run during browser QA scored 72 for performance. The isolated mobile rerun measured 1.3 s LCP and zero layout shift. The intentional crawlability exclusion was the only scored SEO failure. These are lab measurements against a loopback server.

The updated folder is ready for manual upload to the existing Netlify project. The form and dashboard are demonstrations. The 20% conversion lift remains a target.
