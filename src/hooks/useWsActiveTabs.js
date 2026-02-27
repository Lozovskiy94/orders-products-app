import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setActiveTabsCount } from "../store/uiSlice";

export default function useWsActiveTabs() {
  const dispatch = useDispatch();
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    wsRef.current = ws;

    ws.onopen = () => {

    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "COUNT") {
          dispatch(setActiveTabsCount(msg.count));
        }
      } catch {

      }
    };

    ws.onerror = () => {

    };

    ws.onclose = () => {

    };

    return () => {
      ws.close();
    };
  }, [dispatch]);
}