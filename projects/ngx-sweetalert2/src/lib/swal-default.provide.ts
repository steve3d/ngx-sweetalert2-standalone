import { SwalProviderFn } from './tokens';

export const provideSwalDefault: SwalProviderFn = () => import('sweetalert2').then(m => m.default);
