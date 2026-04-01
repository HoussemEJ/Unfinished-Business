import { Injectable } from '@angular/core';
import { Priority } from '../model';

@Injectable({
  providedIn: 'root',
})
export class DataController {
  cards = [
    {
      id: 'e02b84eb-9a25-4fc1-9b65-6825eec56c7d',
      title: 'Optimize WebGL Renderer',
      description: 'Drop draw calls by 50% for smoother frame rates...',
      tag: {
        name: 'Web',
        color: 'var(--prime-500)',
      },
      priority: Priority.AssOnFire,
      column: 0,
      order: 'm',
    },
    {
      id: 'b2a8d541-158c-4861-ac3d-04285e252814',
      title: 'Calibrate Extruder',
      description: 'Fix the under-extrusion issue on the new PLA batch...',
      tag: {
        name: '3D Printing',
        color: 'var(--error-500)',
      },
      priority: Priority.GettingNervous,
      column: 0,
      order: 't',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      title: 'Bake Lighting Maps',
      description: 'Generate high-res lightmaps for the interior scene...',
      tag: {
        name: '3D',
        color: 'var(--warn-500)',
      },
      priority: Priority.Chill,
      column: 1,
      order: 'm',
    },
    {
      id: '9c4b261e-8e42-430c-b26a-93f9ef21b183',
      title: 'Implement Hand Tracking',
      description: 'Connect the new headset SDK for precise gesture recognition...',
      tag: {
        name: 'VR',
        color: 'var(--info-500)',
      },
      priority: Priority.Emshy,
      column: 2,
      order: 'm',
    },
    {
      id: '3d8b4e7a-1f2c-4b5d-9c8e-a1b2c3d4e5f6',
      title: 'Update Three.js',
      description: 'Bump to the latest version and resolve all breaking changes...',
      tag: {
        name: 'Web',
        color: 'var(--prime-500)',
      },
      priority: Priority.Chill,
      column: 3,
      order: 'm',
    },
  ];

  tagList = [
    {
      name: 'Web',
      color: 'var(--prime-500)',
    },
    {
      name: '3D Modeling',
      color: 'var(--warn-500)',
    },
    {
      name: '3D Printing',
      color: 'var(--error-500)',
    },
    {
      name: 'VR',
      color: 'var(--info-500)',
    },
  ];
}
