// Using Stripe API to create a subscription for $10 a month
// This page is currently disabled for the beta period of our app however.
import GradientTop from "@components/GamesenseGradient";
import Metatags from "@components/Metatags";

export default function Subscription() {
  return (
    <>
      <Metatags
        title="Relikt - Subscription"
        description="Subscribe to Relikt"
      />
      <GradientTop />
      <div className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold drop-shadow-2xl">! Attention !</h1>
        <h1 className="text-4xl font-bold drop-shadow-2xl">
          Subscriptions are currently disabled for the BETA period
        </h1>
      </div>
    </>
  );
}
