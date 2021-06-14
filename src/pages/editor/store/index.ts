import { set } from 'lodash-es';
import { AnyAction, createStore } from 'redux';
import historyer from '../features/historyer';

export interface Schema {
    type: string;
    id: string;
    props?: any;
    styles?: any;
    children?: Schema[];
}

interface Loading {
    [index: string]: any;
}


const initState = {
    select: '',
    selectQueen: [],
    hover: '',
    hoverQueen: [],
    schema: ({
        type: 'container',
        id: 'container0001',
        children: []
    } as Schema),
    scale: 0.75,
    create: Boolean(window.location.pathname.match(/^\/create/)),
    loading: ({} as Loading),
    settingsPanelVisible: false
}

export type State = typeof initState

const reducer = (state = initState, action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_VALUE':
            if (Array.isArray(payload)) {
                payload.forEach(({ key, value }) => {
                    key === 'schema' && historyer.push(value)
                    set(state, key, value)
                })
            } else {
                const { key, value } = payload;
                key === 'schema' && historyer.push(value)
                set(state, key, value)
            }
            return { ...state }
        default:
            return state;
    }
}

export default createStore(reducer)