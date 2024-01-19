import { useEffect, useState } from "react";

/**
 * 무한스크롤 구현을 위한 훅.
 * setTarget으로 지정한 요소가 화면에 교차(intersect)될 때
 * 인자로 전달된 onIntersect가 호출됨.
 */
export const useIntersectionObserver = ({
  onIntersect,
  shouldBeBlocked,
}: {
  onIntersect: () => Promise<unknown>;
  shouldBeBlocked: boolean;
}) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      async ([{ isIntersecting }]) => {
        if (!isIntersecting || shouldBeBlocked) return;
        await onIntersect();
      },
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, target, shouldBeBlocked]);

  return { setTarget };
};
