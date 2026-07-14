"use client";

import useAvailabilityStreamHook from "@/src/global/hooks/useAvailabilityStreamHook";
import { AvailabilityEvent, Product } from "../types";

export default function useProductsAvailabilityHook(products: Product[], onUnavailable: () => void) {
  useAvailabilityStreamHook(
    function (event: AvailabilityEvent) {
      if (event.available) return;

      const isVisible = products.some((product) => product.sku === event.sku);
      if (isVisible) onUnavailable();
    }
  );
}
