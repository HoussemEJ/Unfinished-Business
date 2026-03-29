import { Injectable, signal } from '@angular/core';
import { CardDto, Priority } from '../card/card';

@Injectable({
  providedIn: 'root',
})
export class CardController {
  protected _activeCards = signal(new Set<string>());
  activeCards = this._activeCards.asReadonly();

  mockBoardData: CardDto[][] = [
    [
      {
        id: 'e02b84eb-9a25-4fc1-9b65-6825eec56c7d',
        title: 'Optimize WebGL Renderer',
        description:
          'Drop draw calls by 50% for smoother frame rates. Refactor the rendering loop to batch geometries and implement instancing for repetitive scene objects. We need a solid 60fps on low-end mobile devices before the final release.',
        tag: 'Web',
        priority: Priority.AssOnFire,
      },
      {
        id: 'b2a8d541-158c-4861-ac3d-04285e252814',
        title: 'Calibrate Extruder',
        description:
          'Fix the under-extrusion issue on the new PLA batch. Recalibrate the E-steps, check the Bowden tube for internal friction, and run a series of temperature towers to find the absolute optimal melting point.',
        tag: '3D Printing',
        priority: Priority.GettingNervous,
      },
    ],
    [
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        title: 'Bake Lighting Maps',
        description:
          'Generate high-res lightmaps for the interior scene. Ensure the UV unwrapping is pristine on all architectural meshes and increase the shadow resolution to completely eliminate the light bleeding artifacts we saw in the last build.',
        tag: '3D',
        priority: Priority.Chill,
      },
    ],
    [
      {
        id: '9c4b261e-8e42-430c-b26a-93f9ef21b183',
        title: 'Implement Hand Tracking',
        description:
          'Connect the new headset SDK for precise gesture recognition. Map out the skeletal joints, implement pinch-to-grab physics logic, and thoroughly test the input latency to prevent any user motion sickness.',
        tag: 'VR',
        priority: Priority.Emshy,
      },
    ],
    [
      {
        id: '3d8b4e7a-1f2c-4b5d-9c8e-a1b2c3d4e5f6',
        title: 'Update Three.js',
        description:
          'Bump to the latest version and resolve all breaking changes. Check the migration guide specifically for the updated physical materials API and ensure our custom fragment shaders still compile without throwing console warnings.',
        tag: 'Web',
        priority: Priority.Chill,
      },
    ],
  ];

  getCards(): CardDto[][] {
    return this.mockBoardData;
  }

  addCard(id: string): void {
    if (id && !this._activeCards().has(id)) {
      this._activeCards.update((cards) => new Set(cards).add(id));
    }
  }

  removeCard(id: string): void {
    if (id && this._activeCards().has(id)) {
      this._activeCards.update((cards) => {
        const newSet = new Set(cards);
        newSet.delete(id);
        return newSet;
      });
    }
  }
}
