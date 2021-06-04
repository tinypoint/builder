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
                        type: 'img',
                        id: 'img15125',
                        props: {
                            imgUrl: '//m.360buyimg.com/babel/jfs/t1/178417/30/7153/471340/60b86c74Ece9fddba/d6b7ae44e26ed97c.jpg!q70.dpg'
                        },
                        styles: {
                            '#img15125': {
                                width: '100%'
                            }
                        },
                        children: [

                        ]
                    },
                    {
                        type: 'button',
                        id: 'button1',
                        props: {
                            text: '跳转按钮'
                        },
                        styles: {
                            '#button1': { position: "absolute", top: '20px', left: '40px' }
                        },
                        children: [

                        ]
                    },
                    {
                        type: 'scroller',
                        id: 'scroller1234',
                        props: {
                            text: '跳转按钮'
                        },
                        styles: {

                        },
                        children: [
                            {
                                type: 'button',
                                id: 'button1234',
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
                                id: 'img12',
                                props: {
                                    imgUrl: '//img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg'
                                },
                                styles: {

                                },
                                children: [

                                ]
                            }
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