import { IDropTargetBoundary } from './drag-state';

export function getIntersectingTarget(
  decoyRect: DOMRect,
  boundaries: IterableIterator<IDropTargetBoundary>,
  deadzonePixels: number = 10,
): number | null {
  // Calculate the center point of the decoy
  const decoyCenterX = decoyRect.left + decoyRect.width / 2;
  const decoyCenterY = decoyRect.top + decoyRect.height / 2;

  for (const boundary of boundaries) {
    const targetRect = boundary.el.getBoundingClientRect();

    // Shrink the target's bounding box by the deadzone
    const hitLeft = targetRect.left + deadzonePixels;
    const hitRight = targetRect.right - deadzonePixels;
    const hitTop = targetRect.top + deadzonePixels;
    const hitBottom = targetRect.bottom - deadzonePixels;

    // Check if the decoy's CENTER is inside the SHRUNKEN target
    const isInside =
      decoyCenterX >= hitLeft &&
      decoyCenterX <= hitRight &&
      decoyCenterY >= hitTop &&
      decoyCenterY <= hitBottom;

    if (isInside) {
      return boundary.id;
    }
  }

  return null;
}
