const cdn = 'https://cdn.shopify.com/s/files/1/0649/4679/8676/files/'

export type Product = {
  title: string
  price: number
  stock: number
  handle: string
  image: string
  use: string
}

// Campaign hero products: deep stock, clear price (Shopify catalogue, Oct 21, 2026)
export const heroProducts: Product[] = [
  {
    title: 'Brax Tall Neck',
    price: 30,
    stock: 53,
    handle: 'brax-1',
    image: cdn + 'ChatGPTImageMay6_2026_01_58_31PM.png?v=1778065160',
    use: 'Kitchen mixer · dual handle',
  },
  {
    title: 'Brax Short Neck',
    price: 25,
    stock: 51,
    handle: 'brax-tri-500',
    image: cdn + 'ChatGPTImageMay6_2026_01_41_32PM.png?v=1778064128',
    use: 'Basin mixer · dual handle',
  },
  {
    title: 'Brax Kore 25 cm',
    price: 65,
    stock: 31,
    handle: '25cm-brax-kore',
    image: cdn + 'Brax_Kore_1100.png?v=1777892464',
    use: 'Tall single-lever basin mixer',
  },
  {
    title: 'Brax Kore Kitchen',
    price: 30,
    stock: 24,
    handle: 'brax-kore',
    image: cdn + 'BRAX_KORE_4000.png?v=1777894761',
    use: 'U-spout kitchen mixer',
  },
  {
    title: '120×60 Wave LED Mirror',
    price: 60,
    stock: 28,
    handle: 'wave-decorative-mirror',
    image: cdn + 'ChatGPTImageApr11_2026_12_44_16PM_1d7cb501-656a-45d5-baee-e361c4f3ce4a.png?v=1775900849',
    use: '3 light colours · wide format',
  },
  {
    title: '60×60 Round LED Mirror',
    price: 40,
    stock: 25,
    handle: 'round-led-bathroom-mirror',
    image: cdn + 'ChatGPTImageApr11_2026_12_31_58PM.png?v=1775899954',
    use: '3 light colours · round',
  },
]

export const productUrl = (handle: string, campaign = 'choose_with_confidence', source = 'instagram') =>
  `https://twainyplast.com/products/${handle}?utm_source=${source}&utm_medium=social&utm_campaign=${campaign}`
