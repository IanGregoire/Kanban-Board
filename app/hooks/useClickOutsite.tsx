import { useEffect } from "react";

export function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void, excludeRef?: React.RefObject<HTMLElement>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedInsideMain = ref.current?.contains(target);
      const clickedInsideExcluded = excludeRef?.current?.contains(target);

      if (!clickedInsideMain && !clickedInsideExcluded) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler, excludeRef]);
}