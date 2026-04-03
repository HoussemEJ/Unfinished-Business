import { IDropTargetBoundary } from './drag-state';

export function getIntersectingTarget(
  decoyRect: DOMRect,
  boundaries: IterableIterator<IDropTargetBoundary>,
): number | null {
  const decoyCenterX = decoyRect.left + decoyRect.width / 2;

  for (const boundary of boundaries) {
    const targetRect = boundary.el.getBoundingClientRect();
    const isInside = decoyCenterX >= targetRect.left && decoyCenterX <= targetRect.right;

    if (isInside) {
      return boundary.id;
    }
  }

  return null;
}
