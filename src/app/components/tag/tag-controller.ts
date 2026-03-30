import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TagController {
  tagList = [
    {
      title: 'Web',
      color: 'var(--prime-500)',
    },
    {
      title: '3D Modeling',
      color: 'var(--warn-500)',
    },
    {
      title: '3D Printing',
      color: 'var(--error-500)',
    },
    {
      title: 'VR',
      color: 'var(--info-500)',
    },
  ];
}
