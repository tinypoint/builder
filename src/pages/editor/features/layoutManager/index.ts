import { cloneDeep } from 'lodash-es';
import { Schema } from '../../store';

interface LayoutSchema extends Schema {
  containBy?: LayoutSchema;
  contains?: LayoutSchema[];
}

class LayoutManager {
  tree: Schema;

  private _layoutCss: string = '';

  constructor(tree: Schema) {
    this.tree = cloneDeep(tree);
    this.exec();
  }

  _traverse = (
    schema: Schema,
    callback: (schema: Schema) => void,
  ) => {
    // 深度优先
    callback(schema);

    const { children = [] } = schema;
    for (let i = 0, len = children.length; i < len; i += 1) {
      this._traverse(children[i], callback);
    }
  };

  getEndContainBy(node: LayoutSchema): LayoutSchema {
    if (!node.containBy) {
      return node;
    }

    return this.getEndContainBy(node.containBy);
  }

  static getContainStyle(contains: LayoutSchema[] | undefined,
    toTopDistance: number, subIndex: number,
    calcContain: LayoutSchema[], _tree: LayoutSchema): string {
    let str = '';

    if (!contains || !contains.length) {
      return str;
    }

    contains.forEach((contain) => {
      str += `#${_tree.id} > #${contain.id} {
  margin-top: ${contain.layout!.y - toTopDistance}px;
  grid-row: ${subIndex + 1} / ${subIndex + 2};`;
      // 如果本层和下一层有重叠
      if (subIndex < calcContain.length - 1
                  && (contain.layout!.y + contain.layout!.height)
                  > calcContain[subIndex + 1].layout!.y) {
        str += `
  margin-bottom: ${calcContain[subIndex + 1].layout!.y - (contain.layout!.y + contain.layout!.height)}px;
}
`;
      } else {
        str += `  
}
`;
      }
    });

    return str;
  }

  exec = () => {
    const styles: string[] = [];
    this._traverse(this.tree, (_tree) => {
      if (_tree.type === 'page') {
        const { children = [] } = _tree;

        const subs: LayoutSchema[] = [...children];
        // 由上至下排序，y值小的排上面
        subs.sort((a, b) => a.layout!.y - b.layout!.y);

        const calcContain: LayoutSchema[] = [];

        subs.forEach((sub, subIndex) => {
          if (subIndex === 0) {
            // y值最高的不会被其他包含
            calcContain.push(sub);
            return;
          }

          let isContain = false;

          const top = sub.layout!.y;
          const bottom = sub.layout!.y + sub.layout!.height;

          for (let i = 0, len = calcContain.length; i < len; i += 1) {
            if (top >= calcContain[i].layout!.y
              && (bottom) <= (calcContain[i].layout!.y + calcContain[i].layout!.height)) {
              const root = this.getEndContainBy(calcContain[i]);

              sub.containBy = root;

              root.contains = [...root.contains || [], sub];
              isContain = true;
              break;
            }
          }

          // 如果被包含了，不如队列
          if (!isContain) {
            calcContain.push(sub);
          }
        });

        console.log(calcContain);

        let toTopDistance = 0;

        let str = '';

        const boxGridRows: string[] = [];

        calcContain.forEach((sub, subIndex) => {
          str += `#${_tree.id} > #${sub.id} {
  margin-top: ${sub.layout!.y - toTopDistance}px;
  grid-row: ${subIndex + 1} / ${subIndex + 2};`;
          // 如果本层和下一层有重叠
          if (subIndex < calcContain.length - 1
            && sub.layout!.y + sub.layout!.height > calcContain[subIndex + 1].layout!.y) {
            str += `
  margin-bottom: ${calcContain[subIndex + 1].layout!.y - (sub.layout!.y + sub.layout!.height)}px;
}
`;
          } else {
            str += `  
}
`;
          }

          str += LayoutManager.getContainStyle(sub.contains,
            toTopDistance, subIndex, calcContain, _tree);

          // boxGridRows.push(sub.layout!.y - y + sub.layout!.height);
          boxGridRows.push('min-content');
          toTopDistance = sub.layout!.y + sub.layout!.height;

          if (subIndex < calcContain.length - 1
            && sub.layout!.y + sub.layout!.height > calcContain[subIndex + 1].layout!.y) {
            toTopDistance
              += (calcContain[subIndex + 1].layout!.y - (sub.layout!.y + sub.layout!.height));
          }
        });

        const parentStr = `#${_tree.id}{
  grid-template-rows: ${boxGridRows.join(' ')};
}
`;
        styles.push(parentStr + str);
      }
    });

    this._layoutCss = styles.join('\n');
    console.log(this._layoutCss);
  };

  getLayoutCss = () => this._layoutCss;
}

export default LayoutManager;
