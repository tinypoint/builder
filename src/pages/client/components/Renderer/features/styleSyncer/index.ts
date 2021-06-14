import { Unsubscribe } from "redux";
import schemaParser from "../../../../../editor/features/schemaParser";
import { Schema, State } from "../../../../../editor/store";

class StyleSyncer {
    StyleSyncer = StyleSyncer;

    styleElement = document.createElement('style')

    _nextstr = ''

    _cssStyleCreator = (schema: Schema, layerId: number) => {

        const { styles = {} } = schema;
        Object.keys(styles).forEach((identifier) => {
            const cssRules = styles[identifier]
            this._nextstr += `${identifier} { `
            Object.keys(cssRules).forEach((key: string) => {
                this._nextstr += `  ${key}: ${cssRules[key]};`
            })
            this._nextstr += ' }'
        });

        return true;
    }

    _prevSchema: Schema | null = null;

    _listener = () => {
        const state: State = (window as any).store.getState();
        const { schema } = state;


        if (this._prevSchema !== schema) {

            console.log('update')
            this._nextstr = ''
            console.log(schema)
            schemaParser.traverse(schema, this._cssStyleCreator)
            this.styleElement.innerText = this._nextstr
            this._nextstr = ''
            this._prevSchema = schema
        }

    }

    unsubscribe: Unsubscribe = (window as any).store.subscribe(this._listener)

    start() {
        document.head.appendChild(this.styleElement);
        this._listener();
    }


    destory() {
        this.unsubscribe()
        document.head.removeChild(this.styleElement);
        (this.styleElement as any) = null;
    }
}

export default new StyleSyncer()