"use client";

import { useEffect, useRef } from "react";

import { ApiConfig } from "@/src/configurations/ApiConfig";
import { AvailabilityEvent } from "../types";

export default function useAvailabilityStreamHook(onEvent: (event: AvailabilityEvent) => void) {
  const onEventRef = useRef(onEvent);

  useEffect(
    function () {
      onEventRef.current = onEvent;
    },
    [onEvent]
  );

  useEffect(function () {
    // EventSource exige uma URL absoluta (não passa pelo cliente axios de
    // src/services/api.js, que só resolve paths relativos via baseURL).
    const eventSource = new EventSource(ApiConfig.Host.production + ApiConfig.Router.AvailabilityStream());

    function handleAvailability(event: MessageEvent) {
      onEventRef.current(JSON.parse(event.data));
    }

    eventSource.addEventListener("availability", handleAvailability);

    return function () {
      eventSource.removeEventListener("availability", handleAvailability);
      eventSource.close();
    };
  }, []);
}
