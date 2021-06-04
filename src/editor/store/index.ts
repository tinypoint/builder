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
        id: 'container1',
        children: [
            {
                type: 'page',
                id: 'page1',
                children: [

                    {
                        type: 'button',
                        id: 'button1',
                        props: {
                            text: '跳转按钮'
                        },
                        styles: {

                        },
                        children: [

                        ]
                    },
                    {
                        type: 'img',
                        id: 'img1',
                        props: {
                            imgUrl: '//img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg'
                        },
                        styles: {

                        },
                        children: [

                        ]
                    }
                ]
            }
        ]
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