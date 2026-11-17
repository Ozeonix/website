import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { MarketProvider } from "../lib/market/MarketContext.jsx";
import { normalizeMarketCode, isValidMarketCode } from "../config/markets";

export const Route = createFileRoute("/$market")({
  loader: ({ params }) => {
    const market = params?.market;
    if (!isValidMarketCode(market)) {
      throw notFound();
    }
    return {
      marketCode: normalizeMarketCode(market),
    };
  },
  component: MarketLayout,
});

function MarketLayout() {
  const { marketCode } = Route.useLoaderData();

  return (
    <MarketProvider routeMarket={marketCode}>
      <Outlet />
    </MarketProvider>
  );
}
