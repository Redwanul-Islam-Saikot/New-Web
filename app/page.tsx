import Hero from "@/app/components/hero";
import CategorySection from "@/app/components/CategorySection";
import Flashdeals from "@/app/components/FlashDeals";
import TwoColumnCallot from "@/app/components/TwoColumnCallout";
import NewArrivals from "@/app/components/NewArrivals";
import FeaturedCollection from "@/app/components/FeaturedCollection";
import PromoGrid from "@/app/components/PromoGrid";
import ShopNow from "@/app/components/ShopNow";
import Delivery from "@/app/components/delivery";


export default function Home() {
  return (
    <div>
      <Hero />
      <CategorySection />
      <Flashdeals />
      <TwoColumnCallot />
      <NewArrivals />
      <PromoGrid />
      <FeaturedCollection />
      <ShopNow />
      <Delivery />
    </div>
  );
}
