import { SwalProviderFn } from './tokens';

export const provideSwalDefault: SwalProviderFn = () => import('sweetalert2/dist/sweetalert2.js').then(m => m.default);
