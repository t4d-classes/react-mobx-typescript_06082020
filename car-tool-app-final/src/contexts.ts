import React from 'react';

import { CarToolStore } from './stores/CarToolStore';

export const CarToolStoreContext = React.createContext<CarToolStore>({} as CarToolStore);