import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Truck,
  ArrowRight,
  Star,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  RefreshCw,
  Clock,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                StreamLine
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#categories"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="#featured"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Featured
              </Link>
              <Link
                href="#bestsellers"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Best Sellers
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Reviews
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/* <Button
                variant="ghost"
                className="hidden sm:inline-flex"
              ></Button> */}
              <Link className="hidden sm:inline-flex" href={"/login"}>
                Login
              </Link>
              <Button>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🔥 New Summer Collection
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Shop Smarter,
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                    {" "}
                    Live Better
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover curated products that simplify your life. Quality
                  meets affordability with our streamlined shopping experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  View Collections
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-emerald-500" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 text-emerald-500" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="StreamLine Featured Products"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Categories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of carefully curated products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-xl aspect-square">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Fashion Category"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">Fashion</h3>
                <Button
                  variant="link"
                  className="text-white p-0 flex items-center"
                >
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl aspect-square">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Home & Living Category"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">Home & Living</h3>
                <Button
                  variant="link"
                  className="text-white p-0 flex items-center"
                >
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl aspect-square">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Electronics Category"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">Electronics</h3>
                <Button
                  variant="link"
                  className="text-white p-0 flex items-center"
                >
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl aspect-square">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Beauty & Health Category"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">
                  Beauty & Health
                </h3>
                <Button
                  variant="link"
                  className="text-white p-0 flex items-center"
                >
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Featured
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              New Arrivals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out our latest products just for you
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={item}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=300`}
                    alt={`Product ${item}`}
                    width={300}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full w-8 h-8"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(42)</span>
                  </div>
                  <h3 className="font-medium text-gray-900">
                    Premium Product {item}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold text-gray-900">$59.99</p>
                    {item % 2 === 0 && (
                      <Badge
                        variant="outline"
                        className="text-emerald-600 border-emerald-600"
                      >
                        Sale
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="bestsellers" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Best Sellers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Our Most Popular Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loved by our customers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden border-0 shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <Image
                      src={`/placeholder.svg?height=300&width=300`}
                      alt={`Best Seller ${item}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-1/2 flex flex-col justify-between p-6">
                    <div>
                      <Badge className="mb-2 bg-amber-500">Best Seller</Badge>
                      <h3 className="font-semibold text-lg">
                        Premium Best Seller {item}
                      </h3>
                      <div className="flex items-center space-x-1 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          (120+)
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        Our most popular product with amazing features and
                        premium quality materials.
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <p className="font-bold text-lg">$89.99</p>
                        <p className="text-sm text-gray-500 line-through">
                          $129.99
                        </p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "I absolutely love the quality of products from StreamLine.
                  The delivery was fast and the packaging was eco-friendly. Will
                  definitely shop again!"
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "The customer service is exceptional. I had an issue with my
                  order and they resolved it immediately. The products are high
                  quality and worth every penny."
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "I've been shopping with StreamLine for over a year now and
                  have never been disappointed. Their product range keeps
                  expanding and the quality is consistently excellent."
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Emily Rodriguez
                    </p>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $50</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg">Secure Payments</h3>
              <p className="text-gray-600">Protected by encryption</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Join Our Newsletter
            </h2>
            <p className="text-xl text-emerald-100">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                size="lg"
                variant="secondary"
                className="text-emerald-600 font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StreamLine</span>
              </div>
              <p className="text-gray-400">
                Your one-stop shop for quality products at affordable prices. We
                make shopping simple and enjoyable.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Store Locations
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} StreamLine. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Image
                src="/placeholder.svg?height=30&width=50"
                alt="Visa"
                width={50}
                height={30}
                className="h-8"
              />
              <Image
                src="/placeholder.svg?height=30&width=50"
                alt="Mastercard"
                width={50}
                height={30}
                className="h-8"
              />
              <Image
                src="/placeholder.svg?height=30&width=50"
                alt="PayPal"
                width={50}
                height={30}
                className="h-8"
              />
              <Image
                src="/placeholder.svg?height=30&width=50"
                alt="Apple Pay"
                width={50}
                height={30}
                className="h-8"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
