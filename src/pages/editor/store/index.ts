import { set } from 'lodash-es';
import { AnyAction, createStore } from 'redux';

export interface LayoutStruct {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Schema {
  type: string;
  id: string;
  props?: any;
  styles?: any;
  layout?: LayoutStruct;
  children?: Schema[];
}

interface Loading {
  [index: string]: any;
}

export interface PagesRecord {
  id: string;
  status: string;
  page: string;
  schema: State['schema'];
}

export interface Page {
  name: string;
  id: string;
  pagesrecords: PagesRecord[];
}

export interface Bound {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum DIR {
  TOP = 0b00000001,
  LEFT = 0b00000010,
  BOTTOM = 0b00000100,
  RIGHT = 0b00001000,
  OTHER = 0b00000000,
}

export interface Component {
  name: string;
  path: string;
}

export interface Template {
  template: Schema[];
  _id: string;
}

export interface Clipsdata {
  type: string;
  payload: Schema[];
}

const initState = {
  sid: 0,
  hid: -1,
  hredo: false,
  hundo: false,
  hsctack: ([] as any[]),
  select: ([] as string[]),
  hover: '',
  schema: ({
    type: 'container',
    id: 'container0001',
    children: [],
  } as Schema),
  baseScale: 1,
  scale: 0.75,
  precision: 0,
  bounds: ([] as Bound[]),
  currentBound: (null as unknown as Bound),
  threshold: 10,
  create: Boolean(window.location.pathname.match(/^\/builder\/create/)),
  loading: ({} as Loading),
  settingsPanelVisible: false,
  meta: {
    name: '',
    pagesrecords: ([] as PagesRecord[]),
  } as Page,
  components: ([] as Component[]),
  templates: ([] as Template[]),
  clipsdata: (null as Clipsdata | null),
  scriptEditorVisible: false,
  scriptText: '',
  scriptUrl: '',
  showContextMenu: false,
  contextMenuPosition: { x: 0, y: 0 },
  sidebar: {} as { [index: string]: boolean },
  nodeExpandMaps: {} as { [index: string]: boolean },
  theme: 'light' as 'light' | 'dark',
};

export type State = typeof initState;

const reducer = (state = initState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_VALUE':
      if (Array.isArray(payload)) {
        payload.forEach(({ key, value }) => {
          set(state, key, value);
        });
      } else {
        const { key, value } = payload;
        set(state, key, value);
      }
      return { ...state };
    default:
      return state;
  }
};

export default createStore(reducer);
