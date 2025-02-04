import { Components } from '../controllers'
import { AboutRight } from '../controllers/about-right'
import { ComparisonTableSimple } from '../controllers/comparison-table-simple'
import { CustomersGrid } from '../controllers/customers-grid'
import { CustomersLogoGrid } from '../controllers/customers-logo-grid'
import { DividerSimpleTitle } from '../controllers/divider-simple-title'
import { FaqBasic } from '../controllers/faq-basic'
import { FaqBasicStyled } from '../controllers/faq-basic-styled'
import { FeatureCenterCards } from '../controllers/feature-center-cards'
import { FeatureCenterGrid } from '../controllers/feature-center-grid'
import { FeatureDetailsLeft } from '../controllers/feature-details-left'
import { FeatureDetailsRight } from '../controllers/feature-details-right'
import { FeatureGridImages } from '../controllers/feature-grid-images'
import { FooterGrid } from '../controllers/footer-grid'
import { GalleryBasic } from '../controllers/gallery-basic'
import { GalleryBasicRounded } from '../controllers/gallery-basic-rounded'
import { GalleryWithCaptions } from '../controllers/gallery-with-caption'
import { GalleryWithTitle } from '../controllers/gallery-with-title'
import { HeroCtaLeft } from '../controllers/hero-cta-left'
import { HeroCtaRight } from '../controllers/hero-cta-right'
import { HeroFullWidth } from '../controllers/hero-full-width'
import { HeroParallax } from '../controllers/hero-parallax'
import { Navbar } from '../controllers/navbar'
import { PricingSimple } from '../controllers/pricing-simple'
import { PricingSimple2 } from '../controllers/pricing-simple-2'
import { SignInBasic } from '../controllers/sign-in-basic'
import { SignUpBasic } from '../controllers/sign-up-basic'
import { TeamCenterGrid } from '../controllers/team-center-grid'
import { TeamRoundCenter } from '../controllers/team-round-center'
import { TeamRoundLeft } from '../controllers/team-round-left'
import { TestimonialSimple } from '../controllers/testimonial-simple'
import { Header } from './components/header'
import { ProductItem } from './components/product-item'
import { ProductList } from './components/product-list'
import { sofaControllers } from './sofa/controller'

export const ECOMMERCE_COMPONENTS: Components = [
	{
		title: 'Sofa',
		items: sofaControllers,
	},
	{
		title: 'E-commerce',
		items: [Header, ProductList, ProductItem],
	},
	{
		title: 'About',
		items: [AboutRight],
	},
	{ title: 'Customers', items: [CustomersLogoGrid, CustomersGrid] },
	{ title: 'Comparison Table', items: [ComparisonTableSimple] },
	{ title: 'FAQ', items: [FaqBasic, FaqBasicStyled] },
	{ title: 'Divider', items: [DividerSimpleTitle] },
	{
		title: 'Features',
		items: [
			FeatureCenterGrid,
			FeatureCenterCards,
			FeatureGridImages,
			FeatureDetailsLeft,
			FeatureDetailsRight,
		],
	},
	{ title: 'Footers', items: [FooterGrid] },
	{
		title: 'Gallery',
		items: [GalleryBasic, GalleryBasicRounded, GalleryWithTitle, GalleryWithCaptions],
	},
	{
		title: 'Hero',
		items: [HeroFullWidth, HeroCtaLeft, HeroCtaRight, HeroParallax],
	},
	{ title: 'Navbar', items: [Navbar] },
	{ title: 'Pricing', items: [PricingSimple, PricingSimple2] },
	{ title: 'Sign In/Up', items: [SignInBasic, SignUpBasic] },
	{ title: 'Team', items: [TeamCenterGrid, TeamRoundCenter, TeamRoundLeft] },
	{ title: 'Testimonial', items: [TestimonialSimple] },
]
