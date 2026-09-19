export type GlobalEvent = {
  slug: string
  name: string
  date: string
  location: string
  summary: string
  images: { src: string; alt: string }[]
  video: string
}

export const globalEvents: GlobalEvent[] = [
  {
    slug: 'shenzhen-hitech-2025',
    name: 'Shenzhen Hi-Tech Fair',
    date: 'November 2025',
    location: 'Shenzhen, China',
    summary: 'International visitors experienced IM Mate dual-screen translation in live, face-to-face conversations.',
    images: [
      { src: '/images/events/shenzhen-hitech-2025-01.jpg', alt: 'Cylan team and visitors at Shenzhen Hi-Tech Fair 1' },
      { src: '/images/events/shenzhen-hitech-2025-02.jpg', alt: 'Cylan team and visitors at Shenzhen Hi-Tech Fair 2' },
      { src: '/images/events/shenzhen-hitech-2025-03.jpg', alt: 'Cylan team and visitors at Shenzhen Hi-Tech Fair 3' },
    ],
    video: '/videos/events/shenzhen-hitech-2025.mp4',
  },
  {
    slug: 'hong-kong-electronics-2026',
    name: 'Hong Kong Electronics Fair',
    date: 'April 2026',
    location: 'Hong Kong, China',
    summary: 'Distributors and buyers tested portable and desktop translators at Cylan’s branded booth.',
    images: [
      { src: '/images/events/hong-kong-electronics-2026-01.jpg', alt: 'IM Mate demonstrations at Hong Kong Electronics Fair 1' },
      { src: '/images/events/hong-kong-electronics-2026-02.jpg', alt: 'IM Mate demonstrations at Hong Kong Electronics Fair 2' },
      { src: '/images/events/hong-kong-electronics-2026-03.jpg', alt: 'IM Mate demonstrations at Hong Kong Electronics Fair 3' },
    ],
    video: '/videos/events/hong-kong-electronics-2026.mp4',
  },
  {
    slug: 'china-eurasia-2026',
    name: 'China-Eurasia Expo',
    date: '2026',
    location: 'Xinjiang, China',
    summary: 'The translator supported practical discussions between Chinese teams and overseas participants.',
    images: [{ src: '/images/events/china-eurasia-2026-01.jpg', alt: 'An overseas participant using an IM Mate translator at China-Eurasia Expo' }],
    video: '/videos/events/china-eurasia-2026.mp4',
  },
  {
    slug: 'shanghai-waic-2026',
    name: 'World Artificial Intelligence Conference',
    date: '2026',
    location: 'Shanghai, China',
    summary: 'IM Mate supported multilingual one-to-one meetings during an international AI industry programme.',
    images: [{ src: '/images/events/shanghai-waic-2026-01.jpg', alt: 'A multilingual business meeting using IM Mate at WAIC 2026' }],
    video: '/videos/events/shanghai-waic-2026.mp4',
  },
  {
    slug: 'shanghai-technology-fair-2026',
    name: 'China (Shanghai) International Technology Fair',
    date: '2026',
    location: 'Shanghai, China',
    summary: 'Visitors reviewed both product families in a focused technology-trade setting.',
    images: [{ src: '/images/events/shanghai-technology-fair-2026-01.jpg', alt: 'Cylan exhibition booth at China Shanghai International Technology Fair' }],
    video: '/videos/events/shanghai-technology-fair-2026.mp4',
  },
  {
    slug: 'harbin-trade-fair-2026',
    name: 'Harbin International Economic and Trade Fair',
    date: '2026',
    location: 'Harbin, China',
    summary: 'Long-form demonstrations showed how both sides of a conversation can read translated content at the same time.',
    images: [{ src: '/images/events/harbin-trade-fair-2026-01.jpg', alt: 'IM Mate product display at Harbin International Economic and Trade Fair' }],
    video: '/videos/events/harbin-trade-fair-2026.mp4',
  },
  {
    slug: 'shenzhen-ai-iot-2026',
    name: 'Shenzhen AI & IoT Exhibition',
    date: '2026',
    location: 'Shenzhen, China',
    summary: 'A busy exhibition floor provided repeated real-world trials with local and international visitors.',
    images: [{ src: '/images/events/shenzhen-ai-iot-2026-01.jpg', alt: 'Overseas inquiry area at Shenzhen AI and IoT Exhibition' }],
    video: '/videos/events/shenzhen-ai-iot-2026.mp4',
  },
]

export const fieldGallery = [
  { src: '/images/events/field-01.jpg', alt: 'Visitor discussion at a Cylan exhibition booth' },
  { src: '/images/events/field-02.jpg', alt: 'Green IM Mate portable translator on display' },
  { src: '/images/events/field-03.jpg', alt: 'Completed Cylan trade-show booth' },
  { src: '/images/events/field-04.jpg', alt: 'Visitors speaking with the Cylan team' },
  { src: '/images/events/field-05.jpg', alt: 'IM Cam video call camera product wall' },
  { src: '/images/events/field-06.jpg', alt: 'IM Mate translator close-up at an exhibition' },
  { src: '/images/events/field-07.jpg', alt: 'Cylan research and product development workspace' },
  { src: '/images/events/field-08.jpg', alt: 'International visitor trying an IM Cam video call camera' },
  { src: '/images/events/field-09.jpg', alt: 'Packed smart communication devices ready for delivery' },
  { src: '/images/events/field-10.jpg', alt: 'Cylan team with visitors at a video communication exhibition' },
  { src: '/images/events/field-11.jpg', alt: 'Tabletop demonstration of an IM Mate translator' },
  { src: '/images/events/field-12.jpg', alt: 'Cylan team and business partners at a branded booth' },
  { src: '/images/events/field-13.jpg', alt: 'Portable and large-screen IM Mate translators together' },
  { src: '/images/events/field-14.jpg', alt: 'Cylan and Sailan Technology brand wall' },
  { src: '/images/events/field-15.jpg', alt: 'Visitors gathering at the Cylan exhibition booth' },
  { src: '/images/events/field-16.jpg', alt: 'Cylan team group photograph at an international exhibition' },
  { src: '/images/events/field-17.jpg', alt: 'Product explanation and buyer discussion at the booth' },
  { src: '/images/events/field-18.jpg', alt: 'Cylan team and visitors at the company booth' },
]
