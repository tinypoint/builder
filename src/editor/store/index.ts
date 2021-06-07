import { set } from 'lodash-es';
import { AnyAction, createStore } from 'redux';

export interface Schema {
    type: string;
    id: string;
    props?: any;
    styles?: any;
    children?: Schema[];
}


const initState = {
    select: '',
    selectQueen: [],
    hover: '',
    hoverQueen: [],
    schema: {
        type: 'container',
        id: 'container1'
    }
}

export type State = typeof initState

const reducer = (state = initState, action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_VALUE':
            if (Array.isArray(payload)) {
                payload.forEach(({ key, value }) => {
                    set(state, key, value)
                })
            } else {
                const { key, value } = payload;
                set(state, key, value)
            }
            return { ...state }
        default:
            return state;
    }
}

export default createStore(reducer)