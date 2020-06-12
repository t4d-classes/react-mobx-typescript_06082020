import { Demo as RenderDemo } from '../01_render/Demo';
import { Demo as MountDemo } from '../02_mount/Demo';
import { Demo as StateDemo } from '../03_state/Demo';
import { Demo as UpdateDemo } from '../04_update/Demo';
import { Demo as ErrorDemo } from '../05_error/Demo';
import { Demo as OptimizedDemo } from '../06_optimized/Demo';

export const demoComponents = [
  {
    id: 1,
    path: '/render',
    label: 'Render Demo',
    component: RenderDemo,
    showComponentToRun: true,
  },
  {
    id: 2,
    path: '/mount',
    label: 'Mount Demo',
    component: MountDemo,
    showComponentToRun: true,
  },
  {
    id: 3,
    path: '/state',
    label: 'State Demo',
    component: StateDemo,
    showComponentToRun: true,
  },
  {
    id: 4,
    path: '/update',
    label: 'Update Demo',
    component: UpdateDemo,
    showComponentToRun: true,
  },
  {
    id: 5,
    path: '/error',
    label: 'Error Demo',
    component: ErrorDemo,
    showComponentToRun: false,
  },
  {
    id: 6,
    path: '/optimized',
    label: 'Optimized Demo',
    component: OptimizedDemo,
    showComponentToRun: true,
  },
];
