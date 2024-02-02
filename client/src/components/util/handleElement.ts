export function calculateElementPositionAndSize({
  target,
}: {
  target: HTMLElement;
}) {
  const targetRect = target?.getBoundingClientRect();
  const targetPosition = {
    x: targetRect.left,
    y: targetRect.top,
    width: targetRect.width,
    height: targetRect.height,
  };

  return targetPosition;
}
