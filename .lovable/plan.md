# Scroll-to-Grow Opening Experience

Swap the current hero for a full-screen opening where a microgreen grows from seed to harvest as you scroll. Scrolling down makes it grow, and scrolling up makes it shrink back smoothly. Everything after it (products, story, testimonials, contact, footer) stays as it is. The first section after the opening becomes the "Our Microgreens" product grid.

## What the visitor experiences

The opening holds in place while the visitor scrolls through about five screens of story. A single scene in the centre changes as they go, and a short headline fades in for each stage:

```text
Stage         Headline                        What happens on screen
1 Seed        "Everything starts with a seed."  Close-up of soil, one seed, soil grains shift slightly
2 Root        "Small beginnings."               A fine root grows down through the soil
3 Sprout      "Growing with care."              A pale shoot breaks through the soil and gets taller
4 Leaves      "Freshness takes root."           The first two leaves unfold, more sprouts appear beside it
5 Tray        (camera pulls back)               The view zooms out to a full tray of microgreens on a shelf
6 Harvest     "Ready for your plate."           Fresh harvested greens, a "Shop Microgreens" button, and the page continues into the product grid
```

Other details:
- A thin progress line on the side marks the six stages: Seed, Root, Sprout, Leaves, Microgreens, Harvest.
- A small "Scroll to grow" hint shows at the very start.
- The brand name and navigation bar stay at the top, as they do now.

## How the growth is made look real

- **Up close (Seed to Leaves):** a realistic cut-away photo of soil sits in the background. The seed, root, stem and leaves are drawn on top so they can grow continuously with the scroll, with real-looking texture and shading.
- **Zoom out (Tray to Harvest):** the scene blends into photos. A tray of young sprouts gives way to the full tray already used on the site, then to a harvest photo. The zoom-out is what hides the move from drawing to photo.

New photos: a soil close-up, a tray of young sprouts, and a top-down harvest shot.

## Mobile and speed

- On phones the scene is shorter (about three and a half screens of scrolling instead of five) and the text sits above the plant.
- Images load in the right order, and only the opening photos load straight away.
- If a visitor's device is set to reduce motion, they see a still version of each stage instead.

## Technical details

- Add `framer-motion`. Create `src/components/site/GrowStory.tsx`: an outer section (about 500vh desktop, 350vh mobile) with a sticky 100vh stage. Drive everything from `useScroll({ target, offset: ["start start", "end end"] })`, with `useSpring` smoothing.
- The plant is an inline SVG, animated as the scroll moves:
  - Root and stem grow by animating `pathLength`.
  - The soil shift uses a small translate.
  - Leaves unfold with `scale` and `rotate` from the stem node.
  - Extra sprouts are copies of the plant with staggered start points.
  - Gradients, plus a subtle noise filter, give the soil and leaves texture.
- Stages are mapped to set points along the scroll; `useTransform` controls each headline's opacity and y-offset.
- Zoom-out: the scale of the SVG layer goes from 1 to 0.35 while the tray photos fade in. The harvest stage shows `fresh.jpg` with the CTA.
- Generate `soil-closeup.jpg`, `tray-sprouts.jpg` and `harvest-top.jpg` into `src/assets`.
- Remove the old `Hero` from `src/routes/index.tsx` and put `<GrowStory />` in its place. Keep the Trust strip and all other sections. Move the `#home` anchor onto the new section.
- Honour `prefers-reduced-motion` and check there is no sideways scrolling at 360px. Check with Playwright at several scroll positions on desktop and mobile.
- Add a note to `AGENTS.md` that the opening is a sticky scroll-linked story using framer-motion.
